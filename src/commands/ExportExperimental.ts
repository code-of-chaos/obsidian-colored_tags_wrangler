import { IPluginSettings } from "src/types/settings";
import { tagMatchesPattern } from "src/lib/tag-utils";
import { tagNameToSearchQuery } from "src/lib/css-selectors";

interface ColorGroup {
    query: string;
    color: { a: number; rgb: number };
}

interface GraphJSON {
    colorGroups: ColorGroup[];
}

export async function exportGraphJsonTags(
    settings: IPluginSettings,
    vault: { adapter: { read: (path: string) => Promise<string>; write: (path: string, data: string) => Promise<void> }; configDir: string }
): Promise<boolean> {
    try {
        const data = await vault.adapter.read(`${vault.configDir}/graph.json`);
        const graph = JSON.parse(data) as GraphJSON;

        graph.colorGroups = settings.tagRecords.map((record) => ({
            query: tagNameToSearchQuery(record.tag_name),
            color: {
                a: 1,
                rgb: (record.color.r << 16) + (record.color.g << 8) + record.color.b,
            },
        }));

        await vault.adapter.write(`${vault.configDir}/graph.json`, JSON.stringify(graph, null, 2));
        return true;
    } catch (e) {
        console.error("Failed to export graph.json:", e);
        return false;
    }
}

export async function exportGraphJsonFolderNotes(
    settings: IPluginSettings,
    vault: { adapter: { read: (path: string) => Promise<string>; write: (path: string, data: string) => Promise<void> }; configDir: string }
): Promise<boolean> {
    try {
        const data = await vault.adapter.read(`${vault.configDir}/graph.json`);
        const graph = JSON.parse(data) as GraphJSON;

        const folderNoteLinks = settings.extensionSettings["folder-note"].folderTagLinks;
        const records = settings.tagRecords;

        graph.colorGroups = folderNoteLinks
            .map((link) => {
                const matchingRecord = records.find((r) =>
                    tagMatchesPattern(r.tag_name, link.tag_name)
                );
                if (!matchingRecord) return null;

                return {
                    query: `path:${link.folder_path}`,
                    color: {
                        a: 1,
                        rgb: (matchingRecord.color.r << 16) +
                            (matchingRecord.color.g << 8) +
                            matchingRecord.color.b,
                    },
                };
            })
            .filter((g): g is ColorGroup => g !== null);

        await vault.adapter.write(`${vault.configDir}/graph.json`, JSON.stringify(graph, null, 2));
        return true;
    } catch (e) {
        console.error("Failed to export folder notes to graph.json:", e);
        return false;
    }
}

export function exportToCss(styleManager: { getCss(): string }): string {
    return styleManager.getCss();
}
