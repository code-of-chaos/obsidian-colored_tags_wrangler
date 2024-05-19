// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {Setting, SettingTab} from "obsidian";
import {IExtension} from "../../../../../contracts/plugin/extensions/IExtension";

// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export class SettingExtensionSelector {
	private parent: SettingTab;

	// private settingEl: Setting;
	private masterEl: HTMLElement;
	private gridContainerEl: HTMLElement;

	// -----------------------------------------------------------------------------------------------------------------
	// Constructor
	// -----------------------------------------------------------------------------------------------------------------
	constructor(parent: SettingTab) {
		this.parent = parent;
		this._AssignEls()
	}

	// -----------------------------------------------------------------------------------------------------------------
	// Methods
	// -----------------------------------------------------------------------------------------------------------------
	private _AssignEls(){
		// this.settingEl = new Setting(this.parent.containerEl)
		this.masterEl = this.parent.containerEl.createDiv();
		this.masterEl.addClass("extension-selector");

		this.gridContainerEl = this.masterEl.createDiv();
		this.gridContainerEl.addClass("grid-container");
	}

	private createExtensionGridItem(extension: IExtension): HTMLElement {
		const gridItem = document.createElement('div');
		gridItem.className = 'grid-item';
		gridItem.innerHTML = `${extension.extensionName}`

		return gridItem;
	}

	public async display() : Promise<void> {
	}
}
