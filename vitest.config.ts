import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        globals: true,
        environment: "node",
        include: ["tests/**/*.test.ts"],
        coverage: {
            provider: "v8",
            reporter: ["text", "json", "html"],
            include: ["src/**/*.ts"],
            exclude: ["src/main.ts"],
        },
        alias: {
            obsidian: new URL("./tests/__mocks__/obsidian.ts", import.meta.url).pathname,
        },
        environmentMatchGlobs: [
            ["tests/unit/extensions/properties.test.ts", "jsdom"],
            ["tests/unit/extensions/folder-note-auto-detect.test.ts", "jsdom"],
        ],
    },
});
