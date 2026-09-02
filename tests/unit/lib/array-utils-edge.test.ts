import { describe, it, expect } from "vitest";
import { arrayMove } from "../../../src/lib/array-utils";

describe("array-utils edge cases", () => {
    describe("arrayMove", () => {
        it("handles single element array", () => {
            const arr = [1];
            arrayMove(arr, 0, 0);
            expect(arr).toEqual([1]);
        });

        it("handles two element array move forward", () => {
            const arr = [1, 2];
            arrayMove(arr, 0, 1);
            expect(arr).toEqual([2, 1]);
        });

        it("handles two element array move backward", () => {
            const arr = [1, 2];
            arrayMove(arr, 1, 0);
            expect(arr).toEqual([2, 1]);
        });

        it("handles move to same position", () => {
            const arr = [1, 2, 3];
            arrayMove(arr, 1, 1);
            expect(arr).toEqual([1, 2, 3]);
        });

        it("handles move to first position", () => {
            const arr = [1, 2, 3, 4];
            arrayMove(arr, 3, 0);
            expect(arr).toEqual([4, 1, 2, 3]);
        });

        it("handles move to last position", () => {
            const arr = [1, 2, 3, 4];
            arrayMove(arr, 0, 3);
            expect(arr).toEqual([2, 3, 4, 1]);
        });

        it("handles negative from index", () => {
            const arr = [1, 2, 3];
            arrayMove(arr, -1, 0);
            expect(arr).toEqual([1, 2, 3]);
        });

        it("handles negative to index", () => {
            const arr = [1, 2, 3];
            arrayMove(arr, 0, -1);
            expect(arr).toEqual([1, 2, 3]);
        });

        it("handles from index >= length", () => {
            const arr = [1, 2, 3];
            arrayMove(arr, 5, 0);
            expect(arr).toEqual([1, 2, 3]);
        });

        it("handles to index >= length", () => {
            const arr = [1, 2, 3];
            arrayMove(arr, 0, 5);
            expect(arr).toEqual([1, 2, 3]);
        });

        it("handles empty array", () => {
            const arr: number[] = [];
            arrayMove(arr, 0, 1);
            expect(arr).toEqual([]);
        });

        it("handles string array", () => {
            const arr = ["a", "b", "c"];
            arrayMove(arr, 0, 2);
            expect(arr).toEqual(["b", "c", "a"]);
        });

        it("handles object array", () => {
            const arr = [{ id: 1 }, { id: 2 }, { id: 3 }];
            arrayMove(arr, 0, 2);
            expect(arr).toEqual([{ id: 2 }, { id: 3 }, { id: 1 }]);
        });

        it("preserves references", () => {
            const obj1 = { id: 1 };
            const obj2 = { id: 2 };
            const arr = [obj1, obj2];
            arrayMove(arr, 0, 1);
            expect(arr[0]).toBe(obj2);
            expect(arr[1]).toBe(obj1);
        });

        it("handles consecutive moves", () => {
            const arr = [1, 2, 3, 4, 5];
            arrayMove(arr, 0, 1); // [2, 1, 3, 4, 5]
            arrayMove(arr, 1, 2); // [2, 3, 1, 4, 5]
            expect(arr).toEqual([2, 3, 1, 4, 5]);
        });
    });
});
