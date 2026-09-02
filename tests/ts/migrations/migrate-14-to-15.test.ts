import { describe, it, expect } from "vitest";
import { migrate14to15 } from "../../../src/types/migrations/migrate-14-to-15";
import settingsV014 from "../fixtures/settings-v014.json";
import { ISettingsV14 } from "../../../src/types/settings-v14";

describe("migrate14to15", () => {
    const oldSettings = settingsV014 as unknown as ISettingsV14;

    it("migrates settings version", () => {
        const result = migrate14to15(oldSettings);
        expect(result.version).toBe(15);
    });

    it("migrates tag records", () => {
        const result = migrate14to15(oldSettings);
        expect(result.tagRecords).toHaveLength(2);
        expect(result.tagRecords[0].tag_name).toBe("project/*");
        expect(result.tagRecords[0].color).toEqual({ r: 255, g: 0, b: 0 });
        expect(result.tagRecords[1].tag_name).toBe("meeting");
    });

    it("generates unique ids for tag records", () => {
        const result = migrate14to15(oldSettings);
        expect(result.tagRecords[0].id).toBeDefined();
        expect(result.tagRecords[0].id).not.toBe(result.tagRecords[1].id);
    });

    it("sets canvas_enabled from Canvas.Enable", () => {
        const result = migrate14to15(oldSettings);
        expect(result.tagRecords[0].canvas_enabled).toBe(false);
    });

    it("sets kanban_cards_enabled from Kanban.EnableCards", () => {
        const result = migrate14to15(oldSettings);
        expect(result.tagRecords[0].kanban_cards_enabled).toBe(false);
    });

    it("sets kanban_lists_enabled from Kanban.EnableLists", () => {
        const result = migrate14to15(oldSettings);
        expect(result.tagRecords[0].kanban_lists_enabled).toBe(false);
    });

    it("migrates enabled extensions", () => {
        const result = migrate14to15(oldSettings);
        expect(result.enabledExtensions).toContain("core");
        expect(result.enabledExtensions).toContain("kanban");
        expect(result.enabledExtensions).not.toContain("canvas");
        expect(result.enabledExtensions).not.toContain("folder-note");
    });

    it("enables canvas extension when Canvas.Enable is true", () => {
        const settings = { ...oldSettings, Canvas: { ...oldSettings.Canvas, Enable: true } };
        const result = migrate14to15(settings);
        expect(result.enabledExtensions).toContain("canvas");
    });

    it("enables folder-note extension when FolderNote.Enable is true", () => {
        const settings = { ...oldSettings, FolderNote: { ...oldSettings.FolderNote, Enable: true } };
        const result = migrate14to15(settings);
        expect(result.enabledExtensions).toContain("folder-note");
    });

    it("migrates core settings", () => {
        const result = migrate14to15(oldSettings);
        expect(result.extensionSettings.core.enableMultipleTags).toBe(true);
        expect(result.extensionSettings.core.enableSeparateBackground).toBe(true);
        expect(result.extensionSettings.core.enableBackgroundOpacity).toBe(false);
        expect(result.extensionSettings.core.backgroundOpacity).toBe(0.45);
        expect(result.extensionSettings.core.luminanceOffset).toBe(0.15);
        expect(result.extensionSettings.core.noteTags).toBe(true);
        expect(result.extensionSettings.core.noteProperties).toBe(true);
        expect(result.extensionSettings.core.noteBackgrounds).toBe(false);
        expect(result.extensionSettings.core.tagsNoWrap).toBe(true);
        expect(result.extensionSettings.core.tagsNoWrapText).toBe("pre");
    });

    it("migrates canvas settings", () => {
        const result = migrate14to15(oldSettings);
        expect(result.extensionSettings.canvas.enableBackgroundOpacity).toBe(false);
        expect(result.extensionSettings.canvas.backgroundOpacity).toBe(0.45);
        expect(result.extensionSettings.canvas.cardBorderOpacity).toBe(0.3);
        expect(result.extensionSettings.canvas.cardBackgroundLuminanceOffset).toBe(0.15);
    });

    it("migrates kanban settings", () => {
        const result = migrate14to15(oldSettings);
        expect(result.extensionSettings.kanban.enableCards).toBe(false);
        expect(result.extensionSettings.kanban.enableLists).toBe(false);
        expect(result.extensionSettings.kanban.hideHashtags).toBe(false);
        expect(result.extensionSettings.kanban.enableBackgroundOpacity).toBe(false);
        expect(result.extensionSettings.kanban.backgroundOpacity).toBe(0.45);
        expect(result.extensionSettings.kanban.cardBackgroundOpacity).toBe(0.2);
        expect(result.extensionSettings.kanban.cardBorderOpacity).toBe(0.3);
        expect(result.extensionSettings.kanban.listBackgroundOpacity).toBe(0.2);
        expect(result.extensionSettings.kanban.listBorderOpacity).toBe(0.3);
    });

    it("migrates folder-note settings", () => {
        const result = migrate14to15(oldSettings);
        expect(result.extensionSettings["folder-note"].enable).toBe(false);
        expect(result.extensionSettings["folder-note"].folderTagLinks).toEqual([]);
        expect(result.extensionSettings["folder-note"].enableAutoDetect).toBe(true);
        expect(result.extensionSettings["folder-note"].enableBackgroundOpacity).toBe(false);
        expect(result.extensionSettings["folder-note"].backgroundOpacity).toBe(0.45);
        expect(result.extensionSettings["folder-note"].forceImportant).toBe(true);
        expect(result.extensionSettings["folder-note"].borderRadius).toBe("12px");
        expect(result.extensionSettings["folder-note"].padding).toBe("5px");
    });

    it("migrates debug settings", () => {
        const result = migrate14to15(oldSettings);
        expect(result.extensionSettings.debug.enableExperimentalCommands).toBe(false);
    });

    it("handles empty tag records", () => {
        const settings = {
            ...oldSettings,
            TagColors: { ...oldSettings.TagColors, ColorPicker: [] },
        };
        const result = migrate14to15(settings);
        expect(result.tagRecords).toHaveLength(0);
    });
});
