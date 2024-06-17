import { __awaiter } from "tslib";
// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import { PluginSettingTab, Setting } from "obsidian";
import { SettingTagTable } from "./components/tag_table/SettingTagTable";
import { SettingExtensionSelector } from "./components/extension_selector/SettingExtensionSelector";
// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export class SettingTab extends PluginSettingTab {
    // -----------------------------------------------------------------------------------------------------------------
    // Methods
    // -----------------------------------------------------------------------------------------------------------------
    display() {
        return __awaiter(this, void 0, void 0, function* () {
            const { containerEl } = this;
            containerEl.empty();
            new Setting(containerEl).setName("Tag table").setHeading();
            yield new SettingTagTable(this).display(); // Scrollable container for the table
            new Setting(containerEl).setName("Extension selector").setHeading();
            yield new SettingExtensionSelector(this).display();
        });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2V0dGluZ1RhYi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNldHRpbmdUYWIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHdIQUF3SDtBQUN4SCxVQUFVO0FBQ1Ysd0hBQXdIO0FBQ3hILE9BQU8sRUFBQyxnQkFBZ0IsRUFBRSxPQUFPLEVBQUMsTUFBTSxVQUFVLENBQUM7QUFFbkQsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLHdDQUF3QyxDQUFDO0FBQ3ZFLE9BQU8sRUFBQyx3QkFBd0IsRUFBQyxNQUFNLDBEQUEwRCxDQUFDO0FBRWxHLHdIQUF3SDtBQUN4SCxPQUFPO0FBQ1Asd0hBQXdIO0FBQ3hILE1BQU0sT0FBTyxVQUFXLFNBQVEsZ0JBQWdCO0lBQy9DLG9IQUFvSDtJQUNwSCxVQUFVO0lBQ1Ysb0hBQW9IO0lBQzlHLE9BQU87O1lBQ1osTUFBTSxFQUFFLFdBQVcsRUFBRSxHQUFHLElBQUksQ0FBQztZQUM3QixXQUFXLENBQUMsS0FBSyxFQUFFLENBQUM7WUFFcEIsSUFBSSxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDLFVBQVUsRUFBRSxDQUFBO1lBQzFELE1BQU0sSUFBSSxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUEsQ0FBQyxxQ0FBcUM7WUFFL0UsSUFBSSxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUMsT0FBTyxDQUFDLG9CQUFvQixDQUFDLENBQUMsVUFBVSxFQUFFLENBQUE7WUFDbkUsTUFBTSxJQUFJLHdCQUF3QixDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFBO1FBQ25ELENBQUM7S0FBQTtDQUNEIiwic291cmNlc0NvbnRlbnQiOlsiLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbi8vIEltcG9ydHNcclxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbmltcG9ydCB7UGx1Z2luU2V0dGluZ1RhYiwgU2V0dGluZ30gZnJvbSBcIm9ic2lkaWFuXCI7XHJcbmltcG9ydCB7SVNldHRpbmdUYWJ9IGZyb20gXCIuLi8uLi8uLi9jb250cmFjdHMvcGx1Z2luL3VpL0lTZXR0aW5nVGFiXCI7XHJcbmltcG9ydCB7U2V0dGluZ1RhZ1RhYmxlfSBmcm9tIFwiLi9jb21wb25lbnRzL3RhZ190YWJsZS9TZXR0aW5nVGFnVGFibGVcIjtcclxuaW1wb3J0IHtTZXR0aW5nRXh0ZW5zaW9uU2VsZWN0b3J9IGZyb20gXCIuL2NvbXBvbmVudHMvZXh0ZW5zaW9uX3NlbGVjdG9yL1NldHRpbmdFeHRlbnNpb25TZWxlY3RvclwiO1xyXG5cclxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbi8vIENvZGVcclxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbmV4cG9ydCBjbGFzcyBTZXR0aW5nVGFiIGV4dGVuZHMgUGx1Z2luU2V0dGluZ1RhYiBpbXBsZW1lbnRzIElTZXR0aW5nVGFiIHtcclxuXHQvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cdC8vIE1ldGhvZHNcclxuXHQvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cdGFzeW5jIGRpc3BsYXkoKTogUHJvbWlzZTx2b2lkPiB7XHJcblx0XHRjb25zdCB7IGNvbnRhaW5lckVsIH0gPSB0aGlzO1xyXG5cdFx0Y29udGFpbmVyRWwuZW1wdHkoKTtcclxuXHJcblx0XHRuZXcgU2V0dGluZyhjb250YWluZXJFbCkuc2V0TmFtZShcIlRhZyB0YWJsZVwiKS5zZXRIZWFkaW5nKClcclxuXHRcdGF3YWl0IG5ldyBTZXR0aW5nVGFnVGFibGUodGhpcykuZGlzcGxheSgpIC8vIFNjcm9sbGFibGUgY29udGFpbmVyIGZvciB0aGUgdGFibGVcclxuXHJcblx0XHRuZXcgU2V0dGluZyhjb250YWluZXJFbCkuc2V0TmFtZShcIkV4dGVuc2lvbiBzZWxlY3RvclwiKS5zZXRIZWFkaW5nKClcclxuXHRcdGF3YWl0IG5ldyBTZXR0aW5nRXh0ZW5zaW9uU2VsZWN0b3IodGhpcykuZGlzcGxheSgpXHJcblx0fVxyXG59XHJcbiJdfQ==