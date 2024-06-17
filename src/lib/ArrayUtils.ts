// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------

// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
// pulled from https://github.com/SilentVoid13/Templater/blob/master/src/utils/Utils.ts#L72
export function arrayMove<T>(
	arr: T[],
	fromIndex: number,
	toIndex: number
): void {
	if (toIndex < 0 || toIndex === arr.length) {
		return;
	}
	const element = arr[fromIndex];
	arr[fromIndex] = arr[toIndex];
	arr[toIndex] = element;
}
