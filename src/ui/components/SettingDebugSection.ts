import { Setting } from "obsidian";
import ColoredTagWranglerPlugin from "src/main";

export class SettingDebugSection {
    private containerEl: HTMLElement;
    private plugin: ColoredTagWranglerPlugin;

    constructor(containerEl: HTMLElement, plugin: ColoredTagWranglerPlugin) {
        this.containerEl = containerEl;
        this.plugin = plugin;
        this.render();
    }

    render(): void {
        const sectionEl = this.containerEl.createDiv({ cls: "cwt-debug-section" });

        new Setting(sectionEl)
            .setName("Debug")
            .setDesc("Enable debug features and experimental commands.");

        new Setting(sectionEl)
            .setName("Experimental commands")
            .setDesc("Enable experimental commands in the command palette.")
            .addToggle((toggle) =>
                toggle
                    .setValue(this.plugin.settings.extensionSettings.debug.enableExperimentalCommands)
                    .onChange(async (value) => {
                        this.plugin.settings.extensionSettings.debug.enableExperimentalCommands = value;
                        await this.plugin.saveSettings();
                        this.render();
                    })
            );

        // CSS reload button
        new Setting(sectionEl)
            .setName("Reload CSS")
            .setDesc("Force reload all injected CSS styles.")
            .addButton((btn) =>
                btn
                    .setButtonText("Reload")
                    .onClick(() => {
                        this.plugin.styleManager.updateStyles();
                    })
            );
    }
}
