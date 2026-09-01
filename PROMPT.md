# Colored Tags Wrangler — Full Rewrite Prompt

## Overview

Rewrite the Obsidian plugin "Colored Tags Wrangler" (ID: `colored-tags-wrangler`) from version `0.19.4` to `1.0.0`. The plugin assigns custom foreground and background colors to tags throughout Obsidian (notes, properties, Canvas, Kanban, Folder Notes).

**Current version:** `0.19.4` (settings version 14)
**Target version:** `1.0.0` (settings version 15)

## Critical Requirements

### 1. Dynamic Style Injection (KEEP)
The plugin **must** continue using dynamic `<style>` tag injection for CSS. This is required because:
- Tag colors are user-configurable at runtime
- CSS must update when settings change without requiring Obsidian restart
- The `styles.css` file approach cannot support dynamic per-tag colors

The `<style>` element should have `id="colored-tags-wrangler"` and be managed by a `StyleManager` service.

### 2. Settings Backward Compatibility (CRITICAL)
The new settings system **must** be compatible with the old `data.json` format. Users upgrading from `0.19.x` to `1.0.0` must not lose their tag color configurations.

**Current settings structure (v14):**
```typescript
interface ISettings {
  TagColors: {
    ColorPicker: Array<{
      tag_name: string;
      color: RGB;
      background_color: RGB;
      luminance_offset: number;
    }>;
    EnableMultipleTags: boolean;
    EnableSeparateBackground: boolean;
    EnableBackgroundOpacity: boolean;
    Values: {
      BackgroundOpacity: number;
      LuminanceOffset: number;
    };
  };
  CSS: {
    NoteTags: boolean;
    NoteProperties: boolean;
    NoteBackgrounds: boolean;
    TagsNoWrap: boolean;
    TagsNoWrapText: string;
  };
  FolderNote: {
    Enable: boolean;
    FolderTagLinks: Array<{ folder_path: string; tag_name: string }>;
    EnableAutoDetect: boolean;
    EnableBackgroundOpacity: boolean;
    Values: {
      BackgroundOpacity: number;
      ForceImportant: boolean;
      BorderRadius: string;
      Padding: string;
    };
  };
  Kanban: {
    Enable: boolean;
    EnableCards: boolean;
    EnableLists: boolean;
    HideHashtags: boolean;
    EnableBackgroundOpacity: boolean;
    Values: {
      BackgroundOpacity: number;
      CardBackgroundOpacity: number;
      CardBorderOpacity: number;
      ListBackgroundOpacity: number;
      ListBorderOpacity: number;
    };
  };
  Canvas: {
    Enable: boolean;
    EnableBackgroundOpacity: boolean;
    Values: {
      BackgroundOpacity: number;
      CardBorderOpacity: number;
      CardBackgroundLuminanceOffset: number;
    };
  };
  Debug: {
    Enable: boolean;
    EnableExperimentalCommands: boolean;
  };
  Info: {
    SettingsVersion: number;
  };
}
```

### 3. Migration System
Implement a typed, tested migration system that:
- Creates a backup of `data.json` before migration (timestamped filename)
- Shows an Obsidian `Notice` when migration occurs
- Each migration function has typed input/output
- Tests verify each migration step independently
- `CURRENT_VERSION` is computed from the migration steps array length

### 4. Testing with Vitest
Use **Vitest** as the test framework. Test structure:

```
tests/
  unit/
    lib/
      color-converters.test.ts
      array-utils.test.ts
      string-utils.test.ts
    services/
      settings-service.test.ts
      migrator-service.test.ts
      tag-records-service.test.ts
      css-styler-service.test.ts
    extensions/
      core-extension.test.ts
      canvas-extension.test.ts
      kanban-extension.test.ts
      folder-note-extension.test.ts
      properties-extension.test.ts
  migrations/
    migrate-00-to-01.test.ts
    migrate-01-to-02.test.ts
    ...
    migrate-14-to-15.test.ts
  integration/
    style-generation.test.ts
    tag-matching.test.ts
  fixtures/
    settings-v014.json
    settings-v015.json
```

