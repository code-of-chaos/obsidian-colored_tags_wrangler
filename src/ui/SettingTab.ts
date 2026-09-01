import { App, PluginSettingTab, Setting } from "obsidian";
import ColoredTagWranglerPlugin from "src/main";
import { SettingTagTable } from "./components/SettingTagTable";
import { SettingExtensionSelector } from "./components/SettingExtensionSelector";

export class SettingTab extends PluginSettingTab {
    plugin: ColoredTagWranglerPlugin;

    constructor(app: App, plugin: ColoredTagWranglerPlugin) {
        super(app, plugin);
        this.plugin = plugin;
    }

    display(): void {
        const { containerEl } = this;
        containerEl.empty();

        containerEl.createEl("h2", { text: "Colored Tags Wrangler" });

        // Extension selector
        new SettingExtensionSelector(containerEl, this.plugin);

        // Tag table
        new SettingTagTable(containerEl, this.plugin);
    }
}
