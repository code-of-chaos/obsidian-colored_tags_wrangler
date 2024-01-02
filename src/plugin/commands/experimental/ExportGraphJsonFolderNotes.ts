// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {IColoredTagWrangler} from "src/plugin/IColoredTagWrangler";
import {IColorGroup, IGraphJSON, readGraphJson, writeGraphJson} from "src/api/graph";
import {get_tags} from "src/api/tags";

// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export async function exportGraphJsonFolderNotes(plugin:IColoredTagWrangler) {
    let graph_data: IGraphJSON | null = await readGraphJson(plugin.app.vault);
    if (graph_data === null){
        return
    }

    let all_tags = get_tags(plugin);

    graph_data.colorGroups = Object.keys(plugin.settings.FolderNote.FolderTagLinks)
        .map(
            folderUUID => {
                const {folder_path, tag_name: folder_tag_name} = plugin.settings.FolderNote.FolderTagLinks[folderUUID];
                return all_tags
                    .filter(({tag_name: known_tag}) => known_tag === folder_tag_name)
                    .map(({color}) => {
                        return {
                            "query": `path:${folder_path}`,
                            "color": {
                                "a": 1,
                                "rgb": Number.parseInt(`${(color.r << 16) + (color.g << 8) + color.b}`)
                            }
                        } as IColorGroup
                    })
            }
        )
        .flat();

    await writeGraphJson(graph_data, plugin.app.vault)
}
