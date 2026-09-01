import { ICssWrangler } from "src/types/extensions";
import { IColoredTagRecord, IKanbanSettings } from "src/types/settings";
import { tagNameToHrefSelector, tagNameToClassSelector } from "src/lib/css-selectors";
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
                    const classSelector = tagNameToClassSelector(record.tag_name, "has-tag-");
                    const cardKey = `${theme} div.kanban-plugin__item${classSelector}`;
                    rules[cardKey] = {
                        background: opacity < 1
                            ? rgbaToString({ ...bgColor, a: opacity })
                            : rgbToString(bgColor),
                        "border-color": rgbaToString({ ...color, a: this.settings.cardBorderOpacity }),
                    };
                }

                // Kanban lists
                if (record.kanban_lists_enabled && this.settings.enableLists) {
                    const hrefSelector = tagNameToHrefSelector(record.tag_name);
                    const listKey = `${theme} div.kanban-plugin__lane:has(div.kanban-plugin__lane-title-text a${hrefSelector})`;
                    rules[listKey] = {
                        background: opacity < 1
                            ? rgbaToString({ ...bgColor, a: opacity })
                            : rgbToString(bgColor),
                        "border-color": rgbaToString({ ...color, a: this.settings.listBorderOpacity }),
                    };
                }
            }
        }

        return rules;
    }
}
