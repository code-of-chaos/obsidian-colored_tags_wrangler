import { App, PluginSettingTab, Setting, SettingDefinitionItem, ColorComponent, TextComponent } from "obsidian";
import ColoredTagWranglerPlugin from "src/main";
import { IColoredTagRecord } from "src/types/settings";
import { rgbToHex, hexToRgb } from "src/lib/color-converters";
import { arrayMove } from "src/lib/array-utils";

const EXTENSIONS = [
    { name: "core", label: "Core", description: "Basic tag coloring" },
    { name: "canvas", label: "Canvas", description: "Canvas node coloring" },
    { name: "kanban", label: "Kanban", description: "Kanban card/list coloring" },
    { name: "folder-note", label: "Folder note", description: "Folder note coloring" },
    { name: "properties", label: "Properties", description: "Property tag coloring" },
    { name: "styling", label: "Styling", description: "Tag no-wrap styling" },
];

export class SettingTab extends PluginSettingTab {
    plugin: ColoredTagWranglerPlugin;

    constructor(app: App, plugin: ColoredTagWranglerPlugin) {
        super(app, plugin);
        this.plugin = plugin;
    }

    getSettingDefinitions(): SettingDefinitionItem[] {
        return [
            {
                type: "group",
                heading: "Extensions",
                items: EXTENSIONS.map((ext) => ({
                    name: ext.label,
                    desc: ext.description,
                    control: {
                        type: "toggle" as const,
                        key: `ext:${ext.name}`,
                        disabled: ext.name === "core",
                    },
                })),
            },
            {
                type: "group",
                heading: "Core settings",
                visible: () => this.plugin.settings.enabledExtensions.includes("core"),
                items: [
                    {
                        name: "Enable multiple tags",
                        desc: "Allow multiple tags per entry (separated by semicolons or newlines).",
                        control: {
                            type: "toggle",
                            key: "core.enableMultipleTags",
                        },
                    },
                    {
                        name: "Enable separate background",
                        desc: "Use separate background color for tags.",
                        control: {
                            type: "toggle",
                            key: "core.enableSeparateBackground",
                        },
                    },
                    {
                        name: "Enable background opacity",
                        desc: "Apply opacity to tag backgrounds.",
                        control: {
                            type: "toggle",
                            key: "core.enableBackgroundOpacity",
                        },
                    },
                    {
                        name: "Background opacity",
                        desc: "Opacity value for tag backgrounds (0-1).",
                        control: {
                            type: "slider",
                            key: "core.backgroundOpacity",
                            min: 0,
                            max: 1,
                            step: 0.05,
                        },
                    },
                    {
                        name: "Luminance offset",
                        desc: "Adjust text color brightness based on background.",
                        control: {
                            type: "slider",
                            key: "core.luminanceOffset",
                            min: 0,
                            max: 1,
                            step: 0.05,
                        },
                    },
                    {
                        name: "Note tags",
                        desc: "Color tags in note content.",
                        control: {
                            type: "toggle",
                            key: "core.noteTags",
                        },
                    },
                    {
                        name: "Note properties",
                        desc: "Color tags in note properties panel.",
                        control: {
                            type: "toggle",
                            key: "core.noteProperties",
                        },
                    },
                    {
                        name: "Note backgrounds",
                        desc: "Set page background based on tag.",
                        control: {
                            type: "toggle",
                            key: "core.noteBackgrounds",
                        },
                    },
                    {
                        name: "Tags no-wrap",
                        desc: "Prevent tags from wrapping to multiple lines.",
                        control: {
                            type: "toggle",
                            key: "core.tagsNoWrap",
                        },
                    },
                ],
            },
            {
                type: "group",
                heading: "Canvas settings",
                visible: () => this.plugin.settings.enabledExtensions.includes("canvas"),
                items: [
                    {
                        name: "Enable background opacity",
                        desc: "Apply opacity to canvas node backgrounds.",
                        control: {
                            type: "toggle",
                            key: "canvas.enableBackgroundOpacity",
                        },
                    },
                    {
                        name: "Background opacity",
                        desc: "Opacity value for canvas node backgrounds (0-1).",
                        control: {
                            type: "slider",
                            key: "canvas.backgroundOpacity",
                            min: 0,
                            max: 1,
                            step: 0.05,
                        },
                    },
                    {
                        name: "Card border opacity",
                        desc: "Opacity for canvas card borders (0-1).",
                        control: {
                            type: "slider",
                            key: "canvas.cardBorderOpacity",
                            min: 0,
                            max: 1,
                            step: 0.05,
                        },
                    },
                    {
                        name: "Card background luminance offset",
                        desc: "Adjust canvas card text brightness.",
                        control: {
                            type: "slider",
                            key: "canvas.cardBackgroundLuminanceOffset",
                            min: 0,
                            max: 1,
                            step: 0.05,
                        },
                    },
                ],
            },
            {
                type: "group",
                heading: "Kanban settings",
                visible: () => this.plugin.settings.enabledExtensions.includes("kanban"),
                items: [
                    {
                        name: "Enable cards",
                        desc: "Color kanban cards.",
                        control: {
                            type: "toggle",
                            key: "kanban.enableCards",
                        },
                    },
                    {
                        name: "Enable lists",
                        desc: "Color kanban list backgrounds.",
                        control: {
                            type: "toggle",
                            key: "kanban.enableLists",
                        },
                    },
                    {
                        name: "Hide hashtags",
                        desc: "Hide hashtags in kanban cards.",
                        control: {
                            type: "toggle",
                            key: "kanban.hideHashtags",
                        },
                    },
                    {
                        name: "Enable background opacity",
                        desc: "Apply opacity to kanban backgrounds.",
                        control: {
                            type: "toggle",
                            key: "kanban.enableBackgroundOpacity",
                        },
                    },
                    {
                        name: "Background opacity",
                        desc: "Opacity value for kanban backgrounds (0-1).",
                        control: {
                            type: "slider",
                            key: "kanban.backgroundOpacity",
                            min: 0,
                            max: 1,
                            step: 0.05,
                        },
                    },
                    {
                        name: "Card background opacity",
                        desc: "Opacity for kanban card backgrounds (0-1).",
                        control: {
                            type: "slider",
                            key: "kanban.cardBackgroundOpacity",
                            min: 0,
                            max: 1,
                            step: 0.05,
                        },
                    },
                    {
                        name: "Card border opacity",
                        desc: "Opacity for kanban card borders (0-1).",
                        control: {
                            type: "slider",
                            key: "kanban.cardBorderOpacity",
                            min: 0,
                            max: 1,
                            step: 0.05,
                        },
                    },
                    {
                        name: "List background opacity",
                        desc: "Opacity for kanban list backgrounds (0-1).",
                        control: {
                            type: "slider",
                            key: "kanban.listBackgroundOpacity",
                            min: 0,
                            max: 1,
                            step: 0.05,
                        },
                    },
                    {
                        name: "List border opacity",
                        desc: "Opacity for kanban list borders (0-1).",
                        control: {
                            type: "slider",
                            key: "kanban.listBorderOpacity",
                            min: 0,
                            max: 1,
                            step: 0.05,
                        },
                    },
                ],
            },
            {
                type: "group",
                heading: "Folder note settings",
                visible: () => this.plugin.settings.enabledExtensions.includes("folder-note"),
                items: [
                    {
                        name: "Enable folder notes",
                        desc: "Color folder titles in the file explorer.",
                        control: {
                            type: "toggle",
                            key: "folder-note.enable",
                        },
                    },
                    {
                        name: "Auto-detect folder notes",
                        desc: "Automatically detect folder notes from frontmatter.",
                        control: {
                            type: "toggle",
                            key: "folder-note.enableAutoDetect",
                        },
                    },
                    {
                        name: "Enable background opacity",
                        desc: "Apply opacity to folder note backgrounds.",
                        control: {
                            type: "toggle",
                            key: "folder-note.enableBackgroundOpacity",
                        },
                    },
                    {
                        name: "Background opacity",
                        desc: "Opacity value for folder note backgrounds (0-1).",
                        control: {
                            type: "slider",
                            key: "folder-note.backgroundOpacity",
                            min: 0,
                            max: 1,
                            step: 0.05,
                        },
                    },
                    {
                        name: "Force important",
                        desc: "Use !important for folder note styles.",
                        control: {
                            type: "toggle",
                            key: "folder-note.forceImportant",
                        },
                    },
                    {
                        name: "Border radius",
                        desc: "Border radius for folder note elements.",
                        control: {
                            type: "text",
                            key: "folder-note.borderRadius",
                            placeholder: "12px",
                        },
                    },
                    {
                        name: "Padding",
                        desc: "Padding for folder note elements.",
                        control: {
                            type: "text",
                            key: "folder-note.padding",
                            placeholder: "5px",
                        },
                    },
                ],
            },
            {
                type: "list",
                heading: "Tag colors",
                emptyState: "No tag colors defined. Click + to add one.",
                items: this.plugin.settings.tagRecords.map((record, index) => ({
                    name: record.tag_name || "Unnamed tag",
                    desc: `Text: ${rgbToHex(record.color)} | Background: ${rgbToHex(record.background_color)}`,
                    render: (setting: Setting) => {
                        this.renderTagRecord(setting, record, index);
                    },
                })),
                addItem: {
                    name: "Add tag color",
                    action: () => {
                        this.plugin.settings.tagRecords.push({
                            id: Math.random().toString(36).substring(2, 15),
                            tag_name: "new-tag",
                            color: { r: 255, g: 255, b: 255 },
                            background_color: { r: 100, g: 100, b: 100 },
                            luminance_offset: 0.15,
                        });
                        void this.plugin.saveSettings();
                        this.update();
                    },
                },
                onDelete: (index: number) => {
                    this.plugin.settings.tagRecords.splice(index, 1);
                    void this.plugin.saveSettings();
                    this.update();
                },
                onReorder: (oldIndex: number, newIndex: number) => {
                    arrayMove(this.plugin.settings.tagRecords, oldIndex, newIndex);
                    void this.plugin.saveSettings();
                    this.update();
                },
            },
            {
                type: "group",
                heading: "Debug",
                items: [
                    {
                        name: "Experimental commands",
                        desc: "Enable experimental commands in the command palette.",
                        control: {
                            type: "toggle",
                            key: "debug.enableExperimentalCommands",
                        },
                    },
                    {
                        name: "Reload CSS",
                        desc: "Force reload all injected CSS styles.",
                        action: () => {
                            this.plugin.styleManager.updateStyles();
                        },
                    },
                ],
            },
        ];
    }

