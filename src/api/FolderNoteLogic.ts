// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {TFile} from "obsidian";
import {reSplit} from "./tags";
import {IColoredTagWrangler} from "../plugin/IColoredTagWrangler";
import {IColorPicker} from "./interfaces/IColorPicker";

// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export function getParentFolderName(filePath: string): string {
    // Extract the parent folder name from the file path
    const pathParts = filePath.split('/');
    return pathParts[pathParts.length - 2];
}

// ---------------------------------------------------------------------------------------------------------------------
export async function processTagColors(plugin:IColoredTagWrangler, tag_to_find: string): Promise<string | null> {
    const colorPickerArray = plugin.settings.TagColors.ColorPicker;
    const clean_tag_to_find = tag_to_find.trim().replace(/^#+/, "");

    const matchingKey = colorPickerArray.findIndex((data: IColorPicker) => {
        if (plugin.settings.TagColors.EnableMultipleTags) {
            return (
                data.tag_name.split(reSplit).map((t: string) => t.trim().replace(/^#+/, "")).find((tag: string) => tag === clean_tag_to_find) !== undefined
            );
        } else {
            return data.tag_name.trim().replace(/^#+/, "") === clean_tag_to_find;
        }
    });

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
                    let tags = plugin.app.metadataCache.getFileCache(file)?.frontmatter?.tags as string[] ?? [];
                    return tags
                        .filter(async tag => await processTagColors(plugin, tag))
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
