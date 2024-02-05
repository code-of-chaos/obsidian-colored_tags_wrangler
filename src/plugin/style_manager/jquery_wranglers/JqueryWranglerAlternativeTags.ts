// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {JqueryWrangler} from "src/plugin/style_manager/jquery_wranglers/JqueryWrangler";
import $ from "jquery";
import {IColoredTagWrangler} from "src/plugin/IColoredTagWrangler";
import {RGB} from "obsidian";

// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export class JqueryWranglerAlternativeTags extends JqueryWrangler{
    // -----------------------------------------------------------------------------------------------------------------
    // Constructor
    // -----------------------------------------------------------------------------------------------------------------
    constructor(plugin:IColoredTagWrangler) {
        super(plugin, plugin.settings.TagColors);
    }
    // -----------------------------------------------------------------------------------------------------------------
    // Methods
    // -----------------------------------------------------------------------------------------------------------------
	private findElement(tag_name: string) {
		let tagSpan = $(`span.cm-hashtag.cm-hashtag-end.cm-tag-`)
		tagSpan = tagSpan.filter((_, el) => {
			return el.innerText === tag_name;
		});

		if (tagSpan.length >= 1) {
			// the previous span element with class "cm-tag-" is also part of the tag
			return [
				tagSpan.prev(`span.cm-hashtag.cm-hashtag-begin.cm-tag-`),
				tagSpan
			];
		}

		return null;
	}

	private _applyCssToElement(elem: JQuery<HTMLElement>, color: RGB, background_color: RGB) {
		elem.css({
			'color': this.getForegroundString(color),
			'background-color': this.getBackgroundWithOpacityString(background_color)
		});
	}

	assembleStyling(): void {
		this.getTags(false).map((v) => {
			this.findElement(v.tag_name)?.map(
				(e) => {
					this._applyCssToElement(e, v.color, v.background_color);
				}
			)
		});

		this.getTags().map((v) => {
			this.findElement(v.tag_name)?.map(
				(e) => {
					this._applyCssToElement(e, v.color, v.background_color);
				}
			)
		});
	}

	removeStyling(): void {
		this.getTags(false).map((v) => {
			this.findElement(v.tag_name)?.map(
				(e) => {
					e.removeAttr('style');
				}
			)
		});

		this.getTags().map((v) => {
			this.findElement(v.tag_name)?.map(
				(e) => {
					e.removeAttr('style');
				}
			)
		});
	}
}
