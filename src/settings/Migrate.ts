// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {
    migrate_0_to_1,
    migrate_1_to_2,
    migrate_2_to_3,
    migrate_3_to_4,
    migrate_4_to_5,
    migrate_5_to_6,
    migrate_6_to_7,
    migrate_7_to_8
} from "src/settings/migrations";
import {IColoredTagWranglerSettings} from "./DefaultSettings";
// ---------------------------------------------------------------------------------------------------------------------
// Support Code
// ---------------------------------------------------------------------------------------------------------------------
const MIGRATION_STEPS: ((data: any) => any)[] = [ // Using any's isn't perfect but will do for now
    // Add more lambdas in order.
    //      Btw this only works because I smart enough to start from 0,
    //      that way I don't need to do any other steps in the for loop
    (data) => migrate_0_to_1(data),
    (data) => migrate_1_to_2(data),
    (data) => migrate_2_to_3(data),
    (data) => migrate_3_to_4(data),
    (data) => migrate_4_to_5(data),
    (data) => migrate_5_to_6(data),
    (data) => migrate_6_to_7(data),
    (data) => migrate_7_to_8(data),
];

// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export function Migrate(data:any):IColoredTagWranglerSettings|null   {
    // If the plugin hasn't been used before, no data will be present
    if (data === null){
        return null
    }

    let version = data?.Info?.SettingsVersion ?? -1;

    if (version === -1){
        // Exit clause
        console.warn("Version could not be established, assigning as is. Please data.json.")
        return data
    }

    // Actual migrations
    //      Added logging, might remove this in future?
    let migratedData: IColoredTagWranglerSettings = data;
    for (version; version < MIGRATION_STEPS.length; version++) {
        migratedData = MIGRATION_STEPS[version](migratedData);
        console.log(`Migrated data.json from ColoredTagsWrangler to version ${version+1}`)
    }
    return migratedData;
}