import { describe, it, expect } from "vitest";
import { generateId } from "../../src/lib/string-utils";
import {
    migrate00to01,
    migrate01to02,
    migrate03to04,
    migrate04to05,
    migrate05to06,
    migrate06to07,
    migrate07to08,
    migrate08to09,
    migrate09to10,
    migrate10to11,
    migrate11to12,
    migrate12to13,
    migrate13to14,
} from "../../src/types/migrations/migrate-00-to-14";

describe("migrations v0-v14", () => {
    describe("generateId", () => {
        it("generates unique IDs", () => {
            const id1 = generateId();
            const id2 = generateId();
            expect(id1).not.toBe(id2);
            expect(id1.length).toBeGreaterThan(0);
        });
    });

    describe("migrate00to01", () => {
        it("converts flat Record to UUID-keyed records", () => {
            const data = {
                TagColors: {
                    ColorPicker: {
                        "project": { r: 255, g: 0, b: 0 },
                        "meeting": { r: 0, g: 255, b: 0 },
                    },
                },
                Info: { SettingsVersion: 0 },
            };

            const result = migrate00to01(data);
            const picker = result.TagColors.ColorPicker;

            expect(Object.keys(picker)).toHaveLength(2);
            expect(picker[Object.keys(picker)[0]].tag_name).toBe("project");
            expect(picker[Object.keys(picker)[1]].tag_name).toBe("meeting");
            expect(result.Info.SettingsVersion).toBe(1);
        });
    });

    describe("migrate04to05", () => {
        it("adds background_color and background_opacity", () => {
            const data = {
                TagColors: {
                    ColorPicker: {
                        "abc": { tag_name: "project", color: { r: 255, g: 0, b: 0 } },
                    },
                },
                Info: { SettingsVersion: 4 },
            };

            const result = migrate04to05(data);
            const entry = result.TagColors.ColorPicker["abc"];

            expect(entry.background_color).toEqual({ r: 255, g: 0, b: 0 });
            expect(entry.background_opacity).toBe(0.2);
        });
    });

    describe("migrate05to06", () => {
        it("copies Kanban.Enable to Kanban.HideHashtags", () => {
            const data = {
                Kanban: { Enable: true },
                Info: { SettingsVersion: 5 },
            };

            const result = migrate05to06(data);
            expect(result.Kanban.HideHashtags).toBe(true);
        });
    });

    describe("migrate06to07", () => {
        it("adds luminance settings and fixes background colors", () => {
            const data = {
                TagColors: {
                    ColorPicker: {
                        "abc": {
                            tag_name: "project",
                            color: { r: 255, g: 0, b: 0 },
                            background_color: { r: 255, g: 0, b: 0 }, // Same as color (bug)
                            background_opacity: 0.2,
                        },
                    },
                },
                Info: { SettingsVersion: 6 },
            };

            const result = migrate06to07(data);
            const entry = result.TagColors.ColorPicker["abc"];

            expect(entry.luminance_offset).toBe(0.15);
            expect(entry.background_opacity).toBeUndefined();
            expect(entry.background_color).not.toEqual({ r: 255, g: 0, b: 0 });
        });
    });

    describe("migrate08to09", () => {
        it("adds CSS section", () => {
            const data = { Info: { SettingsVersion: 8 } };
            const result = migrate08to09(data);

            expect(result.CSS).toEqual({
                Enable: false,
                TagsNoWrap: false,
                TagsNoWrapText: "pre",
            });
        });
    });

    describe("migrate09to10", () => {
        it("adds granular CSS toggles and removes Enable", () => {
            const data = {
                CSS: { Enable: false, TagsNoWrap: false, TagsNoWrapText: "pre" },
                Info: { SettingsVersion: 9 },
            };

            const result = migrate09to10(data);
            expect(result.CSS.Enable).toBeUndefined();
            expect(result.CSS.NoteTags).toBe(true);
            expect(result.CSS.NoteBackgrounds).toBe(false);
            expect(result.CSS.NoteProperties).toBe(true);
        });
    });

    describe("migrate10to11", () => {
        it("converts ColorPicker from Record to Array", () => {
            const data = {
                TagColors: {
                    ColorPicker: {
                        "abc": { tag_name: "project", color: { r: 255, g: 0, b: 0 } },
                    },
                },
                Info: { SettingsVersion: 10 },
            };

            const result = migrate10to11(data);
            expect(Array.isArray(result.TagColors.ColorPicker)).toBe(true);
            expect(result.TagColors.ColorPicker).toHaveLength(1);
        });

        it("adds Debug settings", () => {
            const data = { Info: { SettingsVersion: 10 } };
            const result = migrate10to11(data);
            expect(result.Debug).toEqual({
                Enable: false,
                EnableExperimentalCommands: false,
            });
        });
    });

    describe("migrate11to12", () => {
        it("converts FolderTagLinks from Record to Array", () => {
            const data = {
                FolderNote: {
                    FolderTagLinks: {
                        "abc": { folder_path: "folder", tag_name: "tag" },
                    },
                },
                Info: { SettingsVersion: 11 },
            };

            const result = migrate11to12(data);
            expect(Array.isArray(result.FolderNote.FolderTagLinks)).toBe(true);
            expect(result.FolderNote.FolderTagLinks).toHaveLength(1);
        });
    });

    describe("migrate12to13", () => {
        it("propagates background opacity settings", () => {
            const data = {
                TagColors: { EnableBackgroundOpacity: true, BackgroundOpacity: 0.5 },
                FolderNote: { Values: {} },
                Kanban: { Values: {} },
                Canvas: { Values: {} },
                Info: { SettingsVersion: 12 },
            };

            const result = migrate12to13(data);
            expect(result.FolderNote.EnableBackgroundOpacity).toBe(true);
            expect(result.FolderNote.Values.BackgroundOpacity).toBe(0.5);
            expect(result.Kanban.EnableBackgroundOpacity).toBe(true);
            expect(result.Canvas.EnableBackgroundOpacity).toBe(true);
        });
    });

    describe("migrate13to14", () => {
        it("bumps version to 14", () => {
            const data = { Info: { SettingsVersion: 13 } };
            const result = migrate13to14(data);
            expect(result.Info.SettingsVersion).toBe(14);
        });
    });
});
