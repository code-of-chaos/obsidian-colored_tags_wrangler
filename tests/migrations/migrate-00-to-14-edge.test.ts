import { describe, it, expect } from "vitest";
import {
    generateId,
    migrate00to01,
    migrate01to02,
    migrate02to03,
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

describe("migrations v0-v14 edge cases", () => {
    describe("generateId edge cases", () => {
        it("generates string", () => {
            expect(typeof generateId()).toBe("string");
        });

        it("generates non-empty string", () => {
            expect(generateId().length).toBeGreaterThan(0);
        });

        it("generates unique IDs in batch", () => {
            const ids = new Set<string>();
            for (let i = 0; i < 1000; i++) {
                ids.add(generateId());
            }
            expect(ids.size).toBe(1000);
        });
    });

    describe("migrate00to01 edge cases", () => {
        it("handles missing TagColors", () => {
            const data = { Info: { SettingsVersion: 0 } };
            const result = migrate00to01(data);
            // Migration returns early when TagColors is missing
            expect(result.Info.SettingsVersion).toBe(0);
        });

        it("handles empty ColorPicker", () => {
            const data = { TagColors: { ColorPicker: {} }, Info: { SettingsVersion: 0 } };
            const result = migrate00to01(data);
            expect(Object.keys(result.TagColors.ColorPicker)).toHaveLength(0);
        });

        it("handles non-object ColorPicker", () => {
            const data = { TagColors: { ColorPicker: "invalid" }, Info: { SettingsVersion: 0 } };
            const result = migrate00to01(data);
            expect(result.TagColors.ColorPicker).toBe("invalid");
        });

        it("handles array ColorPicker", () => {
            const data = { TagColors: { ColorPicker: [] }, Info: { SettingsVersion: 0 } };
            const result = migrate00to01(data);
            expect(result.TagColors.ColorPicker).toEqual([]);
        });
    });

    describe("migrate04to05 edge cases", () => {
        it("handles missing ColorPicker", () => {
            const data = { TagColors: {}, Info: { SettingsVersion: 4 } };
            const result = migrate04to05(data);
            // Migration returns early when ColorPicker is missing
            expect(result.Info.SettingsVersion).toBe(4);
        });

        it("handles entry without color", () => {
            const data = {
                TagColors: { ColorPicker: { "abc": { tag_name: "tag" } } },
                Info: { SettingsVersion: 4 },
            };
            const result = migrate04to05(data);
            expect(result.TagColors.ColorPicker["abc"].background_color).toBeUndefined();
        });
    });

    describe("migrate06to07 edge cases", () => {
        it("handles missing TagColors", () => {
            const data = { Info: { SettingsVersion: 6 } };
            const result = migrate06to07(data);
            expect(result.Info.SettingsVersion).toBe(7);
        });

        it("handles entry with matching colors", () => {
            const data = {
                TagColors: {
                    ColorPicker: {
                        "abc": {
                            tag_name: "tag",
                            color: { r: 100, g: 100, b: 100 },
                            background_color: { r: 100, g: 100, b: 100 },
                        },
                    },
                },
                Info: { SettingsVersion: 6 },
            };
            const result = migrate06to07(data);
            const entry = result.TagColors.ColorPicker["abc"];
            expect(entry.background_color).not.toEqual({ r: 100, g: 100, b: 100 });
        });

        it("handles entry with different colors", () => {
            const data = {
                TagColors: {
                    ColorPicker: {
                        "abc": {
                            tag_name: "tag",
                            color: { r: 255, g: 0, b: 0 },
                            background_color: { r: 0, g: 0, b: 0 },
                        },
                    },
                },
                Info: { SettingsVersion: 6 },
            };
            const result = migrate06to07(data);
            const entry = result.TagColors.ColorPicker["abc"];
            expect(entry.background_color).toEqual({ r: 0, g: 0, b: 0 });
        });
    });

    describe("migrate10to11 edge cases", () => {
        it("handles missing ColorPicker", () => {
            const data = { TagColors: {}, Info: { SettingsVersion: 10 } };
            const result = migrate10to11(data);
            expect(result.Info.SettingsVersion).toBe(11);
        });

        it("handles already array ColorPicker", () => {
            const data = { TagColors: { ColorPicker: [] }, Info: { SettingsVersion: 10 } };
            const result = migrate10to11(data);
            expect(Array.isArray(result.TagColors.ColorPicker)).toBe(true);
        });
    });

    describe("migrate11to12 edge cases", () => {
        it("handles missing FolderNote", () => {
            const data = { Info: { SettingsVersion: 11 } };
            const result = migrate11to12(data);
            expect(result.Info.SettingsVersion).toBe(12);
        });

        it("handles already array FolderTagLinks", () => {
            const data = { FolderNote: { FolderTagLinks: [] }, Info: { SettingsVersion: 11 } };
            const result = migrate11to12(data);
            expect(Array.isArray(result.FolderNote.FolderTagLinks)).toBe(true);
        });
    });

    describe("migrate12to13 edge cases", () => {
        it("handles missing sections", () => {
            const data = { TagColors: {}, Info: { SettingsVersion: 12 } };
            const result = migrate12to13(data);
            expect(result.Info.SettingsVersion).toBe(13);
        });

        it("uses default opacity when not set", () => {
            const data = {
                TagColors: {},
                FolderNote: { Values: {} },
                Kanban: { Values: {} },
                Canvas: { Values: {} },
                Info: { SettingsVersion: 12 },
            };
            const result = migrate12to13(data);
            expect(result.FolderNote.EnableBackgroundOpacity).toBe(false);
            expect(result.FolderNote.Values.BackgroundOpacity).toBe(0.2);
        });
    });

    describe("migrate13to14 edge cases", () => {
        it("handles minimal data", () => {
            const data = { Info: { SettingsVersion: 13 } };
            const result = migrate13to14(data);
            expect(result.Info.SettingsVersion).toBe(14);
        });
    });
});
