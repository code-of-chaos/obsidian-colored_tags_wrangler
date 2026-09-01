import { ICssWrangler } from "src/types/extensions";
import { IColoredTagRecord, IFolderNoteSettings } from "src/types/settings";
import { tagMatchesPattern } from "src/lib/tag-utils";
import { rgbToString, rgbaToString } from "src/lib/color-converters";

export class CssWranglerFolderNote implements ICssWrangler {
    constructor(
        private records: IColoredTagRecord[],
        private settings: IFolderNoteSettings
    ) {}

    getRules(): Record<string, Record<string, string>> {
        const rules: Record<string, Record<string, string>> = {};
        const themes = ["body.theme-light", "body.theme-dark"];

        if (!this.settings.enable) return rules;

        for (const link of this.settings.folderTagLinks) {
            const matchingRecord = this.records.find((r) =>
                tagMatchesPattern(r.tag_name, link.tag_name)
            );
            if (!matchingRecord) continue;

            const color = matchingRecord.color;
            const bgColor = matchingRecord.background_color;
            const opacity = this.settings.enableBackgroundOpacity
                ? this.settings.backgroundOpacity
                : 1;
            const important = this.settings.forceImportant ? " !important" : "";

            for (const theme of themes) {
                const folderKey = `${theme} .nav-folder:has([data-path="${link.folder_path}"]) .nav-folder-title`;
                rules[folderKey] = {
                    color: `${rgbToString(color)}${important}`,
                };

                const bgKey = `${theme} .nav-folder:has([data-path="${link.folder_path}"]) .nav-folder-title`;
                rules[bgKey] = {
                    "background-color": `${opacity < 1
                        ? rgbaToString({ ...bgColor, a: opacity })
                        : rgbToString(bgColor)}${important}`,
                };
            }
        }

        return rules;
    }
}
