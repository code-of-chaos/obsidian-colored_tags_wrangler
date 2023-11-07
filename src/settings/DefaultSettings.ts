// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {RGB} from "obsidian";

// ---------------------------------------------------------------------------------------------------------------------
// Interface
// ---------------------------------------------------------------------------------------------------------------------
export interface IColoredTagWranglerSettings {
	TagColors:{
		ColorPicker: Record<string, {tag_name:string, color:RGB}>,
		SemanticObsidianColors: Record<string, {tag_name:string, obsidian_css_var:string }>,
		CssVars: Record<string, {tag_name:string, color:string, background:string}>,

		Values:{
			BackgroundOpacity:number,
			BackgroundOpacityHover:number,
			SemanticColorsLuminanceOffset:number,
		}
	},

	FolderNote:{
		Enable:boolean
		FolderTagLinks:Record<string, {folder_path:string, tag_name:string}>;
	},

	Kanban:{
		Enable: boolean,
		EnableCards:boolean,
		EnableLists:boolean,

		Values:{
			CardBackgroundOpacity:number,
			CardBorderOpacity:number,
			ListBackgroundOpacity:number,
			ListBorderOpacity:number,
		},
	},

	Debug:{
		Enable:boolean,
	},

	Canvas:{
		Enable:boolean,

		Values:{
			CardBorderOpacity:number,
			CardBackgroundLuminanceOffset:number,
		},
	},
	Info: {
		SettingsVersion: number
	}
}
// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export const DefaultSettings: IColoredTagWranglerSettings = {
	TagColors:{
		ColorPicker: {},
		SemanticObsidianColors: {},
		CssVars: {},

		Values:{
			BackgroundOpacity:0.2,
			BackgroundOpacityHover:0.1,
			SemanticColorsLuminanceOffset:0.35
		}
	},

	FolderNote:{
		Enable:false,
		FolderTagLinks:{},
	},

	Kanban:{
		Enable:false,
		EnableCards:false,
		EnableLists:false,

		Values:{
			CardBackgroundOpacity:0.2,
			CardBorderOpacity:0.3,
			ListBackgroundOpacity:0.2,
			ListBorderOpacity:0.3,
		},
	},

	Debug:{
		Enable:false,
	},

	Canvas:{
		Enable:false,

		Values:{
			CardBorderOpacity:0.3,
			CardBackgroundLuminanceOffset:0.35,
		}
	},
	Info: {
		SettingsVersion: 3 // UPDATE THIS WHEN YOU CHANGE ANYTHING IN THE SETTINGS!!!
	}
}
