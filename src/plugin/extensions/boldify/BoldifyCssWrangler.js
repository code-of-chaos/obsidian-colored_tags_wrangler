import { ServiceProvider } from "../../services/ServiceProvider";
import { themeSelectorDark, themeSelectorLight } from "../../services/css_styler/CssStylerService";
// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export class BoldifyCssWrangler {
    // -----------------------------------------------------------------------------------------------------------------
    // Methods
    // -----------------------------------------------------------------------------------------------------------------
    _assembleCss(selectors) {
        return `
			${selectors.join(", \n")} { 
				font-weight: bold !important;
			}
		`;
    }
    _assembleRules(theme, record) {
        return [this._assembleCss([
                `${theme} .tag[href="#${record.core_tagText}" i]`,
                `${theme} .cm-tag-${record.core_tagText}`
            ])];
    }
    getRules() {
        return ServiceProvider.tagRecords
            .getTagsFlat(false)
            .filter(record => record.core_enabled && record.boldify_enabled)
            .flatMap(record => this._assembleRules(themeSelectorLight, record)
            .concat(this._assembleRules(themeSelectorDark, record)));
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQm9sZGlmeUNzc1dyYW5nbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiQm9sZGlmeUNzc1dyYW5nbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQU1BLE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSxnQ0FBZ0MsQ0FBQztBQUMvRCxPQUFPLEVBQUMsaUJBQWlCLEVBQUUsa0JBQWtCLEVBQUMsTUFBTSw0Q0FBNEMsQ0FBQztBQUVqRyx3SEFBd0g7QUFDeEgsT0FBTztBQUNQLHdIQUF3SDtBQUV4SCxNQUFNLE9BQU8sa0JBQWtCO0lBQzlCLG9IQUFvSDtJQUNwSCxVQUFVO0lBQ1Ysb0hBQW9IO0lBQzVHLFlBQVksQ0FBQyxTQUFrQjtRQUN0QyxPQUFPO0tBQ0osU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7OztHQUd4QixDQUFBO0lBQ0YsQ0FBQztJQUVPLGNBQWMsQ0FBQyxLQUFZLEVBQUUsTUFBd0I7UUFDNUQsT0FBTyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUM7Z0JBQ3pCLEdBQUcsS0FBSyxnQkFBZ0IsTUFBTSxDQUFDLFlBQVksTUFBTTtnQkFDakQsR0FBRyxLQUFLLFlBQVksTUFBTSxDQUFDLFlBQVksRUFBRTthQUN6QyxDQUFDLENBQUMsQ0FBQTtJQUNKLENBQUM7SUFFRCxRQUFRO1FBQ1AsT0FBTyxlQUFlLENBQUMsVUFBVTthQUMvQixXQUFXLENBQUMsS0FBSyxDQUFDO2FBQ2xCLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxZQUFZLElBQUksTUFBTSxDQUFDLGVBQWUsQ0FBQzthQUMvRCxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FDakIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxrQkFBa0IsRUFBRSxNQUFNLENBQUM7YUFDOUMsTUFBTSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsaUJBQWlCLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FDdkQsQ0FBQTtJQUNILENBQUM7Q0FDRCIsInNvdXJjZXNDb250ZW50IjpbIi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4vLyBJbXBvcnRzXHJcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5pbXBvcnQgeyBJQ29sb3JlZFRhZ1JlY29yZCB9IGZyb20gXCJzcmMvY29udHJhY3RzL3BsdWdpbi9zZXR0aW5ncy9JQ29sb3JlZFRhZ1JlY29yZFwiO1xyXG5pbXBvcnQge0lDc3NXcmFuZ2xlcn0gZnJvbSBcIi4uLy4uLy4uL2NvbnRyYWN0cy9wbHVnaW4vc2VydmljZXMvY3NzX3N0eWxlci9JQ3NzV3JhbmdsZXJcIjtcclxuaW1wb3J0IHtSR0JBfSBmcm9tIFwiLi4vLi4vLi4vY29udHJhY3RzL3R5cGVzL1JHQkFcIjtcclxuaW1wb3J0IHtTZXJ2aWNlUHJvdmlkZXJ9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9TZXJ2aWNlUHJvdmlkZXJcIjtcclxuaW1wb3J0IHt0aGVtZVNlbGVjdG9yRGFyaywgdGhlbWVTZWxlY3RvckxpZ2h0fSBmcm9tIFwiLi4vLi4vc2VydmljZXMvY3NzX3N0eWxlci9Dc3NTdHlsZXJTZXJ2aWNlXCI7XHJcblxyXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuLy8gQ29kZVxyXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcbmV4cG9ydCBjbGFzcyBCb2xkaWZ5Q3NzV3JhbmdsZXIgaW1wbGVtZW50cyBJQ3NzV3JhbmdsZXIge1xyXG5cdC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblx0Ly8gTWV0aG9kc1xyXG5cdC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblx0cHJpdmF0ZSBfYXNzZW1ibGVDc3Moc2VsZWN0b3JzOnN0cmluZ1tdKTpzdHJpbmcge1xyXG5cdFx0cmV0dXJuIGBcclxuXHRcdFx0JHtzZWxlY3RvcnMuam9pbihcIiwgXFxuXCIpfSB7IFxyXG5cdFx0XHRcdGZvbnQtd2VpZ2h0OiBib2xkICFpbXBvcnRhbnQ7XHJcblx0XHRcdH1cclxuXHRcdGBcclxuXHR9XHJcblxyXG5cdHByaXZhdGUgX2Fzc2VtYmxlUnVsZXModGhlbWU6c3RyaW5nLCByZWNvcmQ6SUNvbG9yZWRUYWdSZWNvcmQpOnN0cmluZ1tde1xyXG5cdFx0cmV0dXJuIFt0aGlzLl9hc3NlbWJsZUNzcyhbXHJcblx0XHRcdGAke3RoZW1lfSAudGFnW2hyZWY9XCIjJHtyZWNvcmQuY29yZV90YWdUZXh0fVwiIGldYCxcclxuXHRcdFx0YCR7dGhlbWV9IC5jbS10YWctJHtyZWNvcmQuY29yZV90YWdUZXh0fWBcclxuXHRcdF0pXVxyXG5cdH1cclxuXHJcblx0Z2V0UnVsZXMoKTogc3RyaW5nW10ge1xyXG5cdFx0cmV0dXJuIFNlcnZpY2VQcm92aWRlci50YWdSZWNvcmRzXHJcblx0XHRcdC5nZXRUYWdzRmxhdChmYWxzZSlcclxuXHRcdFx0LmZpbHRlcihyZWNvcmQgPT4gcmVjb3JkLmNvcmVfZW5hYmxlZCAmJiByZWNvcmQuYm9sZGlmeV9lbmFibGVkKVxyXG5cdFx0XHQuZmxhdE1hcChyZWNvcmQgPT5cclxuXHRcdFx0XHR0aGlzLl9hc3NlbWJsZVJ1bGVzKHRoZW1lU2VsZWN0b3JMaWdodCwgcmVjb3JkKVxyXG5cdFx0XHRcdC5jb25jYXQodGhpcy5fYXNzZW1ibGVSdWxlcyh0aGVtZVNlbGVjdG9yRGFyaywgcmVjb3JkKSlcclxuXHRcdFx0KVxyXG5cdH1cclxufVxyXG4iXX0=