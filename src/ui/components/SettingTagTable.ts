import { Setting, TextComponent, ButtonComponent } from "obsidian";
import ColoredTagWranglerPlugin from "src/main";
import { SettingTagRecordColorComponent } from "./SettingTagRecordColorComponent";
import { SettingTagRecordTextInput } from "./SettingTagRecordTextInput";

export class SettingTagTable {
    private containerEl: HTMLElement;
    private plugin: ColoredTagWranglerPlugin;
    private tableEl: HTMLElement | null = null;

    constructor(containerEl: HTMLElement, plugin: ColoredTagWranglerPlugin) {
        this.containerEl = containerEl;
        this.plugin = plugin;
        this.render();
    }

    render(): void {
        if (this.tableEl) {
            this.tableEl.remove();
        }

        this.tableEl = this.containerEl.createDiv({ cls: "cwt-tag-table" });

        // Header
        const headerEl = this.tableEl.createDiv({ cls: "cwt-tag-table-header" });
        new Setting(headerEl)
            .setName("Tag colors")
            .setDesc("Define custom colors for tags.")
            .addButton((btn) =>
                btn
                    .setButtonText("Add new tag")
                    .setClass("mod-cta")
                    .onClick(() => {
                        this.plugin.settings.tagRecords.push({
                            id: Math.random().toString(36).substring(2, 15),
                            tag_name: "new-tag",
                            color: { r: 255, g: 255, b: 255 },
                            background_color: { r: 100, g: 100, b: 100 },
                            luminance_offset: 0.15,
                        });
                        this.plugin.saveSettings();
                        this.render();
                    })
            );

        // Table body
        const bodyEl = this.tableEl.createDiv({ cls: "cwt-tag-table-body" });

        for (const record of this.plugin.settings.tagRecords) {
            const rowEl = bodyEl.createDiv({ cls: "cwt-tag-table-row" });

            // Tag name input
            new SettingTagRecordTextInput(rowEl, record, this.plugin);

            // Color pickers
            new SettingTagRecordColorComponent(rowEl, record, this.plugin);

            // Actions
            const actionsEl = rowEl.createDiv({ cls: "cwt-tag-table-actions" });

            new ButtonComponent(actionsEl)
                .setIcon("trash")
                .setTooltip("Delete")
                .onClick(() => {
                    const index = this.plugin.settings.tagRecords.findIndex((r) => r.id === record.id);
                    if (index !== -1) {
                        this.plugin.settings.tagRecords.splice(index, 1);
                        this.plugin.saveSettings();
                        this.render();
                    }
                });
        }
    }
}
