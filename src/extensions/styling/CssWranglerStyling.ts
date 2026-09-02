import { ICssWrangler } from "src/types/extensions";
import { IColoredTagRecord, ICoreSettings } from "src/types/settings";

export class CssWranglerStyling implements ICssWrangler {
    constructor(
        private records: IColoredTagRecord[],
        private settings: ICoreSettings
    ) {}

    getRules(): Record<string, Record<string, string>> {
        const rules: Record<string, Record<string, string>> = {};

        // Tags no-wrap
        if (this.settings.tagsNoWrap) {
            rules["a.tag"] = {
                "white-space": this.settings.tagsNoWrapText,
            };
        }

        return rules;
    }
}
