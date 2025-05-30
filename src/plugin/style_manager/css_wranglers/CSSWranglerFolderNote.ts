// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {CSSWrangler}
	from "src/plugin/style_manager/css_wranglers/CSSWrangler";
import ColoredTagWranglerPlugin
	from "src/main";
import {RGB}
	from "obsidian";
// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export class CSSWranglerFolderNote extends CSSWrangler {
	// -----------------------------------------------------------------------------------------------------------------
	// Constructor
	// -----------------------------------------------------------------------------------------------------------------
	constructor(plugin:ColoredTagWranglerPlugin) {
		super(plugin, plugin.settings.FolderNote);
	}
	// -----------------------------------------------------------------------------------------------------------------
	// Methods
	// -----------------------------------------------------------------------------------------------------------------
	assembleCss(theme:string) {
		const important: string = this.getImportant();
		let all_tags = this.getTags();
		let border_radius = this.plugin.settings.FolderNote.Values.BorderRadius
		let padding = this.plugin.settings.FolderNote.Values.Padding

		return this.plugin.settings.FolderNote.FolderTagLinks
			.map(
				({folder_path, tag_name: folder_tag_name}) => {
					return all_tags
						.filter(({tag_name: known_tag}) => known_tag === folder_tag_name)
						.map(({color, background_color}) => this.createCss(
							theme,
							folder_path,
							color,
							background_color,
							important,
							border_radius,
							padding
						))
				}
			).flat()
	}

	private createCss(theme: string, folder_path: string, color: RGB, background_color: RGB, important: string, border_radius: string, padding: string) {
		// noinspection CssInvalidFunction,CssUnusedSymbol,CssInvalidPropertyValue
		const  string_color= this.getForegroundString(color);
		const string_background =  this.getBackgroundWithOpacityString(background_color)

		return`
/* Apply color to drop down triangle */
${theme} .nav-folder:has(> [data-path="${folder_path}"]) svg.svg-icon.right-triangle{
	stroke: ${string_color} ${important}; 
}

/* Applies color to the title of the folder*/
${theme} .nav-folder.alx-folder-with-note:has(> [data-path="${folder_path}"]) > .nav-folder-title > .nav-folder-title-content,
${theme} .nav-folder:has(> [data-path="${folder_path}"]) .nav-folder-title-content{
	text-decoration-color: rgba(${color.r}, ${color.g}, ${color.b},  0.6) ${important};
	text-decoration-thickness: 2px;
	color: ${string_color} ${important};
}

/* Applies color to the title of the file*/
${theme} .nav-folder:has(> [data-path="${folder_path}"]) .nav-file-title-content{
	color: ${string_color} ${important};
}

/* Applies color to the bar next to the notes in the folder*/
${theme} .nav-folder:has(> [data-path="${folder_path}"]) .nav-folder-children {
	border-left-color: rgba(${color.r}, ${color.g}, ${color.b}, 0.2) ${important};
	border-left-width: 2px ${important};
}

/* Apply color to folder title and background*/
${theme} .nav-folder:has(> [data-path="${folder_path}"]){
	background-color: ${string_background} ${important};								
	border-radius: ${border_radius};
	padding: ${padding};
	margin-bottom: ${padding};
}`
	}
}
