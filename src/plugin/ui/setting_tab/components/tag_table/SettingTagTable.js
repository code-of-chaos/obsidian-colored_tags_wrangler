import { __awaiter } from "tslib";
// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import { Setting } from "obsidian";
import { SettingTagRecordTextAreaComponent } from "./SettingTagRecordTextAreaComponent";
import { SettingTagRecordPreview } from "./SettingTagRecordPreview";
import { SettingTagRecordNavigators } from "./SettingTagRecordNavigators";
import { ServiceProvider } from "../../../../services/ServiceProvider";
import { capitalizeFirstLetter } from "../../../../../lib/StringUtils";
// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export class SettingTagTable {
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
        this.settingEl = new Setting(this.parent.containerEl);
        this.tableEl = this.parent.containerEl.createDiv();
        this.settingElBottom = new Setting(this.parent.containerEl);
    }
    display() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.settingEl == undefined && this.tableEl !== undefined) {
                this._AssignEls();
            }
            yield this._DisplayExtensionSelector();
            yield this._DisplayTable();
            yield this.addNewButton(this.settingElBottom);
        });
    }
    redrawTable() {
        return __awaiter(this, void 0, void 0, function* () {
            this.tableEl.empty();
            yield this._DisplayTable();
        });
    }
    // -----------------------------------------------------------------------------------------------------------------
    // Constructor
    // -----------------------------------------------------------------------------------------------------------------
    _DisplayExtensionSelector() {
        return __awaiter(this, void 0, void 0, function* () {
            const element = this.settingEl
                .setName("Custom color tags")
                .setDesc(`Define custom colors for tags. Select which extension to edit, dependant on the `)
                .addDropdown(component => {
                component
                    .addOptions(ServiceProvider.extensions.EnabledList
                    .map(extension => extension.extensionName)
                    .reduce((acc, key) => (Object.assign(Object.assign({}, acc), { [key]: capitalizeFirstLetter(key) })), {}))
                    .onChange((value) => __awaiter(this, void 0, void 0, function* () {
                    // UPDATE THE TABLE
                    this.selectedExtension = value;
                    yield this.redrawTable();
                }));
            });
            yield this.addNewButton(element); // add a bottom button, for navigation
        });
    }
    addNewButton(settingEl) {
        return __awaiter(this, void 0, void 0, function* () {
            settingEl.addButton(component => {
                component
                    .setClass("mod-cta")
                    .setButtonText("New Tag")
                    .onClick(() => __awaiter(this, void 0, void 0, function* () {
                    yield ServiceProvider.tagRecords.createNewDefaultTag();
                    yield this.redrawTable();
                }));
            });
        });
    }
    _DisplayTable() {
        return __awaiter(this, void 0, void 0, function* () {
            let scrollAreaContainer = this.tableEl.createDiv();
            scrollAreaContainer.addClass("scroll-area-container");
            let tableContainer = scrollAreaContainer.createDiv();
            tableContainer.addClass("scroll-container");
            let overlayGradient = scrollAreaContainer.createDiv();
            overlayGradient.addClass("overlay-gradient");
            // Assign Table columns and callbacks for population
            // 		This is the default which should be shown on every tab!
            const content = [
                {
                    title: "",
                    callback: (rowData) => {
                        return new SettingTagRecordNavigators(rowData, true, () => __awaiter(this, void 0, void 0, function* () { return yield this.redrawTable(); }));
                    },
                    classes: []
                }, {
                    title: "Tag",
                    callback: (rowData) => {
                        return new SettingTagRecordTextAreaComponent(rowData, "core_tagText");
                    },
                    classes: []
                }, {
                    title: "Preview",
                    callback: (rowData) => {
                        return new SettingTagRecordPreview(rowData);
                    },
                    classes: ["tag-preview", "sticky-column", "border-right"]
                }
            ];
            let populators;
            if (this.selectedExtension != undefined) {
                populators = ServiceProvider.extensions.Dictionary[this.selectedExtension].TableContentPopulators;
            }
            else {
                populators = ServiceProvider.extensions.Core.TableContentPopulators;
            }
            for (const callback of populators) {
                content.push(callback);
            }
            // Actually create the table
            let table = tableContainer.createEl('table');
            let thead = table.createEl('thead');
            let headersRow = thead.createEl('tr');
            for (let { title, classes } of content) {
                headersRow.createEl('th', { text: title });
                headersRow.addClasses(classes);
            }
            // Populate table with record rows
            let tbody = table.createEl('tbody');
            for (let record of ServiceProvider.tagRecords.getTags()) {
                const tr = tbody.createEl('tr');
                for (let { callback, classes } of content) {
                    let td = tr.createEl('td');
                    td.addClasses(classes);
                    callback({
                        record: record,
                        rowUpdateCallback: (() => __awaiter(this, void 0, void 0, function* () {
                            yield this.UpdateRow(record, tr);
                            ServiceProvider.cssStyler.processExtensions(); // This is so we can update all the styling when something changes
                        })),
                        parentEl: td
                    });
                }
                yield this.UpdateRow(record, tr);
            }
        });
    }
    getTagPreviewEls(record) {
        const ids = ServiceProvider.tagRecords.getTagPreviewIds(record);
        return {
            begin: document.getElementById(ids.begin),
            end: document.getElementById(ids.end)
        };
    }
    UpdateRow(record, _) {
        return __awaiter(this, void 0, void 0, function* () {
            const tag = ServiceProvider.tagRecords.getFirstTag(record);
            const originalLength = tag.length;
            let { begin, end } = this.getTagPreviewEls(record);
            if (!begin || !end) {
                console.warn(`The tag "${record}" BEGIN or END is empty.`);
                return;
            }
            const displayTag = originalLength >= 9
                ? `${tag.substring(0, 8)}...`
                : tag;
            if (begin.textContent !== "#")
                begin.textContent = "#";
            if (end.textContent !== displayTag)
                end.textContent = displayTag;
            // Styling provided by record updater
        });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2V0dGluZ1RhZ1RhYmxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU2V0dGluZ1RhZ1RhYmxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSx3SEFBd0g7QUFDeEgsVUFBVTtBQUNWLHdIQUF3SDtBQUN4SCxPQUFPLEVBQUMsT0FBTyxFQUFhLE1BQU0sVUFBVSxDQUFDO0FBRTdDLE9BQU8sRUFBQyxpQ0FBaUMsRUFBQyxNQUFNLHFDQUFxQyxDQUFDO0FBQ3RGLE9BQU8sRUFBQyx1QkFBdUIsRUFBQyxNQUFNLDJCQUEyQixDQUFDO0FBQ2xFLE9BQU8sRUFBQywwQkFBMEIsRUFBQyxNQUFNLDhCQUE4QixDQUFDO0FBQ3hFLE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSxzQ0FBc0MsQ0FBQztBQUdyRSxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSxnQ0FBZ0MsQ0FBQztBQUVyRSx3SEFBd0g7QUFDeEgsT0FBTztBQUNQLHdIQUF3SDtBQUN4SCxNQUFNLE9BQU8sZUFBZTtJQVEzQixvSEFBb0g7SUFDcEgsY0FBYztJQUNkLG9IQUFvSDtJQUNwSCxZQUFZLE1BQWtCO1FBQzdCLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQTtJQUNsQixDQUFDO0lBRUQsb0hBQW9IO0lBQ3BILFVBQVU7SUFDVixvSEFBb0g7SUFDNUcsVUFBVTtRQUNqQixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUE7UUFDckQsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNuRCxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUE7SUFDNUQsQ0FBQztJQUVZLE9BQU87O1lBQ25CLElBQUksSUFBSSxDQUFDLFNBQVMsSUFBSSxTQUFTLElBQUksSUFBSSxDQUFDLE9BQU8sS0FBSyxTQUFTLEVBQUU7Z0JBQzlELElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQTthQUNqQjtZQUVELE1BQU0sSUFBSSxDQUFDLHlCQUF5QixFQUFFLENBQUM7WUFDdkMsTUFBTSxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUE7WUFFMUIsTUFBTSxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQTtRQUU5QyxDQUFDO0tBQUE7SUFFWSxXQUFXOztZQUN2QixJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFBO1lBQ3BCLE1BQU0sSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFBO1FBQzNCLENBQUM7S0FBQTtJQUVELG9IQUFvSDtJQUNwSCxjQUFjO0lBQ2Qsb0hBQW9IO0lBQ3RHLHlCQUF5Qjs7WUFDdEMsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLFNBQVM7aUJBQzVCLE9BQU8sQ0FBQyxtQkFBbUIsQ0FBQztpQkFDNUIsT0FBTyxDQUFDLGtGQUFrRixDQUFDO2lCQUMzRixXQUFXLENBQUMsU0FBUyxDQUFDLEVBQUU7Z0JBQUUsU0FBUztxQkFDbEMsVUFBVSxDQUNWLGVBQWUsQ0FBQyxVQUFVLENBQUMsV0FBVztxQkFDcEMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQztxQkFDekMsTUFBTSxDQUNOLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFLENBQUMsaUNBQ1QsR0FBRyxLQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUscUJBQXFCLENBQUMsR0FBRyxDQUFDLElBQzFDLEVBQUUsRUFBRSxDQUNMLENBQ0Y7cUJBQ0EsUUFBUSxDQUFDLENBQU8sS0FBSyxFQUFFLEVBQUU7b0JBQ3pCLG1CQUFtQjtvQkFDbkIsSUFBSSxDQUFDLGlCQUFpQixHQUFHLEtBQUssQ0FBQztvQkFDL0IsTUFBTSxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUE7Z0JBQ3pCLENBQUMsQ0FBQSxDQUFDLENBQUE7WUFDSCxDQUFDLENBQUMsQ0FDRjtZQUNELE1BQU0sSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQSxDQUFDLHNDQUFzQztRQUN4RSxDQUFDO0tBQUE7SUFFYSxZQUFZLENBQUMsU0FBbUI7O1lBQzdDLFNBQVMsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLEVBQUU7Z0JBQUUsU0FBUztxQkFDekMsUUFBUSxDQUFDLFNBQVMsQ0FBQztxQkFDbkIsYUFBYSxDQUFDLFNBQVMsQ0FBQztxQkFDeEIsT0FBTyxDQUFDLEdBQVMsRUFBRTtvQkFDbkIsTUFBTSxlQUFlLENBQUMsVUFBVSxDQUFDLG1CQUFtQixFQUFFLENBQUE7b0JBQ3RELE1BQU0sSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFBO2dCQUN6QixDQUFDLENBQUEsQ0FBQyxDQUFBO1lBQ0gsQ0FBQyxDQUFDLENBQUE7UUFFSCxDQUFDO0tBQUE7SUFFYSxhQUFhOztZQUMxQixJQUFJLG1CQUFtQixHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLENBQUM7WUFDbkQsbUJBQW1CLENBQUMsUUFBUSxDQUFDLHVCQUF1QixDQUFDLENBQUM7WUFFdEQsSUFBSSxjQUFjLEdBQUcsbUJBQW1CLENBQUMsU0FBUyxFQUFFLENBQUM7WUFDckQsY0FBYyxDQUFDLFFBQVEsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1lBRTVDLElBQUksZUFBZSxHQUFHLG1CQUFtQixDQUFDLFNBQVMsRUFBRSxDQUFDO1lBQ3RELGVBQWUsQ0FBQyxRQUFRLENBQUMsa0JBQWtCLENBQUMsQ0FBQztZQUU3QyxvREFBb0Q7WUFDcEQsNERBQTREO1lBQzVELE1BQU0sT0FBTyxHQUE0QjtnQkFDeEM7b0JBQ0MsS0FBSyxFQUFDLEVBQUU7b0JBQ1IsUUFBUSxFQUFHLENBQUMsT0FBcUIsRUFBRSxFQUFFO3dCQUNwQyxPQUFPLElBQUksMEJBQTBCLENBQUMsT0FBTyxFQUM1QyxJQUFJLEVBQUUsR0FBUyxFQUFFLGdEQUFDLE9BQUEsTUFBTSxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUEsR0FBQSxDQUFDLENBQUE7b0JBQzdDLENBQUM7b0JBQ0QsT0FBTyxFQUFDLEVBQUU7aUJBQ1YsRUFBQztvQkFDRCxLQUFLLEVBQUMsS0FBSztvQkFDWCxRQUFRLEVBQUUsQ0FBQyxPQUFxQixFQUFFLEVBQUU7d0JBQ25DLE9BQU8sSUFBSSxpQ0FBaUMsQ0FBQyxPQUFPLEVBQ25ELGNBQWMsQ0FBQyxDQUFDO29CQUNsQixDQUFDO29CQUNELE9BQU8sRUFBQyxFQUFFO2lCQUNWLEVBQUM7b0JBQ0QsS0FBSyxFQUFDLFNBQVM7b0JBQ2YsUUFBUSxFQUFDLENBQUMsT0FBcUIsRUFBRSxFQUFFO3dCQUNsQyxPQUFPLElBQUksdUJBQXVCLENBQUMsT0FBTyxDQUFDLENBQUM7b0JBQzdDLENBQUM7b0JBQ0QsT0FBTyxFQUFDLENBQUMsYUFBYSxFQUFFLGVBQWUsRUFBQyxjQUFjLENBQUM7aUJBQ3ZEO2FBQ0QsQ0FBQTtZQUVELElBQUksVUFBbUMsQ0FBQztZQUN4QyxJQUFJLElBQUksQ0FBQyxpQkFBaUIsSUFBSSxTQUFTLEVBQUM7Z0JBQ3ZDLFVBQVUsR0FBRyxlQUFlLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxzQkFBc0IsQ0FBQTthQUNqRztpQkFBTTtnQkFDTixVQUFVLEdBQUcsZUFBZSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsc0JBQXNCLENBQUE7YUFDbkU7WUFFRCxLQUFLLE1BQU0sUUFBUSxJQUFJLFVBQVUsRUFBQztnQkFDakMsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQTthQUN0QjtZQUVELDRCQUE0QjtZQUM1QixJQUFJLEtBQUssR0FBRyxjQUFjLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzdDLElBQUksS0FBSyxHQUFHLEtBQUssQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDcEMsSUFBSSxVQUFVLEdBQUcsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN0QyxLQUFLLElBQUksRUFBQyxLQUFLLEVBQUUsT0FBTyxFQUFDLElBQUksT0FBTyxFQUFFO2dCQUNyQyxVQUFVLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUMsQ0FBQyxDQUFDO2dCQUMxQyxVQUFVLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFBO2FBQzlCO1lBRUQsa0NBQWtDO1lBQ2xDLElBQUksS0FBSyxHQUFHLEtBQUssQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDcEMsS0FBSyxJQUFJLE1BQU0sSUFBSSxlQUFlLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFBRSxFQUFFO2dCQUN4RCxNQUFNLEVBQUUsR0FBRyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNoQyxLQUFLLElBQUksRUFBQyxRQUFRLEVBQUMsT0FBTyxFQUFDLElBQUksT0FBTyxFQUFDO29CQUN0QyxJQUFJLEVBQUUsR0FBRyxFQUFFLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUMzQixFQUFFLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFBO29CQUN0QixRQUFRLENBQUM7d0JBQ1IsTUFBTSxFQUFFLE1BQU07d0JBQ2QsaUJBQWlCLEVBQUUsQ0FBQyxHQUFTLEVBQUU7NEJBQzdCLE1BQU0sSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLENBQUE7NEJBQ2hDLGVBQWUsQ0FBQyxTQUFTLENBQUMsaUJBQWlCLEVBQUUsQ0FBQSxDQUFDLGtFQUFrRTt3QkFDakgsQ0FBQyxDQUFBLENBQ0Q7d0JBQ0QsUUFBUSxFQUFDLEVBQUU7cUJBQ1gsQ0FBQyxDQUFBO2lCQUNGO2dCQUVELE1BQU0sSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLENBQUE7YUFDaEM7UUFDRixDQUFDO0tBQUE7SUFFTyxnQkFBZ0IsQ0FBQyxNQUF5QjtRQUNqRCxNQUFNLEdBQUcsR0FBRyxlQUFlLENBQUMsVUFBVSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxDQUFBO1FBQy9ELE9BQU87WUFDTixLQUFLLEVBQUUsUUFBUSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDO1lBQ3pDLEdBQUcsRUFBRSxRQUFRLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUM7U0FDckMsQ0FBQTtJQUNGLENBQUM7SUFFWSxTQUFTLENBQUMsTUFBd0IsRUFBRSxDQUFlOztZQUMvRCxNQUFNLEdBQUcsR0FBRyxlQUFlLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUMzRCxNQUFNLGNBQWMsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDO1lBRWxDLElBQUksRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBRW5ELElBQUksQ0FBQyxLQUFLLElBQUksQ0FBQyxHQUFHLEVBQUU7Z0JBQ25CLE9BQU8sQ0FBQyxJQUFJLENBQUMsWUFBWSxNQUFNLDBCQUEwQixDQUFDLENBQUM7Z0JBQzNELE9BQU87YUFDUDtZQUVELE1BQU0sVUFBVSxHQUFHLGNBQWMsSUFBSSxDQUFDO2dCQUNyQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsS0FBSztnQkFDNUIsQ0FBQyxDQUFDLEdBQUcsQ0FBQztZQUNQLElBQUksS0FBSyxDQUFDLFdBQVcsS0FBSyxHQUFHO2dCQUFFLEtBQUssQ0FBQyxXQUFXLEdBQUcsR0FBRyxDQUFDO1lBQ3ZELElBQUksR0FBRyxDQUFDLFdBQVcsS0FBSyxVQUFVO2dCQUFFLEdBQUcsQ0FBQyxXQUFXLEdBQUcsVUFBVSxDQUFDO1lBRWpFLHFDQUFxQztRQUN0QyxDQUFDO0tBQUE7Q0FFRCIsInNvdXJjZXNDb250ZW50IjpbIi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4vLyBJbXBvcnRzXHJcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5pbXBvcnQge1NldHRpbmcsIFNldHRpbmdUYWJ9IGZyb20gXCJvYnNpZGlhblwiO1xyXG5pbXBvcnQge1RhYmxlQ29udGVudFBvcHVsYXRvcn0gZnJvbSBcIi4uLy4uLy4uLy4uLy4uL2NvbnRyYWN0cy9wbHVnaW4vdWkvY29tcG9uZW50cy9UYWJsZUNvbnRlbnRQb3B1bGF0b3JcIjtcclxuaW1wb3J0IHtTZXR0aW5nVGFnUmVjb3JkVGV4dEFyZWFDb21wb25lbnR9IGZyb20gXCIuL1NldHRpbmdUYWdSZWNvcmRUZXh0QXJlYUNvbXBvbmVudFwiO1xyXG5pbXBvcnQge1NldHRpbmdUYWdSZWNvcmRQcmV2aWV3fSBmcm9tIFwiLi9TZXR0aW5nVGFnUmVjb3JkUHJldmlld1wiO1xyXG5pbXBvcnQge1NldHRpbmdUYWdSZWNvcmROYXZpZ2F0b3JzfSBmcm9tIFwiLi9TZXR0aW5nVGFnUmVjb3JkTmF2aWdhdG9yc1wiO1xyXG5pbXBvcnQge1NlcnZpY2VQcm92aWRlcn0gZnJvbSBcIi4uLy4uLy4uLy4uL3NlcnZpY2VzL1NlcnZpY2VQcm92aWRlclwiO1xyXG5pbXBvcnQge1Jvd0RhdGFUeXBlfSBmcm9tIFwiLi4vLi4vLi4vLi4vLi4vY29udHJhY3RzL3BsdWdpbi91aS9jb21wb25lbnRzL1Jvd0RhdGFUeXBlXCI7XHJcbmltcG9ydCB7SUNvbG9yZWRUYWdSZWNvcmR9IGZyb20gXCIuLi8uLi8uLi8uLi8uLi9jb250cmFjdHMvcGx1Z2luL3NldHRpbmdzL0lDb2xvcmVkVGFnUmVjb3JkXCI7XHJcbmltcG9ydCB7Y2FwaXRhbGl6ZUZpcnN0TGV0dGVyfSBmcm9tIFwiLi4vLi4vLi4vLi4vLi4vbGliL1N0cmluZ1V0aWxzXCI7XHJcblxyXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuLy8gQ29kZVxyXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuZXhwb3J0IGNsYXNzIFNldHRpbmdUYWdUYWJsZSB7XHJcblx0cHJpdmF0ZSBwYXJlbnQ6IFNldHRpbmdUYWI7XHJcblxyXG5cdHByaXZhdGUgc2VsZWN0ZWRFeHRlbnNpb246c3RyaW5nIHwgdW5kZWZpbmVkO1xyXG5cdHByaXZhdGUgc2V0dGluZ0VsOiBTZXR0aW5nO1xyXG5cdHByaXZhdGUgc2V0dGluZ0VsQm90dG9tOiBTZXR0aW5nO1xyXG5cdHByaXZhdGUgdGFibGVFbDogSFRNTEVsZW1lbnQ7XHJcblxyXG5cdC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblx0Ly8gQ29uc3RydWN0b3JcclxuXHQvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cdGNvbnN0cnVjdG9yKHBhcmVudDogU2V0dGluZ1RhYikge1xyXG5cdFx0dGhpcy5wYXJlbnQgPSBwYXJlbnQ7XHJcblx0XHR0aGlzLl9Bc3NpZ25FbHMoKVxyXG5cdH1cclxuXHJcblx0Ly8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHQvLyBNZXRob2RzXHJcblx0Ly8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHRwcml2YXRlIF9Bc3NpZ25FbHMoKXtcclxuXHRcdHRoaXMuc2V0dGluZ0VsID0gbmV3IFNldHRpbmcodGhpcy5wYXJlbnQuY29udGFpbmVyRWwpXHJcblx0XHR0aGlzLnRhYmxlRWwgPSB0aGlzLnBhcmVudC5jb250YWluZXJFbC5jcmVhdGVEaXYoKTtcclxuXHRcdHRoaXMuc2V0dGluZ0VsQm90dG9tID0gbmV3IFNldHRpbmcodGhpcy5wYXJlbnQuY29udGFpbmVyRWwpXHJcblx0fVxyXG5cclxuXHRwdWJsaWMgYXN5bmMgZGlzcGxheSgpIDogUHJvbWlzZTx2b2lkPiB7XHJcblx0XHRpZiAodGhpcy5zZXR0aW5nRWwgPT0gdW5kZWZpbmVkICYmIHRoaXMudGFibGVFbCAhPT0gdW5kZWZpbmVkKSB7XHJcblx0XHRcdHRoaXMuX0Fzc2lnbkVscygpXHJcblx0XHR9XHJcblxyXG5cdFx0YXdhaXQgdGhpcy5fRGlzcGxheUV4dGVuc2lvblNlbGVjdG9yKCk7XHJcblx0XHRhd2FpdCB0aGlzLl9EaXNwbGF5VGFibGUoKVxyXG5cclxuXHRcdGF3YWl0IHRoaXMuYWRkTmV3QnV0dG9uKHRoaXMuc2V0dGluZ0VsQm90dG9tKVxyXG5cclxuXHR9XHJcblxyXG5cdHB1YmxpYyBhc3luYyByZWRyYXdUYWJsZSgpe1xyXG5cdFx0dGhpcy50YWJsZUVsLmVtcHR5KClcclxuXHRcdGF3YWl0IHRoaXMuX0Rpc3BsYXlUYWJsZSgpXHJcblx0fVxyXG5cclxuXHQvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cdC8vIENvbnN0cnVjdG9yXHJcblx0Ly8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHRwcml2YXRlIGFzeW5jIF9EaXNwbGF5RXh0ZW5zaW9uU2VsZWN0b3IoKSA6IFByb21pc2U8dm9pZD4ge1xyXG5cdFx0Y29uc3QgZWxlbWVudCA9IHRoaXMuc2V0dGluZ0VsXHJcblx0XHRcdC5zZXROYW1lKFwiQ3VzdG9tIGNvbG9yIHRhZ3NcIilcclxuXHRcdFx0LnNldERlc2MoYERlZmluZSBjdXN0b20gY29sb3JzIGZvciB0YWdzLiBTZWxlY3Qgd2hpY2ggZXh0ZW5zaW9uIHRvIGVkaXQsIGRlcGVuZGFudCBvbiB0aGUgYClcclxuXHRcdFx0LmFkZERyb3Bkb3duKGNvbXBvbmVudCA9PiB7Y29tcG9uZW50XHJcblx0XHRcdFx0LmFkZE9wdGlvbnMoXHJcblx0XHRcdFx0XHRTZXJ2aWNlUHJvdmlkZXIuZXh0ZW5zaW9ucy5FbmFibGVkTGlzdFxyXG5cdFx0XHRcdFx0XHQubWFwKGV4dGVuc2lvbiA9PiBleHRlbnNpb24uZXh0ZW5zaW9uTmFtZSlcclxuXHRcdFx0XHRcdFx0LnJlZHVjZShcclxuXHRcdFx0XHRcdFx0XHQoYWNjLCBrZXkpID0+IChcclxuXHRcdFx0XHRcdFx0XHRcdHsuLi5hY2MsIFtrZXldOiBjYXBpdGFsaXplRmlyc3RMZXR0ZXIoa2V5KX1cclxuXHRcdFx0XHRcdFx0XHQpLCB7fVxyXG5cdFx0XHRcdFx0XHQpXHJcblx0XHRcdFx0KVxyXG5cdFx0XHRcdC5vbkNoYW5nZShhc3luYyAodmFsdWUpID0+IHtcclxuXHRcdFx0XHRcdC8vIFVQREFURSBUSEUgVEFCTEVcclxuXHRcdFx0XHRcdHRoaXMuc2VsZWN0ZWRFeHRlbnNpb24gPSB2YWx1ZTtcclxuXHRcdFx0XHRcdGF3YWl0IHRoaXMucmVkcmF3VGFibGUoKVxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdH0pXHJcblx0XHQ7XHJcblx0XHRhd2FpdCB0aGlzLmFkZE5ld0J1dHRvbihlbGVtZW50KSAvLyBhZGQgYSBib3R0b20gYnV0dG9uLCBmb3IgbmF2aWdhdGlvblxyXG5cdH1cclxuXHJcblx0cHJpdmF0ZSBhc3luYyBhZGROZXdCdXR0b24oc2V0dGluZ0VsIDogU2V0dGluZyl7XHJcblx0XHRzZXR0aW5nRWwuYWRkQnV0dG9uKGNvbXBvbmVudCA9PiB7Y29tcG9uZW50XHJcblx0XHRcdC5zZXRDbGFzcyhcIm1vZC1jdGFcIilcclxuXHRcdFx0LnNldEJ1dHRvblRleHQoXCJOZXcgVGFnXCIpXHJcblx0XHRcdC5vbkNsaWNrKGFzeW5jICgpID0+IHtcclxuXHRcdFx0XHRhd2FpdCBTZXJ2aWNlUHJvdmlkZXIudGFnUmVjb3Jkcy5jcmVhdGVOZXdEZWZhdWx0VGFnKClcclxuXHRcdFx0XHRhd2FpdCB0aGlzLnJlZHJhd1RhYmxlKClcclxuXHRcdFx0fSlcclxuXHRcdH0pXHJcblxyXG5cdH1cclxuXHJcblx0cHJpdmF0ZSBhc3luYyBfRGlzcGxheVRhYmxlKCkgOiBQcm9taXNlPHZvaWQ+IHtcclxuXHRcdGxldCBzY3JvbGxBcmVhQ29udGFpbmVyID0gdGhpcy50YWJsZUVsLmNyZWF0ZURpdigpO1xyXG5cdFx0c2Nyb2xsQXJlYUNvbnRhaW5lci5hZGRDbGFzcyhcInNjcm9sbC1hcmVhLWNvbnRhaW5lclwiKTtcclxuXHJcblx0XHRsZXQgdGFibGVDb250YWluZXIgPSBzY3JvbGxBcmVhQ29udGFpbmVyLmNyZWF0ZURpdigpO1xyXG5cdFx0dGFibGVDb250YWluZXIuYWRkQ2xhc3MoXCJzY3JvbGwtY29udGFpbmVyXCIpO1xyXG5cclxuXHRcdGxldCBvdmVybGF5R3JhZGllbnQgPSBzY3JvbGxBcmVhQ29udGFpbmVyLmNyZWF0ZURpdigpO1xyXG5cdFx0b3ZlcmxheUdyYWRpZW50LmFkZENsYXNzKFwib3ZlcmxheS1ncmFkaWVudFwiKTtcclxuXHJcblx0XHQvLyBBc3NpZ24gVGFibGUgY29sdW1ucyBhbmQgY2FsbGJhY2tzIGZvciBwb3B1bGF0aW9uXHJcblx0XHQvLyBcdFx0VGhpcyBpcyB0aGUgZGVmYXVsdCB3aGljaCBzaG91bGQgYmUgc2hvd24gb24gZXZlcnkgdGFiIVxyXG5cdFx0Y29uc3QgY29udGVudDogVGFibGVDb250ZW50UG9wdWxhdG9yW10gPSBbXHJcblx0XHRcdHtcclxuXHRcdFx0XHR0aXRsZTpcIlwiLFxyXG5cdFx0XHRcdGNhbGxiYWNrIDogKHJvd0RhdGEgOiBSb3dEYXRhVHlwZSkgPT4ge1xyXG5cdFx0XHRcdFx0cmV0dXJuIG5ldyBTZXR0aW5nVGFnUmVjb3JkTmF2aWdhdG9ycyhyb3dEYXRhLFxyXG5cdFx0XHRcdFx0XHR0cnVlLCBhc3luYyAoKSA9PiBhd2FpdCB0aGlzLnJlZHJhd1RhYmxlKCkpXHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHRjbGFzc2VzOltdXHJcblx0XHRcdH0se1xyXG5cdFx0XHRcdHRpdGxlOlwiVGFnXCIsXHJcblx0XHRcdFx0Y2FsbGJhY2s6IChyb3dEYXRhIDogUm93RGF0YVR5cGUpID0+IHtcclxuXHRcdFx0XHRcdHJldHVybiBuZXcgU2V0dGluZ1RhZ1JlY29yZFRleHRBcmVhQ29tcG9uZW50KHJvd0RhdGEsXHJcblx0XHRcdFx0XHRcdFwiY29yZV90YWdUZXh0XCIpO1xyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0Y2xhc3NlczpbXVxyXG5cdFx0XHR9LHtcclxuXHRcdFx0XHR0aXRsZTpcIlByZXZpZXdcIixcclxuXHRcdFx0XHRjYWxsYmFjazoocm93RGF0YSA6IFJvd0RhdGFUeXBlKSA9PiB7XHJcblx0XHRcdFx0XHRyZXR1cm4gbmV3IFNldHRpbmdUYWdSZWNvcmRQcmV2aWV3KHJvd0RhdGEpO1xyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0Y2xhc3NlczpbXCJ0YWctcHJldmlld1wiLCBcInN0aWNreS1jb2x1bW5cIixcImJvcmRlci1yaWdodFwiXVxyXG5cdFx0XHR9XHJcblx0XHRdXHJcblxyXG5cdFx0bGV0IHBvcHVsYXRvcnM6IFRhYmxlQ29udGVudFBvcHVsYXRvcltdO1xyXG5cdFx0aWYgKHRoaXMuc2VsZWN0ZWRFeHRlbnNpb24gIT0gdW5kZWZpbmVkKXtcclxuXHRcdFx0cG9wdWxhdG9ycyA9IFNlcnZpY2VQcm92aWRlci5leHRlbnNpb25zLkRpY3Rpb25hcnlbdGhpcy5zZWxlY3RlZEV4dGVuc2lvbl0uVGFibGVDb250ZW50UG9wdWxhdG9yc1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0cG9wdWxhdG9ycyA9IFNlcnZpY2VQcm92aWRlci5leHRlbnNpb25zLkNvcmUuVGFibGVDb250ZW50UG9wdWxhdG9yc1xyXG5cdFx0fVxyXG5cdFx0XHJcblx0XHRmb3IgKGNvbnN0IGNhbGxiYWNrIG9mIHBvcHVsYXRvcnMpe1xyXG5cdFx0XHRjb250ZW50LnB1c2goY2FsbGJhY2spXHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gQWN0dWFsbHkgY3JlYXRlIHRoZSB0YWJsZVxyXG5cdFx0bGV0IHRhYmxlID0gdGFibGVDb250YWluZXIuY3JlYXRlRWwoJ3RhYmxlJyk7XHJcblx0XHRsZXQgdGhlYWQgPSB0YWJsZS5jcmVhdGVFbCgndGhlYWQnKTtcclxuXHRcdGxldCBoZWFkZXJzUm93ID0gdGhlYWQuY3JlYXRlRWwoJ3RyJyk7XHJcblx0XHRmb3IgKGxldCB7dGl0bGUsIGNsYXNzZXN9IG9mIGNvbnRlbnQpIHtcclxuXHRcdFx0aGVhZGVyc1Jvdy5jcmVhdGVFbCgndGgnLCB7IHRleHQ6IHRpdGxlfSk7XHJcblx0XHRcdGhlYWRlcnNSb3cuYWRkQ2xhc3NlcyhjbGFzc2VzKVxyXG5cdFx0fVxyXG5cclxuXHRcdC8vIFBvcHVsYXRlIHRhYmxlIHdpdGggcmVjb3JkIHJvd3NcclxuXHRcdGxldCB0Ym9keSA9IHRhYmxlLmNyZWF0ZUVsKCd0Ym9keScpO1xyXG5cdFx0Zm9yIChsZXQgcmVjb3JkIG9mIFNlcnZpY2VQcm92aWRlci50YWdSZWNvcmRzLmdldFRhZ3MoKSkge1xyXG5cdFx0XHRjb25zdCB0ciA9IHRib2R5LmNyZWF0ZUVsKCd0cicpO1xyXG5cdFx0XHRmb3IgKGxldCB7Y2FsbGJhY2ssY2xhc3Nlc30gb2YgY29udGVudCl7XHJcblx0XHRcdFx0bGV0IHRkID0gdHIuY3JlYXRlRWwoJ3RkJyk7XHJcblx0XHRcdFx0dGQuYWRkQ2xhc3NlcyhjbGFzc2VzKVxyXG5cdFx0XHRcdGNhbGxiYWNrKHtcclxuXHRcdFx0XHRcdHJlY29yZDogcmVjb3JkLFxyXG5cdFx0XHRcdFx0cm93VXBkYXRlQ2FsbGJhY2s6IChhc3luYyAoKSA9PiB7XHJcblx0XHRcdFx0XHRcdFx0YXdhaXQgdGhpcy5VcGRhdGVSb3cocmVjb3JkLCB0cilcclxuXHRcdFx0XHRcdFx0XHRTZXJ2aWNlUHJvdmlkZXIuY3NzU3R5bGVyLnByb2Nlc3NFeHRlbnNpb25zKCkgLy8gVGhpcyBpcyBzbyB3ZSBjYW4gdXBkYXRlIGFsbCB0aGUgc3R5bGluZyB3aGVuIHNvbWV0aGluZyBjaGFuZ2VzXHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdCksXHJcblx0XHRcdFx0XHRwYXJlbnRFbDp0ZFxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGF3YWl0IHRoaXMuVXBkYXRlUm93KHJlY29yZCwgdHIpXHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRwcml2YXRlIGdldFRhZ1ByZXZpZXdFbHMocmVjb3JkOiBJQ29sb3JlZFRhZ1JlY29yZCk6IHtiZWdpbjpIVE1MRWxlbWVudCB8IG51bGwsIGVuZDogSFRNTEVsZW1lbnQgfCBudWxsfSB7XHJcblx0XHRjb25zdCBpZHMgPSBTZXJ2aWNlUHJvdmlkZXIudGFnUmVjb3Jkcy5nZXRUYWdQcmV2aWV3SWRzKHJlY29yZClcclxuXHRcdHJldHVybiB7XHJcblx0XHRcdGJlZ2luOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZHMuYmVnaW4pLFxyXG5cdFx0XHRlbmQ6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkcy5lbmQpXHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgYXN5bmMgVXBkYXRlUm93KHJlY29yZDpJQ29sb3JlZFRhZ1JlY29yZCwgXyA6IEhUTUxFbGVtZW50KTogUHJvbWlzZTx2b2lkPntcclxuXHRcdGNvbnN0IHRhZyA9IFNlcnZpY2VQcm92aWRlci50YWdSZWNvcmRzLmdldEZpcnN0VGFnKHJlY29yZCk7XHJcblx0XHRjb25zdCBvcmlnaW5hbExlbmd0aCA9IHRhZy5sZW5ndGg7XHJcblxyXG5cdFx0bGV0IHsgYmVnaW4sIGVuZCB9ID0gdGhpcy5nZXRUYWdQcmV2aWV3RWxzKHJlY29yZCk7XHJcblxyXG5cdFx0aWYgKCFiZWdpbiB8fCAhZW5kKSB7XHJcblx0XHRcdGNvbnNvbGUud2FybihgVGhlIHRhZyBcIiR7cmVjb3JkfVwiIEJFR0lOIG9yIEVORCBpcyBlbXB0eS5gKTtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdGNvbnN0IGRpc3BsYXlUYWcgPSBvcmlnaW5hbExlbmd0aCA+PSA5XHJcblx0XHRcdD8gYCR7dGFnLnN1YnN0cmluZygwLDgpfS4uLmBcclxuXHRcdFx0OiB0YWc7XHJcblx0XHRpZiAoYmVnaW4udGV4dENvbnRlbnQgIT09IFwiI1wiKSBiZWdpbi50ZXh0Q29udGVudCA9IFwiI1wiO1xyXG5cdFx0aWYgKGVuZC50ZXh0Q29udGVudCAhPT0gZGlzcGxheVRhZykgZW5kLnRleHRDb250ZW50ID0gZGlzcGxheVRhZztcclxuXHJcblx0XHQvLyBTdHlsaW5nIHByb3ZpZGVkIGJ5IHJlY29yZCB1cGRhdGVyXHJcblx0fVxyXG5cclxufVxyXG4iXX0=