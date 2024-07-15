// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {ICssStylerService} from "src/contracts/plugin/services/css_styler/ICssStylerService";
import {IExtensionsService} from "src/contracts/plugin/services/extensions/IExtensionsService";

// ---------------------------------------------------------------------------------------------------------------------
// Support Code
// ---------------------------------------------------------------------------------------------------------------------
export const themeSelectorLight:string = "body.theme-light";
export const themeSelectorDark:string = "body.theme-dark";
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

	// -----------------------------------------------------------------------------------------------------------------
	// Methods
	// -----------------------------------------------------------------------------------------------------------------
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
				if (e.cssWrangler === undefined) return;

				const rules: Record<string, Record<string, string>> = e.cssWrangler.getRules();
				// Because each extension is loaded in order, we can override behaviours from a previous plugin one by one
				Object.keys(rules).forEach((key) => {
					dict[key] = Object.assign(dict[key] || {}, rules[key]); // overwrite or create new object
				});
			})

		return Object.keys(dict)
			.map(
				selector => `${selector} { ${Object.keys(dict[selector]).map(property => `${property}: ${dict[selector][property]};`).join("")} }`
			).join("\n");
	}

}
