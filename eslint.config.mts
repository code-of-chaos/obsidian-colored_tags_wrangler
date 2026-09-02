import obsidianmd from "eslint-plugin-obsidianmd";
import globals from "globals";
import { globalIgnores, defineConfig } from "eslint/config";

export default defineConfig(
    globalIgnores([
        "node_modules",
        "dist",
        "coverage",
        "esbuild.config.mjs",
        "vitest.config.ts",
        "version-bump.mjs",
        "versions.json",
        "main.js",
        "package.json",
        "package-lock.json",
        "tsconfig.json",
        ".old/**",
        "tools/**",
        "tests/**",
    ]),
    {
        languageOptions: {
            globals: {
                ...globals.browser,
            },
            parserOptions: {
                projectService: {
                    allowDefaultProject: [
                        "eslint.config.mts",
                        "manifest.json",
                        "vitest.config.ts",
                    ],
                },
                tsconfigRootDir: import.meta.dirname,
                extraFileExtensions: [".json"],
            },
        },
    },
    ...obsidianmd.configs.recommended,
);
