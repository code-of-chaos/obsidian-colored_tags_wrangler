// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {IColoredTagWrangler} from "src/plugin/IColoredTagWrangler";
import {IColorGroup, IGraphJSON, readGraphJson, writeGraphJson} from "src/api/graph";
import {get_tags} from "src/api/tags";

// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export async function exportGraphJsonTags(plugin:IColoredTagWrangler) {
    let graph_data: IGraphJSON | null = await readGraphJson(plugin.app.vault);
    if (graph_data === null){
        return
    }

    graph_data.colorGroups = get_tags(plugin.settings.TagColors.ColorPicker, plugin.settings?.TagColors.EnableMultipleTags)
        .map(({tag_name, color}) => {
            return {
                "query": `tag:#${tag_name}`,
                "color": {
                    "a": 1,
                    "rgb": Number.parseInt(`${(color.r << 16) + (color.g << 8) + color.b}`)
                }
            } as IColorGroup
        })

    await writeGraphJson(graph_data, plugin.app.vault)
}
