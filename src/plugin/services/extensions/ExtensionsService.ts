// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {IExtensionsService} from "../../../contracts/plugin/services/extensions/IExtensionsService";
import {IExtension} from "../../../contracts/plugin/extensions/IExtension";
import {CoreExtension} from "../../extensions/core/CoreExtension";
import {BoldifyExtension} from "../../extensions/boldify/BoldifyExtension";
import {IColoredTagRecord} from "../../../contracts/plugin/settings/IColoredTagRecord";

// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export class ExtensionsService implements IExtensionsService {
	public readonly Core: IExtension
	public readonly Boldify: IExtension

	// Extensions Ideas
	//		- Switch between Light & dark mode
	//		- Style makeup, bold / italic / size / ...
	//		-

	private _List : IExtension[] | undefined;
	public get List(): IExtension[] {
		return this._List ??= this.AsList();
	}

	private _Dictionary : Record<string, IExtension> | undefined;
	public get Dictionary(): Record<string, IExtension> {
		return this._Dictionary ??= this.AsDictionary();
	}

	// -----------------------------------------------------------------------------------------------------------------
	// Constructors
	// -----------------------------------------------------------------------------------------------------------------
	constructor() {
		this.Core = new CoreExtension();
		this.Boldify = new BoldifyExtension();
	}

	// -----------------------------------------------------------------------------------------------------------------
	// Methods
	// -----------------------------------------------------------------------------------------------------------------
	private AsList() : IExtension[] {return[
		this.Core,
		this.Boldify,
	]}

	private AsDictionary() : Record<string, IExtension> {
		return this.AsList().reduce(
			(acc, e) => {
				acc[e.extensionName] = e;
				return acc;
			},
			{} as Record<string,IExtension>
		);
	}

	public getDefaultRecord() : IColoredTagRecord {
		return this.List.reduce(
			(acc:IColoredTagRecord, cur : IExtension) => ({...acc, ...cur.getDefaultRecord()}) ,
			{} as IColoredTagRecord
		) as IColoredTagRecord
	}
}
