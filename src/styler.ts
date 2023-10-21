// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {normalizePath, RGB, Vault} from "obsidian";
import MyPlugin from "./main";
import * as fs from "fs";
// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export class Styler{
    plugin: MyPlugin;
    styleEL: HTMLStyleElement;
    styleKanbanEL: HTMLStyleElement;


    // -----------------------------------------------------------------------------------------------------------------
    // Constructor
    // -----------------------------------------------------------------------------------------------------------------
    constructor(plugin: MyPlugin) {
        this.plugin = plugin;
        this.styleEL = document.createElement('style');
        this.styleKanbanEL = document.createElement('style');
    }
    // -----------------------------------------------------------------------------------------------------------------
    // Methods
    // -----------------------------------------------------------------------------------------------------------------
    private _assembleCSS():string {
        return Object.keys(this.plugin.settings?.customTagColors)
            .map(tagName => {
                const color: RGB = this.plugin.settings.customTagColors[tagName];
                // This only works because of the style.css of the project
                //  TODO either filter the `#` here or in the setting_tab, but I need to do it somewhere.
                return `.tag[href="#${tagName}"], .cm-tag-${tagName} { --color: ${color.r}, ${color.g}, ${color.b}; }`;
            }).join('\n');
    }

    // -----------------------------------------------------------------------------------------------------------------
    applyTagStyles() {
        this.removeTagStyles();
        this.styleEL.appendChild(document.createTextNode(this._assembleCSS()));
        document.head.appendChild(this.styleEL);
    }

    // -----------------------------------------------------------------------------------------------------------------
    removeTagStyles() {
        this.styleEL?.parentNode?.removeChild(this.styleEL);
    }

    // -----------------------------------------------------------------------------------------------------------------
    applyKanbanStyles() {
        this.styleKanbanEL.appendChild(document.createTextNode(
        `div[data-type="kanban"] a.tag>span,
            div.kanban-plugin a.tag>span,
            div[data-type="kanban"] .cm-hashtag-begin {
                visibility: hidden;
                position: absolute;
            }`
        ));
        document.head.appendChild(this.styleKanbanEL);
    }

    // -----------------------------------------------------------------------------------------------------------------
    removeKanbanStyles() {
        this.styleKanbanEL?.parentNode?.removeChild(this.styleKanbanEL);
    }

    // -----------------------------------------------------------------------------------------------------------------
    writeToCSSFile():void {
        // This method is currently unused, and that is by "design" for now.
        //  At some later point in the development of this plugin, this might be useful to make an export to Publish.

        const vault:Vault = this.plugin.app.vault;

        // Write the CSS to a file in the snippets folder
        //      I don't know why `adapter.basePath` is giving an error in my IDE, but it works ... ? why ?
        const cssFilePath:string = normalizePath(
        //      @ts-ignore ( well, now it isn't giving an error anymore sure because it is suppressed,
        //                 but it is still weird...)
            `${vault.adapter.basePath}/${vault.configDir}/snippets/tags-append.css`);

        try {
            fs.writeFileSync(cssFilePath, this._assembleCSS());
            console.log('Custom styles file written successfully:', cssFilePath);
        } catch (error) {
            console.error('Error writing custom styles file:', error);
        }
    }
}
