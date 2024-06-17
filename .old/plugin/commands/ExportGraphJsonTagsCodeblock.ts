// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {IColoredTagWrangler} from ".old/plugin/IColoredTagWrangler";
import {Editor, MarkdownFileInfo, MarkdownView} from "obsidian";
import {get_tags} from ".old/api/tags";
import {IColorGroup} from ".old/api/graph";

// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export async function ExportGraphJsonTagsCodeblock(editor: Editor, _: MarkdownView | MarkdownFileInfo, plugin: IColoredTagWrangler){
    const color_groups = get_tags(plugin.settings.TagColors.ColorPicker, plugin.settings?.TagColors.EnableMultipleTags)
        .map(({tag_name, color}) => {
            return {
                "query": `tag:#${tag_name}`,
                "color": {
                    "a": 1,
                    "rgb": Number.parseInt(`${(color.r << 16) + (color.g << 8) + color.b}`)
                }
            } as IColorGroup
        })

    editor.replaceSelection(
        [
            "```json",
            JSON.stringify({"colorGroups":color_groups}, null,2),
            "```",
        ].join("\n")
    )

}
