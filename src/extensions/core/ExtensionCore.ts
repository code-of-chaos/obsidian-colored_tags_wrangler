import { AbstractExtension } from "../AbstractExtension";
import { CssWranglerCore } from "./CssWranglerCore";
import { IColoredTagRecord, ICoreSettings } from "src/types/settings";

export class CoreExtension extends AbstractExtension {
    extensionName = "core";
    description = "Core tag coloring for notes and editing view";
    extensionRequirements: string[] = [];
    cssWrangler: CssWranglerCore;

    constructor(records: IColoredTagRecord[], settings: ICoreSettings) {
        super();
        this.cssWrangler = new CssWranglerCore(records, settings);
        this.isEnabled = true;
    }
}
