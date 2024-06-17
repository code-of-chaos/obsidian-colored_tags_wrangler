// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {IExtensionsService} from "../../../contracts/plugin/services/extensions/IExtensionsService";
import {IExtension} from "../../../contracts/plugin/extensions/IExtension";
import {CoreExtension} from "../../extensions/core/CoreExtension";
import {CssStylingExtension} from "../../extensions/styling/CssStylingExtension";
import {ISettingsService} from "../../../contracts/plugin/services/settings/ISettingsService";

// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export class ExtensionsService implements IExtensionsService {
	public readonly Core: IExtension
	public readonly CssStyling: IExtension

	// Extensions Ideas
	//		- Switch between Light & dark mode
	//		- Style makeup, bold / italic / size / ...
	//		-

	private _settings: ISettingsService;

	private _List: IExtension[] | undefined;

	// -----------------------------------------------------------------------------------------------------------------
	constructor(settings: ISettingsService) {
		this._settings = settings;
		this.Core = new CoreExtension();
		this.CssStyling = new CssStylingExtension();
	}

	public get FullList(): IExtension[] {
		return this._List ??= this.AsList();
	}

	private _EnabledList: IExtension[] | undefined;

	public get EnabledList(): IExtension[] {

		console.warn(this._settings.data.EnabledExtensions)

		return this._EnabledList ?? this.FullList
			.filter(e => this._settings.data.EnabledExtensions.contains(e.extensionName));
	}

	private _Dictionary: Record<string, IExtension> | undefined;

	// -----------------------------------------------------------------------------------------------------------------
	// Constructors

	public get Dictionary(): Record<string, IExtension> {
		return this._Dictionary ??= this.AsDictionary();
	}

	// -----------------------------------------------------------------------------------------------------------------
	// Methods
	// -----------------------------------------------------------------------------------------------------------------
	public setExtension(extension: IExtension, value: boolean): void {
		if (value) {
			this._settings.data.EnabledExtensions.push(extension.extensionName)
		} else {
			if (this._settings.data.EnabledExtensions.contains(extension.extensionName)) {
				this._settings.data.EnabledExtensions.remove(extension.extensionName)
			}
		}
		this._EnabledList = undefined // Invalidate it
	}

	private AsList(): IExtension[] {
		return [
			this.Core,
			this.CssStyling,
		]
	}

	private AsDictionary(): Record<string, IExtension> {
		return this.AsList().reduce(
			(acc, e) => {
				acc[e.extensionName] = e;
				return acc;
			},
			{} as Record<string, IExtension>
		);
	}
}
