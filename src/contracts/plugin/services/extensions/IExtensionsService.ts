// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {IExtension} from "../../extensions/IExtension";
import {IExtensionRecord} from "../../extensions/IExtensionRecord";
import {IExtensionRecordCore} from "../../../../plugin/extensions/core/IExtensionRecordCssStyling";
import {IExtensionRecordCssStyling} from "../../../../plugin/extensions/styling/IExtensionRecordCssStyling";
import {IExtensionRecordCanvasCard} from "../../../../plugin/extensions/canvas_card/IExtensionRecordCanvasCard";

// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------

export interface IExtensionsService {
	readonly Core: IExtension<IExtensionRecordCore>
	readonly CssStyling: IExtension<IExtensionRecordCssStyling>
	readonly CanvasCards: IExtension<IExtensionRecordCanvasCard>

	// -----------------------------------------------------------------------------------------------------------------
	// Methods
	// -----------------------------------------------------------------------------------------------------------------
	get FullList(): IExtension<IExtensionRecord>[]

	get EnabledList(): IExtension<IExtensionRecord>[]

	get Dictionary(): Record<string, IExtension<IExtensionRecord>>

	setExtension(extension: IExtension<IExtensionRecord>, value: boolean): void
}
