// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {IColoredTagWranglerPlugin} from "src/contracts/plugin/IColoredTagWranglerPlugin";

// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export abstract class EventHandler {
	plugin: IColoredTagWranglerPlugin;

	public constructor(plugin: IColoredTagWranglerPlugin,) {
		this.plugin = plugin;
	}

	abstract register(): Promise<void>;
}
