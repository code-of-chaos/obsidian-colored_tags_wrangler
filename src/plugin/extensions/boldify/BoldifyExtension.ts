// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {TableContentPopulator} from "../../../contracts/plugin/ui/components/TableContentPopulator";
import {
	SettingTagRecordToggleComponent
} from "../../ui/setting_tab/components/tag_table/SettingTagRecordToggleComponent";
import {IExtension} from "../../../contracts/plugin/extensions/IExtension";
import {IExtensionRecordBoldify} from "./IExtensionRecordBoldify";
import { ICssWrangler } from "src/contracts/plugin/services/css_styler/ICssWrangler";
import {BoldifyCssWrangler} from "./BoldifyCssWrangler";
import {capitalizeFirstLetter} from "../../../lib/StringUtils";


// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export class BoldifyExtension implements IExtension {
    public cssWrangler: ICssWrangler = new BoldifyCssWrangler();
	public extensionName = 'boldify';
	public TableContentPopulators : TableContentPopulator[] = [
		{
			title: capitalizeFirstLetter(this.extensionName),
			callback:(rowData) => new SettingTagRecordToggleComponent(rowData,
				"boldify_enabled"),
			classes:[]
		}
	]

	public getDefaultRecord():IExtensionRecordBoldify{
		return { boldify_enabled: false };
	}
}
