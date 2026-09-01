import { AbstractExtension } from "../AbstractExtension";
import { EventHandlerProperties } from "./EventHandlerProperties";
import { IColoredTagRecord, ICoreSettings } from "src/types/settings";

export class PropertiesExtension extends AbstractExtension {
    extensionName = "properties";
    description = "Color tags in note properties panel";
    extensionRequirements: string[] = ["core"];
    cssWrangler = { getRules: () => ({}) };

    constructor(records: IColoredTagRecord[], settings: ICoreSettings) {
        super();
        this.eventHandler = new EventHandlerProperties(records, settings);
    }
}
