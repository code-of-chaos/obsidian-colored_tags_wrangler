import { ICssWrangler } from "src/types/extensions";
import { IColoredTagRecord, ICoreSettings } from "src/types/settings";
import { tagMatchesPattern, getTags } from "src/lib/tag-utils";
import { tagNameToHrefSelector, tagNameToClassSelector } from "src/lib/css-selectors";
import { rgbToString, rgbaToString } from "src/lib/color-converters";

export class CssWranglerCore implements ICssWrangler {
    constructor(
        private records: IColoredTagRecord[],
        private settings: ICoreSettings
    ) {}

    getRules(): Record<string, Record<string, string>> {
        const rules: Record<string, Record<string, string>> = {};
        const themes = ["body.theme-light", "body.theme-dark"];

        for (const record of this.records) {
            if (!this.settings.noteTags) continue;

            const color = record.color;
            const bgColor = record.background_color;
            const opacity = this.settings.enableBackgroundOpacity
                ? this.settings.backgroundOpacity
                : 1;

            for (const theme of themes) {
                // Reading view tags
                const hrefSelector = tagNameToHrefSelector(record.tag_name);
                const hrefKey = `${theme} .tag${hrefSelector}`;
                rules[hrefKey] = {
                    color: rgbToString(color),
                    "background-color": opacity < 1
                        ? rgbaToString({ ...bgColor, a: opacity })
                        : rgbToString(bgColor),
                };

                // CM6 editing view tags
                const classSelector = tagNameToClassSelector(record.tag_name, "cm-tag-");
                const cmKey = `${theme} :where(.cm-hashtag)${classSelector}`;
                rules[cmKey] = {
                    color: rgbToString(color),
                    "background-color": opacity < 1
                        ? rgbaToString({ ...bgColor, a: opacity })
                        : rgbToString(bgColor),
                };
            }
        }

        return rules;
    }
}
