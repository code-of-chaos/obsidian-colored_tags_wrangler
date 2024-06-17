import { __awaiter } from "tslib";
import { ExtraButtonComponent } from "obsidian";
import { arrayMove } from "../../../../../lib/ArrayUtils";
import { ServiceProvider } from "../../../../services/ServiceProvider";
// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export class SettingTagRecordNavigators {
    // This is just a recreation of the obsidian tag spans
    //		Although I should be able to create some sort of system to update them easily?
    //		Currently, this is done by giving them specific Ids tied to the uuid of the records.
    constructor(rowData, enableRemove = true, redrawCallback) {
        this.El = rowData.parentEl.createDiv();
        this.El.addClass("navigator-parent");
        const recordIndex = ServiceProvider.tagRecords.getTagIndex(rowData.record);
        if (enableRemove) {
            new ExtraButtonComponent(this.El)
                .setIcon("trash")
                .setTooltip("Delete record")
                .onClick(() => __awaiter(this, void 0, void 0, function* () {
                yield ServiceProvider.tagRecords.removeTag(rowData.record);
                yield redrawCallback();
            }))
                .extraSettingsEl.classList.add("navigator-trash");
        }
        if (recordIndex !== 0) {
            new ExtraButtonComponent(this.El)
                .setIcon("up-chevron-glyph")
                .setTooltip("Move up")
                .onClick(() => __awaiter(this, void 0, void 0, function* () {
                // reorder stuff here!!!
                // console.warn(ServiceProvider.plugin.app.lastEvent)
                // console.warn(ServiceProvider.plugin.app.lastEvent?.shiftKey)
                arrayMove(ServiceProvider.tagRecords.getTags(), recordIndex, recordIndex - 1);
                ServiceProvider.settings.debounceSaveToFile();
                yield redrawCallback();
            }))
                .extraSettingsEl.classList.add("navigator-chevron-up");
        }
        if (recordIndex !== ServiceProvider.tagRecords.getTagCount() - 1) {
            new ExtraButtonComponent(this.El)
                .setIcon("down-chevron-glyph")
                .setTooltip("Move down")
                .onClick(() => __awaiter(this, void 0, void 0, function* () {
                // reorder stuff here!!!
                arrayMove(ServiceProvider.tagRecords.getTags(), recordIndex, recordIndex + 1);
                ServiceProvider.settings.debounceSaveToFile();
                yield redrawCallback();
            }))
                .extraSettingsEl.classList.add("navigator-chevron-down");
        }
    }
    setDisabled(disabled) {
        this.disabled = disabled;
        this.El.hidden = disabled;
        return this;
    }
    then(cb) {
        return this;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2V0dGluZ1RhZ1JlY29yZE5hdmlnYXRvcnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTZXR0aW5nVGFnUmVjb3JkTmF2aWdhdG9ycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBSUEsT0FBTyxFQUFDLG9CQUFvQixFQUFDLE1BQU0sVUFBVSxDQUFDO0FBQzlDLE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSwrQkFBK0IsQ0FBQztBQUN4RCxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sc0NBQXNDLENBQUM7QUFHckUsd0hBQXdIO0FBQ3hILE9BQU87QUFDUCx3SEFBd0g7QUFDeEgsTUFBTSxPQUFPLDBCQUEwQjtJQUl0QyxzREFBc0Q7SUFDdEQsa0ZBQWtGO0lBQ2xGLHdGQUF3RjtJQUV4RixZQUFZLE9BQW1CLEVBQUUsZUFBcUIsSUFBSSxFQUFFLGNBQW9DO1FBQy9GLElBQUksQ0FBQyxFQUFFLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxTQUFTLEVBQUUsQ0FBQTtRQUN0QyxJQUFJLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1FBQ3JDLE1BQU0sV0FBVyxHQUFHLGVBQWUsQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQTtRQUUxRSxJQUFJLFlBQVksRUFBQztZQUNoQixJQUFJLG9CQUFvQixDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7aUJBQy9CLE9BQU8sQ0FBQyxPQUFPLENBQUM7aUJBQ2hCLFVBQVUsQ0FBQyxlQUFlLENBQUM7aUJBQzNCLE9BQU8sQ0FBQyxHQUFTLEVBQUU7Z0JBQ25CLE1BQU0sZUFBZSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFBO2dCQUMxRCxNQUFNLGNBQWMsRUFBRSxDQUFBO1lBQ3ZCLENBQUMsQ0FBQSxDQUFDO2lCQUNELGVBQWUsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDLENBQUM7U0FDbkQ7UUFFRCxJQUFJLFdBQVcsS0FBSyxDQUFDLEVBQUU7WUFDdEIsSUFBSSxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDO2lCQUMvQixPQUFPLENBQUMsa0JBQWtCLENBQUM7aUJBQzNCLFVBQVUsQ0FBQyxTQUFTLENBQUM7aUJBQ3JCLE9BQU8sQ0FBQyxHQUFTLEVBQUU7Z0JBQ25CLHdCQUF3QjtnQkFDeEIscURBQXFEO2dCQUNyRCwrREFBK0Q7Z0JBQy9ELFNBQVMsQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFBRSxFQUFFLFdBQVcsRUFBRSxXQUFXLEdBQUMsQ0FBQyxDQUFDLENBQUE7Z0JBQzNFLGVBQWUsQ0FBQyxRQUFRLENBQUMsa0JBQWtCLEVBQUUsQ0FBQTtnQkFDN0MsTUFBTSxjQUFjLEVBQUUsQ0FBQTtZQUN2QixDQUFDLENBQUEsQ0FBQztpQkFDRCxlQUFlLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO1NBQ3hEO1FBRUQsSUFBSSxXQUFXLEtBQUssZUFBZSxDQUFDLFVBQVUsQ0FBQyxXQUFXLEVBQUUsR0FBRSxDQUFDLEVBQUU7WUFDaEUsSUFBSSxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDO2lCQUMvQixPQUFPLENBQUMsb0JBQW9CLENBQUM7aUJBQzdCLFVBQVUsQ0FBQyxXQUFXLENBQUM7aUJBQ3ZCLE9BQU8sQ0FBQyxHQUFTLEVBQUU7Z0JBQ25CLHdCQUF3QjtnQkFDeEIsU0FBUyxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFLEVBQUUsV0FBVyxFQUFFLFdBQVcsR0FBQyxDQUFDLENBQUMsQ0FBQTtnQkFDM0UsZUFBZSxDQUFDLFFBQVEsQ0FBQyxrQkFBa0IsRUFBRSxDQUFBO2dCQUM3QyxNQUFNLGNBQWMsRUFBRSxDQUFBO1lBQ3ZCLENBQUMsQ0FBQSxDQUFDO2lCQUNELGVBQWUsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLHdCQUF3QixDQUFDLENBQUM7U0FDMUQ7SUFDRixDQUFDO0lBRUQsV0FBVyxDQUFDLFFBQWlCO1FBQzVCLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxFQUFFLENBQUMsTUFBTSxHQUFHLFFBQVEsQ0FBQztRQUMxQixPQUFPLElBQUksQ0FBQztJQUNiLENBQUM7SUFFRCxJQUFJLENBQUMsRUFBNEI7UUFDaEMsT0FBTyxJQUFJLENBQUM7SUFDYixDQUFDO0NBQ0QiLCJzb3VyY2VzQ29udGVudCI6WyIvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuLy8gSW1wb3J0c1xyXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuaW1wb3J0IHtJU2V0dGluZ1RhZ1JlY29yZENvbXBvbmVudH0gZnJvbSBcIi4uLy4uLy4uLy4uLy4uL2NvbnRyYWN0cy9wbHVnaW4vdWkvY29tcG9uZW50cy90YWdfdGFibGUvSVNldHRpbmdUYWdSZWNvcmRDb21wb25lbnRcIjtcclxuaW1wb3J0IHtFeHRyYUJ1dHRvbkNvbXBvbmVudH0gZnJvbSBcIm9ic2lkaWFuXCI7XHJcbmltcG9ydCB7YXJyYXlNb3ZlfSBmcm9tIFwiLi4vLi4vLi4vLi4vLi4vbGliL0FycmF5VXRpbHNcIjtcclxuaW1wb3J0IHtTZXJ2aWNlUHJvdmlkZXJ9IGZyb20gXCIuLi8uLi8uLi8uLi9zZXJ2aWNlcy9TZXJ2aWNlUHJvdmlkZXJcIjtcclxuaW1wb3J0IHtSb3dEYXRhVHlwZX0gZnJvbSBcIi4uLy4uLy4uLy4uLy4uL2NvbnRyYWN0cy9wbHVnaW4vdWkvY29tcG9uZW50cy9Sb3dEYXRhVHlwZVwiO1xyXG5cclxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbi8vIENvZGVcclxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbmV4cG9ydCBjbGFzcyBTZXR0aW5nVGFnUmVjb3JkTmF2aWdhdG9ycyBpbXBsZW1lbnRzIElTZXR0aW5nVGFnUmVjb3JkQ29tcG9uZW50e1xyXG5cdHByaXZhdGUgRWw6IEhUTUxFbGVtZW50O1xyXG5cdGRpc2FibGVkOiBib29sZWFuO1xyXG5cclxuXHQvLyBUaGlzIGlzIGp1c3QgYSByZWNyZWF0aW9uIG9mIHRoZSBvYnNpZGlhbiB0YWcgc3BhbnNcclxuXHQvL1x0XHRBbHRob3VnaCBJIHNob3VsZCBiZSBhYmxlIHRvIGNyZWF0ZSBzb21lIHNvcnQgb2Ygc3lzdGVtIHRvIHVwZGF0ZSB0aGVtIGVhc2lseT9cclxuXHQvL1x0XHRDdXJyZW50bHksIHRoaXMgaXMgZG9uZSBieSBnaXZpbmcgdGhlbSBzcGVjaWZpYyBJZHMgdGllZCB0byB0aGUgdXVpZCBvZiB0aGUgcmVjb3Jkcy5cclxuXHJcblx0Y29uc3RydWN0b3Iocm93RGF0YTpSb3dEYXRhVHlwZSwgZW5hYmxlUmVtb3ZlOmJvb2xlYW49dHJ1ZSwgcmVkcmF3Q2FsbGJhY2sgOiAoKSA9PiBQcm9taXNlPHZvaWQ+KSB7XHJcblx0XHR0aGlzLkVsID0gcm93RGF0YS5wYXJlbnRFbC5jcmVhdGVEaXYoKVxyXG5cdFx0dGhpcy5FbC5hZGRDbGFzcyhcIm5hdmlnYXRvci1wYXJlbnRcIik7XHJcblx0XHRjb25zdCByZWNvcmRJbmRleCA9IFNlcnZpY2VQcm92aWRlci50YWdSZWNvcmRzLmdldFRhZ0luZGV4KHJvd0RhdGEucmVjb3JkKVxyXG5cclxuXHRcdGlmIChlbmFibGVSZW1vdmUpe1xyXG5cdFx0XHRuZXcgRXh0cmFCdXR0b25Db21wb25lbnQodGhpcy5FbClcclxuXHRcdFx0XHQuc2V0SWNvbihcInRyYXNoXCIpXHJcblx0XHRcdFx0LnNldFRvb2x0aXAoXCJEZWxldGUgcmVjb3JkXCIpXHJcblx0XHRcdFx0Lm9uQ2xpY2soYXN5bmMgKCkgPT4ge1xyXG5cdFx0XHRcdFx0YXdhaXQgU2VydmljZVByb3ZpZGVyLnRhZ1JlY29yZHMucmVtb3ZlVGFnKHJvd0RhdGEucmVjb3JkKVxyXG5cdFx0XHRcdFx0YXdhaXQgcmVkcmF3Q2FsbGJhY2soKVxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdFx0LmV4dHJhU2V0dGluZ3NFbC5jbGFzc0xpc3QuYWRkKFwibmF2aWdhdG9yLXRyYXNoXCIpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmIChyZWNvcmRJbmRleCAhPT0gMCkge1xyXG5cdFx0XHRuZXcgRXh0cmFCdXR0b25Db21wb25lbnQodGhpcy5FbClcclxuXHRcdFx0XHQuc2V0SWNvbihcInVwLWNoZXZyb24tZ2x5cGhcIilcclxuXHRcdFx0XHQuc2V0VG9vbHRpcChcIk1vdmUgdXBcIilcclxuXHRcdFx0XHQub25DbGljayhhc3luYyAoKSA9PiB7XHJcblx0XHRcdFx0XHQvLyByZW9yZGVyIHN0dWZmIGhlcmUhISFcclxuXHRcdFx0XHRcdC8vIGNvbnNvbGUud2FybihTZXJ2aWNlUHJvdmlkZXIucGx1Z2luLmFwcC5sYXN0RXZlbnQpXHJcblx0XHRcdFx0XHQvLyBjb25zb2xlLndhcm4oU2VydmljZVByb3ZpZGVyLnBsdWdpbi5hcHAubGFzdEV2ZW50Py5zaGlmdEtleSlcclxuXHRcdFx0XHRcdGFycmF5TW92ZShTZXJ2aWNlUHJvdmlkZXIudGFnUmVjb3Jkcy5nZXRUYWdzKCksIHJlY29yZEluZGV4LCByZWNvcmRJbmRleC0xKVxyXG5cdFx0XHRcdFx0U2VydmljZVByb3ZpZGVyLnNldHRpbmdzLmRlYm91bmNlU2F2ZVRvRmlsZSgpXHJcblx0XHRcdFx0XHRhd2FpdCByZWRyYXdDYWxsYmFjaygpXHJcblx0XHRcdFx0fSlcclxuXHRcdFx0XHQuZXh0cmFTZXR0aW5nc0VsLmNsYXNzTGlzdC5hZGQoXCJuYXZpZ2F0b3ItY2hldnJvbi11cFwiKTtcclxuXHRcdH1cclxuXHJcblx0XHRpZiAocmVjb3JkSW5kZXggIT09IFNlcnZpY2VQcm92aWRlci50YWdSZWNvcmRzLmdldFRhZ0NvdW50KCkgLTEpIHtcclxuXHRcdFx0bmV3IEV4dHJhQnV0dG9uQ29tcG9uZW50KHRoaXMuRWwpXHJcblx0XHRcdFx0LnNldEljb24oXCJkb3duLWNoZXZyb24tZ2x5cGhcIilcclxuXHRcdFx0XHQuc2V0VG9vbHRpcChcIk1vdmUgZG93blwiKVxyXG5cdFx0XHRcdC5vbkNsaWNrKGFzeW5jICgpID0+IHtcclxuXHRcdFx0XHRcdC8vIHJlb3JkZXIgc3R1ZmYgaGVyZSEhIVxyXG5cdFx0XHRcdFx0YXJyYXlNb3ZlKFNlcnZpY2VQcm92aWRlci50YWdSZWNvcmRzLmdldFRhZ3MoKSwgcmVjb3JkSW5kZXgsIHJlY29yZEluZGV4KzEpXHJcblx0XHRcdFx0XHRTZXJ2aWNlUHJvdmlkZXIuc2V0dGluZ3MuZGVib3VuY2VTYXZlVG9GaWxlKClcclxuXHRcdFx0XHRcdGF3YWl0IHJlZHJhd0NhbGxiYWNrKClcclxuXHRcdFx0XHR9KVxyXG5cdFx0XHRcdC5leHRyYVNldHRpbmdzRWwuY2xhc3NMaXN0LmFkZChcIm5hdmlnYXRvci1jaGV2cm9uLWRvd25cIik7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRzZXREaXNhYmxlZChkaXNhYmxlZDogYm9vbGVhbik6IHRoaXMge1xyXG5cdFx0dGhpcy5kaXNhYmxlZCA9IGRpc2FibGVkO1xyXG5cdFx0dGhpcy5FbC5oaWRkZW4gPSBkaXNhYmxlZDtcclxuXHRcdHJldHVybiB0aGlzO1xyXG5cdH1cclxuXHJcblx0dGhlbihjYjogKGNvbXBvbmVudDogdGhpcykgPT4gYW55KTogdGhpcyB7XHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHR9XHJcbn1cclxuIl19