**Test coverage targets:**
- 100% for `src/lib/` utilities
- 100% for migration functions
- 90%+ for services
- 80%+ for extensions

## Architecture

### Directory Structure
```
src/
  main.ts                          # Plugin entry point (thin, ~30 lines)
  plugin/
    ColoredTagWranglerPlugin.ts    # Plugin class extending Plugin
    extensions/
      AbstractExtension.ts         # Base class for all extensions
      core/
        ExtensionCore.ts           # Core tag coloring
        CssWranglerCore.ts         # CSS generation for note tags
        EventHandlerCore.ts        # Metadata change handling
      canvas/
        ExtensionCanvas.ts         # Canvas card coloring
        CssWranglerCanvas.ts
        EventHandlerCanvas.ts
      kanban/
        ExtensionKanban.ts         # Kanban card/list coloring
        CssWranglerKanban.ts
      folder-note/
        ExtensionFolderNote.ts     # Folder note coloring
        CssWranglerFolderNote.ts
        EventHandlerFolderNote.ts
      properties/
        ExtensionProperties.ts     # Note property tag coloring
        EventHandlerProperties.ts
      styling/
        ExtensionStyling.ts        # Tag no-wrap, note backgrounds
        CssWranglerStyling.ts
    services/
      StyleManager.ts              # Central CSS injection orchestrator
      SettingsService.ts           # Settings load/save/migration
      MigratorService.ts           # Migration pipeline
      TagRecordsService.ts         # Tag record CRUD
      EventHandlerService.ts       # Event registration
    ui/
      SettingTab.ts                # PluginSettingTab subclass
      components/
        SettingTagTable.ts         # Main tag table
        SettingExtensionSelector.ts # Extension toggles
        SettingTagRecord*.ts       # Row components (color, text, toggle, etc.)
    types/
      settings.ts                  # Settings interfaces (v14, v15)
      extensions.ts                # Extension interfaces
      colored-tag-record.ts        # Tag record type
  lib/
    color-converters.ts            # Hex, RGB, HSL conversions
    array-utils.ts                 # arrayMove
    string-utils.ts                # normalizeTagName, escapeCss
    tag-utils.ts                   # tagMatchesPattern, isWildcardTagName
    css-selectors.ts               # tagNameToHrefSelector, tagNameToClassSelector
```

### Extension Model
Each extension is a self-contained module:

```typescript
interface IExtension {
  extensionName: string;
  description: string;
  extensionRequirements: string[];  // e.g., ["core"]
  isEnabled: boolean;
  cssWrangler: ICssWrangler;
  eventHandler?: IEventHandler;
  getSettingsColumns(): TableContentPopulator[];
}
```

### Settings Structure (v15)
```typescript
interface IPluginSettings {
  version: 15;
  enabledExtensions: string[];  // ["core", "canvas", "kanban", ...]
  tagRecords: IColoredTagRecord[];
  extensionSettings: Record<string, Record<string, unknown>>;
}

interface IColoredTagRecord {
  id: string;
  tag_name: string;
  color: RGB;
  background_color: RGB;
  luminance_offset: number;
  // Extension-specific fields (namespaced)
  canvas_enabled?: boolean;
  kanban_cards_enabled?: boolean;
  kanban_lists_enabled?: boolean;
  folder_note_path?: string;
}
```

## Features to Preserve

### Core Features
1. Assign foreground/background colors to tags
2. Multi-tag support (semicolons/newlines)
3. Wildcard matching (`project/*` matches `project/HR`)
4. Accent/special character support (é, ü, spaces, etc.)
5. Background opacity control

### Integrations
1. **Canvas** — Color canvas nodes containing colored tags
2. **Kanban** — Color kanban cards and lane backgrounds
3. **Folder Notes** — Color folder titles in file explorer
4. **Properties** — Color tags in note properties panel
5. **Note Backgrounds** — Set page background based on tag

### Commands
1. Export tags to graph.json codeblock
2. Experimental: Write graph.json directly (desktop only)
3. Experimental: Export folder notes to graph.json (desktop only)
4. Experimental: Export CSS to codeblock (desktop only)

