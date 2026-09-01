import { ColorComponent } from "obsidian";
import ColoredTagWranglerPlugin from "src/main";
import { IColoredTagRecord } from "src/types/settings";
import { rgbToHex, hexToRgb } from "src/lib/color-converters";

export class SettingTagRecordColorComponent {
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
        const colorEl = this.containerEl.createDiv({ cls: "cwt-tag-color" });

        // Foreground color
        const fgLabel = colorEl.createSpan({ text: "Text:", cls: "cwt-color-label" });
        const fgPicker = new ColorComponent(colorEl)
            .setValue(rgbToHex(this.record.color))
            .onChange(async (value) => {
                this.record.color = hexToRgb(value);
                await this.plugin.saveSettings();
            });

        // Background color
        const bgLabel = colorEl.createSpan({ text: "Background:", cls: "cwt-color-label" });
        const bgPicker = new ColorComponent(colorEl)
            .setValue(rgbToHex(this.record.background_color))
            .onChange(async (value) => {
                this.record.background_color = hexToRgb(value);
                await this.plugin.saveSettings();
            });
    }
}
