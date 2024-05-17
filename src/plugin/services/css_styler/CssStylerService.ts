// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {ICssStylerService} from "../../../contracts/plugin/services/css_styler/ICssStylerService";
import {IExtensionsService} from "../../../contracts/plugin/services/extensions/IExtensionsService";
import {ITagRecordsService} from "../../../contracts/plugin/services/tag_records/ITagRecordsService";
import {IColoredTagRecord} from "../../../contracts/plugin/settings/IColoredTagRecord";

// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
const rxCssComment = /\/\*[^*]*\*+([^/*][^*]*\*+)*\//g;
const lineCleanup = (line: string) =>
	line.split("\n")
		.map(l => l.replace(rxCssComment, '').trim())  // Remove CSS comments
		.join(" ");

// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export class CssStylerService implements ICssStylerService{
	private styleElement: HTMLStyleElement;

	private extensions : IExtensionsService
	private tagRecords : ITagRecordsService

	// -----------------------------------------------------------------------------------------------------------------
	// Constructors
	// -----------------------------------------------------------------------------------------------------------------
	constructor(extensions : IExtensionsService, tagRecords:ITagRecordsService) {
		this.extensions = extensions;
		this.tagRecords = tagRecords;

		this.styleElement = document.createElement("style");
		this.styleElement.id = "colored-tags-wrangler"
	}

	public processExtensions() {

		this.styleElement.innerHTML = this.extensions.List
			.flatMap(e =>
				e.cssWrangler.getRulesThemeDark()
				.concat(e.cssWrangler.getRulesThemeLight()))
				.map(lineCleanup)
			.join("")

		document.head.appendChild(this.styleElement);
	}

	public cleanup(){
		document.head.removeChild(this.styleElement);
	}

}
