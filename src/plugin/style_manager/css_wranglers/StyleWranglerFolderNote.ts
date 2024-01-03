// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {StyleWrangler}
	from "src/plugin/style_manager/css_wranglers/StyleWrangler";
import ColoredTagWranglerPlugin
	from "src/main";
import {RGB}
	from "obsidian";
import {get_tags} from "../../../api/tags";
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
	assemble_css_light(): Array<string> {
		const all_tags = get_tags(this.plugin.settings.TagColors.ColorPicker, this.plugin.settings?.TagColors.EnableMultipleTags);
		const border_radius = this.plugin.settings.FolderNote.Values.BorderRadius
		const padding = this.plugin.settings.FolderNote.Values.Padding

		return Object.keys(this.plugin.settings.FolderNote.FolderTagLinks)
			.map(
				folderUUID => {
					const {folder_path, tag_name:folder_tag_name} = this.plugin.settings.FolderNote.FolderTagLinks[folderUUID];
					return all_tags
						.filter(({tag_name:known_tag})=>known_tag===folder_tag_name)
						.map(({color, background_color, luminance_offset}) => {
							// noinspection CssInvalidFunction,CssUnusedSymbol,CssInvalidPropertyValue
							return this.assemble_css(
								"body.theme-light",
								folder_path,
								color,
								this.get_background_color(
									background_color,
									luminance_offset,
									true
								),
								border_radius,
								padding
							)
						})
				}
			)
			.flat()
	}

	assemble_css_dark(): Array<string> {
		let all_tags = get_tags(this.plugin.settings.TagColors.ColorPicker, this.plugin.settings?.TagColors.EnableMultipleTags);
		let border_radius = this.plugin.settings.FolderNote.Values.BorderRadius
		let padding = this.plugin.settings.FolderNote.Values.Padding

		return Object.keys(this.plugin.settings.FolderNote.FolderTagLinks)
			.map(
				folderUUID => {
					let {folder_path, tag_name:folder_tag_name} = this.plugin.settings.FolderNote.FolderTagLinks[folderUUID];
					return all_tags
						.filter(({tag_name:known_tag})=>known_tag===folder_tag_name)
						.map(({color, background_color, luminance_offset}) => {
							// noinspection CssInvalidFunction,CssUnusedSymbol,CssInvalidPropertyValue
							return this.assemble_css(
								"body.theme-dark",
								folder_path,
								color,
								this.get_background_color(
									background_color,
									luminance_offset,
									false
								),
								border_radius,
								padding
							)
						})
				}
			)
			.flat()
	}

	private assemble_css(theme:string, folder_path:string, color:RGB, background:RGB, border_radius:string, padding:string){
		const important:string = this.get_important();

		return`
/* Apply color to drop down triangle */
${theme} .nav-folder:has(> [data-path="${folder_path}"]) svg.svg-icon.right-triangle{
	stroke: rgb(${color.r}, ${color.g}, ${color.b}) ${important}; 
}

/* Applies color to the title of the folder*/
${theme} .nav-folder.alx-folder-with-note:has(> [data-path="${folder_path}"]) > .nav-folder-title > .nav-folder-title-content,
${theme} .nav-folder:has(> [data-path="${folder_path}"]) .nav-folder-title-content{
	text-decoration-color: rgba(${color.r}, ${color.g}, ${color.b},  0.6) ${important};
	text-decoration-thickness: 2px;
	color: rgb(${color.r}, ${color.g}, ${color.b}) ${important};
}

/* Applies color to the title of the file*/
${theme} .nav-folder:has(> [data-path="${folder_path}"]) .nav-file-title-content{
	color: rgb(${color.r}, ${color.g}, ${color.b}) ${important};
}

/* Applies color to the bar next to the notes in the folder*/
${theme} .nav-folder:has(> [data-path="${folder_path}"]) .nav-folder-children {
	border-left-color: rgba(${color.r}, ${color.g}, ${color.b}, 0.2) ${important};
	border-left-width: 2px ${important};
}

/* Apply color to folder title and background*/
${theme} .nav-folder:has(> [data-path="${folder_path}"]){
	background-color: ${this.get_background_string(background)} ${important};								
	border-radius: ${border_radius};
	padding: ${padding};
	margin-bottom: ${padding};
}`

	}

}
