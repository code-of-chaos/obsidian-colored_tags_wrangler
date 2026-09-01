import { TextComponent } from "obsidian";
import ColoredTagWranglerPlugin from "src/main";
import { IColoredTagRecord } from "src/types/settings";

export class SettingTagRecordTextInput {
    private containerEl: HTMLElement;
    private record: IColoredTagRecord;
    private plugin: ColoredTagWranglerPlugin;

    constructor(containerEl: HTMLElement, record: IColoredTagRecord, plugin: ColoredTagWranglerPlugin) {
        this.containerEl = containerEl;
        this.record = record;
        this.plugin = plugin;
        this.render();
    }

    render(): void {
        const inputEl = this.containerEl.createDiv({ cls: "cwt-tag-input" });

        new TextComponent(inputEl)
            .setPlaceholder("tag-name")
            .setValue(this.record.tag_name)
            .onChange(async (value) => {
                const trimmed = value.trim();
                // Validate wildcard syntax
                const wildcardIndex = trimmed.indexOf("/*");
                if (wildcardIndex !== -1) {
                    if (wildcardIndex !== trimmed.length - 2) {
                        this.record.tag_name = trimmed.replace(/\/\*/g, "");
                    } else if (wildcardIndex === 0) {
                        this.record.tag_name = trimmed.slice(2);
                    } else {
                        this.record.tag_name = trimmed;
                    }
                } else {
                    this.record.tag_name = trimmed;
                }
                await this.plugin.saveSettings();
            });
    }
}
