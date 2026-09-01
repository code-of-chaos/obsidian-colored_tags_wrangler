// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {CSSWrangler}
	from "src/plugin/style_manager/css_wranglers/CSSWrangler";
import ColoredTagWranglerPlugin
	from "src/main";
import {isWildcardTagName} from "src/api/tags";
// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export class CSSWranglerKanbanCards extends CSSWrangler {
	// -----------------------------------------------------------------------------------------------------------------
	// Constructor
	// -----------------------------------------------------------------------------------------------------------------
	constructor(plugin:ColoredTagWranglerPlugin) {
		super(plugin, plugin.settings.Kanban);
	}
	// -----------------------------------------------------------------------------------------------------------------
	// Methods
	// -----------------------------------------------------------------------------------------------------------------
	assembleCss(theme:string){
		const important:string = this.getImportant();
		return this.getTags(false)
			.map(
				({tag_name, color, background_color}) => {
					const wildcard = isWildcardTagName(tag_name);
					// For wildcards, use the prefix (without /*); for exact, use the tag as-is
					const tagValue = wildcard ? tag_name.slice(0, -1) : tag_name;
					const escapedTag = typeof CSS !== "undefined" && CSS.escape ? CSS.escape(tagValue) : tagValue;

					const cardSelectors = Array.from(new Set([
						wildcard
							? `div.kanban-plugin__item[class*="has-tag-${escapedTag}"]:where(:not([class~="has-tag-${escapedTag}"]))`
							: `div.kanban-plugin__item.has-tag-${escapedTag}`,
						wildcard
							? `div.kanban-plugin__item[class*="has-tag-${tagValue}"]:where(:not([class~="has-tag-${tagValue}"]))`
							: `div.kanban-plugin__item.has-tag-${tag_name}`
					])).join(", ");

					return `
${theme} :is(${cardSelectors}) div.kanban-plugin__item-title-wrapper {
	background: ${ this.getBackgroundWithOpacityString(background_color)} ${important};
}
${theme} :is(${cardSelectors}){
	border-color: rgba(${color.r}, ${color.g}, ${color.b},0.3) ${important};
}`;
				}
			);
	}
}
