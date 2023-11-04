// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------

// ---------------------------------------------------------------------------------------------------------------------
// Interface
// ---------------------------------------------------------------------------------------------------------------------
import {RGB} from "obsidian";

export interface IColoredTagWranglerSettings {
	TagColors:{
		ColorPicker: Record<string, {tag_name:string, color:RGB}>,
		SemanticObsidianColors: Record<string, string>,
		CssVars: Record<string, {color:string, background:string}>,

		Values:{
			BackgroundOpacity:number,
			BackgroundOpacityHover:number,
			SemanticColorsLuminanceOffset:number,
		}
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
		SettingsVersion: 1
	}
}