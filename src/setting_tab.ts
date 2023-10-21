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
    settings_CCT:Setting;
    settings_Delete:Setting;
    settings_Kanban:Setting;

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

        // --- CUSTOM COLOR TAGS ---
		this.settings_CCT = new Setting(containerEl)
            .setName("Custom Color Tags")
			.setDesc("Define custom colors for tags")
            .addButton((button) =>
                button
                    .setButtonText("Add New Tag")
                    .onClick(async () => {
                        this.plugin.settings.customTagColors[NEW_TAG_NAME] = NEW_DEFAULT_COLOR; // Default color
                        await Promise.all([
                            this.plugin.saveSettings(),
                            this.display()
                        ]);
                    })
                    .setClass("mod-cta")
            );

		// Create the amount of tags already stored in the settings
        for (const tagName in this.plugin.settings.customTagColors) {
            if (!this.plugin.settings.customTagColors.hasOwnProperty(tagName)) {
                continue;
            }
            this._createTagColorSetting(tagName, this.plugin.settings.customTagColors[tagName]);
        }

        // --- DELETE TAGS ---
        this.settings_Delete = new Setting(containerEl)
            .setName("Clear All Tag Colors")
            .setDesc("Removes the colors tied to tags. Does not delete the tags in your notes")
            .addButton((button) =>
                button
                    .setButtonText('Clear')
                    .onClick(async () => {
                        console.error("FFFFFFFFFFFFFFF")
                        Object.keys(this.plugin.settings.customTagColors)
                            .forEach((key_name) => delete this.plugin.settings.customTagColors[key_name]);
                        await Promise.all([
                            this.plugin.saveSettings(),
                            this.display()
                        ]);
                    }
                    )
                    .setClass('mod-warning')
                    .setDisabled(Object.keys(this.plugin.settings.customTagColors).length == 0)
            );

        // --- KANBAN ADDITION ---
        this.settings_Kanban = new Setting(containerEl)
            .setName("Omit '#' in Kanban plugin ")
            .setDesc("Hides the # from the kanban view. Mind you, they still have to be typed out")
            .addToggle(component => {
                     component
                        .setValue(this.plugin.settings.enableKanban)
                        .onChange(async state => {
                            state
                                ? this.plugin.styler.applyKanbanStyles()
                                : this.plugin.styler.removeKanbanStyles()
                            this.plugin.settings.enableKanban = state;
                            await this.plugin.saveSettings();
                        })
                }
            );

    }

	// -----------------------------------------------------------------------------------------------------------------
    private _createTagColorSetting(tagName: string, color: RGB) {
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

        containerEl.appendChild(new_setting.settingEl);
    }
}
