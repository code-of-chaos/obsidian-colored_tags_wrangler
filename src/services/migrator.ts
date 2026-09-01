import { Notice } from "obsidian";
import { ISettingsV14 } from "src/types/settings-v14";
import { IPluginSettings } from "src/types/settings";
import { migrate14to15 } from "src/types/migrations/migrate-14-to-15";

const CURRENT_VERSION = 15;

type MigrationFunction = (data: unknown) => unknown;

const migrations: Record<number, MigrationFunction> = {
    14: (data) => migrate14to15(data as ISettingsV14),
};

export interface MigrationResult {
    success: boolean;
    data: IPluginSettings | null;
    error?: string;
}

export async function migrateSettings(
    data: Record<string, unknown> | null,
    vault: { adapter: { read: (path: string) => Promise<string>; write: (path: string, data: string) => Promise<void> } }
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
    const backupPath = `.obsidian/plugins/colored-tags-wrangler/data-backup-${timestamp}.json`;
    try {
        await vault.adapter.write(backupPath, JSON.stringify(data, null, 2));
    } catch (e) {
        console.error("Failed to create backup:", e);
    }

    // Run migrations
    let currentData: unknown = data;
    for (let version = currentVersion; version < CURRENT_VERSION; version++) {
        const migration = migrations[version];
        if (!migration) {
            return { success: false, data: null, error: `No migration found for version ${version}` };
        }
        try {
            currentData = migration(currentData);
        } catch (e) {
            return { success: false, data: null, error: `Migration ${version} failed: ${e}` };
        }
    }

    new Notice("Colored Tags Wrangler settings have been updated.");
    return { success: true, data: currentData as IPluginSettings };
}
