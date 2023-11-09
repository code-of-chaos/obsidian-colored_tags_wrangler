// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {
    migrate_0_to_1,
    migrate_1_to_2,
    migrate_2_to_3,
    migrate_3_to_4,
} from "src/settings/migrations";
import {IColoredTagWranglerSettings} from "./DefaultSettings";
// ---------------------------------------------------------------------------------------------------------------------
// Support Code
// ---------------------------------------------------------------------------------------------------------------------
const MIGRATION_STEPS: ((data: any) => any)[] = [ // Using any's isn't perfect but will do for now
    (data) => migrate_0_to_1(data),
    (data) => migrate_1_to_2(data),
    (data) => migrate_2_to_3(data),
    (data) => migrate_3_to_4(data),
];

// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export function Migrate(data:any):IColoredTagWranglerSettings   {
    // Add more lambdas in order.
    //      Btw this only works because I smart enough to start from 0,
    //      that way I don't need to do any other steps in the for loop
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
        console.log(`Migrate data.json from ColoredTagsWrangler to version ${version}`)
    }
    return migratedData;
}