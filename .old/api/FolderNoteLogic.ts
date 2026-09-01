// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {TFile} from "obsidian";
import {IColoredTagWrangler} from "../plugin/IColoredTagWrangler";
import {get_tags, tagMatchesPattern} from "src/api/tags";

// ---------------------------------------------------------------------------------------------------------------------
// Support Code
// ---------------------------------------------------------------------------------------------------------------------
// Cache for expanded tag patterns: maps tag_pattern -> colorPicker index
let tagPatternCache: Map<string, number> | null = null;
let lastCacheKey = "";

function getTagPatternCache(plugin: IColoredTagWrangler): Map<string, number> {
    const colorPickerArray = plugin.settings.TagColors.ColorPicker;
    const enableMultipleTags = plugin.settings.TagColors.EnableMultipleTags;
    // Create a cache key from the color picker array
    const cacheKey = JSON.stringify(colorPickerArray) + String(enableMultipleTags);

    if (tagPatternCache && lastCacheKey === cacheKey) {
        return tagPatternCache;
    }

    // Rebuild cache
    tagPatternCache = new Map();
    colorPickerArray.forEach((data, index) => {
        const expandedTags = get_tags([data], enableMultipleTags, false);
        expandedTags.forEach(({tag_name}) => {
            // Store the first matching index for each pattern
            if (!tagPatternCache!.has(tag_name)) {
                tagPatternCache!.set(tag_name, index);
            }
        });
    });
    lastCacheKey = cacheKey;
    return tagPatternCache;
}

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
    const cache = getTagPatternCache(plugin);

    // Check each cached pattern against the tag_to_find
    for (const [pattern, index] of cache.entries()) {
        if (tagMatchesPattern(pattern, tag_to_find)) {
            return index.toString();
        }
    }

    return null;
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
