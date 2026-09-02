import { describe, it, expect, vi, beforeEach } from "vitest";
import { migrateSettings } from "../../../src/services/migrator";

// Mock the Notice class
vi.mock("obsidian", () => ({
    Notice: vi.fn(),
}));

const createMockVault = () => ({
    adapter: {
        read: vi.fn(),
        write: vi.fn().mockResolvedValue(undefined),
    },
    configDir: ".obsidian",
});

describe("migrator", () => {
    let mockVault: ReturnType<typeof createMockVault>;

    beforeEach(() => {
        mockVault = createMockVault();
    });

    describe("migrateSettings", () => {
        it("returns null data when input is null", async () => {
            const result = await migrateSettings(null, mockVault);
            expect(result.success).toBe(true);
            expect(result.data).toBeNull();
        });

        it("returns null data when SettingsVersion is undefined", async () => {
            const data = { someKey: "someValue" };
            const result = await migrateSettings(data, mockVault);
            expect(result.success).toBe(true);
            expect(result.data).toBeNull();
        });

        it("returns data as-is when SettingsVersion >= current version", async () => {
            const data = {
                Info: { SettingsVersion: 15 },
                version: 15,
                enabledExtensions: ["core"],
                tagRecords: [],
                extensionSettings: {
                    core: { noteTags: true },
                    canvas: {},
                    kanban: {},
                    "folder-note": {},
                    debug: { enable: false, enableExperimentalCommands: false },
                },
            };
            const result = await migrateSettings(data, mockVault);
            expect(result.success).toBe(true);
            expect(result.data).toEqual(data);
        });

        it("creates backup before migration", async () => {
            const data = {
                Info: { SettingsVersion: 14 },
                TagColors: { ColorPicker: [] },
                CSS: { NoteTags: true },
                FolderNote: { Enable: false, FolderTagLinks: [], EnableAutoDetect: true, EnableBackgroundOpacity: false, Values: { BackgroundOpacity: 0.45, ForceImportant: true, BorderRadius: "12px", Padding: "5px" } },
                Kanban: { Enable: true, EnableCards: false, EnableLists: false, HideHashtags: false, EnableBackgroundOpacity: false, Values: { BackgroundOpacity: 0.45, CardBackgroundOpacity: 0.2, CardBorderOpacity: 0.3, ListBackgroundOpacity: 0.2, ListBorderOpacity: 0.3 } },
                Canvas: { Enable: false, EnableBackgroundOpacity: false, Values: { BackgroundOpacity: 0.45, CardBorderOpacity: 0.3, CardBackgroundLuminanceOffset: 0.15 } },
                Debug: { Enable: false, EnableExperimentalCommands: false },
            };
            await migrateSettings(data, mockVault);
            expect(mockVault.adapter.write).toHaveBeenCalled();
            const writeCall = mockVault.adapter.write.mock.calls[0];
            expect(writeCall[0]).toContain("data-backup-");
            expect(writeCall[0]).toContain(".json");
        });

        it("migrates from v14 to v15 successfully", async () => {
            const data = {
                Info: { SettingsVersion: 14 },
                TagColors: {
                    ColorPicker: [
                        {
                            tag_name: "test",
                            color: { r: 255, g: 0, b: 0 },
                            background_color: { r: 0, g: 0, b: 0 },
                            luminance_offset: 0.15,
                        },
                    ],
                    EnableMultipleTags: true,
                    EnableSeparateBackground: true,
                    EnableBackgroundOpacity: false,
                    Values: { BackgroundOpacity: 0.45, LuminanceOffset: 0.15 },
                },
                CSS: { NoteTags: true, NoteProperties: true, NoteBackgrounds: false, TagsNoWrap: true, TagsNoWrapText: "pre" },
                FolderNote: { Enable: false, FolderTagLinks: [], EnableAutoDetect: true, EnableBackgroundOpacity: false, Values: { BackgroundOpacity: 0.45, ForceImportant: true, BorderRadius: "12px", Padding: "5px" } },
                Kanban: { Enable: true, EnableCards: false, EnableLists: false, HideHashtags: false, EnableBackgroundOpacity: false, Values: { BackgroundOpacity: 0.45, CardBackgroundOpacity: 0.2, CardBorderOpacity: 0.3, ListBackgroundOpacity: 0.2, ListBorderOpacity: 0.3 } },
                Canvas: { Enable: false, EnableBackgroundOpacity: false, Values: { BackgroundOpacity: 0.45, CardBorderOpacity: 0.3, CardBackgroundLuminanceOffset: 0.15 } },
                Debug: { Enable: false, EnableExperimentalCommands: false },
            };
            const result = await migrateSettings(data, mockVault);
            expect(result.success).toBe(true);
            expect(result.data).not.toBeNull();
            expect(result.data!.version).toBe(15);
            expect(result.data!.tagRecords).toHaveLength(1);
            expect(result.data!.tagRecords[0].tag_name).toBe("test");
        });

        it("returns error when migration throws", async () => {
            const data = {
                Info: { SettingsVersion: 14 },
                TagColors: { ColorPicker: "invalid" },
                CSS: {},
                FolderNote: { Values: {} },
                Kanban: { Values: {} },
                Canvas: { Values: {} },
                Debug: {},
            };
            const result = await migrateSettings(data, mockVault);
            expect(result.success).toBe(false);
            expect(result.error).toContain("failed");
        });
    });
});
