// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {App, DataAdapter, normalizePath, RGB} from "obsidian";
import MyPlugin from "./main";
import * as fs from "fs";
// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export class Styler{
    plugin: MyPlugin;
    styleEL: HTMLStyleElement ;

    // -----------------------------------------------------------------------------------------------------------------
    // Constructor
    // -----------------------------------------------------------------------------------------------------------------
    constructor(plugin: MyPlugin) {
        this.plugin = plugin;
        this.styleEL = document.createElement('style');
    }
    // -----------------------------------------------------------------------------------------------------------------
    // Methods
    // -----------------------------------------------------------------------------------------------------------------
    private _assembleCSS():string {
        const css : string =  Object.keys(this.plugin.settings?.customTagColors)
            .map(tagName => {
                const color : RGB = this.plugin.settings.customTagColors[tagName];
                // This only works because of the style.css of the project
                return `.tag[href="#${tagName}"], .cm-tag-${tagName} { --color: ${color.r}, ${color.g}, ${color.b}; }`;
            }).join('\n');
        console.log({css})
        return css;
    }

    applyTagStyles() {
        this.addCustomStyles(this._assembleCSS());
    }

    // -----------------------------------------------------------------------------------------------------------------
    addCustomStyles(css: string) {
        this.removeCustomStyles();
        this.styleEL.appendChild(document.createTextNode(css));
        document.head.appendChild(this.styleEL);
    }

    // -----------------------------------------------------------------------------------------------------------------
    removeCustomStyles() {
        this.styleEL?.parentNode?.removeChild(this.styleEL);
    }

    // -----------------------------------------------------------------------------------------------------------------
    writeToCSSFile():void {
        // Write the CSS to a file in the snippets folder
        //      I don't know why `adapter.basePath` is giving an error in my IDE, but it works ... ? why ?
        //      @ts-ignore ( well, now it isn't giving an error anymore...)
        const cssFilePath = normalizePath(`${this.plugin.app.vault.adapter.basePath}/${this.plugin.app.vault.configDir}/snippets/tags-append.css`);

        try {
            fs.writeFileSync(cssFilePath, this._assembleCSS());
            console.log('Custom styles file written successfully:', cssFilePath);
        } catch (error) {
            console.error('Error writing custom styles file:', error);
        }
    }
}
