import { __awaiter } from "tslib";
// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import { Setting } from "obsidian";
import { ServiceProvider } from "../../../../services/ServiceProvider";
import { capitalizeFirstLetter } from "../../../../../lib/StringUtils";
// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export class SettingExtensionSelector {
    // -----------------------------------------------------------------------------------------------------------------
    // Constructor
    // -----------------------------------------------------------------------------------------------------------------
    constructor(parent) {
        this.parent = parent;
        this._AssignEls();
    }
    // -----------------------------------------------------------------------------------------------------------------
    // Methods
    // -----------------------------------------------------------------------------------------------------------------
    _AssignEls() {
        // this.settingEl = new Setting(this.parent.containerEl)
        this.masterEl = this.parent.containerEl.createDiv();
        this.masterEl.addClass("extension-selector");
        this.gridContainerEl = this.masterEl.createDiv();
        this.gridContainerEl.addClass("grid-container");
    }
    createExtensionGridItem(extension) {
        const gridItem = new Setting(document.createElement('div'))
            .setClass('grid-item')
            .setName(capitalizeFirstLetter(extension.extensionName))
            .setDesc(extension.description)
            .addToggle(cb => {
            cb.setValue(extension.isEnabled);
            cb.onChange(value => {
                extension.isEnabled = value;
                ServiceProvider.cssStyler.processExtensions(); // This is so we can update all the styling when something changes
                // TODO update the table's tab selector
            });
        });
        return gridItem.settingEl;
    }
    display() {
        return __awaiter(this, void 0, void 0, function* () {
            for (const iExtension of ServiceProvider.extensions.FullList) {
                const el = this.createExtensionGridItem(iExtension);
                this.gridContainerEl.appendChild(el);
            }
        });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2V0dGluZ0V4dGVuc2lvblNlbGVjdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU2V0dGluZ0V4dGVuc2lvblNlbGVjdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSx3SEFBd0g7QUFDeEgsVUFBVTtBQUNWLHdIQUF3SDtBQUN4SCxPQUFPLEVBQUMsT0FBTyxFQUFhLE1BQU0sVUFBVSxDQUFDO0FBRzdDLE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSxzQ0FBc0MsQ0FBQztBQUNyRSxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSxnQ0FBZ0MsQ0FBQztBQUVyRSx3SEFBd0g7QUFDeEgsT0FBTztBQUNQLHdIQUF3SDtBQUN4SCxNQUFNLE9BQU8sd0JBQXdCO0lBT3BDLG9IQUFvSDtJQUNwSCxjQUFjO0lBQ2Qsb0hBQW9IO0lBQ3BILFlBQVksTUFBa0I7UUFDN0IsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDckIsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFBO0lBQ2xCLENBQUM7SUFFRCxvSEFBb0g7SUFDcEgsVUFBVTtJQUNWLG9IQUFvSDtJQUM1RyxVQUFVO1FBQ2pCLHdEQUF3RDtRQUN4RCxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ3BELElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLG9CQUFvQixDQUFDLENBQUM7UUFFN0MsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ2pELElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLENBQUM7SUFDakQsQ0FBQztJQUVPLHVCQUF1QixDQUFDLFNBQXFCO1FBQ3BELE1BQU0sUUFBUSxHQUFHLElBQUksT0FBTyxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDekQsUUFBUSxDQUFDLFdBQVcsQ0FBQzthQUNyQixPQUFPLENBQUMscUJBQXFCLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxDQUFDO2FBQ3ZELE9BQU8sQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDO2FBQzlCLFNBQVMsQ0FBQyxFQUFFLENBQUMsRUFBRTtZQUNmLEVBQUUsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFBO1lBQ2hDLEVBQUUsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEVBQUU7Z0JBQ25CLFNBQVMsQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO2dCQUM1QixlQUFlLENBQUMsU0FBUyxDQUFDLGlCQUFpQixFQUFFLENBQUEsQ0FBQyxrRUFBa0U7Z0JBRWhILHVDQUF1QztZQUN4QyxDQUFDLENBQUMsQ0FBQTtRQUNILENBQUMsQ0FBQyxDQUFBO1FBQ0gsT0FBTyxRQUFRLENBQUMsU0FBUyxDQUFDO0lBQzNCLENBQUM7SUFFWSxPQUFPOztZQUNuQixLQUFLLE1BQU0sVUFBVSxJQUFJLGVBQWUsQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFO2dCQUM3RCxNQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsdUJBQXVCLENBQUMsVUFBVSxDQUFDLENBQUE7Z0JBQ25ELElBQUksQ0FBQyxlQUFlLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFBO2FBQ3BDO1FBQ0YsQ0FBQztLQUFBO0NBQ0QiLCJzb3VyY2VzQ29udGVudCI6WyIvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuLy8gSW1wb3J0c1xyXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuaW1wb3J0IHtTZXR0aW5nLCBTZXR0aW5nVGFifSBmcm9tIFwib2JzaWRpYW5cIjtcclxuaW1wb3J0IHtJRXh0ZW5zaW9ufSBmcm9tIFwiLi4vLi4vLi4vLi4vLi4vY29udHJhY3RzL3BsdWdpbi9leHRlbnNpb25zL0lFeHRlbnNpb25cIjtcclxuaW1wb3J0IHt2YWx1ZXN9IGZyb20gXCJidWlsdGluLW1vZHVsZXNcIjtcclxuaW1wb3J0IHtTZXJ2aWNlUHJvdmlkZXJ9IGZyb20gXCIuLi8uLi8uLi8uLi9zZXJ2aWNlcy9TZXJ2aWNlUHJvdmlkZXJcIjtcclxuaW1wb3J0IHtjYXBpdGFsaXplRmlyc3RMZXR0ZXJ9IGZyb20gXCIuLi8uLi8uLi8uLi8uLi9saWIvU3RyaW5nVXRpbHNcIjtcclxuXHJcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4vLyBDb2RlXHJcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5leHBvcnQgY2xhc3MgU2V0dGluZ0V4dGVuc2lvblNlbGVjdG9yIHtcclxuXHRwcml2YXRlIHBhcmVudDogU2V0dGluZ1RhYjtcclxuXHJcblx0Ly8gcHJpdmF0ZSBzZXR0aW5nRWw6IFNldHRpbmc7XHJcblx0cHJpdmF0ZSBtYXN0ZXJFbDogSFRNTEVsZW1lbnQ7XHJcblx0cHJpdmF0ZSBncmlkQ29udGFpbmVyRWw6IEhUTUxFbGVtZW50O1xyXG5cclxuXHQvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cdC8vIENvbnN0cnVjdG9yXHJcblx0Ly8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHRjb25zdHJ1Y3RvcihwYXJlbnQ6IFNldHRpbmdUYWIpIHtcclxuXHRcdHRoaXMucGFyZW50ID0gcGFyZW50O1xyXG5cdFx0dGhpcy5fQXNzaWduRWxzKClcclxuXHR9XHJcblxyXG5cdC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblx0Ly8gTWV0aG9kc1xyXG5cdC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblx0cHJpdmF0ZSBfQXNzaWduRWxzKCl7XHJcblx0XHQvLyB0aGlzLnNldHRpbmdFbCA9IG5ldyBTZXR0aW5nKHRoaXMucGFyZW50LmNvbnRhaW5lckVsKVxyXG5cdFx0dGhpcy5tYXN0ZXJFbCA9IHRoaXMucGFyZW50LmNvbnRhaW5lckVsLmNyZWF0ZURpdigpO1xyXG5cdFx0dGhpcy5tYXN0ZXJFbC5hZGRDbGFzcyhcImV4dGVuc2lvbi1zZWxlY3RvclwiKTtcclxuXHJcblx0XHR0aGlzLmdyaWRDb250YWluZXJFbCA9IHRoaXMubWFzdGVyRWwuY3JlYXRlRGl2KCk7XHJcblx0XHR0aGlzLmdyaWRDb250YWluZXJFbC5hZGRDbGFzcyhcImdyaWQtY29udGFpbmVyXCIpO1xyXG5cdH1cclxuXHJcblx0cHJpdmF0ZSBjcmVhdGVFeHRlbnNpb25HcmlkSXRlbShleHRlbnNpb246IElFeHRlbnNpb24pOiBIVE1MRWxlbWVudCB7XHJcblx0XHRjb25zdCBncmlkSXRlbSA9IG5ldyBTZXR0aW5nKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpKVxyXG5cdFx0XHQuc2V0Q2xhc3MoJ2dyaWQtaXRlbScpXHJcblx0XHRcdC5zZXROYW1lKGNhcGl0YWxpemVGaXJzdExldHRlcihleHRlbnNpb24uZXh0ZW5zaW9uTmFtZSkpXHJcblx0XHRcdC5zZXREZXNjKGV4dGVuc2lvbi5kZXNjcmlwdGlvbilcclxuXHRcdFx0LmFkZFRvZ2dsZShjYiA9PiB7XHJcblx0XHRcdFx0Y2Iuc2V0VmFsdWUoZXh0ZW5zaW9uLmlzRW5hYmxlZClcclxuXHRcdFx0XHRjYi5vbkNoYW5nZSh2YWx1ZSA9PiB7XHJcblx0XHRcdFx0XHRleHRlbnNpb24uaXNFbmFibGVkID0gdmFsdWU7XHJcblx0XHRcdFx0XHRTZXJ2aWNlUHJvdmlkZXIuY3NzU3R5bGVyLnByb2Nlc3NFeHRlbnNpb25zKCkgLy8gVGhpcyBpcyBzbyB3ZSBjYW4gdXBkYXRlIGFsbCB0aGUgc3R5bGluZyB3aGVuIHNvbWV0aGluZyBjaGFuZ2VzXHJcblxyXG5cdFx0XHRcdFx0Ly8gVE9ETyB1cGRhdGUgdGhlIHRhYmxlJ3MgdGFiIHNlbGVjdG9yXHJcblx0XHRcdFx0fSlcclxuXHRcdFx0fSlcclxuXHRcdHJldHVybiBncmlkSXRlbS5zZXR0aW5nRWw7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgYXN5bmMgZGlzcGxheSgpIDogUHJvbWlzZTx2b2lkPiB7XHJcblx0XHRmb3IgKGNvbnN0IGlFeHRlbnNpb24gb2YgU2VydmljZVByb3ZpZGVyLmV4dGVuc2lvbnMuRnVsbExpc3QpIHtcclxuXHRcdFx0Y29uc3QgZWwgPSB0aGlzLmNyZWF0ZUV4dGVuc2lvbkdyaWRJdGVtKGlFeHRlbnNpb24pXHJcblx0XHRcdHRoaXMuZ3JpZENvbnRhaW5lckVsLmFwcGVuZENoaWxkKGVsKVxyXG5cdFx0fVxyXG5cdH1cclxufVxyXG4iXX0=