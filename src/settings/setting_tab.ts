// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {App, PluginSettingTab, RGB, Setting}
    from "obsidian";
import {hexToRgb,rgbToHex}
    from "../lib/convert_colors";
import ColoredTagWranglerPlugin
    from "../main";
// ---------------------------------------------------------------------------------------------------------------------
// Support Code
// ---------------------------------------------------------------------------------------------------------------------
const NEW_TAG_NAME:string = "new-tag";
const NEW_DEFAULT_COLOR:RGB = { r: 255, g: 255, b: 255 };

// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export class SettingTab extends PluginSettingTab {
	plugin: ColoredTagWranglerPlugin;
    settings_CCT:Setting;
    settings_Delete:Setting;
    settings_Kanban:Setting;
    settings_KanbanCards:Setting;
    settings_KanbanTitles:Setting;
    settings_ReloadCSS:Setting;

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

		// -------------------------------------------------------------------------------------------------------------
		containerEl.createEl('h2', {text: "Obsidian Tags"});

		// --- CUSTOM COLOR TAGS ---
		this.settings_CCT = new Setting(containerEl)
            .setName("Custom Color Tags")
			.setDesc("Define custom colors for tags. Don't add the `#` before the tag, and keep everything in lowercase. This should be sanitized in code as well.")
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

		// -------------------------------------------------------------------------------------------------------------
		containerEl.createEl('br');
		containerEl.createEl('h2', {text: "KanBan Plugin Integration"})

        // --- KANBAN ADDITION ---
        this.settings_Kanban = new Setting(containerEl)
            .setName("Omit '#' in Kanban plugin ")
            .setDesc("Hides the # from the kanban view. Mind you, they still have to be typed out")
            .addToggle(component => {
                component
                    .setValue(this.plugin.settings.enableKanban)
                    .onChange(async state => {
                        this.plugin.settings.enableKanban = state;
                    await this.plugin.saveSettings();
                    })
                }
            );

		// --- KANBAN CARDS ADDITION ---
		this.settings_KanbanCards = new Setting(containerEl)
			.setName("Apply Tag color to Kanban Card")
			.setDesc("Applies the tag color, of the tag within the card, to the background color of the card")
			.addToggle(component => {
					component
						.setValue(this.plugin.settings.enableKanbanCards)
						.onChange(async state => {
							this.plugin.settings.enableKanbanCards = state;
							await this.plugin.saveSettings();
						})
				}
			);

		// --- KANBAN TITLES ADDITION ---
		this.settings_KanbanTitles = new Setting(containerEl)
			.setName("Apply Tag color to Kanban List")
			.setDesc("Applies the tag color, of the tag within the titles, to the background color of the list")
			.addToggle(component => {
					component
						.setValue(this.plugin.settings.enableKanbanTitles)
						.onChange(async state => {
							this.plugin.settings.enableKanbanTitles = state;
							await this.plugin.saveSettings();
						})
				}
			);

		// -------------------------------------------------------------------------------------------------------------
		containerEl.createEl('br');
		containerEl.createEl('h2', {text: "Debug Options"})

		this.settings_ReloadCSS = new Setting(containerEl)
			.setName("Refresh CSS Styling")
			.setDesc("Reloads the styling of this plugin")
			.addButton((button) =>
				button
					.setButtonText("Refresh")
					.onClick(async () => {
						this.plugin.style_manager.switchAllStyles();
					})
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
                    .onChange(async (value) => {
						// Cleanup the value
						value = value.replace("#","");
						value = value.toLowerCase();

						// delete the "old" tag name, before the edit
						delete this.plugin.settings.customTagColors[new_tag_name];

						// Add the updated tag and color
						this.plugin.settings.customTagColors[value] = new_color;
						await this.plugin.saveSettings();

						// Handle user-defined tag name changes here
						new_tag_name = value; // Update newTagName as the user changes the tag name

					})
            ).addColorPicker((colorPicker) =>
                colorPicker
                    .setValueRgb(color)
                    .onChange(async (value) => {
						// Handle user-defined tag colors here
						new_color = hexToRgb(value); // Update newColor as the user changes the color
						// Add the updated tag and color
						this.plugin.settings.customTagColors[new_tag_name] = new_color;
						await this.plugin.saveSettings();

					})
            ).addButton((button) =>
                button
                    .setButtonText('-')
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
