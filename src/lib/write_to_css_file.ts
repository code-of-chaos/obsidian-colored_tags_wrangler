// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {normalizePath, Plugin, Vault}
	from "obsidian";
import * as fs
	from "fs";
// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------

// This method is currently unused, and that is by "design" for now.
//  At some later point in the development of this plugin, this might be useful to make an export to Publish.
function writeToCSSFile(plugin:Plugin, css_string:string, file_name:string):void {
	const vault:Vault = plugin.app.vault;

	// Correct the file_name
	file_name = file_name.endsWith(".css")
		? file_name
		: `${file_name}.css`;

	// Write the CSS to a file in the snippets folder
	//      I don't know why `adapter.basePath` is giving an error in my IDE, but it works ... ? why ?
	const cssFilePath:string = normalizePath(
		//      @ts-ignore ( well, now it isn't giving an error anymore sure because it is suppressed,
		//                 but it is still weird...)
		`${vault.adapter.basePath}/${vault.configDir}/snippets/${file_name}.css`);

	try {
		fs.writeFileSync(cssFilePath, css_string);
		console.log('Custom style_manager file written successfully:', cssFilePath);
	} catch (error) {
		console.error('Error writing custom style_manager file:', error);
	}
}