## Technical Requirements

### TypeScript
```json
{
  "compilerOptions": {
    "strict": true,
    "target": "ES2021",
    "module": "ESNext",
    "moduleResolution": "node",
    "lib": ["ES2021", "DOM"]
  }
}
```

### esbuild
```javascript
{
  entryPoints: ['src/main.ts'],
  bundle: true,
  external: ['obsidian', 'electron', '@codemirror/*', '@lezer/*', ...builtinModules],
  format: 'cjs',
  target: 'es2021',
  sourcemap: prod ? false : 'inline',
  treeShaking: true,
  outfile: 'main.js',
  minify: prod
}
```

### Vitest Config
```typescript
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['tests/**/*.test.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: ['src/**/*.ts'],
      exclude: ['src/main.ts', 'src/plugin/ColoredTagWranglerPlugin.ts']
    }
  }
});
```

### Dependencies
```json
{
  "devDependencies": {
    "@types/jquery": "^3.5.29",
    "@types/node": "^16.11.6",
    "@typescript-eslint/eslint-plugin": "^5.29.0",
    "@typescript-eslint/parser": "^5.29.0",
    "builtin-modules": "^3.3.0",
    "esbuild": "^0.28.1",
    "eslint": "^9.39.4",
    "eslint-plugin-obsidianmd": "^0.4.0",
    "obsidian": "latest",
    "tslib": "^2.4.0",
    "typescript": "^5.0.0",
    "vitest": "^1.0.0",
    "@vitest/coverage-v8": "^1.0.0"
  },
  "dependencies": {}
}
```

**Note:** jQuery is removed. All DOM manipulation uses native API or Obsidian's `createEl()`.

## Implementation Order

### Phase 1: Foundation
1. Update `tsconfig.json` to `strict: true`
2. Update `esbuild.config.mjs` to modern config
3. Set up Vitest configuration
4. Create `src/lib/` utilities with 100% test coverage
5. Create `src/types/` with all interfaces

### Phase 2: Settings & Migration
1. Implement `ISettingsV14` interface (current format)
2. Implement `ISettingsV15` interface (new format)
3. Write migration functions (v14 → v15) with tests
4. Implement `SettingsService` with load/save
5. Implement `MigratorService` with backup creation
6. Write integration tests for migration pipeline

### Phase 3: Extensions
1. Implement `AbstractExtension` base class
2. Implement `CoreExtension` (tag coloring)
3. Implement `CanvasExtension`
4. Implement `KanbanExtension`
5. Implement `FolderNoteExtension`
6. Implement `PropertiesExtension`
7. Implement `StylingExtension` (no-wrap, backgrounds)
8. Write unit tests for each extension

### Phase 4: Services
1. Implement `StyleManager` (dynamic `<style>` injection)
2. Implement `EventHandlerService` (using `registerEvent()`)
3. Implement `TagRecordsService`
4. Write integration tests

### Phase 5: UI
1. Implement `SettingTab` with `PluginSettingTab`
2. Implement `SettingTagTable` (data-driven table)
3. Implement `SettingExtensionSelector` (grid toggles)
4. Implement row components (color, text, toggle, slider)
5. Add input validation for wildcard syntax

### Phase 6: Commands & Polish
1. Re-implement export commands
2. Update README.md
3. Update `manifest.json` to v1.0.0
4. Update `versions.json`
5. Final test pass and coverage check

## Migration Test Fixtures

