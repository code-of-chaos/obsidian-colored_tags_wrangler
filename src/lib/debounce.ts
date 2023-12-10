// ---------------------------------------------------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------------------------------------------------

// ---------------------------------------------------------------------------------------------------------------------
// Code
// ---------------------------------------------------------------------------------------------------------------------
export function debounce<F extends (...args: any[]) => any>(func: F, wait: number) {
    let timeout: ReturnType<typeof setTimeout> | null = null;

    return function(this: ThisParameterType<F>, ...args: Parameters<F>): void {
        const context = this;

        const later = () => {
            timeout = null;
            func.apply(context, args);
        };

        clearTimeout(timeout!);
        timeout = setTimeout(later, wait);
    };
}