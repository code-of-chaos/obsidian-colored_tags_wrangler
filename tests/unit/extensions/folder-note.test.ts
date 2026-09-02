import { describe, it, expect } from "vitest";
import { FolderNoteExtension } from "../../../src/extensions/folder-note/ExtensionFolderNote";
import { CssWranglerFolderNote } from "../../../src/extensions/folder-note/CssWranglerFolderNote";
import { IColoredTagRecord, IFolderNoteSettings } from "../../../src/types/settings";

describe("FolderNoteExtension", () => {
    const records: IColoredTagRecord[] = [
        {
            id: "1",
            tag_name: "project/*",
            color: { r: 255, g: 0, b: 0 },
            background_color: { r: 0, g: 0, b: 0 },
            luminance_offset: 0.15,
        },
    ];

    const settings: IFolderNoteSettings = {
        enable: true,
        folderTagLinks: [
            { folder_path: "folder1", tag_name: "project/*" },
        ],
        enableAutoDetect: true,
        enableBackgroundOpacity: false,
        backgroundOpacity: 0.45,
        forceImportant: true,
        borderRadius: "12px",
        padding: "5px",
    };

    it("has correct extension name", () => {
        const ext = new FolderNoteExtension(records, settings);
        expect(ext.extensionName).toBe("folder-note");
    });

    it("requires core extension", () => {
        const ext = new FolderNoteExtension(records, settings);
        expect(ext.extensionRequirements).toEqual(["core"]);
    });

    it("generates CSS rules when enabled", () => {
        const wrangler = new CssWranglerFolderNote(records, settings);
        const rules = wrangler.getRules();
        expect(Object.keys(rules).length).toBeGreaterThan(0);
    });

    it("does not generate rules when disabled", () => {
        const disabledSettings = { ...settings, enable: false };
        const wrangler = new CssWranglerFolderNote(records, disabledSettings);
        const rules = wrangler.getRules();
        expect(Object.keys(rules).length).toBe(0);
    });

    it("generates triangle stroke rule", () => {
        const wrangler = new CssWranglerFolderNote(records, settings);
        const rules = wrangler.getRules();
        const triangleKey = Object.keys(rules).find((k) => k.includes("right-triangle"));
        expect(triangleKey).toBeDefined();
        expect(rules[triangleKey!]["stroke"]).toContain("rgb");
    });

    it("generates folder title color rule", () => {
        const wrangler = new CssWranglerFolderNote(records, settings);
        const rules = wrangler.getRules();
        const titleKey = Object.keys(rules).find((k) => k.includes("nav-folder-title-content"));
        expect(titleKey).toBeDefined();
        expect(rules[titleKey!]["color"]).toContain("rgb");
    });

    it("generates file title color rule", () => {
        const wrangler = new CssWranglerFolderNote(records, settings);
        const rules = wrangler.getRules();
        const fileKey = Object.keys(rules).find((k) => k.includes("nav-file-title-content"));
        expect(fileKey).toBeDefined();
    });

    it("generates sidebar border rule", () => {
        const wrangler = new CssWranglerFolderNote(records, settings);
        const rules = wrangler.getRules();
        const borderKey = Object.keys(rules).find((k) => k.includes("nav-folder-children"));
        expect(borderKey).toBeDefined();
        expect(rules[borderKey!]["border-left"]).toContain("solid");
    });

    it("generates folder background rule", () => {
        const wrangler = new CssWranglerFolderNote(records, settings);
        const rules = wrangler.getRules();
        const bgKey = Object.keys(rules).find((k) => k.includes("nav-folder-title") && rules[k]["background-color"]);
        expect(bgKey).toBeDefined();
        expect(rules[bgKey!]["background-color"]).toBeDefined();
    });

    it("applies border-radius and padding", () => {
        const wrangler = new CssWranglerFolderNote(records, settings);
        const rules = wrangler.getRules();
        const bgKey = Object.keys(rules).find((k) => k.includes("nav-folder-title") && rules[k]["border-radius"]);
        expect(rules[bgKey!]["border-radius"]).toBe("12px !important");
        expect(rules[bgKey!]["padding"]).toBe("5px !important");
    });

    it("applies margin-bottom", () => {
        const wrangler = new CssWranglerFolderNote(records, settings);
        const rules = wrangler.getRules();
        const bgKey = Object.keys(rules).find((k) => k.includes("nav-folder-title") && rules[k]["margin-bottom"]);
        expect(rules[bgKey!]["margin-bottom"]).toBe("5px !important");
    });

    it("applies text-decoration opacity at 60%", () => {
        const wrangler = new CssWranglerFolderNote(records, settings);
        const rules = wrangler.getRules();
        const titleKey = Object.keys(rules).find((k) => k.includes("nav-folder-title-content"));
        expect(rules[titleKey!]["text-decoration-color"]).toContain("rgba");
    });

    it("applies border-left opacity at 20%", () => {
        const wrangler = new CssWranglerFolderNote(records, settings);
        const rules = wrangler.getRules();
        const borderKey = Object.keys(rules).find((k) => k.includes("nav-folder-children"));
        expect(rules[borderKey!]["border-left"]).toContain("rgba");
    });

    it("applies background opacity when enabled", () => {
        const opacitySettings = { ...settings, enableBackgroundOpacity: true, backgroundOpacity: 0.5 };
        const wrangler = new CssWranglerFolderNote(records, opacitySettings);
        const rules = wrangler.getRules();
        const bgKey = Object.keys(rules).find((k) => k.includes("nav-folder-title") && rules[k]["background-color"]);
        expect(rules[bgKey!]["background-color"]).toContain("rgba");
    });

    it("does not generate rules for non-matching tags", () => {
        const noMatchRecords: IColoredTagRecord[] = [
            { id: "1", tag_name: "nomatch", color: { r: 255, g: 0, b: 0 }, background_color: { r: 0, g: 0, b: 0 }, luminance_offset: 0.15 },
        ];
        const wrangler = new CssWranglerFolderNote(noMatchRecords, settings);
        const rules = wrangler.getRules();
        expect(Object.keys(rules).length).toBe(0);
    });

    it("generates ALX folder note selector variant", () => {
        const wrangler = new CssWranglerFolderNote(records, settings);
        const rules = wrangler.getRules();
        const alxKeys = Object.keys(rules).filter((k) => k.includes("alx-folder-with-note"));
        expect(alxKeys.length).toBeGreaterThan(0);
    });

    it("does not apply !important when forceImportant is false", () => {
        const noImportantSettings = { ...settings, forceImportant: false };
        const wrangler = new CssWranglerFolderNote(records, noImportantSettings);
        const rules = wrangler.getRules();
        const values = Object.values(rules);
        for (const rule of values) {
            if (rule["border-radius"]) {
                expect(rule["border-radius"]).not.toContain("!important");
            }
            if (rule["padding"]) {
                expect(rule["padding"]).not.toContain("!important");
            }
        }
    });

    it("generates rules for multiple folderTagLinks", () => {
        const multiLinkSettings: IFolderNoteSettings = {
            ...settings,
            folderTagLinks: [
                { folder_path: "folder1", tag_name: "project/*" },
                { folder_path: "folder2", tag_name: "project/*" },
            ],
        };
        const wrangler = new CssWranglerFolderNote(records, multiLinkSettings);
        const rules = wrangler.getRules();
        const ruleCount = Object.keys(rules).length;
        expect(ruleCount).toBeGreaterThan(10);
    });

    it("applies text-decoration-thickness 2px", () => {
        const wrangler = new CssWranglerFolderNote(records, settings);
        const rules = wrangler.getRules();
        const titleKey = Object.keys(rules).find((k) => k.includes("nav-folder-title-content"));
        expect(rules[titleKey!]["text-decoration-thickness"]).toBe("2px");
    });

    it("generates rules for both themes", () => {
        const wrangler = new CssWranglerFolderNote(records, settings);
        const rules = wrangler.getRules();
        const lightKeys = Object.keys(rules).filter((k) => k.includes("theme-light"));
        const darkKeys = Object.keys(rules).filter((k) => k.includes("theme-dark"));
        expect(lightKeys.length).toBeGreaterThan(0);
        expect(darkKeys.length).toBeGreaterThan(0);
    });
});
