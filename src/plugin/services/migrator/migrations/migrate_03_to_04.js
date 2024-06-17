import { __awaiter } from "tslib";
// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export function migrate_03_to_04(loaded_data) {
    return __awaiter(this, void 0, void 0, function* () {
        let transformed_data = loaded_data;
        transformed_data.TagColors = {
            ColorPicker: loaded_data.TagColors.ColorPicker,
            EnableMultipleTags: loaded_data.TagColors.EnableMultipleTags,
            Values: loaded_data.TagColors.Values
        };
        transformed_data.FolderNote.Values = {
            ForceImportant: true,
            BorderRadius: "12px",
            Padding: "5px",
        };
        transformed_data.Info.SettingsVersion = 4;
        return transformed_data;
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWlncmF0ZV8wM190b18wNC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1pZ3JhdGVfMDNfdG9fMDQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUlBLHdIQUF3SDtBQUN4SCxPQUFPO0FBQ1Asd0hBQXdIO0FBQ3hILE1BQU0sVUFBZ0IsZ0JBQWdCLENBQUMsV0FBMEI7O1FBQzdELElBQUksZ0JBQWdCLEdBQUcsV0FBd0MsQ0FBQztRQUNoRSxnQkFBZ0IsQ0FBQyxTQUFTLEdBQUc7WUFDekIsV0FBVyxFQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsV0FBVztZQUM3QyxrQkFBa0IsRUFBQyxXQUFXLENBQUMsU0FBUyxDQUFDLGtCQUFrQjtZQUMzRCxNQUFNLEVBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxNQUFNO1NBQ3RDLENBQUE7UUFFRCxnQkFBZ0IsQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHO1lBQ2pDLGNBQWMsRUFBQyxJQUFJO1lBQ25CLFlBQVksRUFBQyxNQUFNO1lBQ25CLE9BQU8sRUFBQyxLQUFLO1NBQ2hCLENBQUE7UUFFRCxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsZUFBZSxHQUFHLENBQUMsQ0FBQztRQUMxQyxPQUFPLGdCQUFnQixDQUFFO0lBRTdCLENBQUM7Q0FBQSIsInNvdXJjZXNDb250ZW50IjpbIi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4vLyBJbXBvcnRzXHJcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5pbXBvcnQge0lTZXR0aW5nc192MDAzLCBJU2V0dGluZ3NfdjAwNH0gZnJvbSBcIi4uL3NldHRpbmdfdmVyc2lvbnNcIjtcclxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbi8vIENvZGVcclxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBtaWdyYXRlXzAzX3RvXzA0KGxvYWRlZF9kYXRhOklTZXR0aW5nc192MDAzKTpQcm9taXNlPElTZXR0aW5nc192MDA0PiB7XHJcbiAgICBsZXQgdHJhbnNmb3JtZWRfZGF0YSA9IGxvYWRlZF9kYXRhIGFzIHVua25vd24gYXMgSVNldHRpbmdzX3YwMDQ7XHJcbiAgICB0cmFuc2Zvcm1lZF9kYXRhLlRhZ0NvbG9ycyA9IHtcclxuICAgICAgICBDb2xvclBpY2tlcjpsb2FkZWRfZGF0YS5UYWdDb2xvcnMuQ29sb3JQaWNrZXIsXHJcbiAgICAgICAgRW5hYmxlTXVsdGlwbGVUYWdzOmxvYWRlZF9kYXRhLlRhZ0NvbG9ycy5FbmFibGVNdWx0aXBsZVRhZ3MsXHJcbiAgICAgICAgVmFsdWVzOmxvYWRlZF9kYXRhLlRhZ0NvbG9ycy5WYWx1ZXNcclxuICAgIH1cclxuXHJcbiAgICB0cmFuc2Zvcm1lZF9kYXRhLkZvbGRlck5vdGUuVmFsdWVzID0ge1xyXG4gICAgICAgIEZvcmNlSW1wb3J0YW50OnRydWUsXHJcbiAgICAgICAgQm9yZGVyUmFkaXVzOlwiMTJweFwiLFxyXG4gICAgICAgIFBhZGRpbmc6XCI1cHhcIixcclxuICAgIH1cclxuXHJcbiAgICB0cmFuc2Zvcm1lZF9kYXRhLkluZm8uU2V0dGluZ3NWZXJzaW9uID0gNDtcclxuICAgIHJldHVybiB0cmFuc2Zvcm1lZF9kYXRhIDtcclxuXHJcbn1cclxuIl19