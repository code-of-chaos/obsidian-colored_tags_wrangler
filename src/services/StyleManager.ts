import { IExtension } from "src/types/extensions";

export class StyleManager {
    private styleElement: HTMLStyleElement | null = null;
    private extensions: IExtension[] = [];

    constructor() {
        this.createStyleElement();
    }

    private createStyleElement(): void {
        if (typeof document === "undefined") return;

        this.styleElement = document.createElement("style");
        this.styleElement.id = "colored-tags-wrangler";
        document.head.appendChild(this.styleElement);
    }

    registerExtension(extension: IExtension): void {
        this.extensions.push(extension);
    }

    unregisterExtension(extensionName: string): void {
        this.extensions = this.extensions.filter((e) => e.extensionName !== extensionName);
    }

    updateStyles(): void {
        if (!this.styleElement) return;

        const css = this.getCss();
        this.styleElement.textContent = css;
    }

    getCss(): string {
        const rules: Record<string, Record<string, string>> = {};

        for (const extension of this.extensions) {
            if (!extension.isEnabled) continue;

            const extensionRules = extension.cssWrangler.getRules();
            Object.assign(rules, extensionRules);
        }

        return Object.entries(rules)
            .map(([selector, properties]) => {
                const props = Object.entries(properties)
                    .map(([prop, value]) => `  ${prop}: ${value};`)
                    .join("\n");
                return `${selector} {\n${props}\n}`;
            })
            .join("\n\n");
    }

    cleanup(): void {
        this.styleElement?.remove();
        this.styleElement = null;
        this.extensions = [];
    }
}
