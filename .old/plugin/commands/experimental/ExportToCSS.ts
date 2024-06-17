// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {IColoredTagWrangler} from ".old/plugin/IColoredTagWrangler";
import {Editor, MarkdownFileInfo, MarkdownView} from "obsidian";

// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export async function ExportToCSS(editor: Editor, _: MarkdownView | MarkdownFileInfo, plugin: IColoredTagWrangler){
    editor.replaceSelection(
        [
            "```css",
			...plugin.style_manager.getAllCssStyling(),
            "```",
        ].join("\n")
    )

}
