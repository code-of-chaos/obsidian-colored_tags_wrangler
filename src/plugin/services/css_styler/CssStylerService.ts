// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {ICssStylerService} from "../../../contracts/plugin/services/css_styler/ICssStylerService";
import {IExtensionsService} from "../../../contracts/plugin/services/extensions/IExtensionsService";

// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
const rxCssComment = /\/\*[^*]*\*+([^/*][^*]*\*+)*\//g;
const lineCleanup = (line: string) =>
	line.split("\n")
		.map(l => l.replace(rxCssComment, '').trim())  // Remove CSS comments
		.join(" ");

export const themeSelectorLight = "body.theme-light";
export const themeSelectorDark = "body.theme-dark";

// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export class CssStylerService implements ICssStylerService {
	private readonly styleElement: HTMLStyleElement;

	private extensions: IExtensionsService

	// -----------------------------------------------------------------------------------------------------------------
	// Constructors
	// -----------------------------------------------------------------------------------------------------------------
	constructor(extensions: IExtensionsService) {
		this.extensions = extensions;

		this.styleElement = document.createElement("style");
		this.styleElement.id = "colored-tags-wrangler"
	}

	public processExtensions() {
		this.styleElement.innerHTML = "";
		this.styleElement.innerHTML = this.createCSS()

		document.head.appendChild(this.styleElement);
	}

	public cleanup() {
		document.head.removeChild(this.styleElement);
	}

	private createCSS(): string {
		let dict: Record<string, Record<string, string>> = {};

		this.extensions.EnabledList
			// Each extension should handle their own rules for filtering which records are applied to or not
			.forEach(e => {
				const rules: Record<string, Record<string, string>> = e.cssWrangler.getRules();
				Object.keys(rules).forEach((key) => {
					dict[key] = Object.assign(dict[key] || {}, rules[key]);
				});
			})

		return Object.keys(dict)
			.map(
				selector => `${selector} { ${Object.keys(dict[selector]).map(property => `${property}: ${dict[selector][property]};`).join("")} }`
			).join("\n");
	}

}
