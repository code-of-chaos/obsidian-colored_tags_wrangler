import { describe, it, expect, beforeEach } from "vitest";
import { TagRecordsService } from "../../../../src/services/TagRecordsService";
import { IColoredTagRecord } from "../../../../src/types/settings";
import { RGB } from "obsidian";

describe("TagRecordsService edge cases", () => {
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

    describe("getAll edge cases", () => {
        it("returns copy of array", () => {
            service.add(createRecord("tag1"));
            const all1 = service.getAll();
            const all2 = service.getAll();
            expect(all1).not.toBe(all2);
            expect(all1).toEqual(all2);
        });

        it("does not reflect external mutations", () => {
            service.add(createRecord("tag1"));
            const all = service.getAll();
            all.push({ id: "fake", tag_name: "fake", color, background_color: bgColor, luminance_offset: 0 });
            expect(service.getAll()).toHaveLength(1);
        });
    });

    describe("getById edge cases", () => {
        it("returns undefined for empty string", () => {
            expect(service.getById("")).toBeUndefined();
        });

        it("returns undefined for very long id", () => {
            expect(service.getById("a".repeat(1000))).toBeUndefined();
        });
    });

    describe("getByTagName edge cases", () => {
        it("returns undefined for empty string", () => {
            expect(service.getByTagName("")).toBeUndefined();
        });

        it("returns first matching record", () => {
            service.add(createRecord("tag"));
            service.add(createRecord("tag"));
            const result = service.getByTagName("tag");
            expect(result).toBeDefined();
        });
    });

    describe("add edge cases", () => {
        it("generates unique ids for multiple adds", () => {
            const ids = new Set<string>();
            for (let i = 0; i < 100; i++) {
                const record = service.add(createRecord(`tag${i}`));
                ids.add(record.id);
            }
            expect(ids.size).toBe(100);
        });

        it("handles adding record with empty tag name", () => {
            const record = service.add(createRecord(""));
            expect(record.tag_name).toBe("");
        });

        it("handles adding record with unicode tag name", () => {
            const record = service.add(createRecord("café🎉"));
            expect(record.tag_name).toBe("café🎉");
        });
    });

    describe("update edge cases", () => {
        it("does not modify other records", () => {
            const record1 = service.add(createRecord("tag1"));
            const record2 = service.add(createRecord("tag2"));
            service.update(record1.id, { tag_name: "updated" });
            expect(service.getById(record2.id)?.tag_name).toBe("tag2");
        });

        it("handles updating with empty object", () => {
            const record = service.add(createRecord("tag1"));
            const original = { ...record };
            service.update(record.id, {});
            expect(service.getById(record.id)).toEqual(original);
        });

        it("handles partial updates", () => {
            const record = service.add(createRecord("tag1"));
            service.update(record.id, { tag_name: "updated" });
            expect(service.getById(record.id)?.tag_name).toBe("updated");
            expect(service.getById(record.id)?.color).toEqual(color);
        });
    });

    describe("remove edge cases", () => {
        it("removes correct record when multiple exist", () => {
            const record1 = service.add(createRecord("tag1"));
            const record2 = service.add(createRecord("tag2"));
            service.remove(record1.id);
            expect(service.getAll()).toHaveLength(1);
            expect(service.getAll()[0].id).toBe(record2.id);
        });

        it("handles removing from single element array", () => {
            const record = service.add(createRecord("tag1"));
            expect(service.remove(record.id)).toBe(true);
            expect(service.getAll()).toHaveLength(0);
        });

        it("does not affect array when removing non-existent", () => {
            service.add(createRecord("tag1"));
            expect(service.remove("nonexistent")).toBe(false);
            expect(service.getAll()).toHaveLength(1);
        });
    });

    describe("reorder edge cases", () => {
        it("handles reorder with negative from", () => {
            service.add(createRecord("tag1"));
            service.add(createRecord("tag2"));
            service.reorder(-1, 0);
            expect(service.getAll()[0].tag_name).toBe("tag1");
        });

        it("handles reorder with negative to", () => {
            service.add(createRecord("tag1"));
            service.add(createRecord("tag2"));
            service.reorder(0, -1);
            expect(service.getAll()[0].tag_name).toBe("tag1");
        });

        it("handles reorder with from >= length", () => {
            service.add(createRecord("tag1"));
            service.reorder(5, 0);
            expect(service.getAll()).toHaveLength(1);
        });

        it("handles reorder with to >= length", () => {
            service.add(createRecord("tag1"));
            service.reorder(0, 5);
            expect(service.getAll()).toHaveLength(1);
        });

        it("handles reorder same position", () => {
            service.add(createRecord("tag1"));
            service.add(createRecord("tag2"));
            service.reorder(0, 0);
            expect(service.getAll()[0].tag_name).toBe("tag1");
        });

        it("handles multiple consecutive reorders", () => {
            service.add(createRecord("a"));
            service.add(createRecord("b"));
            service.add(createRecord("c"));
            service.reorder(0, 2);
            service.reorder(0, 2);
            const names = service.getAll().map((r) => r.tag_name);
            expect(names).toEqual(["c", "a", "b"]);
        });
    });

    describe("createDefault edge cases", () => {
        it("creates record with unique id", () => {
            const record1 = service.createDefault();
            const record2 = service.createDefault();
            expect(record1.id).not.toBe(record2.id);
        });

        it("creates record with default values", () => {
            const record = service.createDefault();
            expect(record.tag_name).toBe("new-tag");
            expect(record.color).toEqual({ r: 255, g: 255, b: 255 });
            expect(record.background_color).toEqual({ r: 100, g: 100, b: 100 });
        });

        it("adds record to service", () => {
            service.createDefault();
            expect(service.getAll()).toHaveLength(1);
        });
    });

    describe("constructor edge cases", () => {
        it("handles initial records", () => {
            const records = [
                { id: "1", tag_name: "tag1", color, background_color: bgColor, luminance_offset: 0 },
                { id: "2", tag_name: "tag2", color, background_color: bgColor, luminance_offset: 0 },
            ];
            const svc = new TagRecordsService(records);
            expect(svc.getAll()).toHaveLength(2);
        });

        it("does not mutate initial records", () => {
            const records = [
                { id: "1", tag_name: "tag1", color, background_color: bgColor, luminance_offset: 0 },
            ];
            const svc = new TagRecordsService(records);
            svc.add(createRecord("tag2"));
            expect(records).toHaveLength(1);
        });

        it("handles empty initial records", () => {
            const svc = new TagRecordsService([]);
            expect(svc.getAll()).toHaveLength(0);
        });
    });
});
