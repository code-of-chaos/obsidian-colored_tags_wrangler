// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import * as migrations from "src/plugin/settings/migrations";
import {ISettings} from "src/plugin/settings/ISettings";

// ---------------------------------------------------------------------------------------------------------------------
// Support Code
// ---------------------------------------------------------------------------------------------------------------------
const MIGRATION_STEPS: ((data: any) => any)[] = [ // Using any's isn't perfect but will do for now
    // Add more lambdas in order.
    //      Btw this only works because I am dumb enough to start from 0,
    //      that way I don't need to do any other steps in the for loop
    (data) => migrations.migrate_00_to_01(data),
    (data) => migrations.migrate_01_to_02(data),
    (data) => migrations.migrate_02_to_03(data),
    (data) => migrations.migrate_03_to_04(data),
    (data) => migrations.migrate_04_to_05(data),
    (data) => migrations.migrate_05_to_06(data),
    (data) => migrations.migrate_06_to_07(data),
    (data) => migrations.migrate_07_to_08(data),
    (data) => migrations.migrate_08_to_09(data),
    (data) => migrations.migrate_09_to_10(data),
    (data) => migrations.migrate_10_to_11(data),
    (data) => migrations.migrate_11_to_12(data),
    (data) => migrations.migrate_12_to_13(data),
];

// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export function Migrate(data:any):ISettings|null   {
    // If the plugin hasn't been used before, no data will be present aka no migrations needed
    if (data === null){
        return null
    }

    // Set a default version, else the migrations won't work.
    let version = data?.Info?.SettingsVersion ?? -1;

    if (version === -1){
        // Exit clause
        console.warn("Version could not be established, assigning as is. Please check the data.json file.")
        return data
    }

    // Actual migrations
    //      Added logging, might remove this in future?
    let migratedData: ISettings = data;
    for (version; version < MIGRATION_STEPS.length; version++) {
        migratedData = MIGRATION_STEPS[version](migratedData);
        console.log(`Migrated data.json from ColoredTagsWrangler to version ${migratedData.Info.SettingsVersion}`)
    }
    return migratedData;
}
