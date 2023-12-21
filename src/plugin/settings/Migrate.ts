// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {
    migrate_00_to_01,
    migrate_01_to_02,
    migrate_02_to_03,
    migrate_03_to_04,
    migrate_04_to_05,
    migrate_05_to_06,
    migrate_06_to_07,
    migrate_07_to_08,
    migrate_08_to_09,
    migrate_09_to_10,
} from "src/plugin/settings/migrations";
import {ISettings} from "src/plugin/settings/ISettings";

// ---------------------------------------------------------------------------------------------------------------------
// Support Code
// ---------------------------------------------------------------------------------------------------------------------
const MIGRATION_STEPS: ((data: any) => any)[] = [ // Using any's isn't perfect but will do for now
    // Add more lambdas in order.
    //      Btw this only works because I am dumb enough to start from 0,
    //      that way I don't need to do any other steps in the for loop
    (data) => migrate_00_to_01(data),
    (data) => migrate_01_to_02(data),
    (data) => migrate_02_to_03(data),
    (data) => migrate_03_to_04(data),
    (data) => migrate_04_to_05(data),
    (data) => migrate_05_to_06(data),
    (data) => migrate_06_to_07(data),
    (data) => migrate_07_to_08(data),
    (data) => migrate_08_to_09(data),
    (data) => migrate_09_to_10(data),
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
