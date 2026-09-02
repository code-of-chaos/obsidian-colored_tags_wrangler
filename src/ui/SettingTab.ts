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
        if (key.startsWith("ext:")) {
            const extName = key.slice(4);
            return this.plugin.settings.enabledExtensions.includes(extName);
        }
        if (key === "debug.enableExperimentalCommands") {
            return this.plugin.settings.extensionSettings.debug.enableExperimentalCommands;
        }
        return undefined;
    }

    setControlValue(key: string, value: unknown): void | Promise<void> {
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
        if (key === "debug.enableExperimentalCommands") {
            this.plugin.settings.extensionSettings.debug.enableExperimentalCommands = value as boolean;
            return this.plugin.saveSettings();
        }
    }
}
