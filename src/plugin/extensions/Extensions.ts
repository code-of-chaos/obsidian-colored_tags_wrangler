// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {BoldifyExtension} from "./boldify/boldify";
import {CoreExtension} from "./core/core";
import {IExtension} from "../../contracts/plugin/extensions/IExtension";

// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export const ExtensionsList : IExtension[] = [
	new CoreExtension(),
	new BoldifyExtension()
];

export const ExtensionsDict: Record<string,IExtension> = ExtensionsList.reduce(
		(acc, e) => {
			acc[e.constructor.name] = e;
			return acc;
		},
		{} as Record<string,IExtension>
	);
