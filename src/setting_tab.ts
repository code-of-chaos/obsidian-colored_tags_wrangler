// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {App, PluginSettingTab, RGB, Setting}
    from "obsidian";
import {hexToRgb,rgbToHex}
    from "./lib";
import ColoredTagWranglerPlugin
    from "./main";
// ---------------------------------------------------------------------------------------------------------------------
// Support Code
// ---------------------------------------------------------------------------------------------------------------------
const NEW_TAG_NAME:string = "New Tag";
const NEW_DEFAULT_COLOR:RGB = { r: 0, g: 0, b: 0 };

// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export class SettingTab extends PluginSettingTab {
	plugin: ColoredTagWranglerPlugin;

    // -----------------------------------------------------------------------------------------------------------------
    // Constructor
    // -----------------------------------------------------------------------------------------------------------------
    constructor(plugin: ColoredTagWranglerPlugin) {
		super(plugin.app, plugin);
		this.plugin = plugin;
	}

    // -----------------------------------------------------------------------------------------------------------------
    // Methods
    // -----------------------------------------------------------------------------------------------------------------
	async display() {
        // Refresh the Element container
		const {containerEl} = this;
		containerEl.empty();

		const settings = new Setting(containerEl)
			.setDesc("Define custom colors for tags")
            .addButton((button) =>
                button
                    .setButtonText('DEBUG PRINT AS WARN')
                    .onClick(() => {console.warn(this.plugin.settings.customTagColors)})
            ).addButton((button) =>
                button
                    .setButtonText('DELETE ALL')
                    .onClick(async () => {
                        Object.keys(this.plugin.settings.customTagColors)
                            .forEach((key_name) => delete this.plugin.settings.customTagColors[key_name]);
                        await Promise.all([
                            this.plugin.saveSettings(),
                            this.display()
                        ]);
                    })
            );

		// Create the amount of tags already stored in the settings
        for (const tagName in this.plugin.settings.customTagColors) {
            if (this.plugin.settings.customTagColors.hasOwnProperty(tagName)) {
                this.createTagColorSetting(tagName, this.plugin.settings.customTagColors[tagName]);
            }
        }

        containerEl.appendChild(document.createElement('br'));
        settings.settingEl.appendChild(await this.createAddTagButton());
	}

	// -----------------------------------------------------------------------------------------------------------------
    createTagColorSetting(tagName: string, color: RGB) {
        let {containerEl} = this;
        let new_tag_name = tagName; // Initialize newTagName with the existing tag name
        let new_color = color; // Initialize newColor with the existing color

        const new_setting = new Setting(containerEl)
            .addText((text) =>
                text
                    .setPlaceholder(NEW_TAG_NAME)
                    .setValue(tagName)
                    .onChange((value) => {
                        // Handle user-defined tag name changes here
                        new_tag_name = value; // Update newTagName as the user changes the tag name
                    })
            ).addColorPicker((colorPicker) =>
                colorPicker
                    .setValueRgb(color)
                    .onChange((value) => {
                        // Handle user-defined tag colors here
                        new_color = hexToRgb(value); // Update newColor as the user changes the color
                    })
            ).addButton((button) =>
                button
                    .setButtonText('Save')
                    .onClick(async () => {
                        // Clear out the old one
                        delete this.plugin.settings.customTagColors[tagName];

                        // Add the updated tag and color
                        this.plugin.settings.customTagColors[new_tag_name] = new_color;

                        // Save the updated settings
                        await Promise.all([
                            this.plugin.saveSettings(),
                            this.display()
                        ]);
                    })
            ).addButton((button) =>
                button
                    .setButtonText('Remove')
                    .onClick(async () => {
                        // Remove the tag and color
                        delete this.plugin.settings.customTagColors[tagName];
                        await Promise.all([
                            this.plugin.saveSettings(),
                            this.display()
                        ]);
                    })
            );

        // Add a line break after each setting
        containerEl.appendChild(new_setting.settingEl);
        containerEl.appendChild(document.createElement('br'));
    }

    // -----------------------------------------------------------------------------------------------------------------
    async createAddTagButton() {
        const addTagButton = document.createElement('button');
        addTagButton.textContent = 'Add Tag';
        addTagButton.addEventListener('click', async () => {
            this.plugin.settings.customTagColors[NEW_TAG_NAME] = NEW_DEFAULT_COLOR; // Default color
            await Promise.all([
                this.plugin.saveSettings(),
                this.display()
            ]);
        });
        return addTagButton;
    }

}