    private renderTagRecord(setting: Setting, record: IColoredTagRecord, index: number): void {
        const { settingEl } = setting;
        settingEl.empty();

        const rowEl = settingEl.createDiv({ cls: "cwt-tag-record-row" });

        // Tag name input
        const inputEl = rowEl.createDiv({ cls: "cwt-tag-input" });
        new TextComponent(inputEl)
            .setPlaceholder("Tag name")
            .setValue(record.tag_name)
            .onChange(async (value) => {
                const trimmed = value.trim();
                const wildcardIndex = trimmed.indexOf("/*");
                if (wildcardIndex !== -1) {
                    if (wildcardIndex !== trimmed.length - 2) {
                        record.tag_name = trimmed.replace(/\/\*/g, "");
                    } else if (wildcardIndex === 0) {
                        record.tag_name = trimmed.slice(2);
                    } else {
                        record.tag_name = trimmed;
                    }
                } else {
                    record.tag_name = trimmed;
                }
                await this.plugin.saveSettings();
                this.update();
            });

        // Color pickers
        const colorEl = rowEl.createDiv({ cls: "cwt-tag-color" });

        // Foreground color
        colorEl.createSpan({ text: "Text:", cls: "cwt-color-label" });
        new ColorComponent(colorEl)
            .setValue(rgbToHex(record.color))
            .onChange(async (value) => {
                record.color = hexToRgb(value);
                await this.plugin.saveSettings();
                this.update();
            });

        // Background color
        colorEl.createSpan({ text: "Background:", cls: "cwt-color-label" });
        new ColorComponent(colorEl)
            .setValue(rgbToHex(record.background_color))
            .onChange(async (value) => {
                record.background_color = hexToRgb(value);
                await this.plugin.saveSettings();
                this.update();
            });
    }

