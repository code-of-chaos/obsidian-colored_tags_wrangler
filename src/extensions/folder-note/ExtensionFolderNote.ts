import { AbstractExtension } from "../AbstractExtension";
import { CssWranglerFolderNote } from "./CssWranglerFolderNote";
import { EventHandlerFolderNoteAutoDetect } from "./EventHandlerFolderNoteAutoDetect";
import { IColoredTagRecord, IFolderNoteSettings } from "src/types/settings";
import { Vault, MetadataCache } from "obsidian";

export class FolderNoteExtension extends AbstractExtension {
    extensionName = "folder-note";
    description = "Color folder titles in file explorer for folder notes";
    extensionRequirements: string[] = ["core"];
    cssWrangler: CssWranglerFolderNote;

    constructor(
        records: IColoredTagRecord[],
        settings: IFolderNoteSettings,
        vault: Vault,
        metadataCache: MetadataCache,
        onLinksUpdated: () => void
    ) {
        super();
        this.cssWrangler = new CssWranglerFolderNote(records, settings);
        this.eventHandler = new EventHandlerFolderNoteAutoDetect(
            records,
            settings,
            vault,
            metadataCache,
            onLinksUpdated
        );
    }
}
