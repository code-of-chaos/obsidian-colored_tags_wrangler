import { __awaiter } from "tslib";
import { v4 as uuid4 } from "uuid";
// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export function migrate_00_to_01(loaded_data) {
    return __awaiter(this, void 0, void 0, function* () {
        let original_colored_tags = loaded_data.TagColors.ColorPicker;
        let transformedColoredTags = {};
        for (const key of Object.keys(original_colored_tags)) {
            const originalData = original_colored_tags[key];
            // Transform the data as needed
            // Store the transformed data in the new object
            transformedColoredTags[uuid4()] = {
                tag_name: key,
                color: originalData
            };
        }
        // Return the updated data with the new structure
        let transformed_data = loaded_data;
        transformed_data.TagColors.ColorPicker = transformedColoredTags;
        transformed_data.Info.SettingsVersion = 1;
        return transformed_data;
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWlncmF0ZV8wMF90b18wMS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1pZ3JhdGVfMDBfdG9fMDEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUlBLE9BQU8sRUFBQyxFQUFFLElBQUksS0FBSyxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBR2pDLHdIQUF3SDtBQUN4SCxPQUFPO0FBQ1Asd0hBQXdIO0FBQ3hILE1BQU0sVUFBZ0IsZ0JBQWdCLENBQUMsV0FBMEI7O1FBQzdELElBQUkscUJBQXFCLEdBQXdELFdBQVcsQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDO1FBQ25ILElBQUksc0JBQXNCLEdBQWlELEVBQUUsQ0FBQztRQUU5RSxLQUFLLE1BQU0sR0FBRyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMscUJBQXFCLENBQUMsRUFBRTtZQUNsRCxNQUFNLFlBQVksR0FBRyxxQkFBcUIsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUVoRCwrQkFBK0I7WUFDL0IsK0NBQStDO1lBQy9DLHNCQUFzQixDQUFDLEtBQUssRUFBRSxDQUFDLEdBQUc7Z0JBQzlCLFFBQVEsRUFBRSxHQUFHO2dCQUNiLEtBQUssRUFBQyxZQUFZO2FBQ3JCLENBQUM7U0FDTDtRQUVELGlEQUFpRDtRQUNqRCxJQUFJLGdCQUFnQixHQUFHLFdBQXdDLENBQUM7UUFDaEUsZ0JBQWdCLENBQUMsU0FBUyxDQUFDLFdBQVcsR0FBRyxzQkFBc0IsQ0FBQztRQUNoRSxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsZUFBZSxHQUFHLENBQUMsQ0FBQztRQUMxQyxPQUFPLGdCQUFnQixDQUFDO0lBRTVCLENBQUM7Q0FBQSIsInNvdXJjZXNDb250ZW50IjpbIi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4vLyBJbXBvcnRzXHJcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5pbXBvcnQge0lTZXR0aW5nc192MDAwLElTZXR0aW5nc192MDAxfSBmcm9tIFwiLi4vc2V0dGluZ192ZXJzaW9uc1wiO1xyXG5pbXBvcnQge3Y0IGFzIHV1aWQ0fSBmcm9tIFwidXVpZFwiO1xyXG5pbXBvcnQge1JHQn0gZnJvbSBcIm9ic2lkaWFuXCI7XHJcblxyXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuLy8gQ29kZVxyXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIG1pZ3JhdGVfMDBfdG9fMDEobG9hZGVkX2RhdGE6SVNldHRpbmdzX3YwMDApOlByb21pc2U8SVNldHRpbmdzX3YwMDE+IHtcclxuICAgIGxldCBvcmlnaW5hbF9jb2xvcmVkX3RhZ3M6IFJlY29yZDxzdHJpbmcsIHsgcjogbnVtYmVyOyBnOiBudW1iZXI7IGI6IG51bWJlciB9PiA9IGxvYWRlZF9kYXRhLlRhZ0NvbG9ycy5Db2xvclBpY2tlcjtcclxuICAgIGxldCB0cmFuc2Zvcm1lZENvbG9yZWRUYWdzOiBSZWNvcmQ8c3RyaW5nLCB7dGFnX25hbWU6c3RyaW5nLCBjb2xvcjpSR0J9PiA9IHt9O1xyXG5cclxuICAgIGZvciAoY29uc3Qga2V5IG9mIE9iamVjdC5rZXlzKG9yaWdpbmFsX2NvbG9yZWRfdGFncykpIHtcclxuICAgICAgICBjb25zdCBvcmlnaW5hbERhdGEgPSBvcmlnaW5hbF9jb2xvcmVkX3RhZ3Nba2V5XTtcclxuXHJcbiAgICAgICAgLy8gVHJhbnNmb3JtIHRoZSBkYXRhIGFzIG5lZWRlZFxyXG4gICAgICAgIC8vIFN0b3JlIHRoZSB0cmFuc2Zvcm1lZCBkYXRhIGluIHRoZSBuZXcgb2JqZWN0XHJcbiAgICAgICAgdHJhbnNmb3JtZWRDb2xvcmVkVGFnc1t1dWlkNCgpXSA9IHtcclxuICAgICAgICAgICAgdGFnX25hbWU6IGtleSwgLy8gWW91IGNhbiBzZXQgdGhlICd0YWdfbmFtZScgYXMgdGhlIGtleVxyXG4gICAgICAgICAgICBjb2xvcjpvcmlnaW5hbERhdGFcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFJldHVybiB0aGUgdXBkYXRlZCBkYXRhIHdpdGggdGhlIG5ldyBzdHJ1Y3R1cmVcclxuICAgIGxldCB0cmFuc2Zvcm1lZF9kYXRhID0gbG9hZGVkX2RhdGEgYXMgdW5rbm93biBhcyBJU2V0dGluZ3NfdjAwMTtcclxuICAgIHRyYW5zZm9ybWVkX2RhdGEuVGFnQ29sb3JzLkNvbG9yUGlja2VyID0gdHJhbnNmb3JtZWRDb2xvcmVkVGFncztcclxuICAgIHRyYW5zZm9ybWVkX2RhdGEuSW5mby5TZXR0aW5nc1ZlcnNpb24gPSAxO1xyXG4gICAgcmV0dXJuIHRyYW5zZm9ybWVkX2RhdGE7XHJcblxyXG59XHJcbiJdfQ==