import { ICssWrangler } from "src/types/extensions";
import { IColoredTagRecord, ICanvasSettings } from "src/types/settings";
import { tagNameToHrefSelectors } from "src/lib/css-selectors";
import { rgbToString, rgbaToString } from "src/lib/color-converters";

export class CssWranglerCanvas implements ICssWrangler {
    constructor(
        private records: IColoredTagRecord[],
        private settings: ICanvasSettings
    ) {}

    getRules(): Record<string, Record<string, string>> {
        const rules: Record<string, Record<string, string>> = {};
        const themes = ["body.theme-light", "body.theme-dark"];

        for (const record of this.records) {
            if (!record.canvas_enabled) continue;

            const color = record.color;
            const bgColor = record.background_color;
            const opacity = this.settings.enableBackgroundOpacity
                ? this.settings.backgroundOpacity
                : 1;

            for (const theme of themes) {
                const hrefSelectors = tagNameToHrefSelectors(record.tag_name);
                const selectorList = hrefSelectors.map((s) => `a${s}`).join(", ");
                const key = `${theme} div.canvas-node-container:has(div.markdown-embed-content :is(${selectorList}))`;
                rules[key] = {
                    "--canvas-color": `${color.r}, ${color.g}, ${color.b}`,
                    background: `${opacity < 1
                        ? rgbaToString({ ...bgColor, a: opacity })
                        : rgbToString(bgColor)} !important`,
                    "border-color": `${rgbToString(color)} !important`,
                };
            }
        }

        return rules;
    }
}
