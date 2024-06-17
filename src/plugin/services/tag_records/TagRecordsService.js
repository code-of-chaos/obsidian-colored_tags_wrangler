import { __awaiter } from "tslib";
import { reSLASH, reSplit } from "../../../lib/RegexUtils";
import { ServiceProvider } from "../ServiceProvider";
// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export class TagRecordsService {
    // -----------------------------------------------------------------------------------------------------------------
    // Constructors
    // -----------------------------------------------------------------------------------------------------------------
    constructor(settings, extensions) {
        this._flatCache = null;
        this._settings = settings;
        this._extensions = extensions;
    }
    get _tagRecords() { return this._settings.data.TagColors; }
    // -----------------------------------------------------------------------------------------------------------------
    // Methods
    // -----------------------------------------------------------------------------------------------------------------
    getTagsFlat(remove_slash = true) {
        var _a;
        return (_a = this._flatCache) !== null && _a !== void 0 ? _a : (this._flatCache = this._tagRecords
            .flatMap((record) => {
            return record.core_tagText // read the last line if you are confused why we are looping over the tag_name
                .split(reSplit)
                .map(tag => tag.trim().toLowerCase()) // Also trim the tag for leading spaces & map everything to lowercase!
                .filter(Boolean) // filter out empty lines
                .map(tag => remove_slash ? tag.replace(reSLASH, "") : tag) // replace the "/"
                .map(tag => (Object.assign(Object.assign({}, record), { core_tagText: tag })));
        }));
    }
    getTags() {
        return this._tagRecords;
    }
    getTagCount() {
        return this._tagRecords.length;
    }
    addOrUpdateTag(record) {
        return __awaiter(this, void 0, void 0, function* () {
            const index = this.getTagIndex(record);
            if (index !== -1) {
                this._tagRecords[index] = record;
            }
            else {
                this._tagRecords.push(record);
            }
            yield this._settings.debounceSaveToFile.run();
            this._flatCache = null; // invalidate the cache
        });
    }
    removeTag(record) {
        return __awaiter(this, void 0, void 0, function* () {
            this._tagRecords.remove(record);
            yield this._settings.debounceSaveToFile.run();
            this._flatCache = null; // invalidate the cache
        });
    }
    getTagIndex(record) {
        return this._tagRecords.findIndex((r) => r.core_id === record.core_id);
    }
    getFirstTag(record) {
        var _a;
        return (_a = record.core_tagText.split(reSplit).first()) !== null && _a !== void 0 ? _a : "UNDEFINED";
    }
    getTagPreviewIds(record) {
        return {
            begin: `tag-preview-being-${record.core_id}`,
            end: `tag-preview-end-${record.core_id}`
        };
    }
    getDefaultRecord() {
        return this._extensions.FullList.reduce((acc, cur) => (Object.assign(Object.assign({}, acc), cur.getDefaultRecord())), {});
    }
    createNewDefaultTag() {
        return __awaiter(this, void 0, void 0, function* () {
            const newRecord = this.getDefaultRecord();
            // Ensure _flatCache is populated
            if (this._flatCache === null) {
                this.getTagsFlat();
            }
            // Check for duplicate names
            //		The way we are doing this is by getting all the records which already start with the default tagText
            //		The count of this +1 is the new suffix for the new record
            const defaultPresent = this._flatCache
                .filter(record => record.core_tagText.startsWith(newRecord.core_tagText))
                .length;
            newRecord.core_tagText += `-${defaultPresent}`;
            yield this.addOrUpdateTag(newRecord);
            ServiceProvider.cssStyler.processExtensions(); // Update to using the new tag
        });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGFnUmVjb3Jkc1NlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJUYWdSZWNvcmRzU2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBTUEsT0FBTyxFQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUMsTUFBTSx5QkFBeUIsQ0FBQztBQUV6RCxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sb0JBQW9CLENBQUM7QUFHbkQsd0hBQXdIO0FBQ3hILE9BQU87QUFDUCx3SEFBd0g7QUFDeEgsTUFBTSxPQUFPLGlCQUFpQjtJQU83QixvSEFBb0g7SUFDcEgsZUFBZTtJQUNmLG9IQUFvSDtJQUNwSCxZQUFZLFFBQTBCLEVBQUUsVUFBOEI7UUFMOUQsZUFBVSxHQUFnQyxJQUFJLENBQUM7UUFNdEQsSUFBSSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUM7UUFDMUIsSUFBSSxDQUFDLFdBQVcsR0FBRyxVQUFVLENBQUM7SUFDL0IsQ0FBQztJQVZELElBQVksV0FBVyxLQUF5QixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFBLENBQUM7SUFZdEYsb0hBQW9IO0lBQ3BILFVBQVU7SUFDVixvSEFBb0g7SUFDbkgsV0FBVyxDQUFDLGVBQXlCLElBQUk7O1FBQ3pDLGFBQU8sSUFBSSxDQUFDLFVBQVUsb0NBQWYsSUFBSSxDQUFDLFVBQVUsR0FBSyxJQUFJLENBQUMsV0FBVzthQUN6QyxPQUFPLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRTtZQUNuQixPQUFPLE1BQU0sQ0FBQyxZQUFZLENBQUMsOEVBQThFO2lCQUN2RyxLQUFLLENBQUMsT0FBTyxDQUFDO2lCQUNkLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFFLHNFQUFzRTtpQkFDNUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLHlCQUF5QjtpQkFDekMsR0FBRyxDQUFDLEdB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TSxDQUFDO1lBRVQsU0FBUyxDQUFDLFlBQVksSUFBSSxJQUFJLGNBQWMsRUFBRSxDQUFDO1lBRS9DLE1BQU0sSUFBSSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsQ0FBQTtZQUNwQyxlQUFlLENBQUMsU0FBUyxDQUFDLGlCQUFpQixFQUFFLENBQUEsQ0FBQyw4QkFBOEI7UUFDN0UsQ0FBQztLQUFBO0NBRUQiLCJzb3VyY2VzQ29udGVudCI6WyIvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuLy8gSW1wb3J0c1xyXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuaW1wb3J0IHtJVGFnUmVjb3Jkc1NlcnZpY2V9IGZyb20gXCIuLi8uLi8uLi9jb250cmFjdHMvcGx1Z2luL3NlcnZpY2VzL3RhZ19yZWNvcmRzL0lUYWdSZWNvcmRzU2VydmljZVwiO1xyXG5pbXBvcnQge0lTZXR0aW5nc1NlcnZpY2V9IGZyb20gXCIuLi8uLi8uLi9jb250cmFjdHMvcGx1Z2luL3NlcnZpY2VzL3NldHRpbmdzL0lTZXR0aW5nc1NlcnZpY2VcIjtcclxuaW1wb3J0IHtJQ29sb3JlZFRhZ1JlY29yZH0gZnJvbSBcIi4uLy4uLy4uL2NvbnRyYWN0cy9wbHVnaW4vc2V0dGluZ3MvSUNvbG9yZWRUYWdSZWNvcmRcIjtcclxuaW1wb3J0IHtyZVNMQVNILCByZVNwbGl0fSBmcm9tIFwiLi4vLi4vLi4vbGliL1JlZ2V4VXRpbHNcIjtcclxuaW1wb3J0IHtJRXh0ZW5zaW9uc1NlcnZpY2V9IGZyb20gXCIuLi8uLi8uLi9jb250cmFjdHMvcGx1Z2luL3NlcnZpY2VzL2V4dGVuc2lvbnMvSUV4dGVuc2lvbnNTZXJ2aWNlXCI7XHJcbmltcG9ydCB7U2VydmljZVByb3ZpZGVyfSBmcm9tIFwiLi4vU2VydmljZVByb3ZpZGVyXCI7XHJcbmltcG9ydCB7SUV4dGVuc2lvbn0gZnJvbSBcIi4uLy4uLy4uL2NvbnRyYWN0cy9wbHVnaW4vZXh0ZW5zaW9ucy9JRXh0ZW5zaW9uXCI7XHJcblxyXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuLy8gQ29kZVxyXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuZXhwb3J0IGNsYXNzIFRhZ1JlY29yZHNTZXJ2aWNlIGltcGxlbWVudHMgSVRhZ1JlY29yZHNTZXJ2aWNlIHtcclxuXHRwcml2YXRlIF9zZXR0aW5nczogSVNldHRpbmdzU2VydmljZTtcclxuXHRwcml2YXRlIF9leHRlbnNpb25zOiBJRXh0ZW5zaW9uc1NlcnZpY2U7XHJcblx0cHJpdmF0ZSBnZXQgX3RhZ1JlY29yZHMoKTogSUNvbG9yZWRUYWdSZWNvcmRbXSB7cmV0dXJuIHRoaXMuX3NldHRpbmdzLmRhdGEuVGFnQ29sb3JzO31cclxuXHJcblx0cHJpdmF0ZSBfZmxhdENhY2hlIDogSUNvbG9yZWRUYWdSZWNvcmRbXSB8IG51bGwgPSBudWxsO1xyXG5cclxuXHQvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cdC8vIENvbnN0cnVjdG9yc1xyXG5cdC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblx0Y29uc3RydWN0b3Ioc2V0dGluZ3M6IElTZXR0aW5nc1NlcnZpY2UsIGV4dGVuc2lvbnM6IElFeHRlbnNpb25zU2VydmljZSkge1xyXG5cdFx0dGhpcy5fc2V0dGluZ3MgPSBzZXR0aW5ncztcclxuXHRcdHRoaXMuX2V4dGVuc2lvbnMgPSBleHRlbnNpb25zO1xyXG5cdH1cclxuXHJcblx0Ly8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHQvLyBNZXRob2RzXHJcblx0Ly8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHRcdGdldFRhZ3NGbGF0KHJlbW92ZV9zbGFzaCA6IGJvb2xlYW4gPSB0cnVlKTpJQ29sb3JlZFRhZ1JlY29yZFtdIHtcclxuXHRcdHJldHVybiB0aGlzLl9mbGF0Q2FjaGUgPz89IHRoaXMuX3RhZ1JlY29yZHNcclxuXHRcdFx0LmZsYXRNYXAoKHJlY29yZCkgPT4ge1xyXG5cdFx0XHRcdHJldHVybiByZWNvcmQuY29yZV90YWdUZXh0IC8vIHJlYWQgdGhlIGxhc3QgbGluZSBpZiB5b3UgYXJlIGNvbmZ1c2VkIHdoeSB3ZSBhcmUgbG9vcGluZyBvdmVyIHRoZSB0YWdfbmFtZVxyXG5cdFx0XHRcdFx0LnNwbGl0KHJlU3BsaXQpXHJcblx0XHRcdFx0XHQubWFwKHRhZyA9PiB0YWcudHJpbSgpLnRvTG93ZXJDYXNlKCkpICAvLyBBbHNvIHRyaW0gdGhlIHRhZyBmb3IgbGVhZGluZyBzcGFjZXMgJiBtYXAgZXZlcnl0aGluZyB0byBsb3dlcmNhc2UhXHJcblx0XHRcdFx0XHQuZmlsdGVyKEJvb2xlYW4pIC8vIGZpbHRlciBvdXQgZW1wdHkgbGluZXNcclxuXHRcdFx0XHRcdC5tYXAodGFnID0+IHJlbW92ZV9zbGFzaCA/IHRhZy5yZXBsYWNlKHJlU0xBU0gsIFwiXCIpIDogdGFnKSAgLy8gcmVwbGFjZSB0aGUgXCIvXCJcclxuXHRcdFx0XHRcdC5tYXAodGFnID0+ICh7Li4ucmVjb3JkLCBjb3JlX3RhZ1RleHQ6IHRhZ30pKTtcclxuXHRcdFx0fSk7XHJcblx0fVxyXG5cclxuXHRnZXRUYWdzKCkgOiBJQ29sb3JlZFRhZ1JlY29yZFtdIHtcclxuXHRcdHJldHVybiB0aGlzLl90YWdSZWNvcmRzO1xyXG5cdH1cclxuXHJcblx0Z2V0VGFnQ291bnQoKSA6IG51bWJlcntcclxuXHRcdHJldHVybiB0aGlzLl90YWdSZWNvcmRzLmxlbmd0aFxyXG5cdH1cclxuXHJcblx0YXN5bmMgYWRkT3JVcGRhdGVUYWcocmVjb3JkOklDb2xvcmVkVGFnUmVjb3JkKSA6IFByb21pc2U8dm9pZD57XHJcblx0XHRjb25zdCBpbmRleCA9IHRoaXMuZ2V0VGFnSW5kZXgocmVjb3JkKTtcclxuXHRcdGlmIChpbmRleCAhPT0gLTEpIHtcclxuXHRcdFx0dGhpcy5fdGFnUmVjb3Jkc1tpbmRleF0gPSByZWNvcmQ7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR0aGlzLl90YWdSZWNvcmRzLnB1c2gocmVjb3JkKTtcclxuXHRcdH1cclxuXHJcblx0XHRhd2FpdCB0aGlzLl9zZXR0aW5ncy5kZWJvdW5jZVNhdmVUb0ZpbGUucnVuKClcclxuXHRcdHRoaXMuX2ZsYXRDYWNoZSA9IG51bGw7IC8vIGludmFsaWRhdGUgdGhlIGNhY2hlXHJcblx0fVxyXG5cclxuXHRhc3luYyByZW1vdmVUYWcocmVjb3JkOklDb2xvcmVkVGFnUmVjb3JkKSA6IFByb21pc2U8dm9pZD57XHJcblx0XHR0aGlzLl90YWdSZWNvcmRzLnJlbW92ZShyZWNvcmQpXHJcbiAgICAgICAgYXdhaXQgdGhpcy5fc2V0dGluZ3MuZGVib3VuY2VTYXZlVG9GaWxlLnJ1bigpO1xyXG5cdFx0dGhpcy5fZmxhdENhY2hlID0gbnVsbDsgLy8gaW52YWxpZGF0ZSB0aGUgY2FjaGVcclxuXHR9XHJcblxyXG5cdGdldFRhZ0luZGV4KHJlY29yZDogSUNvbG9yZWRUYWdSZWNvcmQpOiBudW1iZXIge1xyXG5cdFx0cmV0dXJuIHRoaXMuX3RhZ1JlY29yZHMuZmluZEluZGV4KChyKSA9PiByLmNvcmVfaWQgPT09IHJlY29yZC5jb3JlX2lkKTtcclxuXHR9XHJcblxyXG5cdGdldEZpcnN0VGFnKHJlY29yZDogSUNvbG9yZWRUYWdSZWNvcmQpOiBzdHJpbmcge1xyXG5cdFx0cmV0dXJuIHJlY29yZC5jb3JlX3RhZ1RleHQuc3BsaXQocmVTcGxpdCkuZmlyc3QoKSA/PyBcIlVOREVGSU5FRFwiO1xyXG5cdH1cclxuXHJcblx0Z2V0VGFnUHJldmlld0lkcyhyZWNvcmQ6SUNvbG9yZWRUYWdSZWNvcmQpIDoge2JlZ2luOnN0cmluZywgZW5kOnN0cmluZ30ge1xyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0YmVnaW4gOiBgdGFnLXByZXZpZXctYmVpbmctJHtyZWNvcmQuY29yZV9pZH1gLFxyXG5cdFx0XHRlbmQgOiBgdGFnLXByZXZpZXctZW5kLSR7cmVjb3JkLmNvcmVfaWR9YFxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0Z2V0RGVmYXVsdFJlY29yZCgpIDogSUNvbG9yZWRUYWdSZWNvcmQge1xyXG5cdFx0cmV0dXJuIHRoaXMuX2V4dGVuc2lvbnMuRnVsbExpc3QucmVkdWNlKFxyXG5cdFx0XHQoYWNjOklDb2xvcmVkVGFnUmVjb3JkLCBjdXIgOiBJRXh0ZW5zaW9uKSA9PiAoey4uLmFjYywgLi4uY3VyLmdldERlZmF1bHRSZWNvcmQoKX0pICxcclxuXHRcdFx0e30gYXMgSUNvbG9yZWRUYWdSZWNvcmRcclxuXHRcdCkgYXMgSUNvbG9yZWRUYWdSZWNvcmRcclxuXHR9XHJcblxyXG5cdGFzeW5jIGNyZWF0ZU5ld0RlZmF1bHRUYWcoKSA6IFByb21pc2U8dm9pZD4ge1xyXG5cdFx0Y29uc3QgbmV3UmVjb3JkID0gdGhpcy5nZXREZWZhdWx0UmVjb3JkKCk7XHJcblxyXG5cdFx0Ly8gRW5zdXJlIF9mbGF0Q2FjaGUgaXMgcG9wdWxhdGVkXHJcblx0XHRpZiAodGhpcy5fZmxhdENhY2hlID09PSBudWxsKXtcclxuXHRcdFx0dGhpcy5nZXRUYWdzRmxhdCgpO1xyXG5cdFx0fVxyXG5cclxuXHRcdC8vIENoZWNrIGZvciBkdXBsaWNhdGUgbmFtZXNcclxuXHRcdC8vXHRcdFRoZSB3YXkgd2UgYXJlIGRvaW5nIHRoaXMgaXMgYnkgZ2V0dGluZyBhbGwgdGhlIHJlY29yZHMgd2hpY2ggYWxyZWFkeSBzdGFydCB3aXRoIHRoZSBkZWZhdWx0IHRhZ1RleHRcclxuXHRcdC8vXHRcdFRoZSBjb3VudCBvZiB0aGlzICsxIGlzIHRoZSBuZXcgc3VmZml4IGZvciB0aGUgbmV3IHJlY29yZFxyXG5cdFx0Y29uc3QgZGVmYXVsdFByZXNlbnQgPSB0aGlzLl9mbGF0Q2FjaGUhXHJcblx0XHRcdC5maWx0ZXIocmVjb3JkID0+IHJlY29yZC5jb3JlX3RhZ1RleHQuc3RhcnRzV2l0aChuZXdSZWNvcmQuY29yZV90YWdUZXh0KSlcclxuXHRcdFx0Lmxlbmd0aDtcclxuXHJcblx0XHRuZXdSZWNvcmQuY29yZV90YWdUZXh0ICs9IGAtJHtkZWZhdWx0UHJlc2VudH1gO1xyXG5cclxuXHRcdGF3YWl0IHRoaXMuYWRkT3JVcGRhdGVUYWcobmV3UmVjb3JkKVxyXG5cdFx0U2VydmljZVByb3ZpZGVyLmNzc1N0eWxlci5wcm9jZXNzRXh0ZW5zaW9ucygpIC8vIFVwZGF0ZSB0byB1c2luZyB0aGUgbmV3IHRhZ1xyXG5cdH1cclxuXHJcbn1cclxuIl19