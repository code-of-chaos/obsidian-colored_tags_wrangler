export interface ICssWrangler {
    getRules(): Record<string, Record<string, string>>;
}

export interface IEventHandler {
    register(): void;
    unregister(): void;
}

export interface IExtension {
    extensionName: string;
    description: string;
    extensionRequirements: string[];
    isEnabled: boolean;
    cssWrangler: ICssWrangler;
    eventHandler?: IEventHandler;
}
