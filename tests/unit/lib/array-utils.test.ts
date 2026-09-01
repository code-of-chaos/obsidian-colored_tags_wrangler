import { describe, it, expect } from "vitest";
import { arrayMove } from "../../../src/lib/array-utils";

describe("array-utils", () => {
    describe("arrayMove", () => {
        it("moves element forward", () => {
            const arr = [1, 2, 3, 4, 5];
            arrayMove(arr, 1, 3);
            expect(arr).toEqual([1, 3, 4, 2, 5]);
        });

        it("moves element backward", () => {
            const arr = [1, 2, 3, 4, 5];
            arrayMove(arr, 3, 1);
            expect(arr).toEqual([1, 4, 2, 3, 5]);
        });

        it("does nothing when from equals to", () => {
            const arr = [1, 2, 3];
            arrayMove(arr, 1, 1);
            expect(arr).toEqual([1, 2, 3]);
        });

        it("does nothing for out of bounds from", () => {
            const arr = [1, 2, 3];
            arrayMove(arr, -1, 1);
            expect(arr).toEqual([1, 2, 3]);
        });

        it("does nothing for out of bounds to", () => {
            const arr = [1, 2, 3];
            arrayMove(arr, 1, 5);
            expect(arr).toEqual([1, 2, 3]);
        });

        it("handles empty array", () => {
            const arr: number[] = [];
            arrayMove(arr, 0, 1);
            expect(arr).toEqual([]);
        });
    });
});
