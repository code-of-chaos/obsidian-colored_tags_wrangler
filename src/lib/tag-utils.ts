import { IColorPicker } from "src/types/color-picker";
import { normalizeTagName, isWildcardTagName, REGEX } from "./string-utils";

export function getTags(
    data: Array<IColorPicker>,
    enableMultipleTags: boolean,
    removeSlash = false
): Array<IColorPicker> {
    return data
        .flatMap(({ tag_name, color, background_color, luminance_offset }) => {
            const tagNames = enableMultipleTags ? tag_name.split(REGEX.SPLIT) : [tag_name];

            return tagNames
                .map(normalizeTagName)
                .filter(Boolean)
                .map((tag) => (removeSlash ? tag.replace(REGEX.SLASH, "") : tag))
                .map((tag) => ({ tag_name: tag, color, background_color, luminance_offset }));
        });
}

export function tagMatchesPattern(tagPattern: string, tagName: string): boolean {
    const normalizedPattern = normalizeTagName(tagPattern).toLowerCase();
    const normalizedTag = normalizeTagName(tagName).toLowerCase();

    if (!isWildcardTagName(normalizedPattern)) {
        return normalizedPattern === normalizedTag;
    }

    const prefix = normalizedPattern.slice(0, -1);
    return normalizedTag.startsWith(prefix) && normalizedTag.length > prefix.length;
}
