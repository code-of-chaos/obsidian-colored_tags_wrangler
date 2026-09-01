import { Setting } from "obsidian";
import ColoredTagWranglerPlugin from "src/main";

const EXTENSIONS = [
    { name: "core", label: "Core", description: "Basic tag coloring" },
    { name: "canvas", label: "Canvas", description: "Canvas node coloring" },
    { name: "kanban", label: "Kanban", description: "Kanban card/list coloring" },
    { name: "folder-note", label: "Folder Note", description: "Folder note coloring" },
    { name: "properties", label: "Properties", description: "Property tag coloring" },
    { name: "styling", label: "Styling", description: "Tag no-wrap styling" },
];

export class SettingExtensionSelector {
    private containerEl: HTMLElement;
    private plugin: ColoredTagWranglerPlugin;

    constructor(containerEl: HTMLElement, plugin: ColoredTagWranglerPlugin) {
        this.containerEl = containerEl;
        this.plugin = plugin;
        this.render();
    }

    render(): void {
        const gridEl = this.containerEl.createDiv({ cls: "cwt-extension-grid" });

        for (const ext of EXTENSIONS) {
            const isEnabled = this.plugin.settings.enabledExtensions.includes(ext.name);
            const isCore = ext.name === "core";

            new Setting(gridEl)
                .setName(ext.label)
                .setDesc(ext.description)
                .addToggle((toggle) =>
                    toggle
                        .setValue(isEnabled)
                        .setDisabled(isCore)
                        .onChange(async (value) => {
                            if (value) {
                                if (!this.plugin.settings.enabledExtensions.includes(ext.name)) {
                                    this.plugin.settings.enabledExtensions.push(ext.name);
                                }
                            } else {
                                const index = this.plugin.settings.enabledExtensions.indexOf(ext.name);
                                if (index !== -1) {
                                    this.plugin.settings.enabledExtensions.splice(index, 1);
                                }
                            }
                            await this.plugin.saveSettings();
                        })
                );
        }
    }
}
