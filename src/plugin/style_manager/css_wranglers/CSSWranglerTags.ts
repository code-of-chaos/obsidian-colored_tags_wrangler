// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {CSSWrangler}
	from "src/plugin/style_manager/css_wranglers/CSSWrangler";
import ColoredTagWranglerPlugin
	from "src/main";
import {RGB} from "obsidian";
import {isWildcardTagName} from "src/api/tags";
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
				const wildcard = isWildcardTagName(tag);

				// For wildcards, use the prefix (without /*); for exact, use the tag as-is
				const tagValue = wildcard ? tag.slice(0, -1) : tag;
				const lowerTagValue = wildcard ? lowerTag.slice(0, -1) : lowerTag;
				const hrefOperator = wildcard ? "^" : "";

				// Encoded variants for href selectors
				const encodedValue = encodeURIComponent(tagValue);
				const encodedLowerValue = encodeURIComponent(lowerTagValue);

				// Build href selectors
				const hrefSelectors = [
					`.tag[href${hrefOperator}="#${tagValue}" i]`,
					`.tag[href${hrefOperator}="${encodeURI("#" + tagValue)}" i]`,
					`.tag[href${hrefOperator}="#${encodedValue}" i]`,
					`.tag[href${hrefOperator}="#${lowerTagValue}" i]`,
					`.tag[href${hrefOperator}="${encodeURI("#" + lowerTagValue)}" i]`,
					`.tag[href${hrefOperator}="#${encodedLowerValue}" i]`,
				];

				// Build CM6 class selectors
				// Obsidian strips non-ASCII in class names (e.g. "tête" -> "tte") and normalizes accents
				const tagNoSlash = tagValue.replace(/\//g, "");
				const lowerTagNoSlash = lowerTagValue.replace(/\//g, "");
				const strippedTag = tagValue.replace(/[^\w-]/g, "");
				const strippedLowerTag = lowerTagValue.replace(/[^\w-]/g, "");
				const normalizedTag = tagValue.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^\w-]/g, "");
				const normalizedLowerTag = lowerTagValue.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^\w-]/g, "");

				const cmClassSelectors = [
					// Direct class name
					`.cm-tag-${tagNoSlash}`,
					`.cm-tag-${lowerTagNoSlash}`,
					// Class exact match
					`[class~="cm-tag-${tagNoSlash}"]`,
					`[class~="cm-tag-${lowerTagNoSlash}"]`,
					// Class contains (for wildcard prefix matching)
					...(wildcard ? [
						`[class*="cm-tag-${tagNoSlash}"]`,
						`[class*="cm-tag-${lowerTagNoSlash}"]`,
					] : []),
					// Stripped non-ASCII (Obsidian CM6 behavior)
					...(strippedTag ? [`.cm-tag-${strippedTag}`, `[class~="cm-tag-${strippedTag}"]`] : []),
					...(strippedLowerTag ? [`.cm-tag-${strippedLowerTag}`, `[class~="cm-tag-${strippedLowerTag}"]`] : []),
					// NFD normalized accents
					...(normalizedTag ? [`.cm-tag-${normalizedTag}`, `[class~="cm-tag-${normalizedTag}"]`] : []),
					...(normalizedLowerTag ? [`.cm-tag-${normalizedLowerTag}`, `[class~="cm-tag-${normalizedLowerTag}"]`] : []),
				];

				const beginSelectors = cmClassSelectors.map(s => `.cm-hashtag-begin:has(+ ${s})`);

				const selectors = Array.from(new Set([
					...hrefSelectors,
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
