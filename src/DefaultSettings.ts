// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------

// ---------------------------------------------------------------------------------------------------------------------
// Interface
// ---------------------------------------------------------------------------------------------------------------------
export interface IColoredTagWranglerSettings {
    customTagColors: Record<string, { r: number, g: number, b: number }>;
	TagSemanticColors: Record<string, string>;
    enableKanban:boolean;
	enableKanbanCards:boolean;
	enableKanbanLists:boolean;
	enableDebugSettings:boolean;
	enableCanvas:boolean;

	// The following setting_tab still have to be assigned to logic
	kanbanCardBackgroundOpacity:number;
	kanbanCardBorderOpacity:number;
	kanbanListBackgroundOpacity:number;
	kanbanListBorderOpacity:number;

	CanvasCardBorderOpacity:number;
	CanvasCardBackgroundLuminanceOffset:number;
}
// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export const DefaultSettings: IColoredTagWranglerSettings = {
    customTagColors: {},
	TagSemanticColors: {},
    enableKanban:false,
	enableKanbanCards:false,
	enableKanbanLists:false,
	enableDebugSettings:false,
	enableCanvas:false,

	// The following setting_tab still have to be assigned to logic
	kanbanCardBackgroundOpacity:0.2,
	kanbanCardBorderOpacity:0.3,
	kanbanListBackgroundOpacity:0.2,
	kanbanListBorderOpacity:0.3,

	CanvasCardBorderOpacity:0.3,
	CanvasCardBackgroundLuminanceOffset:0.35,
}
