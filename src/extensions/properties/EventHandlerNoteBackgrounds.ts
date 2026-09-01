import { IEventHandler } from "src/types/extensions";
import { IColoredTagRecord, ICoreSettings } from "src/types/settings";
import { tagMatchesPattern } from "src/lib/tag-utils";
import { rgbToString, rgbaToString } from "src/lib/color-converters";

export class EventHandlerNoteBackgrounds implements IEventHandler {
    private observer: MutationObserver | null = null;

    constructor(
        private records: IColoredTagRecord[],
        private settings: ICoreSettings
    ) {}

    register(): void {
        if (!this.settings.noteBackgrounds) return;

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
        const page = document.querySelector('div.workspace-leaf-content[data-type="markdown"] div.view-content');
        if (!page) return;

        const pills = page.querySelectorAll("div.multi-select-pill");
        for (const pill of Array.from(pills)) {
            const span = pill.querySelector("span");
            if (!span) continue;

            const tagText = span.textContent ?? "";
            const matchingRecord = this.records.find((r) =>
                tagMatchesPattern(r.tag_name, tagText)
            );

            if (matchingRecord) {
                const pageEl = page as HTMLElement;
                pageEl.style.backgroundColor = this.settings.enableBackgroundOpacity
                    ? rgbaToString({ ...matchingRecord.background_color, a: this.settings.backgroundOpacity })
                    : rgbToString(matchingRecord.background_color);
                return;
            }
        }

        this.removeStyles();
    }

    private removeStyles(): void {
        const page = document.querySelector('div.workspace-leaf-content[data-type="markdown"] div.view-content');
        if (page) {
            (page as HTMLElement).style.removeProperty("background-color");
        }
    }
}
