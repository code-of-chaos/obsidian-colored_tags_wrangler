const reSLASH = /\//g;
const reSplit = /[\n;]/;

export const REGEX = {
    SLASH: reSLASH,
    SPLIT: reSplit,
} as const;

export function generateId(): string {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

export function normalizeTagName(tagName: string): string {
    return tagName.trim().replace(/^#+/, "");
}

export function isWildcardTagName(tagName: string): boolean {
    const normalized = normalizeTagName(tagName);
    const wildcardSuffix = "/*";
    return normalized.endsWith(wildcardSuffix) && normalized.length > wildcardSuffix.length;
}

export function escapeCssAttributeValue(value: string): string {
    return value
        .replace(/\\/g, "\\\\")
        .replace(/"/g, '\\"');
}

export function escapeRegex(value: string): string {
    return value
        .replace(/[\\^$.*+?()[\]{}|]/g, "\\$&")
        .replace(/\//g, "\\/");
}
