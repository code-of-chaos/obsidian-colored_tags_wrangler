import { IColoredTagRecord } from "src/types/settings";
import { RGB } from "obsidian";

export class TagRecordsService {
    private records: IColoredTagRecord[] = [];

    constructor(initialRecords: IColoredTagRecord[] = []) {
        this.records = [...initialRecords];
    }

    getAll(): IColoredTagRecord[] {
        return [...this.records];
    }

    getById(id: string): IColoredTagRecord | undefined {
        return this.records.find((r) => r.id === id);
    }

    getByTagName(tagName: string): IColoredTagRecord | undefined {
        return this.records.find((r) => r.tag_name === tagName);
    }

    add(record: Omit<IColoredTagRecord, "id">): IColoredTagRecord {
        const newRecord: IColoredTagRecord = {
            ...record,
            id: this.generateId(),
        };
        this.records.push(newRecord);
        return newRecord;
    }

    update(id: string, updates: Partial<IColoredTagRecord>): IColoredTagRecord | undefined {
        const index = this.records.findIndex((r) => r.id === id);
        if (index === -1) return undefined;

        const existing = this.records[index] as IColoredTagRecord;
        this.records[index] = {
            id: existing.id,
            tag_name: updates.tag_name ?? existing.tag_name,
            color: updates.color ?? existing.color,
            background_color: updates.background_color ?? existing.background_color,
            luminance_offset: updates.luminance_offset ?? existing.luminance_offset,
            canvas_enabled: updates.canvas_enabled ?? existing.canvas_enabled,
            kanban_cards_enabled: updates.kanban_cards_enabled ?? existing.kanban_cards_enabled,
            kanban_lists_enabled: updates.kanban_lists_enabled ?? existing.kanban_lists_enabled,
            folder_note_path: updates.folder_note_path ?? existing.folder_note_path,
        };
        return this.records[index];
    }

    remove(id: string): boolean {
        const index = this.records.findIndex((r) => r.id === id);
        if (index === -1) return false;

        this.records.splice(index, 1);
        return true;
    }

    reorder(fromIndex: number, toIndex: number): void {
        if (fromIndex < 0 || fromIndex >= this.records.length) return;
        if (toIndex < 0 || toIndex >= this.records.length) return;

        const item = this.records.splice(fromIndex, 1)[0];
        if (item) {
            this.records.splice(toIndex, 0, item);
        }
    }

    createDefault(): IColoredTagRecord {
        const defaultColor: RGB = { r: 255, g: 255, b: 255 };
        const defaultBgColor: RGB = { r: 100, g: 100, b: 100 };

        return this.add({
            tag_name: "new-tag",
            color: defaultColor,
            background_color: defaultBgColor,
            luminance_offset: 0.15,
        });
    }

    private generateId(): string {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }
}
