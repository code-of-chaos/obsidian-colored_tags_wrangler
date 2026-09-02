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
                // Dropdown triangle SVG stroke
                rules[`${theme} .nav-folder:has([data-path="${link.folder_path}"]) .nav-folder-title svg.svg-icon.right-triangle`] = {
                    stroke: `${rgbToString(color)}${important}`,
                };

                // Folder title color + text-decoration (60% opacity for decoration)
                rules[`${theme} .nav-folder:has([data-path="${link.folder_path}"]) .nav-folder-title-content`] = {
                    color: `${rgbToString(color)}${important}`,
                    "text-decoration-color": `${rgbaToString({ ...color, a: 0.6 })}${important}`,
                    "text-decoration-thickness": "2px",
                };

                // File title color
                rules[`${theme} .nav-folder:has([data-path="${link.folder_path}"]) .nav-file-title-content`] = {
                    color: `${rgbToString(color)}${important}`,
                };

                // Sidebar border-left (20% opacity)
                rules[`${theme} .nav-folder:has([data-path="${link.folder_path}"]) .nav-folder-children`] = {
                    "border-left": `2px solid ${rgbaToString({ ...color, a: 0.2 })}${important}`,
                };

                // Folder background + border-radius + padding + margin-bottom
                rules[`${theme} .nav-folder:has([data-path="${link.folder_path}"]) .nav-folder-title`] = {
                    "background-color": `${opacity < 1
                        ? rgbaToString({ ...bgColor, a: opacity })
                        : rgbToString(bgColor)}${important}`,
                    "border-radius": `${this.settings.borderRadius}${important}`,
                    padding: `${this.settings.padding}${important}`,
                    "margin-bottom": `${this.settings.padding}${important}`,
                };
            }
        }

        return rules;
    }
}
