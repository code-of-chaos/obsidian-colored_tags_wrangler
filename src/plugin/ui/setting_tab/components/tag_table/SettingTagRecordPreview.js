import { ServiceProvider } from "../../../../services/ServiceProvider";
// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export class SettingTagRecordPreview {
    // This is just a recreation of the obsidian tag spans
    //		Although I should be able to create some sort of system to update them easily?
    //		Currently, this is done by giving them specific Ids tied to the uuid of the records.
    constructor(rowData) {
        this.El = rowData.parentEl.createDiv();
        this.El.addClass("tag-preview-div");
        let el2 = this.El.createDiv();
        const previewIds = ServiceProvider.tagRecords.getTagPreviewIds(rowData.record);
        const firstTag = ServiceProvider.tagRecords.getFirstTag(rowData.record);
        const elBegin = el2.createEl("span");
        elBegin.addClasses(["cm-hashtag", "cm-hashtag-begin", "cm-meta", `cm-tag-${firstTag}`]);
        elBegin.id = previewIds.begin;
        const elEnd = el2.createEl("span");
        elEnd.addClasses(["cm-hashtag", "cm-hashtag-end", "cm-meta", `cm-tag-${firstTag}`]);
        elEnd.id = previewIds.end;
        // Colors are applied after the fact by the table rendering
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2V0dGluZ1RhZ1JlY29yZFByZXZpZXcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTZXR0aW5nVGFnUmVjb3JkUHJldmlldy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFNQSxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sc0NBQXNDLENBQUM7QUFHckUsd0hBQXdIO0FBQ3hILE9BQU87QUFDUCx3SEFBd0g7QUFDeEgsTUFBTSxPQUFPLHVCQUF1QjtJQUluQyxzREFBc0Q7SUFDdEQsa0ZBQWtGO0lBQ2xGLHdGQUF3RjtJQUV4RixZQUFZLE9BQW1CO1FBQzlCLElBQUksQ0FBQyxFQUFFLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxTQUFTLEVBQUUsQ0FBQTtRQUN0QyxJQUFJLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBQ3BDLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsU0FBUyxFQUFFLENBQUE7UUFFN0IsTUFBTSxVQUFVLEdBQUcsZUFBZSxDQUFDLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUE7UUFDOUUsTUFBTSxRQUFRLEdBQUcsZUFBZSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFBO1FBRXZFLE1BQU0sT0FBTyxHQUFFLEdBQUcsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUE7UUFDbkMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDLFlBQVksRUFBRSxrQkFBa0IsRUFBRSxTQUFTLEVBQUUsVUFBVSxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDeEYsT0FBTyxDQUFDLEVBQUUsR0FBRyxVQUFVLENBQUMsS0FBSyxDQUFBO1FBRTdCLE1BQU0sS0FBSyxHQUFFLEdBQUcsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUE7UUFDakMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDLFlBQVksRUFBRSxnQkFBZ0IsRUFBRSxTQUFTLEVBQUUsVUFBVSxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDcEYsS0FBSyxDQUFDLEVBQUUsR0FBRyxVQUFVLENBQUMsR0FBRyxDQUFBO1FBRXpCLDJEQUEyRDtJQUM1RCxDQUFDO0lBRUQsV0FBVyxDQUFDLFFBQWlCO1FBQzVCLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxFQUFFLENBQUMsTUFBTSxHQUFHLFFBQVEsQ0FBQztRQUMxQixPQUFPLElBQUksQ0FBQztJQUNiLENBQUM7SUFFRCxJQUFJLENBQUMsRUFBNEI7UUFDaEMsT0FBTyxJQUFJLENBQUM7SUFDYixDQUFDO0NBQ0QiLCJzb3VyY2VzQ29udGVudCI6WyIvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuLy8gSW1wb3J0c1xyXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuaW1wb3J0IHtcclxuXHRJU2V0dGluZ1RhZ1JlY29yZENvbXBvbmVudFxyXG59IGZyb20gXCIuLi8uLi8uLi8uLi8uLi9jb250cmFjdHMvcGx1Z2luL3VpL2NvbXBvbmVudHMvdGFnX3RhYmxlL0lTZXR0aW5nVGFnUmVjb3JkQ29tcG9uZW50XCI7XHJcbmltcG9ydCB7U2VydmljZVByb3ZpZGVyfSBmcm9tIFwiLi4vLi4vLi4vLi4vc2VydmljZXMvU2VydmljZVByb3ZpZGVyXCI7XHJcbmltcG9ydCB7Um93RGF0YVR5cGV9IGZyb20gXCIuLi8uLi8uLi8uLi8uLi9jb250cmFjdHMvcGx1Z2luL3VpL2NvbXBvbmVudHMvUm93RGF0YVR5cGVcIjtcclxuXHJcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4vLyBDb2RlXHJcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5leHBvcnQgY2xhc3MgU2V0dGluZ1RhZ1JlY29yZFByZXZpZXcgaW1wbGVtZW50cyBJU2V0dGluZ1RhZ1JlY29yZENvbXBvbmVudHtcclxuXHRwcml2YXRlIEVsOiBIVE1MRWxlbWVudDtcclxuXHRkaXNhYmxlZDogYm9vbGVhbjtcclxuXHJcblx0Ly8gVGhpcyBpcyBqdXN0IGEgcmVjcmVhdGlvbiBvZiB0aGUgb2JzaWRpYW4gdGFnIHNwYW5zXHJcblx0Ly9cdFx0QWx0aG91Z2ggSSBzaG91bGQgYmUgYWJsZSB0byBjcmVhdGUgc29tZSBzb3J0IG9mIHN5c3RlbSB0byB1cGRhdGUgdGhlbSBlYXNpbHk/XHJcblx0Ly9cdFx0Q3VycmVudGx5LCB0aGlzIGlzIGRvbmUgYnkgZ2l2aW5nIHRoZW0gc3BlY2lmaWMgSWRzIHRpZWQgdG8gdGhlIHV1aWQgb2YgdGhlIHJlY29yZHMuXHJcblxyXG5cdGNvbnN0cnVjdG9yKHJvd0RhdGE6Um93RGF0YVR5cGUpIHtcclxuXHRcdHRoaXMuRWwgPSByb3dEYXRhLnBhcmVudEVsLmNyZWF0ZURpdigpXHJcblx0XHR0aGlzLkVsLmFkZENsYXNzKFwidGFnLXByZXZpZXctZGl2XCIpO1xyXG5cdFx0bGV0IGVsMiA9IHRoaXMuRWwuY3JlYXRlRGl2KClcclxuXHJcblx0XHRjb25zdCBwcmV2aWV3SWRzID0gU2VydmljZVByb3ZpZGVyLnRhZ1JlY29yZHMuZ2V0VGFnUHJldmlld0lkcyhyb3dEYXRhLnJlY29yZClcclxuXHRcdGNvbnN0IGZpcnN0VGFnID0gU2VydmljZVByb3ZpZGVyLnRhZ1JlY29yZHMuZ2V0Rmlyc3RUYWcocm93RGF0YS5yZWNvcmQpXHJcblxyXG5cdFx0Y29uc3QgZWxCZWdpbj0gZWwyLmNyZWF0ZUVsKFwic3BhblwiKVxyXG5cdFx0ZWxCZWdpbi5hZGRDbGFzc2VzKFtcImNtLWhhc2h0YWdcIiwgXCJjbS1oYXNodGFnLWJlZ2luXCIsIFwiY20tbWV0YVwiLCBgY20tdGFnLSR7Zmlyc3RUYWd9YF0pO1xyXG5cdFx0ZWxCZWdpbi5pZCA9IHByZXZpZXdJZHMuYmVnaW5cclxuXHJcblx0XHRjb25zdCBlbEVuZD0gZWwyLmNyZWF0ZUVsKFwic3BhblwiKVxyXG5cdFx0ZWxFbmQuYWRkQ2xhc3NlcyhbXCJjbS1oYXNodGFnXCIsIFwiY20taGFzaHRhZy1lbmRcIiwgXCJjbS1tZXRhXCIsIGBjbS10YWctJHtmaXJzdFRhZ31gXSk7XHJcblx0XHRlbEVuZC5pZCA9IHByZXZpZXdJZHMuZW5kXHJcblxyXG5cdFx0Ly8gQ29sb3JzIGFyZSBhcHBsaWVkIGFmdGVyIHRoZSBmYWN0IGJ5IHRoZSB0YWJsZSByZW5kZXJpbmdcclxuXHR9XHJcblxyXG5cdHNldERpc2FibGVkKGRpc2FibGVkOiBib29sZWFuKTogdGhpcyB7XHJcblx0XHR0aGlzLmRpc2FibGVkID0gZGlzYWJsZWQ7XHJcblx0XHR0aGlzLkVsLmhpZGRlbiA9IGRpc2FibGVkO1xyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblx0fVxyXG5cclxuXHR0aGVuKGNiOiAoY29tcG9uZW50OiB0aGlzKSA9PiBhbnkpOiB0aGlzIHtcclxuXHRcdHJldHVybiB0aGlzO1xyXG5cdH1cclxufVxyXG4iXX0=