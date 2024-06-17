import { CoreExtension } from "../../extensions/core/CoreExtension";
import { BoldifyExtension } from "../../extensions/styling/BoldifyExtension";
// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export class ExtensionsService {
    // -----------------------------------------------------------------------------------------------------------------
    // Constructors
    // -----------------------------------------------------------------------------------------------------------------
    constructor(settings) {
        this._settings = settings;
        this.Core = new CoreExtension();
        this.Boldify = new BoldifyExtension();
    }
    get FullList() {
        var _a;
        return (_a = this._List) !== null && _a !== void 0 ? _a : (this._List = this.AsList());
    }
    get EnabledList() {
        var _a;
        console.warn(this._settings.data.EnabledExtensions);
        return (_a = this._EnabledList) !== null && _a !== void 0 ? _a : this.FullList
            .filter(e => this._settings.data.EnabledExtensions.contains(e.extensionName));
    }
    get Dictionary() {
        var _a;
        return (_a = this._Dictionary) !== null && _a !== void 0 ? _a : (this._Dictionary = this.AsDictionary());
    }
    // -----------------------------------------------------------------------------------------------------------------
    // Methods
    // -----------------------------------------------------------------------------------------------------------------
    AsList() {
        return [
            this.Core,
            this.Boldify,
        ];
    }
    AsDictionary() {
        return this.AsList().reduce((acc, e) => {
            acc[e.extensionName] = e;
            return acc;
        }, {});
    }
    setExtension(extension, value) {
        if (value) {
            this._settings.data.EnabledExtensions.push(extension.extensionName);
        }
        else {
            if (this._settings.data.EnabledExtensions.contains(extension.extensionName)) {
                this._settings.data.EnabledExtensions.remove(extension.extensionName);
            }
        }
        this._EnabledList = undefined; // Invalidate it
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRXh0ZW5zaW9uc1NlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJFeHRlbnNpb25zU2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFLQSxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0scUNBQXFDLENBQUM7QUFDbEUsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sMkNBQTJDLENBQUM7QUFHM0Usd0hBQXdIO0FBQ3hILE9BQU87QUFDUCx3SEFBd0g7QUFDeEgsTUFBTSxPQUFPLGlCQUFpQjtJQStCN0Isb0hBQW9IO0lBQ3BILGVBQWU7SUFDZixvSEFBb0g7SUFDcEgsWUFBWSxRQUF5QjtRQUNwQyxJQUFJLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQztRQUMxQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksYUFBYSxFQUFFLENBQUM7UUFDaEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLGdCQUFnQixFQUFFLENBQUM7SUFDdkMsQ0FBQztJQTFCRCxJQUFXLFFBQVE7O1FBQ2xCLGFBQU8sSUFBSSxDQUFDLEtBQUssb0NBQVYsSUFBSSxDQUFDLEtBQUssR0FBSyxJQUFJLENBQUMsTUFBTSxFQUFFLEVBQUM7SUFDckMsQ0FBQztJQUdELElBQVcsV0FBVzs7UUFFckIsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFBO1FBRW5ELE9BQU8sTUFBQSxJQUFJLENBQUMsWUFBWSxtQ0FBSSxJQUFJLENBQUMsUUFBUTthQUN2QyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7SUFDaEYsQ0FBQztJQUlELElBQVcsVUFBVTs7UUFDcEIsYUFBTyxJQUFJLENBQUMsV0FBVyxvQ0FBaEIsSUFBSSxDQUFDLFdBQVcsR0FBSyxJQUFJLENBQUMsWUFBWSxFQUFFLEVBQUM7SUFDakQsQ0FBQztJQVdELG9IQUFvSDtJQUNwSCxVQUFVO0lBQ1Ysb0hBQW9IO0lBQzVHLE1BQU07UUFBbUIsT0FBTTtZQUN0QyxJQUFJLENBQUMsSUFBSTtZQUNULElBQUksQ0FBQyxPQUFPO1NBQ1osQ0FBQTtJQUFBLENBQUM7SUFFTSxZQUFZO1FBQ25CLE9BQU8sSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLE1BQU0sQ0FDMUIsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDVixHQUFHLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUN6QixPQUFPLEdBQUcsQ0FBQztRQUNaLENBQUMsRUFDRCxFQUErQixDQUMvQixDQUFDO0lBQ0gsQ0FBQztJQUVNLFlBQVksQ0FBQyxTQUFxQixFQUFFLEtBQWE7UUFDdkQsSUFBSSxLQUFLLEVBQUM7WUFDVCxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxDQUFBO1NBQ25FO2FBQU07WUFDTixJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLEVBQUU7Z0JBQzVFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLENBQUE7YUFDckU7U0FDRDtRQUNELElBQUksQ0FBQyxZQUFZLEdBQUcsU0FBUyxDQUFBLENBQUMsZ0JBQWdCO0lBQy9DLENBQUM7Q0FDRCIsInNvdXJjZXNDb250ZW50IjpbIi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4vLyBJbXBvcnRzXHJcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5pbXBvcnQge0lFeHRlbnNpb25zU2VydmljZX0gZnJvbSBcIi4uLy4uLy4uL2NvbnRyYWN0cy9wbHVnaW4vc2VydmljZXMvZXh0ZW5zaW9ucy9JRXh0ZW5zaW9uc1NlcnZpY2VcIjtcclxuaW1wb3J0IHtJRXh0ZW5zaW9ufSBmcm9tIFwiLi4vLi4vLi4vY29udHJhY3RzL3BsdWdpbi9leHRlbnNpb25zL0lFeHRlbnNpb25cIjtcclxuaW1wb3J0IHtDb3JlRXh0ZW5zaW9ufSBmcm9tIFwiLi4vLi4vZXh0ZW5zaW9ucy9jb3JlL0NvcmVFeHRlbnNpb25cIjtcclxuaW1wb3J0IHtCb2xkaWZ5RXh0ZW5zaW9ufSBmcm9tIFwiLi4vLi4vZXh0ZW5zaW9ucy9zdHlsaW5nL0JvbGRpZnlFeHRlbnNpb25cIjtcclxuaW1wb3J0IHtJU2V0dGluZ3NTZXJ2aWNlfSBmcm9tIFwiLi4vLi4vLi4vY29udHJhY3RzL3BsdWdpbi9zZXJ2aWNlcy9zZXR0aW5ncy9JU2V0dGluZ3NTZXJ2aWNlXCI7XHJcblxyXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuLy8gQ29kZVxyXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuZXhwb3J0IGNsYXNzIEV4dGVuc2lvbnNTZXJ2aWNlIGltcGxlbWVudHMgSUV4dGVuc2lvbnNTZXJ2aWNlIHtcclxuXHRwdWJsaWMgcmVhZG9ubHkgQ29yZTogSUV4dGVuc2lvblxyXG5cdHB1YmxpYyByZWFkb25seSBCb2xkaWZ5OiBJRXh0ZW5zaW9uXHJcblxyXG5cdC8vIEV4dGVuc2lvbnMgSWRlYXNcclxuXHQvL1x0XHQtIFN3aXRjaCBiZXR3ZWVuIExpZ2h0ICYgZGFyayBtb2RlXHJcblx0Ly9cdFx0LSBTdHlsZSBtYWtldXAsIGJvbGQgLyBpdGFsaWMgLyBzaXplIC8gLi4uXHJcblx0Ly9cdFx0LVxyXG5cclxuXHRwcml2YXRlIF9zZXR0aW5nczogSVNldHRpbmdzU2VydmljZTtcclxuXHJcblx0cHJpdmF0ZSBfTGlzdCA6IElFeHRlbnNpb25bXSB8IHVuZGVmaW5lZDtcclxuXHRwdWJsaWMgZ2V0IEZ1bGxMaXN0KCk6IElFeHRlbnNpb25bXSB7XHJcblx0XHRyZXR1cm4gdGhpcy5fTGlzdCA/Pz0gdGhpcy5Bc0xpc3QoKTtcclxuXHR9XHJcblxyXG5cdHByaXZhdGUgX0VuYWJsZWRMaXN0OiBJRXh0ZW5zaW9uW10gfCB1bmRlZmluZWQ7XHJcblx0cHVibGljIGdldCBFbmFibGVkTGlzdCgpOiBJRXh0ZW5zaW9uW10ge1xyXG5cclxuXHRcdGNvbnNvbGUud2Fybih0aGlzLl9zZXR0aW5ncy5kYXRhLkVuYWJsZWRFeHRlbnNpb25zKVxyXG5cclxuXHRcdHJldHVybiB0aGlzLl9FbmFibGVkTGlzdCA/PyB0aGlzLkZ1bGxMaXN0XHJcblx0XHRcdC5maWx0ZXIoZSA9PiB0aGlzLl9zZXR0aW5ncy5kYXRhLkVuYWJsZWRFeHRlbnNpb25zLmNvbnRhaW5zKGUuZXh0ZW5zaW9uTmFtZSkpO1xyXG5cdH1cclxuXHJcblxyXG5cdHByaXZhdGUgX0RpY3Rpb25hcnkgOiBSZWNvcmQ8c3RyaW5nLCBJRXh0ZW5zaW9uPiB8IHVuZGVmaW5lZDtcclxuXHRwdWJsaWMgZ2V0IERpY3Rpb25hcnkoKTogUmVjb3JkPHN0cmluZywgSUV4dGVuc2lvbj4ge1xyXG5cdFx0cmV0dXJuIHRoaXMuX0RpY3Rpb25hcnkgPz89IHRoaXMuQXNEaWN0aW9uYXJ5KCk7XHJcblx0fVxyXG5cclxuXHQvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cdC8vIENvbnN0cnVjdG9yc1xyXG5cdC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblx0Y29uc3RydWN0b3Ioc2V0dGluZ3M6SVNldHRpbmdzU2VydmljZSApIHtcclxuXHRcdHRoaXMuX3NldHRpbmdzID0gc2V0dGluZ3M7XHJcblx0XHR0aGlzLkNvcmUgPSBuZXcgQ29yZUV4dGVuc2lvbigpO1xyXG5cdFx0dGhpcy5Cb2xkaWZ5ID0gbmV3IEJvbGRpZnlFeHRlbnNpb24oKTtcclxuXHR9XHJcblxyXG5cdC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblx0Ly8gTWV0aG9kc1xyXG5cdC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblx0cHJpdmF0ZSBBc0xpc3QoKSA6IElFeHRlbnNpb25bXSB7cmV0dXJuW1xyXG5cdFx0dGhpcy5Db3JlLFxyXG5cdFx0dGhpcy5Cb2xkaWZ5LFxyXG5cdF19XHJcblxyXG5cdHByaXZhdGUgQXNEaWN0aW9uYXJ5KCkgOiBSZWNvcmQ8c3RyaW5nLCBJRXh0ZW5zaW9uPiB7XHJcblx0XHRyZXR1cm4gdGhpcy5Bc0xpc3QoKS5yZWR1Y2UoXHJcblx0XHRcdChhY2MsIGUpID0+IHtcclxuXHRcdFx0XHRhY2NbZS5leHRlbnNpb25OYW1lXSA9IGU7XHJcblx0XHRcdFx0cmV0dXJuIGFjYztcclxuXHRcdFx0fSxcclxuXHRcdFx0e30gYXMgUmVjb3JkPHN0cmluZyxJRXh0ZW5zaW9uPlxyXG5cdFx0KTtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBzZXRFeHRlbnNpb24oZXh0ZW5zaW9uOiBJRXh0ZW5zaW9uLCB2YWx1ZTpib29sZWFuKTogdm9pZCB7XHJcblx0XHRpZiAodmFsdWUpe1xyXG5cdFx0XHR0aGlzLl9zZXR0aW5ncy5kYXRhLkVuYWJsZWRFeHRlbnNpb25zLnB1c2goZXh0ZW5zaW9uLmV4dGVuc2lvbk5hbWUpXHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRpZiAodGhpcy5fc2V0dGluZ3MuZGF0YS5FbmFibGVkRXh0ZW5zaW9ucy5jb250YWlucyhleHRlbnNpb24uZXh0ZW5zaW9uTmFtZSkpIHtcclxuXHRcdFx0XHR0aGlzLl9zZXR0aW5ncy5kYXRhLkVuYWJsZWRFeHRlbnNpb25zLnJlbW92ZShleHRlbnNpb24uZXh0ZW5zaW9uTmFtZSlcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0dGhpcy5fRW5hYmxlZExpc3QgPSB1bmRlZmluZWQgLy8gSW52YWxpZGF0ZSBpdFxyXG5cdH1cclxufVxyXG4iXX0=