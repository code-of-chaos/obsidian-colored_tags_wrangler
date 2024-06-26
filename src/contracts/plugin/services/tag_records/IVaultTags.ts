// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------

// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export interface IVaultTags {
	get allTags() : string[]
	get allNestedTags() : string[][]
	get allNestedTagsAsDict() : Record<string, unknown>

	invalidate() : void
}
