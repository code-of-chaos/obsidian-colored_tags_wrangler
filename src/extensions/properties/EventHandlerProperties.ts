import { IEventHandler } from "src/types/extensions";
import { IColoredTagRecord, ICoreSettings } from "src/types/settings";
import { tagMatchesPattern } from "src/lib/tag-utils";
import { rgbToString, rgbaToString } from "src/lib/color-converters";

export class EventHandlerProperties implements IEventHandler {
    private observer: MutationObserver | null = null;

    constructor(
        private records: IColoredTagRecord[],
        private settings: ICoreSettings
    ) {}

    register(): void {
        if (!this.settings.noteProperties) return;

        this.observer = new MutationObserver(() => {
            this.applyStyles();
        });

        this.observer.observe(document.body, {
            childList: true,
            subtree: true,
        });

        this.applyStyles();
    }

    unregister(): void {
        this.observer?.disconnect();
        this.observer = null;
        this.removeStyles();
    }

    private applyStyles(): void {
        const pills = document.querySelectorAll('div[data-property-key="tags"] div.multi-select-pill');
        pills.forEach((pill) => {
            const span = pill.querySelector("span");
            if (!span) return;

            const tagText = span.textContent ?? "";
            const matchingRecord = this.records.find((r) =>
                tagMatchesPattern(r.tag_name, tagText)
            );

            if (matchingRecord) {
                const pillEl = pill as HTMLElement;
                pillEl.style.backgroundColor = this.settings.enableBackgroundOpacity
                    ? rgbaToString({ ...matchingRecord.background_color, a: this.settings.backgroundOpacity })
                    : rgbToString(matchingRecord.background_color);
                pillEl.style.color = rgbToString(matchingRecord.color);
            }
        });
    }

    private removeStyles(): void {
        const pills = document.querySelectorAll('div[data-property-key="tags"] div.multi-select-pill');
        pills.forEach((pill) => {
            const pillEl = pill as HTMLElement;
            pillEl.style.removeProperty("background-color");
            pillEl.style.removeProperty("color");
        });
    }
}
