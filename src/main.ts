import { Plugin } from "obsidian";
import { IPluginSettings } from "src/types/settings";
import { migrateSettings } from "src/services/migrator";
import { StyleManager } from "src/services/StyleManager";
import { TagRecordsService } from "src/services/TagRecordsService";
import { CoreExtension } from "src/extensions/core/ExtensionCore";
import { CanvasExtension } from "src/extensions/canvas/ExtensionCanvas";
import { KanbanExtension } from "src/extensions/kanban/ExtensionKanban";
import { FolderNoteExtension } from "src/extensions/folder-note/ExtensionFolderNote";
import { PropertiesExtension } from "src/extensions/properties/ExtensionProperties";
import { StylingExtension } from "src/extensions/styling/ExtensionStyling";
import { SettingTab } from "src/ui/SettingTab";
import { exportTagsToGraphCodeblock } from "src/commands/ExportGraphJsonTagsCodeblock";

const DEFAULT_SETTINGS: IPluginSettings = {
    version: 15,
    enabledExtensions: ["core"],
    tagRecords: [],
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
            folderTagLinks: [],
            enableAutoDetect: true,
            enableBackgroundOpacity: false,
            backgroundOpacity: 0.45,
            forceImportant: true,
            borderRadius: "12px",
            padding: "5px",
        },
        debug: {
            enableExperimentalCommands: false,
        },
    },
};

export default class ColoredTagWranglerPlugin extends Plugin {
    settings: IPluginSettings = DEFAULT_SETTINGS;
    styleManager: StyleManager = new StyleManager();
    tagRecordsService!: TagRecordsService;

    async onload() {
        await this.loadSettings();

        // Initialize services
        this.tagRecordsService = new TagRecordsService(this.settings.tagRecords);

        // Initialize extensions
        this.initializeExtensions();

        // Register commands
        this.addCommand({
            id: "export-tags-to-graph-codeblock",
            name: "Export tags to graph.json codeblock",
            editorCallback: (editor, view) => {
                exportTagsToGraphCodeblock(editor, view, this.settings);
            },
        });

        // Register settings tab
        this.addSettingTab(new SettingTab(this.app, this));
    }

    onunload() {
        this.styleManager.cleanup();
    }

    async loadSettings() {
        const data = await this.loadData();

        // Run migration if needed
        if (data) {
            const result = await migrateSettings(data, this.app.vault);
            if (result.success && result.data) {
                this.settings = result.data;
                await this.saveSettings();
            } else if (!result.data) {
                this.settings = Object.assign({}, DEFAULT_SETTINGS, data);
            }
        } else {
            this.settings = Object.assign({}, DEFAULT_SETTINGS);
        }
    }

    async saveSettings() {
        await this.saveData(this.settings);
        this.updateExtensions();
    }

    private initializeExtensions() {
        const records = this.settings.tagRecords;

        if (this.settings.enabledExtensions.includes("core")) {
            const ext = new CoreExtension(records, this.settings.extensionSettings.core);
            this.styleManager.registerExtension(ext);
        }

        if (this.settings.enabledExtensions.includes("canvas")) {
            const ext = new CanvasExtension(records, this.settings.extensionSettings.canvas);
            this.styleManager.registerExtension(ext);
        }

        if (this.settings.enabledExtensions.includes("kanban")) {
            const ext = new KanbanExtension(records, this.settings.extensionSettings.kanban);
            this.styleManager.registerExtension(ext);
        }

        if (this.settings.enabledExtensions.includes("folder-note")) {
            const ext = new FolderNoteExtension(records, this.settings.extensionSettings["folder-note"]);
            this.styleManager.registerExtension(ext);
        }

        if (this.settings.enabledExtensions.includes("properties")) {
            const ext = new PropertiesExtension(records, this.settings.extensionSettings.core);
            this.styleManager.registerExtension(ext);
            ext.eventHandler?.register();
        }

        if (this.settings.enabledExtensions.includes("styling")) {
            const ext = new StylingExtension(records, this.settings.extensionSettings.core);
            this.styleManager.registerExtension(ext);
        }

        this.styleManager.updateStyles();
    }

    private updateExtensions() {
        // Re-initialize extensions with updated settings
        this.styleManager.cleanup();
        this.styleManager = new StyleManager();
        this.initializeExtensions();
    }
}
