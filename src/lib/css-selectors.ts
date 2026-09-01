import { normalizeTagName, isWildcardTagName, escapeCssAttributeValue, escapeRegex, REGEX } from "./string-utils";

export function tagNameToHrefSelector(tagName: string): string {
    const normalizedTag = normalizeTagName(tagName);
    const wildcard = isWildcardTagName(normalizedTag);
    const tagValue = wildcard ? normalizedTag.slice(0, -1) : normalizedTag;
    const operator = wildcard ? "^" : "";

    return `[href${operator}="#${escapeCssAttributeValue(tagValue)}" i]`;
}

export function tagNameToClassSelector(tagName: string, classPrefix: string): string {
    const normalizedTag = normalizeTagName(tagName);
    const wildcard = isWildcardTagName(normalizedTag);
    const tagValue = wildcard
        ? normalizedTag.slice(0, -"/*".length)
        : normalizedTag;
    const className = escapeCssAttributeValue(`${classPrefix}${tagValue.replace(REGEX.SLASH, "")}`);

    if (!wildcard) {
        return `[class~="${className}" i]`;
    }

    return `[class*="${className}" i]:where(:not([class~="${className}" i]))`;
}

export function tagNameToSearchQuery(tagName: string): string {
    const normalizedTag = normalizeTagName(tagName);

    if (!isWildcardTagName(normalizedTag)) {
        return `tag:#${normalizedTag}`;
    }

    const descendantPrefix = escapeRegex(`#${normalizedTag.slice(0, -1)}`);
    return `tag:/^${descendantPrefix}.+/`;
}
