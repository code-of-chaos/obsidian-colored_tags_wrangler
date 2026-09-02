import { vi } from "vitest";

export class Notice {
    constructor(message: string) {}
}

export class Plugin {
    app: any;
    manifest: any;
    constructor(app: any, manifest: any) {
        this.app = app;
        this.manifest = manifest;
    }
    addCommand() {}
    addSettingTab() {}
    async loadData() {
        return {};
    }
    async saveData() {}
    registerEvent() {
        return { unload: () => {} };
    }
    registerInterval() {
        return 0;
    }
}

export class PluginSettingTab {
    app: any;
    plugin: any;
    containerEl: HTMLElement;
    constructor(app: any, plugin: any) {
        this.app = app;
        this.plugin = plugin;
        this.containerEl = document.createElement("div");
    }
    display() {}
    hide() {}
}

export class Modal {
    app: any;
    contentEl: HTMLElement;
    constructor(app: any) {
        this.app = app;
        this.contentEl = document.createElement("div");
    }
    open() {}
    close() {}
}

export class Setting {
    settingEl: HTMLElement;
    constructor(containerEl: HTMLElement) {
        this.settingEl = containerEl.createDiv();
    }
    setName() {
        return this;
    }
    setDesc() {
        return this;
    }
    setHeading() {
        return this;
    }
    addToggle(cb: any) {
        return this;
    }
    addButton(cb: any) {
        return this;
    }
    addColorPicker(cb: any) {
        return this;
    }
    addText(cb: any) {
        return this;
    }
    addSlider(cb: any) {
        return this;
    }
    addDropdown(cb: any) {
        return this;
    }
}

export class ToggleComponent {
    constructor(containerEl: HTMLElement) {}
    setValue() {
        return this;
    }
    onChange() {
        return this;
    }
    setDisabled() {
        return this;
    }
}

export class TextComponent {
    constructor(containerEl: HTMLElement) {}
    setPlaceholder() {
        return this;
    }
    setValue() {
        return this;
    }
    onChange() {
        return this;
    }
}

export class ColorComponent {
    constructor(containerEl: HTMLElement) {}
    setValue() {
        return this;
    }
    onChange() {
        return this;
    }
}

export class ButtonComponent {
    constructor(containerEl: HTMLElement) {}
    setButtonText() {
        return this;
    }
    setIcon() {
        return this;
    }
    setTooltip() {
        return this;
    }
    setClass() {
        return this;
    }
    setDisabled() {
        return this;
    }
    onClick() {
        return this;
    }
}

export class MarkdownView {
    file: any;
    constructor() {
        this.file = { path: "test.md" };
    }
}

export class TFile {
    path: string;
    name: string;
    constructor(path: string = "test.md", name: string = "test.md") {
        this.path = path;
        this.name = name;
    }
}

export class TFolder {
    path: string;
    name: string;
    constructor(path: string = "test", name: string = "test") {
        this.path = path;
        this.name = name;
    }
}

export const Platform = {
    isDesktopApp: true,
    isMobileApp: false,
    isMacOS: false,
    isWin32: false,
    isLinux: false,
};

export const MarkdownFileInfo = {};