### settings-v014.json (input)
```json
{
  "TagColors": {
    "ColorPicker": [
      {
        "tag_name": "project/*",
        "color": { "r": 255, "g": 0, "b": 0 },
        "background_color": { "r": 0, "g": 0, "b": 0 },
        "luminance_offset": 0.15
      }
    ],
    "EnableMultipleTags": true,
    "EnableSeparateBackground": true,
    "EnableBackgroundOpacity": false,
    "Values": { "BackgroundOpacity": 0.45, "LuminanceOffset": 0.15 }
  },
  "CSS": { "NoteTags": true, "NoteProperties": true, "NoteBackgrounds": false, "TagsNoWrap": true, "TagsNoWrapText": "pre" },
  "FolderNote": { "Enable": false, "FolderTagLinks": [], "EnableAutoDetect": true, "EnableBackgroundOpacity": false, "Values": { "BackgroundOpacity": 0.45, "ForceImportant": true, "BorderRadius": "12px", "Padding": "5px" } },
  "Kanban": { "Enable": true, "EnableCards": false, "EnableLists": false, "HideHashtags": false, "EnableBackgroundOpacity": false, "Values": { "BackgroundOpacity": 0.45, "CardBackgroundOpacity": 0.2, "CardBorderOpacity": 0.3, "ListBackgroundOpacity": 0.2, "ListBorderOpacity": 0.3 } },
  "Canvas": { "Enable": false, "EnableBackgroundOpacity": false, "Values": { "BackgroundOpacity": 0.45, "CardBorderOpacity": 0.3, "CardBackgroundLuminanceOffset": 0.15 } },
  "Debug": { "Enable": false, "EnableExperimentalCommands": false },
  "Info": { "SettingsVersion": 14 }
}
```

### settings-v015.json (output)
```json
{
  "version": 15,
  "enabledExtensions": ["core", "kanban"],
  "tagRecords": [
    {
      "id": "uuid-generated",
      "tag_name": "project/*",
      "color": { "r": 255, "g": 0, "b": 0 },
      "background_color": { "r": 0, "g": 0, "b": 0 },
      "luminance_offset": 0.15,
      "canvas_enabled": false,
      "kanban_cards_enabled": false,
      "kanban_lists_enabled": false,
      "folder_note_path": null
    }
  ],
  "extensionSettings": {
    "core": {
      "enableMultipleTags": true,
      "enableSeparateBackground": true,
      "enableBackgroundOpacity": false,
      "backgroundOpacity": 0.45,
      "luminanceOffset": 0.15,
      "noteTags": true,
      "noteProperties": true,
      "noteBackgrounds": false,
      "tagsNoWrap": true,
      "tagsNoWrapText": "pre"
    },
    "kanban": {
      "enableCards": false,
      "enableLists": false,
      "hideHashtags": false,
      "enableBackgroundOpacity": false,
      "backgroundOpacity": 0.45,
      "cardBackgroundOpacity": 0.2,
      "cardBorderOpacity": 0.3,
      "listBackgroundOpacity": 0.2,
      "listBorderOpacity": 0.3
    },
    "canvas": {
      "enableBackgroundOpacity": false,
      "backgroundOpacity": 0.45,
      "cardBorderOpacity": 0.3,
      "cardBackgroundLuminanceOffset": 0.15
    },
    "folder-note": {
      "enable": false,
      "folderTagLinks": [],
      "enableAutoDetect": true,
      "enableBackgroundOpacity": false,
      "backgroundOpacity": 0.45,
      "forceImportant": true,
      "borderRadius": "12px",
      "padding": "5px"
    },
    "debug": {
      "enableExperimentalCommands": false
    }
  }
}
```

## Code Style

- Use `const` and `let`, never `var`
- Use `async/await`, never raw Promises
- Use `createEl()`, `createDiv()`, `createSpan()` — never `innerHTML`
- Use `registerEvent()`, `registerInterval()` for auto-cleanup
- Use `Object.assign({}, DEFAULT, await loadData())` for settings
- Use sentence case for UI text (only first word capitalized)
- One control per setting row
- Keep descriptions short (single sentence)
- Never commit `main.js` — only in GitHub releases

## Deliverables

1. All source files in `src/`
2. All test files in `tests/`
3. Updated `package.json` with Vitest scripts
4. Updated `tsconfig.json` with strict mode
5. Updated `esbuild.config.mjs` with modern config
6. Updated `manifest.json` with v1.0.0
7. Updated `versions.json`
8. Updated `styles.css` (if any static styles needed)
9. All tests passing with >80% coverage
10. Build succeeds with no TypeScript errors
