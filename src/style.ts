// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {DataAdapter, normalizePath} from "obsidian";
import MyPlugin from "./main";
import * as fs from "fs";
// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export function applyTagStyles(plugin: MyPlugin) {
    // Generate and apply CSS for tag colors
    // console.warn(plugin.settings)
    const css = Object.keys(plugin.settings?.customTagColors)
        .map(tagName => {
            const color = plugin.settings.customTagColors[tagName];
            return `.tag[href="#${tagName}"], .cm-tag-${tagName} { --color: ${color.r}, ${color.g}, ${color.b}; }`;
        }).join('\n');

    // Write the CSS to a file in the snippets folder
    // const cssFilePath = normalizePath(`${plugin.app.vault.adapter.basePath}/${plugin.app.vault.configDir}/snippets/tags-append.css`);
    //
    // try {
    //     fs.writeFileSync(cssFilePath, css);
    //     console.log('Custom styles file written successfully:', cssFilePath);
    // } catch (error) {
    //     console.error('Error writing custom styles file:', error);
    // }

    // Add the CSS to the Obsidian app
    addCustomStyles(plugin, css);
    console.log({css})
}

export function  addCustomStyles(plugin: MyPlugin, css: string) {
    removeCustomStyles(plugin);
    plugin.styleElement = document.createElement('style');
    plugin.styleElement.appendChild(document.createTextNode(css));
    document.head.appendChild(plugin.styleElement);
}

export function  removeCustomStyles(plugin:MyPlugin) {
    plugin.styleElement?.parentNode?.removeChild(plugin.styleElement);
}
