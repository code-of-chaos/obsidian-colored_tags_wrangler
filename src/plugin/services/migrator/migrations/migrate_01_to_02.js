import { __awaiter } from "tslib";
import { v4 as uuid4 } from "uuid";
// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export function migrate_01_to_02(loaded_data) {
    return __awaiter(this, void 0, void 0, function* () {
        // Update SemanticObsidianColors
        let original_semantic_tags = loaded_data.TagColors.SemanticObsidianColors;
        let transformed_semantic_tags = {};
        for (const key of Object.keys(original_semantic_tags)) {
            const originalData = original_semantic_tags[key];
            // Transform the data as needed
            // Store the transformed data in the new object
            transformed_semantic_tags[uuid4()] = {
                tag_name: key,
                obsidian_css_var: originalData
            };
        }
        // Update SemanticObsidianColors
        let original_css_var_tags = loaded_data.TagColors.CssVars;
        let transformed_css_var_tags = {};
        for (const key of Object.keys(original_css_var_tags)) {
            const originalData = original_css_var_tags[key];
            // Transform the data as needed
            // Store the transformed data in the new object
            transformed_css_var_tags[uuid4()] = {
                tag_name: key,
                color: originalData.color,
                background: originalData.background
            };
        }
        // Return the updated data with the new structure
        let transformed_data = loaded_data;
        transformed_data.TagColors.SemanticObsidianColors = transformed_semantic_tags;
        transformed_data.TagColors.CssVars = transformed_css_var_tags;
        transformed_data.Info.SettingsVersion = 2;
        return transformed_data;
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWlncmF0ZV8wMV90b18wMi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1pZ3JhdGVfMDFfdG9fMDIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUlBLE9BQU8sRUFBQyxFQUFFLElBQUksS0FBSyxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBQ2pDLHdIQUF3SDtBQUN4SCxPQUFPO0FBQ1Asd0hBQXdIO0FBQ3hILE1BQU0sVUFBZ0IsZ0JBQWdCLENBQUMsV0FBMEI7O1FBQzdELGdDQUFnQztRQUNoQyxJQUFJLHNCQUFzQixHQUEyQixXQUFXLENBQUMsU0FBUyxDQUFDLHNCQUFzQixDQUFDO1FBQ2xHLElBQUkseUJBQXlCLEdBQWdFLEVBQUUsQ0FBQztRQUVoRyxLQUFLLE1BQU0sR0FBRyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsc0JBQXNCLENBQUMsRUFBRTtZQUNuRCxNQUFNLFlBQVksR0FBRyxzQkFBc0IsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUVqRCwrQkFBK0I7WUFDL0IsK0NBQStDO1lBQy9DLHlCQUF5QixDQUFDLEtBQUssRUFBRSxDQUFDLEdBQUc7Z0JBQ2pDLFFBQVEsRUFBRSxHQUFHO2dCQUNiLGdCQUFnQixFQUFDLFlBQVk7YUFDaEMsQ0FBQztTQUNMO1FBRUQsZ0NBQWdDO1FBQ2hDLElBQUkscUJBQXFCLEdBQXNELFdBQVcsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDO1FBQzdHLElBQUksd0JBQXdCLEdBQXVFLEVBQUUsQ0FBQztRQUV0RyxLQUFLLE1BQU0sR0FBRyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMscUJBQXFCLENBQUMsRUFBRTtZQUNsRCxNQUFNLFlBQVksR0FBRyxxQkFBcUIsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUVoRCwrQkFBK0I7WUFDL0IsK0NBQStDO1lBQy9DLHdCQUF3QixDQUFDLEtBQUssRUFBRSxDQUFDLEdBQUc7Z0JBQ2hDLFFBQVEsRUFBRSxHQUFHO2dCQUNiLEtBQUssRUFBQyxZQUFZLENBQUMsS0FBSztnQkFDeEIsVUFBVSxFQUFDLFlBQVksQ0FBQyxVQUFVO2FBQ3JDLENBQUM7U0FDTDtRQUVELGlEQUFpRDtRQUNqRCxJQUFJLGdCQUFnQixHQUFHLFdBQXdDLENBQUM7UUFDaEUsZ0JBQWdCLENBQUMsU0FBUyxDQUFDLHNCQUFzQixHQUFHLHlCQUF5QixDQUFDO1FBQzlFLGdCQUFnQixDQUFDLFNBQVMsQ0FBQyxPQUFPLEdBQUcsd0JBQXdCLENBQUM7UUFDOUQsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLGVBQWUsR0FBRyxDQUFDLENBQUM7UUFDMUMsT0FBTyxnQkFBZ0IsQ0FBQztJQUU1QixDQUFDO0NBQUEiLCJzb3VyY2VzQ29udGVudCI6WyIvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuLy8gSW1wb3J0c1xyXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuaW1wb3J0IHtJU2V0dGluZ3NfdjAwMSwgSVNldHRpbmdzX3YwMDJ9IGZyb20gXCIuLi9zZXR0aW5nX3ZlcnNpb25zXCI7XHJcbmltcG9ydCB7djQgYXMgdXVpZDR9IGZyb20gXCJ1dWlkXCI7XHJcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4vLyBDb2RlXHJcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gbWlncmF0ZV8wMV90b18wMihsb2FkZWRfZGF0YTpJU2V0dGluZ3NfdjAwMSk6IFByb21pc2U8SVNldHRpbmdzX3YwMDI+IHtcclxuICAgIC8vIFVwZGF0ZSBTZW1hbnRpY09ic2lkaWFuQ29sb3JzXHJcbiAgICBsZXQgb3JpZ2luYWxfc2VtYW50aWNfdGFnczogUmVjb3JkPHN0cmluZywgc3RyaW5nPiA9IGxvYWRlZF9kYXRhLlRhZ0NvbG9ycy5TZW1hbnRpY09ic2lkaWFuQ29sb3JzO1xyXG4gICAgbGV0IHRyYW5zZm9ybWVkX3NlbWFudGljX3RhZ3M6IFJlY29yZDxzdHJpbmcsIHt0YWdfbmFtZTpzdHJpbmcsIG9ic2lkaWFuX2Nzc192YXI6c3RyaW5nIH0+ID0ge307XHJcblxyXG4gICAgZm9yIChjb25zdCBrZXkgb2YgT2JqZWN0LmtleXMob3JpZ2luYWxfc2VtYW50aWNfdGFncykpIHtcclxuICAgICAgICBjb25zdCBvcmlnaW5hbERhdGEgPSBvcmlnaW5hbF9zZW1hbnRpY190YWdzW2tleV07XHJcblxyXG4gICAgICAgIC8vIFRyYW5zZm9ybSB0aGUgZGF0YSBhcyBuZWVkZWRcclxuICAgICAgICAvLyBTdG9yZSB0aGUgdHJhbnNmb3JtZWQgZGF0YSBpbiB0aGUgbmV3IG9iamVjdFxyXG4gICAgICAgIHRyYW5zZm9ybWVkX3NlbWFudGljX3RhZ3NbdXVpZDQoKV0gPSB7XHJcbiAgICAgICAgICAgIHRhZ19uYW1lOiBrZXksIC8vIFlvdSBjYW4gc2V0IHRoZSAndGFnX25hbWUnIGFzIHRoZSBrZXlcclxuICAgICAgICAgICAgb2JzaWRpYW5fY3NzX3ZhcjpvcmlnaW5hbERhdGFcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFVwZGF0ZSBTZW1hbnRpY09ic2lkaWFuQ29sb3JzXHJcbiAgICBsZXQgb3JpZ2luYWxfY3NzX3Zhcl90YWdzOiBSZWNvcmQ8c3RyaW5nLCB7Y29sb3I6c3RyaW5nLCBiYWNrZ3JvdW5kOnN0cmluZ30+ID0gbG9hZGVkX2RhdGEuVGFnQ29sb3JzLkNzc1ZhcnM7XHJcbiAgICBsZXQgdHJhbnNmb3JtZWRfY3NzX3Zhcl90YWdzOiBSZWNvcmQ8c3RyaW5nLCB7dGFnX25hbWU6c3RyaW5nLCBjb2xvcjpzdHJpbmcsIGJhY2tncm91bmQ6c3RyaW5nfT4gPSB7fTtcclxuXHJcbiAgICBmb3IgKGNvbnN0IGtleSBvZiBPYmplY3Qua2V5cyhvcmlnaW5hbF9jc3NfdmFyX3RhZ3MpKSB7XHJcbiAgICAgICAgY29uc3Qgb3JpZ2luYWxEYXRhID0gb3JpZ2luYWxfY3NzX3Zhcl90YWdzW2tleV07XHJcblxyXG4gICAgICAgIC8vIFRyYW5zZm9ybSB0aGUgZGF0YSBhcyBuZWVkZWRcclxuICAgICAgICAvLyBTdG9yZSB0aGUgdHJhbnNmb3JtZWQgZGF0YSBpbiB0aGUgbmV3IG9iamVjdFxyXG4gICAgICAgIHRyYW5zZm9ybWVkX2Nzc192YXJfdGFnc1t1dWlkNCgpXSA9IHtcclxuICAgICAgICAgICAgdGFnX25hbWU6IGtleSwgLy8gWW91IGNhbiBzZXQgdGhlICd0YWdfbmFtZScgYXMgdGhlIGtleVxyXG4gICAgICAgICAgICBjb2xvcjpvcmlnaW5hbERhdGEuY29sb3IsXHJcbiAgICAgICAgICAgIGJhY2tncm91bmQ6b3JpZ2luYWxEYXRhLmJhY2tncm91bmRcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFJldHVybiB0aGUgdXBkYXRlZCBkYXRhIHdpdGggdGhlIG5ldyBzdHJ1Y3R1cmVcclxuICAgIGxldCB0cmFuc2Zvcm1lZF9kYXRhID0gbG9hZGVkX2RhdGEgYXMgdW5rbm93biBhcyBJU2V0dGluZ3NfdjAwMjtcclxuICAgIHRyYW5zZm9ybWVkX2RhdGEuVGFnQ29sb3JzLlNlbWFudGljT2JzaWRpYW5Db2xvcnMgPSB0cmFuc2Zvcm1lZF9zZW1hbnRpY190YWdzO1xyXG4gICAgdHJhbnNmb3JtZWRfZGF0YS5UYWdDb2xvcnMuQ3NzVmFycyA9IHRyYW5zZm9ybWVkX2Nzc192YXJfdGFncztcclxuICAgIHRyYW5zZm9ybWVkX2RhdGEuSW5mby5TZXR0aW5nc1ZlcnNpb24gPSAyO1xyXG4gICAgcmV0dXJuIHRyYW5zZm9ybWVkX2RhdGE7XHJcblxyXG59XHJcbiJdfQ==