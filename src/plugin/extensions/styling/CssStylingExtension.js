import { SettingTagRecordToggleComponent } from "../../ui/setting_tab/components/tag_table/SettingTagRecordToggleComponent";
import { BoldifyCssWrangler } from "./BoldifyCssWrangler";
import { capitalizeFirstLetter } from "../../../lib/StringUtils";
import { AbstractExtension } from "../AbstractExtension";
// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export class CssStylingExtension extends AbstractExtension {
    constructor() {
        super(...arguments);
        this.cssWrangler = new BoldifyCssWrangler();
        this.extensionName = 'styling';
        this.description = "TEMP extensions, used to styling tags";
        this.TableContentPopulators = [
            {
                title: capitalizeFirstLetter(this.extensionName),
                callback: (rowData) => new SettingTagRecordToggleComponent(rowData, "boldify_enabled"),
                classes: []
            }
        ];
    }
    getDefaultRecord() {
        return { boldify_enabled: false };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQm9sZGlmeUV4dGVuc2lvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkJvbGRpZnlFeHRlbnNpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBSUEsT0FBTyxFQUFDLCtCQUErQixFQUFDLE1BQU0sMkVBQTJFLENBQUM7QUFHMUgsT0FBTyxFQUFDLGtCQUFrQixFQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFDeEQsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0sMEJBQTBCLENBQUM7QUFDL0QsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFHdkQsd0hBQXdIO0FBQ3hILE9BQU87QUFDUCx3SEFBd0g7QUFDeEgsTUFBTSxPQUFPLGdCQUFpQixTQUFRLGlCQUFpQjtJQUF2RDs7UUFDVyxnQkFBVyxHQUFpQixJQUFJLGtCQUFrQixFQUFFLENBQUM7UUFDeEQsa0JBQWEsR0FBRyxTQUFTLENBQUM7UUFDMUIsZ0JBQVcsR0FBRyx1Q0FBdUMsQ0FBQztRQUN0RCwyQkFBc0IsR0FBNkI7WUFDekQ7Z0JBQ0MsS0FBSyxFQUFFLHFCQUFxQixDQUFDLElBQUksQ0FBQyxhQUFhLENBQUM7Z0JBQ2hELFFBQVEsRUFBQyxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsSUFBSSwrQkFBK0IsQ0FBQyxPQUFPLEVBQ2hFLGlCQUFpQixDQUFDO2dCQUNuQixPQUFPLEVBQUMsRUFBRTthQUNWO1NBQ0QsQ0FBQTtJQUtGLENBQUM7SUFITyxnQkFBZ0I7UUFDdEIsT0FBTyxFQUFFLGVBQWUsRUFBRSxLQUFLLEVBQUUsQ0FBQztJQUNuQyxDQUFDO0NBQ0QiLCJzb3VyY2VzQ29udGVudCI6WyIvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuLy8gSW1wb3J0c1xyXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuaW1wb3J0IHtUYWJsZUNvbnRlbnRQb3B1bGF0b3J9IGZyb20gXCIuLi8uLi8uLi9jb250cmFjdHMvcGx1Z2luL3VpL2NvbXBvbmVudHMvVGFibGVDb250ZW50UG9wdWxhdG9yXCI7XHJcbmltcG9ydCB7U2V0dGluZ1RhZ1JlY29yZFRvZ2dsZUNvbXBvbmVudH0gZnJvbSBcIi4uLy4uL3VpL3NldHRpbmdfdGFiL2NvbXBvbmVudHMvdGFnX3RhYmxlL1NldHRpbmdUYWdSZWNvcmRUb2dnbGVDb21wb25lbnRcIjtcclxuaW1wb3J0IHtJRXh0ZW5zaW9uUmVjb3JkQm9sZGlmeX0gZnJvbSBcIi4vSUV4dGVuc2lvblJlY29yZEJvbGRpZnlcIjtcclxuaW1wb3J0IHsgSUNzc1dyYW5nbGVyIH0gZnJvbSBcInNyYy9jb250cmFjdHMvcGx1Z2luL3NlcnZpY2VzL2Nzc19zdHlsZXIvSUNzc1dyYW5nbGVyXCI7XHJcbmltcG9ydCB7Qm9sZGlmeUNzc1dyYW5nbGVyfSBmcm9tIFwiLi9Cb2xkaWZ5Q3NzV3JhbmdsZXJcIjtcclxuaW1wb3J0IHtjYXBpdGFsaXplRmlyc3RMZXR0ZXJ9IGZyb20gXCIuLi8uLi8uLi9saWIvU3RyaW5nVXRpbHNcIjtcclxuaW1wb3J0IHtBYnN0cmFjdEV4dGVuc2lvbn0gZnJvbSBcIi4uL0Fic3RyYWN0RXh0ZW5zaW9uXCI7XHJcblxyXG5cclxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbi8vIENvZGVcclxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbmV4cG9ydCBjbGFzcyBCb2xkaWZ5RXh0ZW5zaW9uIGV4dGVuZHMgQWJzdHJhY3RFeHRlbnNpb24ge1xyXG4gICAgcHVibGljIGNzc1dyYW5nbGVyOiBJQ3NzV3JhbmdsZXIgPSBuZXcgQm9sZGlmeUNzc1dyYW5nbGVyKCk7XHJcblx0cHVibGljIGV4dGVuc2lvbk5hbWUgPSAnc3R5bGluZyc7XHJcblx0cHVibGljIGRlc2NyaXB0aW9uID0gXCJURU1QIGV4dGVuc2lvbnMsIHVzZWQgdG8gc3R5bGluZyB0YWdzXCI7XHJcblx0cHVibGljIFRhYmxlQ29udGVudFBvcHVsYXRvcnMgOiBUYWJsZUNvbnRlbnRQb3B1bGF0b3JbXSA9IFtcclxuXHRcdHtcclxuXHRcdFx0dGl0bGU6IGNhcGl0YWxpemVGaXJzdExldHRlcih0aGlzLmV4dGVuc2lvbk5hbWUpLFxyXG5cdFx0XHRjYWxsYmFjazoocm93RGF0YSkgPT4gbmV3IFNldHRpbmdUYWdSZWNvcmRUb2dnbGVDb21wb25lbnQocm93RGF0YSxcclxuXHRcdFx0XHRcImJvbGRpZnlfZW5hYmxlZFwiKSxcclxuXHRcdFx0Y2xhc3NlczpbXVxyXG5cdFx0fVxyXG5cdF1cclxuXHJcblx0cHVibGljIGdldERlZmF1bHRSZWNvcmQoKTpJRXh0ZW5zaW9uUmVjb3JkQm9sZGlmeXtcclxuXHRcdHJldHVybiB7IGJvbGRpZnlfZW5hYmxlZDogZmFsc2UgfTtcclxuXHR9XHJcbn1cclxuIl19
