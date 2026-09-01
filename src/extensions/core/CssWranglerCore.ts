import { ICssWrangler } from "src/types/extensions";
import { IColoredTagRecord, ICoreSettings } from "src/types/settings";
import { tagNameToHrefSelectors, tagNameToClassSelectors } from "src/lib/css-selectors";
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
            const styles = {
                color: rgbToString(color),
                "background-color": opacity < 1
                    ? rgbaToString({ ...bgColor, a: opacity })
                    : rgbToString(bgColor),
            };

            // Get all href selectors (raw, encoded, URI-encoded, lowercase)
            const hrefSelectors = tagNameToHrefSelectors(record.tag_name);
            const hrefSelectorList = hrefSelectors.map((s) => `.tag${s}`).join(", ");

            // Get all CM6 class selectors (direct, stripped, normalized)
            const cmSelectors = tagNameToClassSelectors(record.tag_name, "cm-tag-");
            const cmBeginSelectors = cmSelectors.map((s) => `.cm-hashtag-begin:has(+ ${s})`);
            const cmSelectorList = [...cmSelectors, ...cmBeginSelectors]
                .map((s) => `:where(.cm-hashtag)${s}`)
                .join(", ");

            for (const theme of themes) {
                // Reading view tags
                rules[`${theme} ${hrefSelectorList}`] = styles;

                // CM6 editing view tags
                rules[`${theme} ${cmSelectorList}`] = styles;
            }
        }

        return rules;
    }
}
