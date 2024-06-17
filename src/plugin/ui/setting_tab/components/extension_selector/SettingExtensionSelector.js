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
                this.parent.display(); // Redraw entire settings
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2V0dGluZ0V4dGVuc2lvblNlbGVjdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU2V0dGluZ0V4dGVuc2lvblNlbGVjdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSx3SEFBd0g7QUFDeEgsVUFBVTtBQUNWLHdIQUF3SDtBQUN4SCxPQUFPLEVBQUMsT0FBTyxFQUFhLE1BQU0sVUFBVSxDQUFDO0FBRzdDLE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSxzQ0FBc0MsQ0FBQztBQUNyRSxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSxnQ0FBZ0MsQ0FBQztBQUVyRSx3SEFBd0g7QUFDeEgsT0FBTztBQUNQLHdIQUF3SDtBQUN4SCxNQUFNLE9BQU8sd0JBQXdCO0lBT3BDLG9IQUFvSDtJQUNwSCxjQUFjO0lBQ2Qsb0hBQW9IO0lBQ3BILFlBQVksTUFBa0I7UUFDN0IsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDckIsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFBO0lBQ2xCLENBQUM7SUFFRCxvSEFBb0g7SUFDcEgsVUFBVTtJQUNWLG9IQUFvSDtJQUM1RyxVQUFVO1FBQ2pCLHdEQUF3RDtRQUN4RCxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ3BELElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLG9CQUFvQixDQUFDLENBQUM7UUFFN0MsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ2pELElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLENBQUM7SUFDakQsQ0FBQztJQUVPLHVCQUF1QixDQUFDLFNBQXFCO1FBQ3BELE1BQU0sUUFBUSxHQUFHLElBQUksT0FBTyxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDekQsUUFBUSxDQUFDLFdBQVcsQ0FBQzthQUNyQixPQUFPLENBQUMscUJBQXFCLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxDQUFDO2FBQ3ZELE9BQU8sQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDO2FBQzlCLFNBQVMsQ0FBQyxFQUFFLENBQUMsRUFBRTtZQUNmLEVBQUUsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFBO1lBQ2hDLEVBQUUsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEVBQUU7Z0JBQ25CLFNBQVMsQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO2dCQUM1QixlQUFlLENBQUMsU0FBUyxDQUFDLGlCQUFpQixFQUFFLENBQUEsQ0FBQyxrRUFBa0U7Z0JBRWhILElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUEsQ0FBQyx5QkFBeUI7WUFDaEQsQ0FBQyxDQUFDLENBQUE7UUFDSCxDQUFDLENBQUMsQ0FBQTtRQUNILE9BQU8sUUFBUSxDQUFDLFNBQVMsQ0FBQztJQUMzQixDQUFDO0lBRVksT0FBTzs7WUFDbkIsS0FBSyxNQUFNLFVBQVUsSUFBSSxlQUFlLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFBRTtnQkFDN0QsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLHVCQUF1QixDQUFDLFVBQVUsQ0FBQyxDQUFBO2dCQUNuRCxJQUFJLENBQUMsZUFBZSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsQ0FBQTthQUNwQztRQUNGLENBQUM7S0FBQTtDQUNEIiwic291cmNlc0NvbnRlbnQiOlsiLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbi8vIEltcG9ydHNcclxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbmltcG9ydCB7U2V0dGluZywgU2V0dGluZ1RhYn0gZnJvbSBcIm9ic2lkaWFuXCI7XHJcbmltcG9ydCB7SUV4dGVuc2lvbn0gZnJvbSBcIi4uLy4uLy4uLy4uLy4uL2NvbnRyYWN0cy9wbHVnaW4vZXh0ZW5zaW9ucy9JRXh0ZW5zaW9uXCI7XHJcbmltcG9ydCB7dmFsdWVzfSBmcm9tIFwiYnVpbHRpbi1tb2R1bGVzXCI7XHJcbmltcG9ydCB7U2VydmljZVByb3ZpZGVyfSBmcm9tIFwiLi4vLi4vLi4vLi4vc2VydmljZXMvU2VydmljZVByb3ZpZGVyXCI7XHJcbmltcG9ydCB7Y2FwaXRhbGl6ZUZpcnN0TGV0dGVyfSBmcm9tIFwiLi4vLi4vLi4vLi4vLi4vbGliL1N0cmluZ1V0aWxzXCI7XHJcblxyXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuLy8gQ29kZVxyXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuZXhwb3J0IGNsYXNzIFNldHRpbmdFeHRlbnNpb25TZWxlY3RvciB7XHJcblx0cHJpdmF0ZSBwYXJlbnQ6IFNldHRpbmdUYWI7XHJcblxyXG5cdC8vIHByaXZhdGUgc2V0dGluZ0VsOiBTZXR0aW5nO1xyXG5cdHByaXZhdGUgbWFzdGVyRWw6IEhUTUxFbGVtZW50O1xyXG5cdHByaXZhdGUgZ3JpZENvbnRhaW5lckVsOiBIVE1MRWxlbWVudDtcclxuXHJcblx0Ly8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHQvLyBDb25zdHJ1Y3RvclxyXG5cdC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblx0Y29uc3RydWN0b3IocGFyZW50OiBTZXR0aW5nVGFiKSB7XHJcblx0XHR0aGlzLnBhcmVudCA9IHBhcmVudDtcclxuXHRcdHRoaXMuX0Fzc2lnbkVscygpXHJcblx0fVxyXG5cclxuXHQvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cdC8vIE1ldGhvZHNcclxuXHQvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cdHByaXZhdGUgX0Fzc2lnbkVscygpe1xyXG5cdFx0Ly8gdGhpcy5zZXR0aW5nRWwgPSBuZXcgU2V0dGluZyh0aGlzLnBhcmVudC5jb250YWluZXJFbClcclxuXHRcdHRoaXMubWFzdGVyRWwgPSB0aGlzLnBhcmVudC5jb250YWluZXJFbC5jcmVhdGVEaXYoKTtcclxuXHRcdHRoaXMubWFzdGVyRWwuYWRkQ2xhc3MoXCJleHRlbnNpb24tc2VsZWN0b3JcIik7XHJcblxyXG5cdFx0dGhpcy5ncmlkQ29udGFpbmVyRWwgPSB0aGlzLm1hc3RlckVsLmNyZWF0ZURpdigpO1xyXG5cdFx0dGhpcy5ncmlkQ29udGFpbmVyRWwuYWRkQ2xhc3MoXCJncmlkLWNvbnRhaW5lclwiKTtcclxuXHR9XHJcblxyXG5cdHByaXZhdGUgY3JlYXRlRXh0ZW5zaW9uR3JpZEl0ZW0oZXh0ZW5zaW9uOiBJRXh0ZW5zaW9uKTogSFRNTEVsZW1lbnQge1xyXG5cdFx0Y29uc3QgZ3JpZEl0ZW0gPSBuZXcgU2V0dGluZyhkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKSlcclxuXHRcdFx0LnNldENsYXNzKCdncmlkLWl0ZW0nKVxyXG5cdFx0XHQuc2V0TmFtZShjYXBpdGFsaXplRmlyc3RMZXR0ZXIoZXh0ZW5zaW9uLmV4dGVuc2lvbk5hbWUpKVxyXG5cdFx0XHQuc2V0RGVzYyhleHRlbnNpb24uZGVzY3JpcHRpb24pXHJcblx0XHRcdC5hZGRUb2dnbGUoY2IgPT4ge1xyXG5cdFx0XHRcdGNiLnNldFZhbHVlKGV4dGVuc2lvbi5pc0VuYWJsZWQpXHJcblx0XHRcdFx0Y2Iub25DaGFuZ2UodmFsdWUgPT4ge1xyXG5cdFx0XHRcdFx0ZXh0ZW5zaW9uLmlzRW5hYmxlZCA9IHZhbHVlO1xyXG5cdFx0XHRcdFx0U2VydmljZVByb3ZpZGVyLmNzc1N0eWxlci5wcm9jZXNzRXh0ZW5zaW9ucygpIC8vIFRoaXMgaXMgc28gd2UgY2FuIHVwZGF0ZSBhbGwgdGhlIHN0eWxpbmcgd2hlbiBzb21ldGhpbmcgY2hhbmdlc1xyXG5cclxuXHRcdFx0XHRcdHRoaXMucGFyZW50LmRpc3BsYXkoKSAvLyBSZWRyYXcgZW50aXJlIHNldHRpbmdzXHJcblx0XHRcdFx0fSlcclxuXHRcdFx0fSlcclxuXHRcdHJldHVybiBncmlkSXRlbS5zZXR0aW5nRWw7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgYXN5bmMgZGlzcGxheSgpIDogUHJvbWlzZTx2b2lkPiB7XHJcblx0XHRmb3IgKGNvbnN0IGlFeHRlbnNpb24gb2YgU2VydmljZVByb3ZpZGVyLmV4dGVuc2lvbnMuRnVsbExpc3QpIHtcclxuXHRcdFx0Y29uc3QgZWwgPSB0aGlzLmNyZWF0ZUV4dGVuc2lvbkdyaWRJdGVtKGlFeHRlbnNpb24pXHJcblx0XHRcdHRoaXMuZ3JpZENvbnRhaW5lckVsLmFwcGVuZENoaWxkKGVsKVxyXG5cdFx0fVxyXG5cdH1cclxufVxyXG4iXX0=