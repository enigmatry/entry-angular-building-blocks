/* eslint-disable prefer-arrow/prefer-arrow-functions */

/**
 * Convert a camelCased string to kebab-cased.
 */
export function camelToDashCase(input: string): string {
    return input.replace(/[A-Z]/g, char => `-${char.toLowerCase()}`);
}

/**
 * Create a `CustomEvent` (even on browsers where `CustomEvent` is not a constructor).
 */
export function createCustomEvent<T>(doc: Document, name: string, detail: T, bubbles = false): CustomEvent<T> {
    const cancelable = false;

    // On IE9-11, `CustomEvent` is not a constructor.
    if (typeof CustomEvent !== 'function') {
        const event = doc.createEvent('CustomEvent');
        event.initCustomEvent(name, bubbles, cancelable, detail);
        return event;
    }

    return new CustomEvent(name, { bubbles, cancelable, detail });
}

/**
 * Check whether the input is an `Element`.
 */
export function isElement(node: Node | null): node is Element {
    return !!node && node.nodeType === Node.ELEMENT_NODE;
}

/**
 * Check whether the input is a function.
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export function isFunction(value: any): value is Function {
    return typeof value === 'function';
}

/**
 * Convert a kebab-cased string to camelCased.
 */
export function kebabToCamelCase(input: string): string {
    return input.replace(/-([a-z\d])/g, (_, char) => char.toUpperCase());
}

/**
 * Shuffle array
 *
 * @param array any
 */
export function shuffle(array: any[]): void {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

export function shuffleWithFixedPositions(array: any[], fixed: boolean[]): any[] {
    const shuffleIndexes = [];
    const elements = [];
    for (let i = 0; i < array.length; i++) {
        if (!fixed[i]) {
            shuffleIndexes.push(i);
            elements.push(array[i]);
        }
    }
    shuffle(shuffleIndexes);
    return array.map((element, i) => fixed[i] ? element : elements[shuffleIndexes.indexOf(i)]);
}

export function toBoolean(value: 'true' | 'false' | string) {
    return value === 'true' ? true : false;
}
