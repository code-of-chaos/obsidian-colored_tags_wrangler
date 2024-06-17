import { __awaiter } from "tslib";
import { debounce } from "obsidian";
import { defaultSettings } from "./DefaultSettings";
// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export class SettingsService {
    // -----------------------------------------------------------------------------------------------------------------
    // Constructors
    // -----------------------------------------------------------------------------------------------------------------
    constructor(plugin, migrator) {
        this._plugin = plugin;
        this._migrator = migrator;
        this.debounceSaveToFile = debounce(this.saveToFile, 100);
    }
    // -----------------------------------------------------------------------------------------------------------------
    // Methods
    // -----------------------------------------------------------------------------------------------------------------
    loadFromFile() {
        return __awaiter(this, void 0, void 0, function* () {
            const tempData = yield this._plugin.loadData();
            this.data = Object.assign({}, defaultSettings, yield this._migrator.migrateData(tempData));
            this.debounceSaveToFile();
        });
    }
    saveToFile() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._plugin.saveData(this.data);
        });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2V0dGluZ3NTZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU2V0dGluZ3NTZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFLQSxPQUFPLEVBQUMsUUFBUSxFQUFZLE1BQU0sVUFBVSxDQUFDO0FBQzdDLE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQUlsRCx3SEFBd0g7QUFDeEgsT0FBTztBQUNQLHdIQUF3SDtBQUN4SCxNQUFNLE9BQU8sZUFBZTtJQU8zQixvSEFBb0g7SUFDcEgsZUFBZTtJQUNmLG9IQUFvSDtJQUNwSCxZQUFZLE1BQWtDLEVBQUUsUUFBMkI7UUFDMUUsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7UUFDdEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUM7UUFDMUIsSUFBSSxDQUFDLGtCQUFrQixHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLEdBQUcsQ0FBQyxDQUFBO0lBQ3pELENBQUM7SUFFRCxvSEFBb0g7SUFDcEgsVUFBVTtJQUNWLG9IQUFvSDtJQUN2RyxZQUFZOztZQUN4QixNQUFNLFFBQVEsR0FBRyxNQUFNLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLENBQUE7WUFDOUMsSUFBSSxDQUFDLElBQUksR0FBRyxNQUFNLENBQUMsTUFBTSxDQUN4QixFQUFFLEVBQ0YsZUFBZSxFQUNmLE1BQU0sSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQzFDLENBQUM7WUFFRixJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQTtRQUMxQixDQUFDO0tBQUE7SUFFWSxVQUFVOztZQUN0QixNQUFNLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN4QyxDQUFDO0tBQUE7Q0FDRCIsInNvdXJjZXNDb250ZW50IjpbIi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4vLyBJbXBvcnRzXHJcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5pbXBvcnQge0lTZXR0aW5nc1NlcnZpY2V9IGZyb20gXCIuLi8uLi8uLi9jb250cmFjdHMvcGx1Z2luL3NlcnZpY2VzL3NldHRpbmdzL0lTZXR0aW5nc1NlcnZpY2VcIjtcclxuaW1wb3J0IHtJQ29sb3JlZFRhZ1dyYW5nbGVyUGx1Z2lufSBmcm9tIFwiLi4vLi4vLi4vY29udHJhY3RzL3BsdWdpbi9JQ29sb3JlZFRhZ1dyYW5nbGVyUGx1Z2luXCI7XHJcbmltcG9ydCB7ZGVib3VuY2UsIERlYm91bmNlcn0gZnJvbSBcIm9ic2lkaWFuXCI7XHJcbmltcG9ydCB7ZGVmYXVsdFNldHRpbmdzfSBmcm9tIFwiLi9EZWZhdWx0U2V0dGluZ3NcIjtcclxuaW1wb3J0IHtJUGx1Z2luU2V0dGluZ3N9IGZyb20gXCIuLi8uLi8uLi9jb250cmFjdHMvcGx1Z2luL3NldHRpbmdzL0lQbHVnaW5TZXR0aW5nc1wiO1xyXG5pbXBvcnQge0lNaWdyYXRvclNlcnZpY2V9IGZyb20gXCIuLi8uLi8uLi9jb250cmFjdHMvcGx1Z2luL3NlcnZpY2VzL21pZ3JhdG9yL0lNaWdyYXRvclNlcnZpY2VcIjtcclxuXHJcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4vLyBDb2RlXHJcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5leHBvcnQgY2xhc3MgU2V0dGluZ3NTZXJ2aWNlIGltcGxlbWVudHMgSVNldHRpbmdzU2VydmljZSB7XHJcblx0cHJpdmF0ZSBfcGx1Z2luIDogSUNvbG9yZWRUYWdXcmFuZ2xlclBsdWdpbjtcclxuXHRwcml2YXRlIF9taWdyYXRvciA6IElNaWdyYXRvclNlcnZpY2U7XHJcblxyXG5cdHB1YmxpYyBkYXRhOiBJUGx1Z2luU2V0dGluZ3M7XHJcblx0cHVibGljIGRlYm91bmNlU2F2ZVRvRmlsZTogRGVib3VuY2VyPFtdLCBQcm9taXNlPHZvaWQ+PjtcclxuXHJcblx0Ly8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHQvLyBDb25zdHJ1Y3RvcnNcclxuXHQvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cdGNvbnN0cnVjdG9yKHBsdWdpbiA6IElDb2xvcmVkVGFnV3JhbmdsZXJQbHVnaW4sIG1pZ3JhdG9yIDogSU1pZ3JhdG9yU2VydmljZSkge1xyXG5cdFx0dGhpcy5fcGx1Z2luID0gcGx1Z2luO1xyXG5cdFx0dGhpcy5fbWlncmF0b3IgPSBtaWdyYXRvcjtcclxuXHRcdHRoaXMuZGVib3VuY2VTYXZlVG9GaWxlID0gZGVib3VuY2UodGhpcy5zYXZlVG9GaWxlLCAxMDApXHJcblx0fVxyXG5cclxuXHQvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cdC8vIE1ldGhvZHNcclxuXHQvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cdHB1YmxpYyBhc3luYyBsb2FkRnJvbUZpbGUoKXtcclxuXHRcdGNvbnN0IHRlbXBEYXRhID0gYXdhaXQgdGhpcy5fcGx1Z2luLmxvYWREYXRhKClcclxuXHRcdHRoaXMuZGF0YSA9IE9iamVjdC5hc3NpZ24oXHJcblx0XHRcdHt9LFxyXG5cdFx0XHRkZWZhdWx0U2V0dGluZ3MsXHJcblx0XHRcdGF3YWl0IHRoaXMuX21pZ3JhdG9yLm1pZ3JhdGVEYXRhKHRlbXBEYXRhKVxyXG5cdFx0KTtcclxuXHJcblx0XHR0aGlzLmRlYm91bmNlU2F2ZVRvRmlsZSgpXHJcblx0fVxyXG5cclxuXHRwdWJsaWMgYXN5bmMgc2F2ZVRvRmlsZSgpe1xyXG5cdFx0YXdhaXQgdGhpcy5fcGx1Z2luLnNhdmVEYXRhKHRoaXMuZGF0YSk7XHJcblx0fVxyXG59XHJcbiJdfQ==