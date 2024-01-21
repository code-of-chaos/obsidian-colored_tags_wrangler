// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {CachedMetadata, TFile} from "obsidian";
import {file_is_folderNote, processTagColors} from "src/api/FolderNoteLogic";
import {EventHandler} from "src/plugin/event_handlers/EventHandler";

// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export class EventHandlerMetadataChange extends EventHandler{
    public async register(){
        this.plugin.registerEvent(
            this.plugin.app.metadataCache.on(
                "changed",
                async (file, __, cache: CachedMetadata) => {
                    if (this.plugin.settings.FolderNote.Enable && this.plugin.settings.FolderNote.EnableAutoDetect) {
                        await this.callback(file, cache)
						await this.debounced_save_settings.call(this)
                        this.plugin.style_manager.wrangler_note_property_tags.assembleStyling();
                    } else {
                        this.plugin.style_manager.wrangler_note_property_tags.removeStyling();
                    }
                }
            ));
    }

    private async callback(file:TFile, cache: CachedMetadata):Promise<void>{
        const folder_path = file.path.replace(`/${file.name}`, "")
        const tags = cache.frontmatter?.tags as string[] | undefined;

        if (!file_is_folderNote(file) || tags === undefined){
            return
        }

		// Filter out links associated with the current file
		const linksToKeep = Object
			.values(this.plugin.settings.FolderNote.FolderTagLinks)
			.filter(link => link.folder_path !== folder_path);

		// Create new links based on tags
		const newLinks = tags
			.map(tag => tag.replace("#", ""))
			.filter(tag => processTagColors(this.plugin, tag))
			.map(tag => ({
				tag_name: tag as string,
				folder_path: folder_path
			}));

        this.plugin.settings.FolderNote.FolderTagLinks = [...linksToKeep, ...newLinks]
			.sort((a, b) => a.folder_path.localeCompare(b.folder_path))

		;
    }
}
