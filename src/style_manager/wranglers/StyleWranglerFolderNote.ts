// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {StyleWrangler}
	from "src/style_manager/wranglers/StyleWrangler";
import ColoredTagWranglerPlugin
	from "src/main";
// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export class StyleWranglerFolderNote extends StyleWrangler {
	// -----------------------------------------------------------------------------------------------------------------
	// Constructor
	// -----------------------------------------------------------------------------------------------------------------
	constructor(plugin:ColoredTagWranglerPlugin) {
		super("#styleFolderNoteEl", plugin);
	}
	// -----------------------------------------------------------------------------------------------------------------
	// Methods
	// -----------------------------------------------------------------------------------------------------------------
	assemble_css(): string {
		let all_tags = this.get_tags();
		let important = this.plugin.settings.FolderNote.Values.ForceImportant ? "!important" : ""
		let border_radius = this.plugin.settings.FolderNote.Values.BorderRadius
		let padding = this.plugin.settings.FolderNote.Values.Padding

		return Object.keys(this.plugin.settings.FolderNote.FolderTagLinks)
			.map(
				folderUUID => {
					let {folder_path, tag_name:folder_tag_name} = this.plugin.settings.FolderNote.FolderTagLinks[folderUUID];
					return all_tags
						.filter(({tag_name:known_tag})=>known_tag===folder_tag_name)
						.map(({tag_name, color, background_color, background_opacity}) => {
							// noinspection CssInvalidFunction,CssUnusedSymbol,CssInvalidPropertyValue
							return `
							/* Apply color to drop down triangle */
							div.nav-folder-title[data-path="${folder_path}"] svg.svg-icon.right-triangle{
								stroke: rgb(${color.r}, ${color.g}, ${color.b});
							}
							
							/* Applies color to the title of the folder*/
							div.nav-folder:has(> [data-path="${folder_path}"]) .nav-folder-title-content{
								text-decoration-color: rgba(${color.r}, ${color.g}, ${color.b},  0.6) ${important};
								text-decoration-thickness: 2px;
								color: rgb(${color.r}, ${color.g}, ${color.b});
							}
							
							/* Applies color to the title of the file*/
							div.nav-folder:has(> [data-path="${folder_path}"]) .nav-file-title-content{
								color: rgb(${color.r}, ${color.g}, ${color.b});
							}
							
							/* Applies color to the bar next to the notes in the folder*/
							.nav-folder:has(> [data-path="${folder_path}"]) .nav-folder-children {
								border-left-color: rgba(${color.r}, ${color.g}, ${color.b},  0.2)${important};
								border-left-width: 2px ${important};
							}
							
							/* Apply color to folder title and background*/
							.nav-folder:has(> [data-path="${folder_path}"]){
								background-color: rgba(${background_color.r}, ${background_color.g}, ${background_color.b},  ${background_opacity});								
								border-radius: ${border_radius};
								padding: ${padding};
								margin-bottom: ${padding};
							}`
						})
						.flat()
				}
			)
			.flat()
			.join("\n")

	}

}
