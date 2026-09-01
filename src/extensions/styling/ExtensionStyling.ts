import { AbstractExtension } from "../AbstractExtension";
import { CssWranglerStyling } from "./CssWranglerStyling";
import { IColoredTagRecord, ICoreSettings } from "src/types/settings";

export class StylingExtension extends AbstractExtension {
    extensionName = "styling";
    description = "Tag no-wrap and other styling options";
    extensionRequirements: string[] = ["core"];
    cssWrangler: CssWranglerStyling;

    constructor(records: IColoredTagRecord[], settings: ICoreSettings) {
        super();
        this.cssWrangler = new CssWranglerStyling(records, settings);
        this.isEnabled = true;
    }
}
