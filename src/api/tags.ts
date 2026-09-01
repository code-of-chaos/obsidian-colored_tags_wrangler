// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------
import {IColorPicker} from "src/api/interfaces/IColorPicker";

// ---------------------------------------------------------------------------------------------------------------------
// Support Code
// ---------------------------------------------------------------------------------------------------------------------
const reSLASH = /\//g;
const reSplit = /[\n;]/; // for organization, I added \n
const wildcardSuffix = "/*";

const escapeCssAttributeValue = (value: string): string => value
    .replace(/\\/g, "\\\\")
    .replace(/"/g, '\\"');

const escapeRegex = (value: string): string => value
    .replace(/[\\^$.*+?()[\]{}|]/g, "\\$&")
    .replace(/\//g, "\\/");

// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export function get_tags(data: Array<IColorPicker>, enable_multiple_tags: boolean, remove_slash=false): Array<IColorPicker> {
    return data
        .flatMap(({ tag_name, color, background_color, luminance_offset }) => {
            const tagNames = enable_multiple_tags ? tag_name.split(reSplit) : [tag_name];

            return tagNames
                .map(normalizeTagName)
                .filter(Boolean) // filter out empty lines
                .map(tag => remove_slash ? tag.replace(reSLASH, "") : tag)  // replace the "/"
                .map(tag => ({ tag_name: tag, color, background_color, luminance_offset }));
        });
}

// ---------------------------------------------------------------------------------------------------------------------
export function normalizeTagName(tag_name: string): string {
    return tag_name.trim().replace(/^#/, "");
}

// ---------------------------------------------------------------------------------------------------------------------
export function isWildcardTagName(tag_name: string): boolean {
    const normalizedTag = normalizeTagName(tag_name);
    return normalizedTag.endsWith(wildcardSuffix)
        && normalizedTag.length > wildcardSuffix.length;
}

// ---------------------------------------------------------------------------------------------------------------------
export function tagMatchesPattern(tag_pattern: string, tag_name: string): boolean {
    const normalizedPattern = normalizeTagName(tag_pattern).toLowerCase();
    const normalizedTag = normalizeTagName(tag_name).toLowerCase();

    if (!isWildcardTagName(normalizedPattern)) {
        return normalizedPattern === normalizedTag;
    }

    // Remove only the wildcard. Keeping the slash makes project/* match project/HR,
    // but not project itself or unrelated tags such as projectile/HR.
    const prefix = normalizedPattern.slice(0, -1);
    return normalizedTag.startsWith(prefix) && normalizedTag.length > prefix.length;
}

// ---------------------------------------------------------------------------------------------------------------------
export function tagNameToHrefSelector(tag_name: string): string {
    const normalizedTag = normalizeTagName(tag_name);
    const wildcard = isWildcardTagName(normalizedTag);
    const tagValue = wildcard ? normalizedTag.slice(0, -1) : normalizedTag;
    const operator = wildcard ? "^" : "";

    return `[href${operator}="#${escapeCssAttributeValue(tagValue)}" i]`;
}

// ---------------------------------------------------------------------------------------------------------------------
export function tagNameToClassSelector(tag_name: string, class_prefix: string): string {
    const normalizedTag = normalizeTagName(tag_name);
    const wildcard = isWildcardTagName(normalizedTag);
    const tagValue = wildcard
        ? normalizedTag.slice(0, -wildcardSuffix.length)
        : normalizedTag;
    const className = escapeCssAttributeValue(`${class_prefix}${tagValue.replace(reSLASH, "")}`);

    if (!wildcard) {
        return `[class~="${className}" i]`;
    }

    // Obsidian removes slashes from nested-tag class names. A prefix selector is therefore
    // the closest CSS can get to the descendant boundary. Exclude the parent tag itself.
    return `[class*="${className}" i]:where(:not([class~="${className}" i]))`;
}

// ---------------------------------------------------------------------------------------------------------------------
export function tagNameToSearchQuery(tag_name: string): string {
    const normalizedTag = normalizeTagName(tag_name);

    if (!isWildcardTagName(normalizedTag)) {
        return `tag:#${normalizedTag}`;
    }

    const descendantPrefix = escapeRegex(`#${normalizedTag.slice(0, -1)}`);
    return `tag:/^${descendantPrefix}.+/`;
}
