// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {TFile} from "obsidian";
import {IColoredTagWrangler} from "../plugin/IColoredTagWrangler";
import {get_tags, tagMatchesPattern} from "src/api/tags";

// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export function getParentFolderName(filePath: string): string {
    // Extract the parent folder name from the file path
    const pathParts = filePath.split('/');
    return pathParts[pathParts.length - 2];
}

// ---------------------------------------------------------------------------------------------------------------------
export function processTagColors(plugin:IColoredTagWrangler, tag_to_find: string): string | null {
    const colorPickerArray = plugin.settings.TagColors.ColorPicker;

    const matchingKey = colorPickerArray.findIndex((data) => get_tags(
        [data],
        plugin.settings.TagColors.EnableMultipleTags,
        false
    ).some(({tag_name}) => tagMatchesPattern(tag_name, tag_to_find)));

    return matchingKey !== -1 ? matchingKey.toString() : null;

}

export function file_is_folderNote(file:TFile){
    return file.name.replace(".md", "") === getParentFolderName(file.path)
}

// ---------------------------------------------------------------------------------------------------------------------
export async function detect_all_links(plugin:IColoredTagWrangler): Promise<{ tag_name: string; folder_path: string }[]> {
    try {
        const { vault } = plugin.app;
        const markdownFiles = vault.getMarkdownFiles();

        const links = await Promise.all(
            markdownFiles
                .filter(file => file_is_folderNote(file) )
                .map(async file => {
                    const tags = plugin.app.metadataCache.getFileCache(file)?.frontmatter?.tags as string[] ?? [];
                    return tags
                        .filter(tag => processTagColors(plugin, tag) !== null)
                        .map(tag => ({
                            tag_name: tag as string,
                            folder_path: file.path.replace(`/${file.name}`, "")
                        }));
                })
        );
        return links.flat();
    } catch (error) {
        console.error('Error in _auto_detect_links:', error);
        return [];
    }
}
