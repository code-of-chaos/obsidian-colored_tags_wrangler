import { v4 as uuidV4 } from "uuid";
import { SettingTagRecordColorComponent } from "../../ui/setting_tab/components/tag_table/SettingTagRecordColorComponent";
import { SettingTagRecordToggleComponent } from "../../ui/setting_tab/components/tag_table/SettingTagRecordToggleComponent";
import { CoreCssWrangler } from "./CoreCssWrangler";
import { AbstractExtension } from "../AbstractExtension";
// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export class CoreExtension extends AbstractExtension {
    constructor() {
        super(...arguments);
        this.cssWrangler = new CoreCssWrangler();
        this.extensionName = 'core';
        this.description = "Core functionality of the plugin";
        this.TableContentPopulators = [
            {
                title: "Enable",
                callback: (rowData) => {
                    return new SettingTagRecordToggleComponent(rowData, "core_enabled");
                },
                classes: []
            }, {
                title: "Text",
                callback: (rowData) => {
                    return new SettingTagRecordColorComponent(rowData, "core_color_foreground");
                },
                classes: []
            }, {
                title: "Fill",
                callback: (rowData) => {
                    return new SettingTagRecordColorComponent(rowData, "core_color_background");
                },
                classes: []
            },
        ];
    }
    getDefaultRecord() {
        return {
            core_enabled: true,
            core_id: uuidV4(),
            core_tagText: "new-tag",
            core_color_foreground: { r: 255, g: 255, b: 255, a: 1.0 },
            core_color_background: { r: 0, g: 0, b: 0, a: 1.0 },
        };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29yZUV4dGVuc2lvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkNvcmVFeHRlbnNpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBSUEsT0FBTyxFQUFDLEVBQUUsSUFBSSxNQUFNLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFDbEMsT0FBTyxFQUFDLDhCQUE4QixFQUFDLE1BQU0sMEVBQTBFLENBQUM7QUFDeEgsT0FBTyxFQUNOLCtCQUErQixFQUMvQixNQUFNLDJFQUEyRSxDQUFDO0FBRW5GLE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQUNsRCxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQUd2RCx3SEFBd0g7QUFDeEgsT0FBTztBQUNQLHdIQUF3SDtBQUN4SCxNQUFNLE9BQU8sYUFBYyxTQUFRLGlCQUFpQjtJQUFwRDs7UUFDVyxnQkFBVyxHQUFHLElBQUksZUFBZSxFQUFFLENBQUE7UUFDdEMsa0JBQWEsR0FBRyxNQUFNLENBQUM7UUFDdkIsZ0JBQVcsR0FBRyxrQ0FBa0MsQ0FBQztRQUNqRCwyQkFBc0IsR0FBNkI7WUFDekQ7Z0JBQ0MsS0FBSyxFQUFDLFFBQVE7Z0JBQ2QsUUFBUSxFQUFDLENBQUMsT0FBTyxFQUFFLEVBQUU7b0JBQ3BCLE9BQU8sSUFBSSwrQkFBK0IsQ0FBQyxPQUFPLEVBQ2pELGNBQWMsQ0FBQyxDQUFDO2dCQUNsQixDQUFDO2dCQUNELE9BQU8sRUFBQyxFQUFFO2FBQ1YsRUFBQztnQkFDRCxLQUFLLEVBQUMsTUFBTTtnQkFDWixRQUFRLEVBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRTtvQkFDcEIsT0FBTyxJQUFJLDhCQUE4QixDQUFDLE9BQU8sRUFDaEQsdUJBQXVCLENBQUMsQ0FBQztnQkFDM0IsQ0FBQztnQkFDRCxPQUFPLEVBQUMsRUFBRTthQUNWLEVBQUM7Z0JBQ0QsS0FBSyxFQUFDLE1BQU07Z0JBQ1osUUFBUSxFQUFDLENBQUMsT0FBTyxFQUFFLEVBQUU7b0JBQ3BCLE9BQU8sSUFBSSw4QkFBOEIsQ0FBQyxPQUFPLEVBQ2hELHVCQUF1QixDQUFDLENBQUM7Z0JBQzNCLENBQUM7Z0JBQ0QsT0FBTyxFQUFDLEVBQUU7YUFDVjtTQUFFLENBQUE7SUFXTCxDQUFDO0lBVE8sZ0JBQWdCO1FBQ3RCLE9BQU87WUFDTixZQUFZLEVBQUUsSUFBSTtZQUNsQixPQUFPLEVBQUUsTUFBTSxFQUFFO1lBQ2pCLFlBQVksRUFBRyxTQUFTO1lBQ3hCLHFCQUFxQixFQUFHLEVBQUMsQ0FBQyxFQUFDLEdBQUcsRUFBQyxDQUFDLEVBQUMsR0FBRyxFQUFDLENBQUMsRUFBQyxHQUFHLEVBQUMsQ0FBQyxFQUFDLEdBQUcsRUFBQztZQUNqRCxxQkFBcUIsRUFBRyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxHQUFHLEVBQUM7U0FDM0MsQ0FBQztJQUNILENBQUM7Q0FDRCIsInNvdXJjZXNDb250ZW50IjpbIi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4vLyBJbXBvcnRzXHJcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5pbXBvcnQge1RhYmxlQ29udGVudFBvcHVsYXRvcn0gZnJvbSBcIi4uLy4uLy4uL2NvbnRyYWN0cy9wbHVnaW4vdWkvY29tcG9uZW50cy9UYWJsZUNvbnRlbnRQb3B1bGF0b3JcIjtcclxuaW1wb3J0IHt2NCBhcyB1dWlkVjR9IGZyb20gXCJ1dWlkXCI7XHJcbmltcG9ydCB7U2V0dGluZ1RhZ1JlY29yZENvbG9yQ29tcG9uZW50fSBmcm9tIFwiLi4vLi4vdWkvc2V0dGluZ190YWIvY29tcG9uZW50cy90YWdfdGFibGUvU2V0dGluZ1RhZ1JlY29yZENvbG9yQ29tcG9uZW50XCI7XHJcbmltcG9ydCB7XHJcblx0U2V0dGluZ1RhZ1JlY29yZFRvZ2dsZUNvbXBvbmVudFxyXG59IGZyb20gXCIuLi8uLi91aS9zZXR0aW5nX3RhYi9jb21wb25lbnRzL3RhZ190YWJsZS9TZXR0aW5nVGFnUmVjb3JkVG9nZ2xlQ29tcG9uZW50XCI7XHJcbmltcG9ydCB7SUV4dGVuc2lvblJlY29yZENvcmV9IGZyb20gXCIuL0lFeHRlbnNpb25SZWNvcmRCb2xkaWZ5XCI7XHJcbmltcG9ydCB7Q29yZUNzc1dyYW5nbGVyfSBmcm9tIFwiLi9Db3JlQ3NzV3JhbmdsZXJcIjtcclxuaW1wb3J0IHtBYnN0cmFjdEV4dGVuc2lvbn0gZnJvbSBcIi4uL0Fic3RyYWN0RXh0ZW5zaW9uXCI7XHJcblxyXG5cclxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbi8vIENvZGVcclxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbmV4cG9ydCBjbGFzcyBDb3JlRXh0ZW5zaW9uIGV4dGVuZHMgQWJzdHJhY3RFeHRlbnNpb24ge1xyXG4gICAgcHVibGljIGNzc1dyYW5nbGVyID0gbmV3IENvcmVDc3NXcmFuZ2xlcigpXHJcblx0cHVibGljIGV4dGVuc2lvbk5hbWUgPSAnY29yZSc7XHJcblx0cHVibGljIGRlc2NyaXB0aW9uID0gXCJDb3JlIGZ1bmN0aW9uYWxpdHkgb2YgdGhlIHBsdWdpblwiO1xyXG5cdHB1YmxpYyBUYWJsZUNvbnRlbnRQb3B1bGF0b3JzIDogVGFibGVDb250ZW50UG9wdWxhdG9yW10gPSBbXHJcblx0XHR7XHJcblx0XHRcdHRpdGxlOlwiRW5hYmxlXCIsXHJcblx0XHRcdGNhbGxiYWNrOihyb3dEYXRhKSA9PiB7XHJcblx0XHRcdFx0cmV0dXJuIG5ldyBTZXR0aW5nVGFnUmVjb3JkVG9nZ2xlQ29tcG9uZW50KHJvd0RhdGEsXHJcblx0XHRcdFx0XHRcImNvcmVfZW5hYmxlZFwiKTtcclxuXHRcdFx0fSxcclxuXHRcdFx0Y2xhc3NlczpbXVxyXG5cdFx0fSx7XHJcblx0XHRcdHRpdGxlOlwiVGV4dFwiLFxyXG5cdFx0XHRjYWxsYmFjazoocm93RGF0YSkgPT4ge1xyXG5cdFx0XHRcdHJldHVybiBuZXcgU2V0dGluZ1RhZ1JlY29yZENvbG9yQ29tcG9uZW50KHJvd0RhdGEsXHJcblx0XHRcdFx0XHRcImNvcmVfY29sb3JfZm9yZWdyb3VuZFwiKTtcclxuXHRcdFx0fSxcclxuXHRcdFx0Y2xhc3NlczpbXVxyXG5cdFx0fSx7XHJcblx0XHRcdHRpdGxlOlwiRmlsbFwiLFxyXG5cdFx0XHRjYWxsYmFjazoocm93RGF0YSkgPT4ge1xyXG5cdFx0XHRcdHJldHVybiBuZXcgU2V0dGluZ1RhZ1JlY29yZENvbG9yQ29tcG9uZW50KHJvd0RhdGEsXHJcblx0XHRcdFx0XHRcImNvcmVfY29sb3JfYmFja2dyb3VuZFwiKTtcclxuXHRcdFx0fSxcclxuXHRcdFx0Y2xhc3NlczpbXVxyXG5cdFx0fSxdXHJcblxyXG5cdHB1YmxpYyBnZXREZWZhdWx0UmVjb3JkKCk6SUV4dGVuc2lvblJlY29yZENvcmV7XHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHRjb3JlX2VuYWJsZWQ6IHRydWUsXHJcblx0XHRcdGNvcmVfaWQ6IHV1aWRWNCgpLFxyXG5cdFx0XHRjb3JlX3RhZ1RleHQgOiBcIm5ldy10YWdcIixcclxuXHRcdFx0Y29yZV9jb2xvcl9mb3JlZ3JvdW5kIDoge3I6MjU1LGc6MjU1LGI6MjU1LGE6MS4wfSxcclxuXHRcdFx0Y29yZV9jb2xvcl9iYWNrZ3JvdW5kIDoge3I6MCxnOjAsYjowLGE6MS4wfSxcclxuXHRcdH07XHJcblx0fVxyXG59XHJcbiJdfQ==