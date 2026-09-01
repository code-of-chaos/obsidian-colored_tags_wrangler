import { AbstractExtension } from "../AbstractExtension";
import { CssWranglerCanvas } from "./CssWranglerCanvas";
import { IColoredTagRecord, ICanvasSettings } from "src/types/settings";

export class CanvasExtension extends AbstractExtension {
    extensionName = "canvas";
    description = "Color canvas nodes containing colored tags";
    extensionRequirements: string[] = ["core"];
    cssWrangler: CssWranglerCanvas;

    constructor(records: IColoredTagRecord[], settings: ICanvasSettings) {
        super();
        this.cssWrangler = new CssWranglerCanvas(records, settings);
    }
}
