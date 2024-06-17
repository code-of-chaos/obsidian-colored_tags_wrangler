import { rgbaToString } from "../../../lib/ColorConverters";
import { ServiceProvider } from "../../services/ServiceProvider";
import { themeSelectorDark, themeSelectorLight } from "../../services/css_styler/CssStylerService";
// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export class CoreCssWrangler {
    // -----------------------------------------------------------------------------------------------------------------
    // Methods
    // -----------------------------------------------------------------------------------------------------------------
    _assembleCss(selectors, color, background_color) {
        return `
			${selectors.join(",\n")} {
				color: ${rgbaToString(color)} !important;
				background-color: ${rgbaToString(background_color)} !important;
			}
		`;
    }
    _assembleRules(theme, record) {
        return this._assembleCss([
            `${theme} .tag[href="#${record.core_tagText}" i]`,
            `${theme} .cm-tag-${record.core_tagText}`,
        ], record.core_color_foreground, record.core_color_background);
    }
    getRules() {
        return ServiceProvider.tagRecords
            .getTagsFlat(false)
            .filter(record => record.core_enabled)
            .flatMap(record => [
            this._assembleRules(themeSelectorLight, record),
            this._assembleRules(themeSelectorDark, record)
        ]);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29yZUNzc1dyYW5nbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiQ29yZUNzc1dyYW5nbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUtBLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSw4QkFBOEIsQ0FBQztBQUUxRCxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sZ0NBQWdDLENBQUM7QUFDL0QsT0FBTyxFQUFDLGlCQUFpQixFQUFFLGtCQUFrQixFQUFDLE1BQU0sNENBQTRDLENBQUM7QUFFakcsd0hBQXdIO0FBQ3hILE9BQU87QUFDUCx3SEFBd0g7QUFFeEgsTUFBTSxPQUFPLGVBQWU7SUFDM0Isb0hBQW9IO0lBQ3BILFVBQVU7SUFDVixvSEFBb0g7SUFDNUcsWUFBWSxDQUFDLFNBQWtCLEVBQUUsS0FBVSxFQUFFLGdCQUFxQjtRQUN6RSxPQUFPO0tBQ0osU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7YUFDYixZQUFZLENBQUMsS0FBSyxDQUFDO3dCQUNSLFlBQVksQ0FBQyxnQkFBZ0IsQ0FBQzs7R0FFbkQsQ0FBQTtJQUNGLENBQUM7SUFFTyxjQUFjLENBQUMsS0FBWSxFQUFFLE1BQXdCO1FBQzVELE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FDdkI7WUFDQyxHQUFHLEtBQUssZ0JBQWdCLE1BQU0sQ0FBQyxZQUFZLE1BQU07WUFDakQsR0FBRyxLQUFLLFlBQVksTUFBTSxDQUFDLFlBQVksRUFBRTtTQUN6QyxFQUNELE1BQU0sQ0FBQyxxQkFBcUIsRUFDNUIsTUFBTSxDQUFDLHFCQUFxQixDQUM1QixDQUFBO0lBQ0YsQ0FBQztJQUVELFFBQVE7UUFDUCxPQUFPLGVBQWUsQ0FBQyxVQUFVO2FBQy9CLFdBQVcsQ0FBQyxLQUFLLENBQUM7YUFDbEIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQzthQUNyQyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQztZQUNsQixJQUFJLENBQUMsY0FBYyxDQUFDLGtCQUFrQixFQUFFLE1BQU0sQ0FBQztZQUMvQyxJQUFJLENBQUMsY0FBYyxDQUFDLGlCQUFpQixFQUFFLE1BQU0sQ0FBQztTQUM5QyxDQUFDLENBQUE7SUFDSixDQUFDO0NBQ0QiLCJzb3VyY2VzQ29udGVudCI6WyIvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuLy8gSW1wb3J0c1xyXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuaW1wb3J0IHsgSUNvbG9yZWRUYWdSZWNvcmQgfSBmcm9tIFwic3JjL2NvbnRyYWN0cy9wbHVnaW4vc2V0dGluZ3MvSUNvbG9yZWRUYWdSZWNvcmRcIjtcclxuaW1wb3J0IHtJQ3NzV3JhbmdsZXJ9IGZyb20gXCIuLi8uLi8uLi9jb250cmFjdHMvcGx1Z2luL3NlcnZpY2VzL2Nzc19zdHlsZXIvSUNzc1dyYW5nbGVyXCI7XHJcbmltcG9ydCB7cmdiYVRvU3RyaW5nfSBmcm9tIFwiLi4vLi4vLi4vbGliL0NvbG9yQ29udmVydGVyc1wiO1xyXG5pbXBvcnQge1JHQkF9IGZyb20gXCIuLi8uLi8uLi9jb250cmFjdHMvdHlwZXMvUkdCQVwiO1xyXG5pbXBvcnQge1NlcnZpY2VQcm92aWRlcn0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL1NlcnZpY2VQcm92aWRlclwiO1xyXG5pbXBvcnQge3RoZW1lU2VsZWN0b3JEYXJrLCB0aGVtZVNlbGVjdG9yTGlnaHR9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9jc3Nfc3R5bGVyL0Nzc1N0eWxlclNlcnZpY2VcIjtcclxuXHJcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4vLyBDb2RlXHJcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuZXhwb3J0IGNsYXNzIENvcmVDc3NXcmFuZ2xlciBpbXBsZW1lbnRzIElDc3NXcmFuZ2xlciB7XHJcblx0Ly8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHQvLyBNZXRob2RzXHJcblx0Ly8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHRwcml2YXRlIF9hc3NlbWJsZUNzcyhzZWxlY3RvcnM6c3RyaW5nW10sIGNvbG9yOlJHQkEsIGJhY2tncm91bmRfY29sb3I6UkdCQSk6c3RyaW5nIHtcclxuXHRcdHJldHVybiBgXHJcblx0XHRcdCR7c2VsZWN0b3JzLmpvaW4oXCIsXFxuXCIpfSB7XHJcblx0XHRcdFx0Y29sb3I6ICR7cmdiYVRvU3RyaW5nKGNvbG9yKX0gIWltcG9ydGFudDtcclxuXHRcdFx0XHRiYWNrZ3JvdW5kLWNvbG9yOiAke3JnYmFUb1N0cmluZyhiYWNrZ3JvdW5kX2NvbG9yKX0gIWltcG9ydGFudDtcclxuXHRcdFx0fVxyXG5cdFx0YFxyXG5cdH1cclxuXHJcblx0cHJpdmF0ZSBfYXNzZW1ibGVSdWxlcyh0aGVtZTpzdHJpbmcsIHJlY29yZDpJQ29sb3JlZFRhZ1JlY29yZCk6c3RyaW5ne1xyXG5cdFx0cmV0dXJuIHRoaXMuX2Fzc2VtYmxlQ3NzKFxyXG5cdFx0XHRbXHJcblx0XHRcdFx0YCR7dGhlbWV9IC50YWdbaHJlZj1cIiMke3JlY29yZC5jb3JlX3RhZ1RleHR9XCIgaV1gLFxyXG5cdFx0XHRcdGAke3RoZW1lfSAuY20tdGFnLSR7cmVjb3JkLmNvcmVfdGFnVGV4dH1gLFxyXG5cdFx0XHRdLFxyXG5cdFx0XHRyZWNvcmQuY29yZV9jb2xvcl9mb3JlZ3JvdW5kLFxyXG5cdFx0XHRyZWNvcmQuY29yZV9jb2xvcl9iYWNrZ3JvdW5kLFxyXG5cdFx0KVxyXG5cdH1cclxuXHJcblx0Z2V0UnVsZXMoKTogc3RyaW5nW10ge1xyXG5cdFx0cmV0dXJuIFNlcnZpY2VQcm92aWRlci50YWdSZWNvcmRzXHJcblx0XHRcdC5nZXRUYWdzRmxhdChmYWxzZSlcclxuXHRcdFx0LmZpbHRlcihyZWNvcmQgPT4gcmVjb3JkLmNvcmVfZW5hYmxlZClcclxuXHRcdFx0LmZsYXRNYXAocmVjb3JkID0+IFtcclxuXHRcdFx0XHR0aGlzLl9hc3NlbWJsZVJ1bGVzKHRoZW1lU2VsZWN0b3JMaWdodCwgcmVjb3JkKSxcclxuXHRcdFx0XHR0aGlzLl9hc3NlbWJsZVJ1bGVzKHRoZW1lU2VsZWN0b3JEYXJrLCByZWNvcmQpXHJcblx0XHRcdF0pXHJcblx0fVxyXG59XHJcbiJdfQ==