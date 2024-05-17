// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {BoldifyExtension} from "./boldify/BoldifyExtension";
import {CoreExtension} from "./core/CoreExtension";
import {IExtension} from "../../contracts/plugin/extensions/IExtension";

// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export class Extensions {
	public static readonly Core = new CoreExtension();
	public static readonly Boldify = new BoldifyExtension();

	// Extensions Ideas
	//		- Switch between Light & dark mode
	//		- Style makeup, bold / italic / size / ...
	//		-


	private static _List : IExtension[] | undefined;
	public static get List(): IExtension[] {
		return this._List ??= Extensions.AsList();
	}

	private static _Dictionary : Record<string, IExtension> | undefined;
	public static get Dictionary(): Record<string, IExtension> {
		return this._Dictionary ??= Extensions.AsDictionary();
	}
	// -----------------------------------------------------------------------------------------------------------------
	// Code
	// -----------------------------------------------------------------------------------------------------------------
	private static AsList() : IExtension[] {return[
		Extensions.Core,
		Extensions.Boldify,
	]}

	private static AsDictionary() : Record<string, IExtension> {
		return this.AsList().reduce(
			(acc, e) => {
				acc[e.extensionName] = e;
				return acc;
			},
			{} as Record<string,IExtension>
		);
	}
}


