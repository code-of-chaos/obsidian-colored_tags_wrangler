import { describe, it, expect, beforeEach } from "vitest";
import { StyleManager } from "../../../../src/services/StyleManager";
import { IExtension, ICssWrangler } from "../../../../src/types/extensions";

describe("StyleManager", () => {
    let manager: StyleManager;

    beforeEach(() => {
        manager = new StyleManager();
    });

    describe("registerExtension", () => {
        it("registers an extension", () => {
            const ext: IExtension = {
                extensionName: "test",
                description: "Test extension",
                extensionRequirements: [],
                isEnabled: true,
                cssWrangler: { getRules: () => ({}) },
            };

            manager.registerExtension(ext);
            // No direct way to check, but it should not throw
        });
    });

    describe("unregisterExtension", () => {
        it("unregisters an extension by name", () => {
            const ext: IExtension = {
                extensionName: "test",
                description: "Test extension",
                extensionRequirements: [],
                isEnabled: true,
                cssWrangler: { getRules: () => ({}) },
            };

            manager.registerExtension(ext);
            manager.unregisterExtension("test");
            // No direct way to check, but it should not throw
        });
    });

    describe("getCss", () => {
        it("returns empty string when no extensions", () => {
            expect(manager.getCss()).toBe("");
        });

        it("returns CSS from enabled extensions", () => {
            const ext: IExtension = {
                extensionName: "test",
                description: "Test extension",
                extensionRequirements: [],
                isEnabled: true,
                cssWrangler: {
                    getRules: () => ({
                        "body.theme-light .tag": {
                            color: "rgb(255, 0, 0)",
                        },
                    }),
                },
            };

            manager.registerExtension(ext);
            const css = manager.getCss();
            expect(css).toContain("body.theme-light .tag");
            expect(css).toContain("color: rgb(255, 0, 0);");
        });

        it("does not include CSS from disabled extensions", () => {
            const ext: IExtension = {
                extensionName: "test",
                description: "Test extension",
                extensionRequirements: [],
                isEnabled: false,
                cssWrangler: {
                    getRules: () => ({
                        "body.theme-light .tag": {
                            color: "rgb(255, 0, 0)",
                        },
                    }),
                },
            };

            manager.registerExtension(ext);
            const css = manager.getCss();
            expect(css).toBe("");
        });

        it("combines CSS from multiple extensions", () => {
            const ext1: IExtension = {
                extensionName: "test1",
                description: "Test extension 1",
                extensionRequirements: [],
                isEnabled: true,
                cssWrangler: {
                    getRules: () => ({
                        ".tag1": { color: "red" },
                    }),
                },
            };

            const ext2: IExtension = {
                extensionName: "test2",
                description: "Test extension 2",
                extensionRequirements: [],
                isEnabled: true,
                cssWrangler: {
                    getRules: () => ({
                        ".tag2": { color: "blue" },
                    }),
                },
            };

            manager.registerExtension(ext1);
            manager.registerExtension(ext2);
            const css = manager.getCss();
            expect(css).toContain(".tag1");
            expect(css).toContain(".tag2");
        });

        it("formats CSS correctly", () => {
            const ext: IExtension = {
                extensionName: "test",
                description: "Test extension",
                extensionRequirements: [],
                isEnabled: true,
                cssWrangler: {
                    getRules: () => ({
                        ".test": {
                            color: "red",
                            "background-color": "blue",
                        },
                    }),
                },
            };

            manager.registerExtension(ext);
            const css = manager.getCss();
            expect(css).toContain(".test {");
            expect(css).toContain("  color: red;");
            expect(css).toContain("  background-color: blue;");
            expect(css).toContain("}");
        });
    });

    describe("cleanup", () => {
        it("removes the style element", () => {
            manager.cleanup();
            // After cleanup, getCss should return empty
            expect(manager.getCss()).toBe("");
        });
    });
});
