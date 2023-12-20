// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {
    CachedMetadata,
    TFile
} from "obsidian";
import ColoredTagWranglerPlugin
    from "../../main";
import {file_is_folderNote, processTagColors}
    from "../../api/FolderNoteLogic";
import {v4 as uuid4}
    from "uuid";
import {debounce} from "obsidian";

// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export class MetadataChange {
    plugin:ColoredTagWranglerPlugin;

    public constructor(plugin:ColoredTagWranglerPlugin,) {
        this.plugin = plugin;
    }

    public async register(){
        // Here I create a bound version of this.plugin.saveSettings
        // so that it will receive the correct `this` context of the plugin later
        const saveSettings = this.plugin.saveSettings.bind(this.plugin);

        // Now, I can use the bound method with the debounce function,
        // creating a debounced version of saveSettings, bound to the right `this` context.
        const debounced_save_settings = debounce(saveSettings, 100);

        this.plugin.registerEvent(
            this.plugin.app.metadataCache.on(
                "changed",
                async (file, __, cache: CachedMetadata) => {
                    if (this.plugin.settings.FolderNote.Enable && this.plugin.settings.FolderNote.EnableAutoDetect) {
                        await this.callback(file, cache)
                    }

                    await debounced_save_settings.call(this)
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


        this.plugin.settings.FolderNote.FolderTagLinks = {}; // reset the list

		const updatedLinks = [...linksToKeep, ...newLinks];

		updatedLinks
			.sort((a, b) => a.folder_path.localeCompare(b.folder_path))
			.forEach(link => {
				this.plugin.settings.FolderNote.FolderTagLinks[uuid4()] = link;
			})
		;
    }
}
