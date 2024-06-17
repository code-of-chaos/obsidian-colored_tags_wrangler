// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {Debouncer, debounce} from "obsidian";
import {IColoredTagWrangler} from ".old/plugin/IColoredTagWrangler";

// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export abstract class EventHandler {
	plugin:IColoredTagWrangler;
	debounced_save_settings:Debouncer<any, any>

	public constructor(plugin:IColoredTagWrangler,) {
		this.plugin = plugin;
		this.debounced_save_settings = debounce(plugin.saveSettings.bind(plugin), 100);
	}

	abstract register():Promise<void>;
}
