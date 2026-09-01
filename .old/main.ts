import { Plugin } from "obsidian";
import { IPluginSettings } from "src/types/settings";

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

    async onload() {
        await this.loadSettings();
        // TODO: Initialize extensions, services, settings tab
    }

    onunload() {
        // TODO: Cleanup
    }

    async loadSettings() {
        this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
    }

    async saveSettings() {
        await this.saveData(this.settings);
    }
}
