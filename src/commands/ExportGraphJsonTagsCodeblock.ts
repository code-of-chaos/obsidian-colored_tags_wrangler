import { Editor, MarkdownView, MarkdownFileInfo } from "obsidian";
import { IPluginSettings } from "src/types/settings";
import { tagNameToSearchQuery } from "src/lib/css-selectors";

export function exportTagsToGraphCodeblock(
    editor: Editor,
    _: MarkdownView | MarkdownFileInfo,
    settings: IPluginSettings
): void {
    const records = settings.tagRecords;
    const colorGroups = records.map((record) => ({
        query: tagNameToSearchQuery(record.tag_name),
        color: {
            a: 1,
            rgb: (record.color.r << 16) + (record.color.g << 8) + record.color.b,
        },
    }));

    const json = JSON.stringify({ colorGroups }, null, 2);
    editor.replaceSelection(`\`\`\`json\n${json}\n\`\`\``);
}
