// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {App, PluginSettingTab, RGB, Setting} from "obsidian";
import MyPlugin from "./main";
import {hexToRGB}
    from "./lib";


// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export class SettingsTab extends PluginSettingTab {
	plugin: MyPlugin;

	constructor(app: App, plugin: MyPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

    // -----------------------------------------------------------------------------------------------------------------
	display(): void {
		const {containerEl} = this;
		containerEl.empty();

		const settings = new Setting(containerEl)
			// .setDesc("Define custom colors for tags")
            .addButton((button) =>
                button
                    .setButtonText('DEBUG PRINT AS WARN')
                    .onClick(() => {console.warn(this.plugin.settings.customTagColors)})
            );

		// Create the amount of tags already stored in the settings
        for (const tagName in this.plugin.settings.customTagColors) {
            if (this.plugin.settings.customTagColors.hasOwnProperty(tagName)) {
                this.createTagColorSetting(settings, tagName, this.plugin.settings.customTagColors[tagName]);
            }
        }

        const addTagButton = this.createAddTagButton();
        settings.settingEl.appendChild(addTagButton);
	}

	// -----------------------------------------------------------------------------------------------------------------
    createTagColorSetting(settings: Setting, tagName: string, color: RGB) {
        const setting = new Setting(settings.settingEl);
        setting.addText((text) =>
            text
                .setPlaceholder('Tag name')
                .setValue(tagName)
                .onChange((value) => {
                    // Handle user-defined tag colors here
                    this.plugin.settings.customTagColors[value] = color;
                    this.plugin.saveSettings();
                })
        ).addColorPicker((colorPicker) =>
            colorPicker
                .setValueRgb(color)
                .onChange((value) => {
                    // value is a HEX string, erg -> needs to be decoded
                    this.plugin.settings.customTagColors[tagName] = hexToRGB(value);
                    this.plugin.saveSettings();
                })

        ).addButton((button) =>
            button
                .setButtonText('Remove')
                .onClick(() => {
                    // Remove the tag and color
                    delete this.plugin.settings.customTagColors[tagName];
                    this.plugin.saveSettings();
                    this.display();
                })
        );

        // Add a line break after each setting
        settings.settingEl.appendChild(document.createElement('br'));

    }

    // -----------------------------------------------------------------------------------------------------------------
    createAddTagButton() {
        const addTagButton = document.createElement('button');
        addTagButton.textContent = 'Add Tag';
        addTagButton.addEventListener('click', () => {
            this.plugin.settings.customTagColors['New Tag'] = { r: 0, g: 0, b: 0 }; // Default color
            this.plugin.saveSettings();
            this.display();
        });
        return addTagButton;
    }

}