    getControlValue(key: string): unknown {
        // Extension toggles
        if (key.startsWith("ext:")) {
            const extName = key.slice(4);
            return this.plugin.settings.enabledExtensions.includes(extName);
        }

        // Parse nested key: "section.setting"
        const parts = key.split(".");
        if (parts.length === 2) {
            const [section, setting] = parts as [string, string];
            const extSettings = this.plugin.settings.extensionSettings;
            if (section === "core" && setting in extSettings.core) {
                return (extSettings.core as unknown as Record<string, unknown>)[setting];
            }
            if (section === "canvas" && setting in extSettings.canvas) {
                return (extSettings.canvas as unknown as Record<string, unknown>)[setting];
            }
            if (section === "kanban" && setting in extSettings.kanban) {
                return (extSettings.kanban as unknown as Record<string, unknown>)[setting];
            }
            if (section === "folder-note" && setting in extSettings["folder-note"]) {
                return (extSettings["folder-note"] as unknown as Record<string, unknown>)[setting];
            }
            if (section === "debug" && setting in extSettings.debug) {
                return (extSettings.debug as unknown as Record<string, unknown>)[setting];
            }
        }

        return undefined;
    }

    setControlValue(key: string, value: unknown): void | Promise<void> {
        // Extension toggles
        if (key.startsWith("ext:")) {
            const extName = key.slice(4);
            if (value) {
                if (!this.plugin.settings.enabledExtensions.includes(extName)) {
                    this.plugin.settings.enabledExtensions.push(extName);
                }
            } else {
                const index = this.plugin.settings.enabledExtensions.indexOf(extName);
                if (index !== -1) {
                    this.plugin.settings.enabledExtensions.splice(index, 1);
                }
            }
            return this.plugin.saveSettings();
        }

        // Parse nested key: "section.setting"
        const parts = key.split(".");
        if (parts.length === 2) {
            const [section, setting] = parts as [string, string];
            const extSettings = this.plugin.settings.extensionSettings;
            if (section === "core") {
                (extSettings.core as unknown as Record<string, unknown>)[setting] = value;
                return this.plugin.saveSettings();
            }
            if (section === "canvas") {
                (extSettings.canvas as unknown as Record<string, unknown>)[setting] = value;
                return this.plugin.saveSettings();
            }
            if (section === "kanban") {
                (extSettings.kanban as unknown as Record<string, unknown>)[setting] = value;
                return this.plugin.saveSettings();
            }
            if (section === "folder-note") {
                (extSettings["folder-note"] as unknown as Record<string, unknown>)[setting] = value;
                return this.plugin.saveSettings();
            }
            if (section === "debug") {
                (extSettings.debug as unknown as Record<string, unknown>)[setting] = value;
                return this.plugin.saveSettings();
            }
        }
    }
}
