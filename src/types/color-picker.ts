import { RGB } from "obsidian";

export interface IColorPicker {
    tag_name: string;
    color: RGB;
    background_color: RGB;
    luminance_offset: number;
}
