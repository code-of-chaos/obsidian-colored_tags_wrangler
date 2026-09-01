import { IExtension, ICssWrangler, IEventHandler } from "src/types/extensions";

export abstract class AbstractExtension implements IExtension {
    abstract extensionName: string;
    abstract description: string;
    abstract extensionRequirements: string[];
    abstract cssWrangler: ICssWrangler;
    eventHandler?: IEventHandler;

    private _isEnabled = false;

    get isEnabled(): boolean {
        return this._isEnabled;
    }

    set isEnabled(value: boolean) {
        this._isEnabled = value;
    }
}
