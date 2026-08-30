// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {CSSWrangler}
	from "src/plugin/style_manager/css_wranglers/CSSWrangler";
import ColoredTagWranglerPlugin
	from "src/main";
import {RGB} from "obsidian";
// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export class CSSWranglerTags extends CSSWrangler {
	// -----------------------------------------------------------------------------------------------------------------
	// Constructor
	// -----------------------------------------------------------------------------------------------------------------
	constructor(plugin:ColoredTagWranglerPlugin) {
		super(plugin, plugin.settings.TagColors);
	}
	// -----------------------------------------------------------------------------------------------------------------
	// Methods
	// -----------------------------------------------------------------------------------------------------------------
	private _assembleCss(theme:string, selector:string, important:string, color:RGB, background_color:RGB):string {
		return ` 
				${theme} ${selector} { 
					color: ${this.getForegroundString(color)} ${important};
					background-color: ${this.getBackgroundWithOpacityString(background_color)} ${important};
				}`
	}
	assembleCss(theme:string){
		const important:string = this.getImportant();

		return this.getTags(false).map(
			(v) => {
				const tag = v.tag_name;
				const lowerTag = tag.toLowerCase();

				const encodedTag = encodeURIComponent(tag);
				const encodedLowerTag = encodeURIComponent(lowerTag);
				const uriTag = encodeURI("#" + tag);
				const uriLowerTag = encodeURI("#" + lowerTag);

				const escapedTag = typeof CSS !== "undefined" && CSS.escape ? CSS.escape(tag) : tag;
				const escapedLowerTag = typeof CSS !== "undefined" && CSS.escape ? CSS.escape(lowerTag) : lowerTag;
				const escapedEncodedTag = typeof CSS !== "undefined" && CSS.escape ? CSS.escape(encodedTag) : encodedTag;
				const escapedEncodedLowerTag = typeof CSS !== "undefined" && CSS.escape ? CSS.escape(encodedLowerTag) : encodedLowerTag;

				const tagNoSlash = tag.replace(/\//g, "");
				const lowerTagNoSlash = lowerTag.replace(/\//g, "");
				const escapedTagNoSlash = typeof CSS !== "undefined" && CSS.escape ? CSS.escape(tagNoSlash) : tagNoSlash;
				const escapedLowerTagNoSlash = typeof CSS !== "undefined" && CSS.escape ? CSS.escape(lowerTagNoSlash) : lowerTagNoSlash;

				// Obsidian strips non-ASCII characters in CM6 class names (e.g. "tête" -> "tte")
				const strippedTag = tag.replace(/[^\w-]/g, "");
				const strippedLowerTag = lowerTag.replace(/[^\w-]/g, "");
				const strippedTagNoSlash = tagNoSlash.replace(/[^\w-]/g, "");
				const strippedLowerTagNoSlash = lowerTagNoSlash.replace(/[^\w-]/g, "");

				// Also normalize accents to ASCII (e.g. "tête" -> "tete")
				const normalizedTag = tag.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^\w-]/g, "");
				const normalizedLowerTag = lowerTag.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^\w-]/g, "");

				const cmClassSelectors = [
					// Stripped non-ASCII (Obsidian CM6 behavior)
					...(strippedTag ? [`.cm-tag-${strippedTag}`, `[class~="cm-tag-${strippedTag}"]`, `[class*="cm-tag-${strippedTag}"]`] : []),
					...(strippedLowerTag ? [`.cm-tag-${strippedLowerTag}`, `[class~="cm-tag-${strippedLowerTag}"]`, `[class*="cm-tag-${strippedLowerTag}"]`] : []),
					...(strippedTagNoSlash ? [`.cm-tag-${strippedTagNoSlash}`, `[class~="cm-tag-${strippedTagNoSlash}"]`] : []),
					...(strippedLowerTagNoSlash ? [`.cm-tag-${strippedLowerTagNoSlash}`, `[class~="cm-tag-${strippedLowerTagNoSlash}"]`] : []),
					// Normalized NFD
					...(normalizedTag ? [`.cm-tag-${normalizedTag}`, `[class~="cm-tag-${normalizedTag}"]`] : []),
					...(normalizedLowerTag ? [`.cm-tag-${normalizedLowerTag}`, `[class~="cm-tag-${normalizedLowerTag}"]`] : []),
					// Direct & Escaped UTF-8
					`.cm-tag-${escapedTag}`,
					`.cm-tag-${escapedLowerTag}`,
					`.cm-tag-${escapedEncodedTag}`,
					`.cm-tag-${escapedEncodedLowerTag}`,
					`.cm-tag-${escapedTagNoSlash}`,
					`.cm-tag-${escapedLowerTagNoSlash}`,
					`.cm-tag-${tag}`,
					`.cm-tag-${lowerTag}`,
					`.cm-tag-${encodedTag}`,
					`.cm-tag-${encodedLowerTag}`,
					`.cm-tag-${tagNoSlash}`,
					`.cm-tag-${lowerTagNoSlash}`,
					`[class~="cm-tag-${escapedTag}"]`,
					`[class~="cm-tag-${escapedLowerTag}"]`,
					`[class~="cm-tag-${tag}"]`,
					`[class~="cm-tag-${lowerTag}"]`,
					`[class*="cm-tag-${escapedTag}"]`,
					`[class*="cm-tag-${escapedLowerTag}"]`,
				];

				const beginSelectors = cmClassSelectors.map(s => `.cm-hashtag-begin:has(+ ${s})`);

				const selectors = Array.from(new Set([
					// Reading view & HTML rendered tags
					`.tag[href="#${tag}" i]`,
					`.tag[href="${uriTag}" i]`,
					`.tag[href="#${encodedTag}" i]`,
					`.tag[href="${uriLowerTag}" i]`,
					`.tag[href="#${encodedLowerTag}" i]`,
					`a.tag[href*="${encodedTag}" i]`,
					`a.tag[href*="${encodedLowerTag}" i]`,
					`a.tag[data-tag="${tag}" i]`,
					`a.tag[data-tag="#${tag}" i]`,
					`a.tag[data-tag="${lowerTag}" i]`,
					`a.tag[data-tag="#${lowerTag}" i]`,
					`[data-tag="${tag}" i]`,
					`[data-tag="#${tag}" i]`,
					`[data-tag="${lowerTag}" i]`,
					`[data-tag="#${lowerTag}" i]`,
					// Live preview / CM6 classes
					...cmClassSelectors,
					...beginSelectors,
				]));

				return this._assembleCss(
					theme,
					`:is(${selectors.join(", ")})`,
					important,
					v.color,
					v.background_color
				);
			}
		);
	}
}
