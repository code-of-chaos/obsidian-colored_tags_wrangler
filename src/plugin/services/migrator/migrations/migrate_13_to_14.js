import { __awaiter } from "tslib";
// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export function migrate_13_to_14(loaded_data) {
    return __awaiter(this, void 0, void 0, function* () {
        let transformed_data = loaded_data;
        transformed_data.Info.SettingsVersion = 14;
        return transformed_data;
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWlncmF0ZV8xM190b18xNC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1pZ3JhdGVfMTNfdG9fMTQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUtBLHdIQUF3SDtBQUN4SCxPQUFPO0FBQ1Asd0hBQXdIO0FBQ3hILE1BQU0sVUFBZ0IsZ0JBQWdCLENBQUMsV0FBMEI7O1FBQzdELElBQUksZ0JBQWdCLEdBQUcsV0FBd0MsQ0FBQztRQUVoRSxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsZUFBZSxHQUFHLEVBQUUsQ0FBQztRQUMzQyxPQUFPLGdCQUE2QyxDQUFDO0lBQ3pELENBQUM7Q0FBQSIsInNvdXJjZXNDb250ZW50IjpbIi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4vLyBJbXBvcnRzXHJcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5pbXBvcnQge0lTZXR0aW5nc192MDEzLCBJU2V0dGluZ3NfdjAxNH0gZnJvbSBcIi4uL3NldHRpbmdfdmVyc2lvbnNcIjtcclxuXHJcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4vLyBDb2RlXHJcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gbWlncmF0ZV8xM190b18xNChsb2FkZWRfZGF0YTpJU2V0dGluZ3NfdjAxMyk6IFByb21pc2U8SVNldHRpbmdzX3YwMTQ+IHtcclxuICAgIGxldCB0cmFuc2Zvcm1lZF9kYXRhID0gbG9hZGVkX2RhdGEgYXMgdW5rbm93biBhcyBJU2V0dGluZ3NfdjAxNDtcclxuXHJcbiAgICB0cmFuc2Zvcm1lZF9kYXRhLkluZm8uU2V0dGluZ3NWZXJzaW9uID0gMTQ7XHJcbiAgICByZXR1cm4gdHJhbnNmb3JtZWRfZGF0YSBhcyB1bmtub3duIGFzIElTZXR0aW5nc192MDE0O1xyXG59XHJcbiJdfQ==