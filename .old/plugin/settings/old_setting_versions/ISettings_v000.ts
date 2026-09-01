// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------

// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export interface ISettings_v000 {
	TagColors:{
		ColorPicker: Record<string, { r: number, g: number, b: number }>,
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
