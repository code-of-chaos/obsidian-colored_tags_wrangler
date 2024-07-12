// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------

// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export enum DropDownOptions {
	Same = "Same",
	Lighter = "Lighter",
	Darker = "Darker",
}

export function DropDownOptionsAsRecord() : Record<string, string>{
	return Object.keys(DropDownOptions).reduce((acc, key) => {
		acc[key] = DropDownOptions[key as keyof typeof DropDownOptions];
		return acc;
	}, {} as Record<string, string>)
}

export function DropdownOptionsFromString(value:string) : DropDownOptions | undefined {
	const reverseLookupRecord: Record<string, DropDownOptions> = Object.values(DropDownOptions).reduce((acc, value) => {
		acc[value] = value;
		return acc;
	}, {} as Record<string, DropDownOptions>)
	return reverseLookupRecord[value]
}
