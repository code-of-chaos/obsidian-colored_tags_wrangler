import { ICssWrangler } from "src/types/extensions";
import { IColoredTagRecord, IKanbanSettings } from "src/types/settings";
import { tagNameToHrefSelectors, tagNameToClassSelectors } from "src/lib/css-selectors";
import { rgbToString, rgbaToString } from "src/lib/color-converters";

export class CssWranglerKanban implements ICssWrangler {
    constructor(
        private records: IColoredTagRecord[],
        private settings: IKanbanSettings
    ) {}

    getRules(): Record<string, Record<string, string>> {
        const rules: Record<string, Record<string, string>> = {};
        const themes = ["body.theme-light", "body.theme-dark"];

        for (const record of this.records) {
            const color = record.color;
            const bgColor = record.background_color;
            const opacity = this.settings.enableBackgroundOpacity
                ? this.settings.backgroundOpacity
                : 1;

            for (const theme of themes) {
                // Kanban cards
                if (record.kanban_cards_enabled && this.settings.enableCards) {
                    const cmSelectors = tagNameToClassSelectors(record.tag_name, "has-tag-");
                    const selectorList = cmSelectors
                        .map((s) => `div.kanban-plugin__item${s}`)
                        .join(", ");

                    rules[`${theme} ${selectorList}`] = {
                        background: opacity < 1
                            ? rgbaToString({ ...bgColor, a: opacity })
                            : rgbToString(bgColor),
                        "border-color": rgbaToString({ ...color, a: this.settings.cardBorderOpacity }),
                    };

                    // Title wrapper background
                    const titleSelectors = cmSelectors
                        .map((s) => `div.kanban-plugin__item${s} div.kanban-plugin__item-title-wrapper`)
                        .join(", ");

                    rules[`${theme} ${titleSelectors}`] = {
                        background: opacity < 1
                            ? rgbaToString({ ...bgColor, a: opacity })
                            : rgbToString(bgColor),
                    };
                }

                // Kanban lists
                if (record.kanban_lists_enabled && this.settings.enableLists) {
                    const hrefSelectors = tagNameToHrefSelectors(record.tag_name);
                    const laneSelectors = hrefSelectors
                        .map((s) => `div.kanban-plugin__lane:has(div.kanban-plugin__lane-title-text a${s})`)
                        .join(", ");

                    rules[`${theme} ${laneSelectors}`] = {
                        background: opacity < 1
                            ? rgbaToString({ ...bgColor, a: opacity })
                            : rgbToString(bgColor),
                        "border-color": rgbaToString({ ...color, a: this.settings.listBorderOpacity }),
                    };

                    // Lane header border
                    const headerSelectors = hrefSelectors
                        .map((s) => `div.kanban-plugin__lane-header-wrapper:has(div.kanban-plugin__lane-title-text a${s})`)
                        .join(", ");

                    rules[`${theme} ${headerSelectors}`] = {
                        "border-color": rgbaToString({ ...color, a: this.settings.listBorderOpacity }),
                    };
                }

                // Kanban hide hashtags
                if (this.settings.hideHashtags) {
                    rules[`${theme} div[data-type="kanban"] a.tag span`] = {
                        visibility: "hidden",
                        position: "absolute",
                    };
                    rules[`${theme} div.kanban-plugin a.tag span`] = {
                        visibility: "hidden",
                        position: "absolute",
                    };
                }
            }
        }

        return rules;
    }
}
