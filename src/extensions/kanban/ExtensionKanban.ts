import { AbstractExtension } from "../AbstractExtension";
import { CssWranglerKanban } from "./CssWranglerKanban";
import { IColoredTagRecord, IKanbanSettings } from "src/types/settings";

export class KanbanExtension extends AbstractExtension {
    extensionName = "kanban";
    description = "Color kanban cards and lane backgrounds";
    extensionRequirements: string[] = ["core"];
    cssWrangler: CssWranglerKanban;

    constructor(records: IColoredTagRecord[], settings: IKanbanSettings) {
        super();
        this.cssWrangler = new CssWranglerKanban(records, settings);
    }
}
