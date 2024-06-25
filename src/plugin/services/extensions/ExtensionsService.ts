// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {IExtensionsService} from "../../../contracts/plugin/services/extensions/IExtensionsService";
import {IExtension} from "../../../contracts/plugin/extensions/IExtension";
import {ExtensionCore} from "../../extensions/core/ExtensionCore";
import {ExtensionStyling} from "../../extensions/styling/ExtensionStyling";
import {ISettingsService} from "../../../contracts/plugin/services/settings/ISettingsService";
import {IExtensionRecord} from "../../../contracts/plugin/extensions/IExtensionRecord";
import {ExtensionCanvasCard} from "../../extensions/canvas_card/ExtensionCanvasCard";
import {ExtensionNestedTags} from "../../extensions/nested_tags/ExtensionNestedTags";

// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export class ExtensionsService implements IExtensionsService {
	public readonly Extensions = {
		Core : new ExtensionCore(),
		Styling: new ExtensionStyling(),
		CanvasCards: new ExtensionCanvasCard(),
		NestedTags:  new ExtensionNestedTags(),
	}

	private _settings: ISettingsService;
	private _List: IExtension<IExtensionRecord>[] | undefined;

	public get FullList(): IExtension<IExtensionRecord>[] {
		return this._List ??= Object.values(this.Extensions);
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

	public get EnabledListAsStrings(): string[] {
		return this.EnabledList.map(e => e.extensionName);
	}

	// -----------------------------------------------------------------------------------------------------------------
	// Constructors
	// -----------------------------------------------------------------------------------------------------------------
	constructor(settings: ISettingsService) {
		this._settings = settings;
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

	private AsDictionary(): Record<string, IExtension<IExtensionRecord>> {
		return Object.values(this.Extensions).reduce(
			(acc, e) => {
				acc[e.extensionName] = e;
				return acc;
			},
			{} as Record<string, IExtension<IExtensionRecord>>
		);
	}
}
