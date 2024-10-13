// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import { Setting, SettingTab } from "obsidian";
import { IExtension } from "src/contracts/plugin/extensions/IExtension";
import { ServiceProvider } from "src/plugin/services/ServiceProvider";
import { capitalizeFirstLetter } from "src/lib/StringUtils";
import { IExtensionRecord } from "src/contracts/plugin/extensions/IExtensionRecord";

// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export class SettingExtensionSelector {
	private parent: SettingTab;
	private masterEl: HTMLElement;
	private gridContainerEl: HTMLElement;

	// -----------------------------------------------------------------------------------------------------------------
	// Constructor
	// -----------------------------------------------------------------------------------------------------------------
	constructor(parent: SettingTab) {
		this.parent = parent;
		this._AssignEls();
	}

	// -----------------------------------------------------------------------------------------------------------------
	// Helper Methods
	// -----------------------------------------------------------------------------------------------------------------
	private _AssignEls() {
		this.masterEl = this.parent.containerEl.createDiv();
		this.masterEl.addClass("extension-selector");

		this.gridContainerEl = this.masterEl.createDiv();
		this.gridContainerEl.addClass("grid-container");
	}

	private createExtensionGridItem(extension: IExtension<IExtensionRecord>): HTMLElement {
		const gridItem = new Setting(document.createElement("div"))
			.setClass("grid-item")
			.setName(capitalizeFirstLetter(extension.extensionName))
			.setDesc(extension.description)
			.addToggle((cb) => {
				cb.setValue(extension.isEnabled);
				cb.onChange(async (value) => {
					// Check for extension requirements
					const missingRequirements = extension.extensionRequirements.filter(
						(req) => !ServiceProvider.extensions.EnabledListAsStrings.includes(req)
					);
					if (missingRequirements.length > 0) {
						const values = missingRequirements
							.map(capitalizeFirstLetter)
							.join(", ");
						const doc = new DocumentFragment();
						doc.createSpan({}).innerText = extension.description;
						doc.createSpan({ cls: "text-color-red" }).innerHTML = `<br>The following extension requirements were not set: <b>${values}</b>`;

						gridItem.setDesc(doc);
						cb.setValue(false);
						return;
					}
					// Disable dependent extensions if this one is disabled
					if (!value) {
						await this.disableDependents(extension.extensionName);
					}

					extension.isEnabled = value;
					ServiceProvider.cssStyler.processExtensions(); // Update all the styling when something changes
					this.parent.display(); // Redraw entire settings
				});
			});
		return gridItem.settingEl;
	}

	private async disableDependents(extensionName: string) {
		for (const extension of ServiceProvider.extensions.FullList) {
			if (extension.extensionRequirements.includes(extensionName)) {
				extension.isEnabled = false;
				ServiceProvider.cssStyler.processExtensions(); // Update all the styling when something changes
			}
		}
	}

	// -----------------------------------------------------------------------------------------------------------------
	// Methods
	// -----------------------------------------------------------------------------------------------------------------
	public async display(): Promise<void> {
		this.gridContainerEl.empty(); // Clear the container before displaying
		for (const iExtension of ServiceProvider.extensions.FullList) {
			const el = this.createExtensionGridItem(iExtension);
			this.gridContainerEl.appendChild(el);
		}
	}
}
