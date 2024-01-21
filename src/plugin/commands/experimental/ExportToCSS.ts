// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {IColoredTagWrangler} from "src/plugin/IColoredTagWrangler";
import {Editor, MarkdownFileInfo, MarkdownView} from "obsidian";

// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export async function ExportToCSS(editor: Editor, ctx: MarkdownView | MarkdownFileInfo, plugin: IColoredTagWrangler){
    editor.replaceSelection(
        [
            "```css",
			...plugin.style_manager.getAllCssStyling(),
            "```",
        ].join("\n")
    )

}
