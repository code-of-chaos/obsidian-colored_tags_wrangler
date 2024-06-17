import { __awaiter } from "tslib";
// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export function migrate_02_to_03(loaded_data) {
    return __awaiter(this, void 0, void 0, function* () {
        // Return data as is, because structure wasn't changed, just added to.
        let transformed_data = loaded_data;
        transformed_data.Info.SettingsVersion = 3;
        return transformed_data;
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWlncmF0ZV8wMl90b18wMy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1pZ3JhdGVfMDJfdG9fMDMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUlBLHdIQUF3SDtBQUN4SCxPQUFPO0FBQ1Asd0hBQXdIO0FBQ3hILE1BQU0sVUFBZ0IsZ0JBQWdCLENBQUMsV0FBMEI7O1FBQzdELHNFQUFzRTtRQUN0RSxJQUFJLGdCQUFnQixHQUFHLFdBQXdDLENBQUM7UUFDaEUsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLGVBQWUsR0FBRyxDQUFDLENBQUM7UUFDMUMsT0FBTyxnQkFBZ0IsQ0FBQztJQUU1QixDQUFDO0NBQUEiLCJzb3VyY2VzQ29udGVudCI6WyIvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuLy8gSW1wb3J0c1xyXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuaW1wb3J0IHtJU2V0dGluZ3NfdjAwMiwgSVNldHRpbmdzX3YwMDN9IGZyb20gXCIuLi9zZXR0aW5nX3ZlcnNpb25zXCI7XHJcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4vLyBDb2RlXHJcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gbWlncmF0ZV8wMl90b18wMyhsb2FkZWRfZGF0YTpJU2V0dGluZ3NfdjAwMik6UHJvbWlzZTxJU2V0dGluZ3NfdjAwMz4ge1xyXG4gICAgLy8gUmV0dXJuIGRhdGEgYXMgaXMsIGJlY2F1c2Ugc3RydWN0dXJlIHdhc24ndCBjaGFuZ2VkLCBqdXN0IGFkZGVkIHRvLlxyXG4gICAgbGV0IHRyYW5zZm9ybWVkX2RhdGEgPSBsb2FkZWRfZGF0YSBhcyB1bmtub3duIGFzIElTZXR0aW5nc192MDAzO1xyXG4gICAgdHJhbnNmb3JtZWRfZGF0YS5JbmZvLlNldHRpbmdzVmVyc2lvbiA9IDM7XHJcbiAgICByZXR1cm4gdHJhbnNmb3JtZWRfZGF0YTtcclxuXHJcbn1cclxuIl19