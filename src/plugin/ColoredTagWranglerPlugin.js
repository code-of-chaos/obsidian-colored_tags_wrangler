import { __awaiter } from "tslib";
// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import { Plugin } from "obsidian";
import { SettingTab } from "./ui/setting_tab/SettingTab";
import { ServiceProvider } from "./services/ServiceProvider";
// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export default class ColoredTagWranglerPlugin extends Plugin {
    constructor(app, manifest) {
        super(app, manifest);
        ServiceProvider.PopulateInstances(this);
    }
    // -----------------------------------------------------------------------------------------------------------------
    // Methods
    // -----------------------------------------------------------------------------------------------------------------
    onload() {
        return __awaiter(this, void 0, void 0, function* () {
            yield ServiceProvider.settings.loadFromFile(); // loads settings from file as well
            ServiceProvider.cssStyler.processExtensions();
            this.addSettingTab(new SettingTab(this.app, this));
        });
    }
    onunload() {
        return __awaiter(this, void 0, void 0, function* () {
            yield ServiceProvider.settings.saveToFile();
            ServiceProvider.cssStyler.cleanup();
        });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29sb3JlZFRhZ1dyYW5nbGVyUGx1Z2luLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiQ29sb3JlZFRhZ1dyYW5nbGVyUGx1Z2luLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSx3SEFBd0g7QUFDeEgsVUFBVTtBQUNWLHdIQUF3SDtBQUN4SCxPQUFPLEVBQU0sTUFBTSxFQUFpQixNQUFNLFVBQVUsQ0FBQztBQUVyRCxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sNkJBQTZCLENBQUM7QUFDdkQsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLDRCQUE0QixDQUFDO0FBRTNELHdIQUF3SDtBQUN4SCxPQUFPO0FBQ1Asd0hBQXdIO0FBQ3hILE1BQU0sQ0FBQyxPQUFPLE9BQU8sd0JBQXlCLFNBQVEsTUFBTTtJQUMzRCxZQUFZLEdBQVEsRUFBRSxRQUF3QjtRQUM3QyxLQUFLLENBQUMsR0FBRyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQ3JCLGVBQWUsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN6QyxDQUFDO0lBRUQsb0hBQW9IO0lBQ3BILFVBQVU7SUFDVixvSEFBb0g7SUFDOUcsTUFBTTs7WUFDWCxNQUFNLGVBQWUsQ0FBQyxRQUFRLENBQUMsWUFBWSxFQUFFLENBQUEsQ0FBQyxtQ0FBbUM7WUFFakYsZUFBZSxDQUFDLFNBQVMsQ0FBQyxpQkFBaUIsRUFBRSxDQUFBO1lBRTdDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxVQUFVLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBRXBELENBQUM7S0FBQTtJQUVLLFFBQVE7O1lBQ2IsTUFBTSxlQUFlLENBQUMsUUFBUSxDQUFDLFVBQVUsRUFBRSxDQUFBO1lBQzNDLGVBQWUsQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFLENBQUE7UUFDcEMsQ0FBQztLQUFBO0NBS0QiLCJzb3VyY2VzQ29udGVudCI6WyIvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuLy8gSW1wb3J0c1xyXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuaW1wb3J0IHtBcHAsIFBsdWdpbiwgUGx1Z2luTWFuaWZlc3R9IGZyb20gXCJvYnNpZGlhblwiO1xyXG5pbXBvcnQge0lDb2xvcmVkVGFnV3JhbmdsZXJQbHVnaW59IGZyb20gXCIuLi9jb250cmFjdHMvcGx1Z2luL0lDb2xvcmVkVGFnV3JhbmdsZXJQbHVnaW5cIjtcclxuaW1wb3J0IHtTZXR0aW5nVGFifSBmcm9tIFwiLi91aS9zZXR0aW5nX3RhYi9TZXR0aW5nVGFiXCI7XHJcbmltcG9ydCB7U2VydmljZVByb3ZpZGVyfSBmcm9tIFwiLi9zZXJ2aWNlcy9TZXJ2aWNlUHJvdmlkZXJcIjtcclxuXHJcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4vLyBDb2RlXHJcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb2xvcmVkVGFnV3JhbmdsZXJQbHVnaW4gZXh0ZW5kcyBQbHVnaW4gaW1wbGVtZW50cyBJQ29sb3JlZFRhZ1dyYW5nbGVyUGx1Z2lue1xyXG5cdGNvbnN0cnVjdG9yKGFwcDogQXBwLCBtYW5pZmVzdDogUGx1Z2luTWFuaWZlc3QpIHtcclxuXHRcdHN1cGVyKGFwcCwgbWFuaWZlc3QpO1xyXG5cdFx0U2VydmljZVByb3ZpZGVyLlBvcHVsYXRlSW5zdGFuY2VzKHRoaXMpO1xyXG5cdH1cclxuXHJcblx0Ly8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHQvLyBNZXRob2RzXHJcblx0Ly8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHRhc3luYyBvbmxvYWQoKSB7XHJcblx0XHRhd2FpdCBTZXJ2aWNlUHJvdmlkZXIuc2V0dGluZ3MubG9hZEZyb21GaWxlKCkgLy8gbG9hZHMgc2V0dGluZ3MgZnJvbSBmaWxlIGFzIHdlbGxcclxuXHJcblx0XHRTZXJ2aWNlUHJvdmlkZXIuY3NzU3R5bGVyLnByb2Nlc3NFeHRlbnNpb25zKClcclxuXHJcblx0XHR0aGlzLmFkZFNldHRpbmdUYWIobmV3IFNldHRpbmdUYWIodGhpcy5hcHAsIHRoaXMpKTtcclxuXHJcblx0fVxyXG5cclxuXHRhc3luYyBvbnVubG9hZCgpe1xyXG5cdFx0YXdhaXQgU2VydmljZVByb3ZpZGVyLnNldHRpbmdzLnNhdmVUb0ZpbGUoKVxyXG5cdFx0U2VydmljZVByb3ZpZGVyLmNzc1N0eWxlci5jbGVhbnVwKClcclxuXHR9XHJcblxyXG5cdC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblx0Ly8gU2V0dGluZ3NNYW5hZ2VyXHJcblx0Ly8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxufVxyXG4iXX0=