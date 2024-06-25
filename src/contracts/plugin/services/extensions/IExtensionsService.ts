// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {IExtension} from "../../extensions/IExtension";
import {IExtensionRecord} from "../../extensions/IExtensionRecord";
import {IExtensionRecordCore} from "../../../../plugin/extensions/core/IExtensionRecordCssStyling";
import {IExtensionRecordStyling} from "../../../../plugin/extensions/styling/IExtensionRecordStyling";
import {IExtensionRecordCanvasCard} from "../../../../plugin/extensions/canvas_card/IExtensionRecordCanvasCard";

// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------

export interface IExtensionsService {
	readonly Core: IExtension<IExtensionRecordCore>
	readonly Styling: IExtension<IExtensionRecordStyling>
	readonly CanvasCards: IExtension<IExtensionRecordCanvasCard>

	// -----------------------------------------------------------------------------------------------------------------
	// Methods
	// -----------------------------------------------------------------------------------------------------------------
	get FullList(): IExtension<IExtensionRecord>[]

	get EnabledList(): IExtension<IExtensionRecord>[]

	get Dictionary(): Record<string, IExtension<IExtensionRecord>>

	get EnabledListAsStrings(): string[]

	setExtension(extension: IExtension<IExtensionRecord>, value: boolean): void
}
