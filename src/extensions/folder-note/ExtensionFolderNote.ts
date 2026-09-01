import { AbstractExtension } from "../AbstractExtension";
import { CssWranglerFolderNote } from "./CssWranglerFolderNote";
import { IColoredTagRecord, IFolderNoteSettings } from "src/types/settings";

export class FolderNoteExtension extends AbstractExtension {
    extensionName = "folder-note";
    description = "Color folder titles in file explorer for folder notes";
    extensionRequirements: string[] = ["core"];
    cssWrangler: CssWranglerFolderNote;

    constructor(records: IColoredTagRecord[], settings: IFolderNoteSettings) {
        super();
        this.cssWrangler = new CssWranglerFolderNote(records, settings);
    }
}
