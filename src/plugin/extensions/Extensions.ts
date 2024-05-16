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

	// Extensions Ideas
	//		- Switch between Light & dark mode
	//		- Style makeup, bold / italic / size / ...
	//		-
];

export const ExtensionsDict: Record<string,IExtension> = ExtensionsList.reduce(
		(acc, e) => {
			acc[e.extensionName] = e;
			return acc;
		},
		{} as Record<string,IExtension>
	);

