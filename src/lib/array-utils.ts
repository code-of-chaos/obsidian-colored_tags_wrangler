export function arrayMove<T>(array: T[], from: number, to: number): void {
    if (from === to) return;
    if (from < 0 || from >= array.length) return;
    if (to < 0 || to >= array.length) return;

    const item = array.splice(from, 1)[0];
    if (item !== undefined) {
        array.splice(to, 0, item);
    }
}
