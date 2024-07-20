// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {Editor, MarkdownFileInfo, MarkdownView, TFile, WorkspaceLeaf} from "obsidian";
// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export interface IEventHandlerPopulator {
	FileOpenMd(file: TFile ) : Promise<void> | void;
	FileOpenCanvas(file: TFile) : Promise<void> | void;
	ActiveLeafChange(leaf : WorkspaceLeaf) : Promise<void> | void;
	MetaDataCacheChanged(file: TFile) : Promise<void> | void;
	EditorChange(editor: Editor, info: MarkdownView | MarkdownFileInfo): void | Promise<void>;
	CodeMirror() : Promise<void> | void;
}
