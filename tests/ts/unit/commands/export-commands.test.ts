import { describe, it, expect, vi, beforeEach } from "vitest";
import {
    exportTagsToGraphCodeblock,
    exportGraphJsonTags,
    exportGraphJsonFolderNotes,
    exportToCss,
} from "../../../../src/commands/ExportCommands";
import { IPluginSettings } from "../../../../src/types/settings";

describe("ExportCommands", () => {
    const createMockEditor = () => ({
        replaceSelection: vi.fn(),
    });

    const createMockVault = (readData: string = "{}") => ({
        adapter: {
            read: vi.fn().mockResolvedValue(readData),
            write: vi.fn().mockResolvedValue(undefined),
        },
        configDir: ".obsidian",
    });

    const createSettings = (overrides: Partial<IPluginSettings> = {}): IPluginSettings => ({
        version: 15,
        enabledExtensions: ["core"],
        tagRecords: [
            {
                id: "1",
                tag_name: "project/*",
                color: { r: 255, g: 0, b: 0 },
                background_color: { r: 0, g: 0, b: 0 },
                luminance_offset: 0.15,
            },
        ],
        extensionSettings: {
            core: {
                enableMultipleTags: true,
                enableSeparateBackground: true,
                enableBackgroundOpacity: false,
                backgroundOpacity: 0.45,
                luminanceOffset: 0.15,
                noteTags: true,
                noteProperties: true,
                noteBackgrounds: false,
                tagsNoWrap: true,
                tagsNoWrapText: "pre",
            },
            canvas: {
                enableBackgroundOpacity: false,
                backgroundOpacity: 0.45,
                cardBorderOpacity: 0.3,
                cardBackgroundLuminanceOffset: 0.15,
            },
            kanban: {
                enableCards: false,
                enableLists: false,
                hideHashtags: false,
                enableBackgroundOpacity: false,
                backgroundOpacity: 0.45,
                cardBackgroundOpacity: 0.2,
                cardBorderOpacity: 0.3,
                listBackgroundOpacity: 0.2,
                listBorderOpacity: 0.3,
            },
            "folder-note": {
                enable: false,
                folderTagLinks: [
                    { folder_path: "folder1", tag_name: "project/*" },
                ],
                enableAutoDetect: true,
                enableBackgroundOpacity: false,
                backgroundOpacity: 0.45,
                forceImportant: true,
                borderRadius: "12px",
                padding: "5px",
            },
            debug: {
                enable: false,
                enableExperimentalCommands: false,
            },
        },
        ...overrides,
    });

    describe("exportTagsToGraphCodeblock", () => {
        it("inserts JSON codeblock at cursor", () => {
            const editor = createMockEditor();
            const settings = createSettings();
            exportTagsToGraphCodeblock(editor as any, {} as any, settings);
            expect(editor.replaceSelection).toHaveBeenCalled();
            const call = editor.replaceSelection.mock.calls[0][0];
            expect(call).toContain("```json");
            expect(call).toContain("colorGroups");
        });

        it("generates correct color value", () => {
            const editor = createMockEditor();
            const settings = createSettings();
            exportTagsToGraphCodeblock(editor as any, {} as any, settings);
            const call = editor.replaceSelection.mock.calls[0][0];
            expect(call).toContain('"rgb": 16711680');
        });

        it("generates search query from tag name", () => {
            const editor = createMockEditor();
            const settings = createSettings();
            exportTagsToGraphCodeblock(editor as any, {} as any, settings);
            const call = editor.replaceSelection.mock.calls[0][0];
            expect(call).toContain("tag:/^");
        });

        it("handles empty tag records", () => {
            const editor = createMockEditor();
            const settings = createSettings({ tagRecords: [] });
            exportTagsToGraphCodeblock(editor as any, {} as any, settings);
            const call = editor.replaceSelection.mock.calls[0][0];
            expect(call).toContain('"colorGroups": []');
        });
    });

    describe("exportGraphJsonTags", () => {
        it("reads and writes graph.json", async () => {
            const vault = createMockVault('{"colorGroups": []}');
            const settings = createSettings();
            const result = await exportGraphJsonTags(settings, vault as any);
            expect(result).toBe(true);
            expect(vault.adapter.read).toHaveBeenCalledWith(".obsidian/graph.json");
            expect(vault.adapter.write).toHaveBeenCalled();
        });

        it("returns true on success", async () => {
            const vault = createMockVault('{"colorGroups": []}');
            const settings = createSettings();
            const result = await exportGraphJsonTags(settings, vault as any);
            expect(result).toBe(true);
        });

        it("returns false on error", async () => {
            const vault = createMockVault();
            vault.adapter.read.mockRejectedValue(new Error("File not found"));
            const settings = createSettings();
            const result = await exportGraphJsonTags(settings, vault as any);
            expect(result).toBe(false);
        });

        it("updates colorGroups in graph", async () => {
            const vault = createMockVault('{"colorGroups": []}');
            const settings = createSettings();
            await exportGraphJsonTags(settings, vault as any);
            const writeCall = vault.adapter.write.mock.calls[0];
            const writtenData = JSON.parse(writeCall[1]);
            expect(writtenData.colorGroups).toHaveLength(1);
        });
    });

    describe("exportGraphJsonFolderNotes", () => {
        it("reads and writes graph.json", async () => {
            const vault = createMockVault('{"colorGroups": []}');
            const settings = createSettings();
            const result = await exportGraphJsonFolderNotes(settings, vault as any);
            expect(result).toBe(true);
            expect(vault.adapter.read).toHaveBeenCalledWith(".obsidian/graph.json");
            expect(vault.adapter.write).toHaveBeenCalled();
        });

        it("maps folder tag links to color groups", async () => {
            const vault = createMockVault('{"colorGroups": []}');
            const settings = createSettings();
            await exportGraphJsonFolderNotes(settings, vault as any);
            const writeCall = vault.adapter.write.mock.calls[0];
            const writtenData = JSON.parse(writeCall[1]);
            expect(writtenData.colorGroups).toHaveLength(1);
            expect(writtenData.colorGroups[0].query).toBe("path:folder1");
        });

        it("filters out non-matching tags", async () => {
            const vault = createMockVault('{"colorGroups": []}');
            const settings = createSettings({
                extensionSettings: {
                    ...createSettings().extensionSettings,
                    "folder-note": {
                        ...createSettings().extensionSettings["folder-note"],
                        folderTagLinks: [
                            { folder_path: "folder1", tag_name: "nonexistent" },
                        ],
                    },
                },
            });
            await exportGraphJsonFolderNotes(settings, vault as any);
            const writeCall = vault.adapter.write.mock.calls[0];
            const writtenData = JSON.parse(writeCall[1]);
            expect(writtenData.colorGroups).toHaveLength(0);
        });

        it("returns false on error", async () => {
            const vault = createMockVault();
            vault.adapter.read.mockRejectedValue(new Error("File not found"));
            const settings = createSettings();
            const result = await exportGraphJsonFolderNotes(settings, vault as any);
            expect(result).toBe(false);
        });
    });

    describe("exportToCss", () => {
        it("returns the input css string", () => {
            const css = ".tag { color: red; }";
            expect(exportToCss(css)).toBe(css);
        });

        it("returns empty string for empty input", () => {
            expect(exportToCss("")).toBe("");
        });
    });
});
