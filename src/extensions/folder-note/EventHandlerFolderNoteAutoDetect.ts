import { CachedMetadata, TFile, Vault, MetadataCache, EventRef } from "obsidian";
import { IEventHandler } from "src/types/extensions";
import { IColoredTagRecord, IFolderNoteSettings } from "src/types/settings";
import { tagMatchesPattern } from "src/lib/tag-utils";

function fileIsFolderNote(file: TFile): boolean {
    const pathParts = file.path.split("/");
    const parentFolder = pathParts[pathParts.length - 2] ?? "";
    const fileName = file.name.replace(".md", "");
    return fileName === parentFolder;
}

export class EventHandlerFolderNoteAutoDetect implements IEventHandler {
    private eventRef: EventRef | null = null;

    constructor(
        private records: IColoredTagRecord[],
        private settings: IFolderNoteSettings,
        private vault: Vault,
        private metadataCache: MetadataCache,
        private onLinksUpdated: () => void
    ) {}

    register(): void {
        if (!this.settings.enable || !this.settings.enableAutoDetect) return;

        this.eventRef = this.metadataCache.on("changed", (file, _, cache) => {
            this.handleMetadataChange(file, cache);
        });
    }

    unregister(): void {
        // EventRef is cleaned up by Obsidian when the plugin unloads
        this.eventRef = null;
    }

    private handleMetadataChange(file: TFile, cache: CachedMetadata): void {
        const folderPath = file.path.replace(`/${file.name}`, "");
        const tags = cache.frontmatter?.tags as string[] | undefined;

        if (!fileIsFolderNote(file) || tags === undefined) return;

        // Filter out links associated with the current file
        const linksToKeep = this.settings.folderTagLinks.filter(
            (link) => link.folder_path !== folderPath
        );

        // Create new links based on tags
        const newLinks = tags
            .map((tag) => tag.replace("#", ""))
            .filter((tag) => this.records.some((r) => tagMatchesPattern(r.tag_name, tag)))
            .map((tag) => ({
                tag_name: tag,
                folder_path: folderPath,
            }));

        this.settings.folderTagLinks = [...linksToKeep, ...newLinks].sort((a, b) =>
            a.folder_path.localeCompare(b.folder_path)
        );

        this.onLinksUpdated();
    }
}
