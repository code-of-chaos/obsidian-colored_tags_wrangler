// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
// pulled from https://github.com/SilentVoid13/Templater/blob/master/src/utils/Utils.ts#L72
export function arrayMove(arr, fromIndex, toIndex) {
    if (toIndex < 0 || toIndex === arr.length) {
        return;
    }
    const element = arr[fromIndex];
    arr[fromIndex] = arr[toIndex];
    arr[toIndex] = element;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXJyYXlVdGlscy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkFycmF5VXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsd0hBQXdIO0FBQ3hILFVBQVU7QUFDVix3SEFBd0g7QUFFeEgsd0hBQXdIO0FBQ3hILE9BQU87QUFDUCx3SEFBd0g7QUFDeEgsMkZBQTJGO0FBQzNGLE1BQU0sVUFBVSxTQUFTLENBQ3JCLEdBQVEsRUFDUixTQUFpQixFQUNqQixPQUFlO0lBRWYsSUFBSSxPQUFPLEdBQUcsQ0FBQyxJQUFJLE9BQU8sS0FBSyxHQUFHLENBQUMsTUFBTSxFQUFFO1FBQ3ZDLE9BQU87S0FDVjtJQUNELE1BQU0sT0FBTyxHQUFHLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUMvQixHQUFHLENBQUMsU0FBUyxDQUFDLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQzlCLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxPQUFPLENBQUM7QUFDM0IsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4vLyBJbXBvcnRzXHJcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbi8vIENvZGVcclxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbi8vIHB1bGxlZCBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS9TaWxlbnRWb2lkMTMvVGVtcGxhdGVyL2Jsb2IvbWFzdGVyL3NyYy91dGlscy9VdGlscy50cyNMNzJcclxuZXhwb3J0IGZ1bmN0aW9uIGFycmF5TW92ZTxUPihcclxuICAgIGFycjogVFtdLFxyXG4gICAgZnJvbUluZGV4OiBudW1iZXIsXHJcbiAgICB0b0luZGV4OiBudW1iZXJcclxuKTogdm9pZCB7XHJcbiAgICBpZiAodG9JbmRleCA8IDAgfHwgdG9JbmRleCA9PT0gYXJyLmxlbmd0aCkge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGNvbnN0IGVsZW1lbnQgPSBhcnJbZnJvbUluZGV4XTtcclxuICAgIGFycltmcm9tSW5kZXhdID0gYXJyW3RvSW5kZXhdO1xyXG4gICAgYXJyW3RvSW5kZXhdID0gZWxlbWVudDtcclxufSJdfQ==