// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {IExtensionsService} from "../../../contracts/plugin/services/extensions/IExtensionsService";
import {IExtension} from "../../../contracts/plugin/extensions/IExtension";
import {CoreExtension} from "../../extensions/core/CoreExtension";
import {CssStylingExtension} from "../../extensions/styling/CssStylingExtension";
import {ISettingsService} from "../../../contracts/plugin/services/settings/ISettingsService";
import {IExtensionRecord} from "../../../contracts/plugin/extensions/IExtensionRecord";
import {IExtensionRecordCore} from "../../extensions/core/IExtensionRecordCssStyling";
import {IExtensionRecordCssStyling} from "../../extensions/styling/IExtensionRecordCssStyling";

// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export class ExtensionsService implements IExtensionsService {
	public readonly Core: IExtension<IExtensionRecordCore>
	public readonly CssStyling: IExtension<IExtensionRecordCssStyling>

	private _settings: ISettingsService;
	private _List: IExtension<IExtensionRecord>[] | undefined;

	public get FullList(): IExtension<IExtensionRecord>[] {
		return this._List ??= this.AsList();
	}

	private _EnabledList: IExtension<IExtensionRecord>[] | undefined;
	public get EnabledList(): IExtension<IExtensionRecord>[] {
		return this._EnabledList ?? this.FullList
			.filter(e => this._settings.data.EnabledExtensions.contains(e.extensionName));
	}

	private _Dictionary: Record<string, IExtension<IExtensionRecord>> | undefined;

	public get Dictionary(): Record<string, IExtension<IExtensionRecord>> {
		return this._Dictionary ??= this.AsDictionary();
	}

	// -----------------------------------------------------------------------------------------------------------------
	// Constructors
	// -----------------------------------------------------------------------------------------------------------------
	constructor(settings: ISettingsService) {
		this._settings = settings;
		this.Core = new CoreExtension();
		this.CssStyling = new CssStylingExtension();
	}

	// -----------------------------------------------------------------------------------------------------------------
	// Methods
	// -----------------------------------------------------------------------------------------------------------------
	public setExtension(extension: IExtension<IExtensionRecord>, value: boolean): void {
		if (value) {
			this._settings.data.EnabledExtensions.push(extension.extensionName)
		} else {
			if (this._settings.data.EnabledExtensions.contains(extension.extensionName)) {
				this._settings.data.EnabledExtensions.remove(extension.extensionName)
			}
		}
		this._EnabledList = undefined // Invalidate it
	}

	private AsList(): IExtension<IExtensionRecord>[] {
		return [
			this.Core,
			this.CssStyling,
		]
	}

	private AsDictionary(): Record<string, IExtension<IExtensionRecord>> {
		return this.AsList().reduce(
			(acc, e) => {
				acc[e.extensionName] = e;
				return acc;
			},
			{} as Record<string, IExtension<IExtensionRecord>>
		);
	}
}
