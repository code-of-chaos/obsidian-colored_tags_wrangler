// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {Editor, MarkdownFileInfo, MarkdownView, TFile, WorkspaceLeaf} from "obsidian";
import {IEventHandlerPopulator} from "../../../contracts/plugin/services/event_handlers/IEventHandlerPopulator";

// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------

export class EventHandlerPopulator implements IEventHandlerPopulator {
    CodeMirror(): void | Promise<void> {return}
    FileOpenMd(file: TFile): void | Promise<void> {return}
    FileOpenCanvas(file: TFile): void | Promise<void> {return}
    ActiveLeafChange(leaf: WorkspaceLeaf): void | Promise<void> {return}
    MetaDataCacheChanged(file: TFile): void | Promise<void> {return}
    EditorChange(editor: Editor, info: MarkdownView | MarkdownFileInfo): void | Promise<void> {return}
}
