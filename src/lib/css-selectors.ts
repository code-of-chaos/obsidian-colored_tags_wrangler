import { normalizeTagName, isWildcardTagName, escapeCssAttributeValue, escapeRegex, REGEX } from "./string-utils";

export function tagNameToHrefSelectors(tagName: string): string[] {
    const normalizedTag = normalizeTagName(tagName);
    const wildcard = isWildcardTagName(normalizedTag);
    const rawTag = wildcard ? normalizedTag.slice(0, -1) : normalizedTag;
    const tagValue = escapeCssAttributeValue(rawTag);
    const lowerValue = escapeCssAttributeValue(rawTag.toLowerCase());
    const operator = wildcard ? "^" : "";

    const encodedValue = encodeURIComponent(rawTag);
    const encodedLower = encodeURIComponent(rawTag.toLowerCase());
    const uriValue = encodeURI("#" + rawTag);
    const uriLower = encodeURI("#" + rawTag.toLowerCase());

    return [
        `[href${operator}="#${tagValue}" i]`,
        `[href${operator}="${uriValue}" i]`,
        `[href${operator}="#${encodedValue}" i]`,
        `[href${operator}="#${lowerValue}" i]`,
        `[href${operator}="${uriLower}" i]`,
        `[href${operator}="#${encodedLower}" i]`,
    ];
}

export function tagNameToHrefSelector(tagName: string): string {
    return tagNameToHrefSelectors(tagName)[0] ?? '[href="#tag" i]';
}

export function tagNameToClassSelectors(tagName: string, classPrefix: string): string[] {
    const normalizedTag = normalizeTagName(tagName);
    const wildcard = isWildcardTagName(normalizedTag);
    const tagValue = wildcard
        ? normalizedTag.slice(0, -"/*".length)
        : normalizedTag;
    const lowerValue = tagValue.toLowerCase();
    const noSlash = tagValue.replace(REGEX.SLASH, "");
    const noSlashLower = lowerValue.replace(REGEX.SLASH, "");

    // Stripped non-ASCII (Obsidian CM6 behavior: "tête" -> "tte")
    const stripped = tagValue.replace(/[^\w-]/g, "");
    const strippedLower = lowerValue.replace(/[^\w-]/g, "");

    // NFD accent normalization ("café" -> "cafe")
    const normalized = tagValue.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^\w-]/g, "");
    const normalizedLower = lowerValue.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^\w-]/g, "");

    const selectors: string[] = [];

    // Direct class names
    selectors.push(`.cm-tag-${escapeCssAttributeValue(noSlash)}`);
    selectors.push(`.cm-tag-${escapeCssAttributeValue(noSlashLower)}`);

    // Class exact match
    selectors.push(`[class~="cm-tag-${escapeCssAttributeValue(noSlash)}" i]`);
    selectors.push(`[class~="cm-tag-${escapeCssAttributeValue(noSlashLower)}" i]`);

    // Class contains (for wildcard prefix matching)
    if (wildcard) {
        selectors.push(`[class*="cm-tag-${escapeCssAttributeValue(noSlash)}" i]`);
        selectors.push(`[class*="cm-tag-${escapeCssAttributeValue(noSlashLower)}" i]`);
    }

    // Stripped non-ASCII
    if (stripped) {
        selectors.push(`.cm-tag-${escapeCssAttributeValue(stripped)}`);
        selectors.push(`[class~="cm-tag-${escapeCssAttributeValue(stripped)}" i]`);
    }
    if (strippedLower && strippedLower !== stripped) {
        selectors.push(`.cm-tag-${escapeCssAttributeValue(strippedLower)}`);
        selectors.push(`[class~="cm-tag-${escapeCssAttributeValue(strippedLower)}" i]`);
    }

    // NFD normalized
    if (normalized) {
        selectors.push(`.cm-tag-${escapeCssAttributeValue(normalized)}`);
        selectors.push(`[class~="cm-tag-${escapeCssAttributeValue(normalized)}" i]`);
    }
    if (normalizedLower && normalizedLower !== normalized) {
        selectors.push(`.cm-tag-${escapeCssAttributeValue(normalizedLower)}`);
        selectors.push(`[class~="cm-tag-${escapeCssAttributeValue(normalizedLower)}" i]`);
    }

    return selectors;
}

export function tagNameToClassSelector(tagName: string, classPrefix: string): string {
    const selectors = tagNameToClassSelectors(tagName, classPrefix);
    if (selectors.length === 0) return `[class~="${classPrefix}tag" i]`;

    const normalizedTag = normalizeTagName(tagName);
    const wildcard = isWildcardTagName(normalizedTag);
    const tagValue = wildcard
        ? normalizedTag.slice(0, -"/*".length)
        : normalizedTag;
    const noSlash = tagValue.replace(REGEX.SLASH, "");
    const className = escapeCssAttributeValue(`${classPrefix}${noSlash}`);

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
