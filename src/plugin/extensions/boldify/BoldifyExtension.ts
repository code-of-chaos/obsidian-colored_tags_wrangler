// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {TableContentPopulator} from "../../../contracts/plugin/ui/components/TableContentPopulator";
import {SettingTagRecordToggleComponent} from "../../ui/setting_tab/components/tag_table/SettingTagRecordToggleComponent";
import {IExtensionRecordBoldify} from "./IExtensionRecordBoldify";
import { ICssWrangler } from "src/contracts/plugin/services/css_styler/ICssWrangler";
import {BoldifyCssWrangler} from "./BoldifyCssWrangler";
import {capitalizeFirstLetter} from "../../../lib/StringUtils";
import {AbstractExtension} from "../AbstractExtension";


// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export class BoldifyExtension extends AbstractExtension {
    public cssWrangler: ICssWrangler = new BoldifyCssWrangler();
	public extensionName = 'boldify';
	public description = "TEMP extensions, used to boldify tags";
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
