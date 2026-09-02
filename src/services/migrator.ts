import { Notice } from "obsidian";
import { IPluginSettings } from "src/types/settings";
import { migrate14to15 } from "src/types/migrations/migrate-14-to-15";
import { migrations } from "src/types/migrations/migrate-00-to-14";

const CURRENT_VERSION = 15;

export interface MigrationResult {
    success: boolean;
    data: IPluginSettings | null;
    error?: string;
}

export async function migrateSettings(
    data: Record<string, unknown> | null,
    vault: { adapter: { read: (path: string) => Promise<string>; write: (path: string, data: string) => Promise<void> }; configDir: string }
): Promise<MigrationResult> {
    if (!data) {
        return { success: true, data: null };
    }

    const info = data["Info"] as { SettingsVersion?: number } | undefined;
    const currentVersion = info?.SettingsVersion;

    if (currentVersion === undefined) {
        return { success: true, data: null };
    }

    if (currentVersion >= CURRENT_VERSION) {
        return { success: true, data: data as unknown as IPluginSettings };
    }

    // Create backup
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const backupPath = `${vault.configDir}/plugins/colored-tags-wrangler/data-backup-${timestamp}.json`;
    try {
        await vault.adapter.write(backupPath, JSON.stringify(data, null, 2));
    } catch (e) {
        console.error("Failed to create backup:", e);
    }

    // Run migrations v0-v14
    let currentData: Record<string, unknown> = data;
    for (let version = currentVersion; version < 14; version++) {
        const migration = migrations[version];
        if (!migration) {
            return { success: false, data: null, error: `No migration found for version ${String(version)}` };
        }
        try {
            currentData = migration(currentData);
        } catch (e) {
            return { success: false, data: null, error: `Migration ${String(version)} failed: ${String(e)}` };
        }
    }

    // Run final migration v14 -> v15
    try {
        const result = migrate14to15(currentData as unknown as Parameters<typeof migrate14to15>[0]);
        new Notice("Colored tags wrangler settings have been updated.");
        return { success: true, data: result };
    } catch (e) {
        return { success: false, data: null, error: `Migration 14->15 failed: ${String(e)}` };
    }
}
