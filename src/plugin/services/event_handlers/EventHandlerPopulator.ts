// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import { TFile, WorkspaceLeaf } from "obsidian";
import {IEventHandlerPopulator} from "../../../contracts/plugin/services/event_handlers/IEventHandlerPopulator";

// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------

export class EventHandlerPopulator implements IEventHandlerPopulator {
    FileOpenMd(file: TFile): void | Promise<void> {return}
    FileOpenCanvas(file: TFile): void | Promise<void> {return}
    ActiveLeafChange(leaf: WorkspaceLeaf): void | Promise<void> {return}
    MetaDataCacheChanged(file: TFile): void | Promise<void> {return}
}
