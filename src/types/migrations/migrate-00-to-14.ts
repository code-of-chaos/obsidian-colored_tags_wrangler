// Simplified migration types - each version is Record<string, unknown>
// for flexibility during migration chain

export function generateId(): string {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

// v0 -> v1: Convert flat Record<string, RGB> to UUID-keyed records
export function migrate00to01(data: Record<string, unknown>): Record<string, unknown> {
    const tagColors = data["TagColors"] as Record<string, unknown> | undefined;
    if (!tagColors) return data;

    const oldPicker = tagColors["ColorPicker"] as Record<string, { r: number; g: number; b: number }> | undefined;
    if (!oldPicker || typeof oldPicker !== "object" || Array.isArray(oldPicker)) return data;

    const newPicker: Record<string, { tag_name: string; color: { r: number; g: number; b: number } }> = {};
    for (const [tagName, color] of Object.entries(oldPicker)) {
        const id = generateId();
        newPicker[id] = { tag_name: tagName, color };
    }

    tagColors["ColorPicker"] = newPicker;
    data["Info"] = { SettingsVersion: 1 };
    return data;
}

// v1 -> v2: Convert SemanticObsidianColors and CssVars to UUID-keyed records
export function migrate01to02(data: Record<string, unknown>): Record<string, unknown> {
    const tagColors = data["TagColors"] as Record<string, unknown> | undefined;
    if (!tagColors) return data;

    const semantic = tagColors["SemanticObsidianColors"] as Record<string, string> | undefined;
    if (semantic && typeof semantic === "object" && !Array.isArray(semantic)) {
        const newSemantic: Record<string, { tag_name: string; obsidian_css_var: string }> = {};
        for (const [tagName, cssVar] of Object.entries(semantic)) {
            newSemantic[generateId()] = { tag_name: tagName, obsidian_css_var: cssVar };
        }
        tagColors["SemanticObsidianColors"] = newSemantic;
    }

    const cssVars = tagColors["CssVars"] as Record<string, { color: unknown; background: unknown }> | undefined;
    if (cssVars && typeof cssVars === "object" && !Array.isArray(cssVars)) {
        const newCssVars: Record<string, { tag_name: string; color: unknown; background: unknown }> = {};
        for (const [tagName, vars] of Object.entries(cssVars)) {
            newCssVars[generateId()] = { tag_name: tagName, color: vars.color, background: vars.background };
        }
        tagColors["CssVars"] = newCssVars;
    }

    data["Info"] = { SettingsVersion: 2 };
    return data;
}

// v2 -> v3: No-op, just bump version
export function migrate02to03(data: Record<string, unknown>): Record<string, unknown> {
    data["Info"] = { SettingsVersion: 3 };
    return data;
}

// v3 -> v4: Restructure TagColors, add FolderNote.Values defaults
export function migrate03to04(data: Record<string, unknown>): Record<string, unknown> {
    const tagColors = data["TagColors"] as Record<string, unknown> | undefined;
    if (tagColors) {
        delete tagColors["SemanticObsidianColors"];
        delete tagColors["CssVars"];
    }

    const folderNote = data["FolderNote"] as Record<string, unknown> | undefined;
    if (folderNote) {
        folderNote["Values"] = {
            ForceImportant: true,
            BorderRadius: "12px",
            Padding: "5px",
        };
    }

    data["Info"] = { SettingsVersion: 4 };
    return data;
}

// v4 -> v5: Add background_color and background_opacity to ColorPicker entries
export function migrate04to05(data: Record<string, unknown>): Record<string, unknown> {
    const tagColors = data["TagColors"] as Record<string, unknown> | undefined;
    if (!tagColors) return data;

    const picker = tagColors["ColorPicker"] as Record<string, Record<string, unknown>> | undefined;
    if (!picker || typeof picker !== "object" || Array.isArray(picker)) return data;

    for (const [, entry] of Object.entries(picker)) {
        if (entry && typeof entry === "object") {
            entry["background_color"] = entry["color"];
            entry["background_opacity"] = 0.2;
        }
    }

    data["Info"] = { SettingsVersion: 5 };
    return data;
}

// v5 -> v6: Bug fix - copy Kanban.Enable to Kanban.HideHashtags
export function migrate05to06(data: Record<string, unknown>): Record<string, unknown> {
    const kanban = data["Kanban"] as Record<string, unknown> | undefined;
    if (kanban) {
        kanban["HideHashtags"] = kanban["Enable"];
    }

    data["Info"] = { SettingsVersion: 6 };
    return data;
}

// v6 -> v7: Add luminance settings, fix background colors
export function migrate06to07(data: Record<string, unknown>): Record<string, unknown> {
    const tagColors = data["TagColors"] as Record<string, unknown> | undefined;
    if (tagColors) {
        tagColors["LuminanceOffset"] = 0.15;
        tagColors["EnableSeparateLuminanceOffset"] = false;
        tagColors["EnableDarkLightDifference"] = true;
        tagColors["EnableBackgroundOpacity"] = false;
        tagColors["BackgroundOpacity"] = 0.2;
    }

    const picker = tagColors?.["ColorPicker"] as Record<string, Record<string, unknown>> | undefined;
    if (picker && typeof picker === "object" && !Array.isArray(picker)) {
        for (const [, entry] of Object.entries(picker)) {
            if (entry && typeof entry === "object") {
                // Replace background_opacity with luminance_offset
                entry["luminance_offset"] = 0.15;
                delete entry["background_opacity"];

                // Fix bug where background_color === color
                const bg = entry["background_color"] as { r: number; g: number; b: number } | undefined;
                const fg = entry["color"] as { r: number; g: number; b: number } | undefined;
                if (bg && fg && bg.r === fg.r && bg.g === fg.g && bg.b === fg.b) {
                    // Simple fix: darken the background
                    entry["background_color"] = {
                        r: Math.max(0, fg.r - 50),
                        g: Math.max(0, fg.g - 50),
                        b: Math.max(0, fg.b - 50),
                    };
                }
            }
        }
    }

    data["Info"] = { SettingsVersion: 7 };
    return data;
}

// v7 -> v8: Add FolderNote.EnableAutoDetect
export function migrate07to08(data: Record<string, unknown>): Record<string, unknown> {
    const folderNote = data["FolderNote"] as Record<string, unknown> | undefined;
    if (folderNote) {
        folderNote["EnableAutoDetect"] = true;
    }

    data["Info"] = { SettingsVersion: 8 };
    return data;
}

// v8 -> v9: Add CSS section
export function migrate08to09(data: Record<string, unknown>): Record<string, unknown> {
    data["CSS"] = {
        Enable: false,
        TagsNoWrap: false,
        TagsNoWrapText: "pre",
    };

    data["Info"] = { SettingsVersion: 9 };
    return data;
}

// v9 -> v10: Add granular CSS toggles, remove CSS.Enable
export function migrate09to10(data: Record<string, unknown>): Record<string, unknown> {
    const css = data["CSS"] as Record<string, unknown> | undefined;
    if (css) {
        delete css["Enable"];
        css["NoteTags"] = true;
        css["NoteBackgrounds"] = false;
        css["NoteProperties"] = true;
    }

    data["Info"] = { SettingsVersion: 10 };
    return data;
}

// v10 -> v11: Convert ColorPicker from Record to Array, add Debug settings
export function migrate10to11(data: Record<string, unknown>): Record<string, unknown> {
    const tagColors = data["TagColors"] as Record<string, unknown> | undefined;
    if (tagColors) {
        const picker = tagColors["ColorPicker"];
        if (picker && typeof picker === "object" && !Array.isArray(picker)) {
            tagColors["ColorPicker"] = Object.values(picker);
        }
    }

    data["Debug"] = {
        Enable: false,
        EnableExperimentalCommands: false,
    };

    data["Info"] = { SettingsVersion: 11 };
    return data;
}

// v11 -> v12: Convert FolderTagLinks from Record to Array
export function migrate11to12(data: Record<string, unknown>): Record<string, unknown> {
    const folderNote = data["FolderNote"] as Record<string, unknown> | undefined;
    if (folderNote) {
        const links = folderNote["FolderTagLinks"];
        if (links && typeof links === "object" && !Array.isArray(links)) {
            folderNote["FolderTagLinks"] = Object.values(links);
        }
    }

    data["Info"] = { SettingsVersion: 12 };
    return data;
}

// v12 -> v13: Propagate background opacity settings to FolderNote, Kanban, Canvas
export function migrate12to13(data: Record<string, unknown>): Record<string, unknown> {
    const tagColors = data["TagColors"] as Record<string, unknown> | undefined;
    const enableBgOpacity = tagColors?.["EnableBackgroundOpacity"] ?? false;
    const bgOpacity = tagColors?.["BackgroundOpacity"] ?? 0.2;

    const folderNote = data["FolderNote"] as Record<string, unknown> | undefined;
    if (folderNote) {
        folderNote["EnableBackgroundOpacity"] = enableBgOpacity;
        const values = folderNote["Values"] as Record<string, unknown> | undefined;
        if (values) {
            values["BackgroundOpacity"] = bgOpacity;
        }
    }

    const kanban = data["Kanban"] as Record<string, unknown> | undefined;
    if (kanban) {
        kanban["EnableBackgroundOpacity"] = enableBgOpacity;
        const values = kanban["Values"] as Record<string, unknown> | undefined;
        if (values) {
            values["BackgroundOpacity"] = bgOpacity;
        }
    }

    const canvas = data["Canvas"] as Record<string, unknown> | undefined;
    if (canvas) {
        canvas["EnableBackgroundOpacity"] = enableBgOpacity;
        const values = canvas["Values"] as Record<string, unknown> | undefined;
        if (values) {
            values["BackgroundOpacity"] = bgOpacity;
        }
    }

    data["Info"] = { SettingsVersion: 13 };
    return data;
}

// v13 -> v14: No-op, just bump version
export function migrate13to14(data: Record<string, unknown>): Record<string, unknown> {
    data["Info"] = { SettingsVersion: 14 };
    return data;
}

// All migrations in order
export const migrations: Array<(data: Record<string, unknown>) => Record<string, unknown>> = [
    migrate00to01,
    migrate01to02,
    migrate02to03,
    migrate03to04,
    migrate04to05,
    migrate05to06,
    migrate06to07,
    migrate07to08,
    migrate08to09,
    migrate09to10,
    migrate10to11,
    migrate11to12,
    migrate12to13,
    migrate13to14,
];
