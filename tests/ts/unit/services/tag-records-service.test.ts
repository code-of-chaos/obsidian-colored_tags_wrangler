import { describe, it, expect, beforeEach } from "vitest";
import { TagRecordsService } from "../../../../src/services/TagRecordsService";
import { IColoredTagRecord } from "../../../../src/types/settings";
import { RGB } from "obsidian";

describe("TagRecordsService", () => {
    let service: TagRecordsService;

    const color: RGB = { r: 255, g: 0, b: 0 };
    const bgColor: RGB = { r: 0, g: 0, b: 0 };

    const createRecord = (tagName: string): Omit<IColoredTagRecord, "id"> => ({
        tag_name: tagName,
        color,
        background_color: bgColor,
        luminance_offset: 0.15,
    });

    beforeEach(() => {
        service = new TagRecordsService();
    });

    describe("getAll", () => {
        it("returns empty array initially", () => {
            expect(service.getAll()).toEqual([]);
        });

        it("returns all records", () => {
            service.add(createRecord("tag1"));
            service.add(createRecord("tag2"));
            expect(service.getAll()).toHaveLength(2);
        });
    });

    describe("getById", () => {
        it("returns undefined for non-existent id", () => {
            expect(service.getById("non-existent")).toBeUndefined();
        });

        it("returns record by id", () => {
            const record = service.add(createRecord("tag1"));
            expect(service.getById(record.id)).toEqual(record);
        });
    });

    describe("getByTagName", () => {
        it("returns undefined for non-existent tag", () => {
            expect(service.getByTagName("non-existent")).toBeUndefined();
        });

        it("returns record by tag name", () => {
            const record = service.add(createRecord("tag1"));
            expect(service.getByTagName("tag1")).toEqual(record);
        });
    });

    describe("add", () => {
        it("adds a new record", () => {
            const record = service.add(createRecord("tag1"));
            expect(record.id).toBeDefined();
            expect(record.tag_name).toBe("tag1");
            expect(service.getAll()).toHaveLength(1);
        });

        it("generates unique ids", () => {
            const record1 = service.add(createRecord("tag1"));
            const record2 = service.add(createRecord("tag2"));
            expect(record1.id).not.toBe(record2.id);
        });
    });

    describe("update", () => {
        it("returns undefined for non-existent id", () => {
            expect(service.update("non-existent", { tag_name: "updated" })).toBeUndefined();
        });

        it("updates the record", () => {
            const record = service.add(createRecord("tag1"));
            const updated = service.update(record.id, { tag_name: "updated" });
            expect(updated?.tag_name).toBe("updated");
        });
    });

    describe("remove", () => {
        it("returns false for non-existent id", () => {
            expect(service.remove("non-existent")).toBe(false);
        });

        it("removes the record", () => {
            const record = service.add(createRecord("tag1"));
            expect(service.remove(record.id)).toBe(true);
            expect(service.getAll()).toHaveLength(0);
        });
    });

    describe("reorder", () => {
        it("reorders records", () => {
            service.add(createRecord("tag1"));
            service.add(createRecord("tag2"));
            service.add(createRecord("tag3"));

            service.reorder(0, 2);

            const records = service.getAll();
            expect(records[0].tag_name).toBe("tag2");
            expect(records[1].tag_name).toBe("tag3");
            expect(records[2].tag_name).toBe("tag1");
        });

        it("does nothing for out of bounds indices", () => {
            service.add(createRecord("tag1"));
            service.reorder(-1, 0);
            service.reorder(0, 5);
            expect(service.getAll()).toHaveLength(1);
        });
    });

    describe("createDefault", () => {
        it("creates a default record", () => {
            const record = service.createDefault();
            expect(record.tag_name).toBe("new-tag");
            expect(record.color).toEqual({ r: 255, g: 255, b: 255 });
            expect(record.background_color).toEqual({ r: 100, g: 100, b: 100 });
        });
    });
});
