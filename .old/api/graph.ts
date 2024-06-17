// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {Vault} from "obsidian"

// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export interface IColorGroup{
    query:string,
    color:{a:number, rgb:number}
}
export interface IGraphJSON {
    "collapse-filter": boolean,
    "search": string,
    "showTags": boolean,
    "showAttachments": boolean,
    "hideUnresolved": boolean,
    "showOrphans": boolean,
    "collapse-color-groups": boolean,
    "colorGroups": IColorGroup[],
    "collapse-display": boolean,
    "showArrow": boolean,
    "textFadeMultiplier": number,
    "nodeSizeMultiplier": number,
    "lineSizeMultiplier": number,
    "collapse-forces": boolean,
    "centerStrength": number,
    "repelStrength": number,
    "linkStrength": number,
    "linkDistance": number,
    "scale": number,
    "close": boolean
}

export async function readGraphJson(vault:Vault): Promise<IGraphJSON|null>{
    const graphJsonPath = `${vault.configDir}/graph.json`
    try {
        const data = await this.app.vault.adapter.read(graphJsonPath)
        return JSON.parse(data) as IGraphJSON
    }
    catch (error){
        console.error(error)
        return null
    }
}

export async function writeGraphJson(data:IGraphJSON, vault:Vault):Promise<void>{
    const graphJsonPath = `${vault.configDir}/graph.json`
    try {
        await this.app.vault.adapter.write(graphJsonPath, JSON.stringify(data, null, 2));
    }
    catch (error){
        console.error(error)
    }
}