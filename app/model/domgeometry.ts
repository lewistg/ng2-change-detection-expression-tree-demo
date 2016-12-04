export interface DOMLocation {
    top: number,
    left: number
}

export function subtract(p0: DOMLocation, p1: DOMLocation) {
    return {
        top: p0.top - p1.top,
        left: p0.left - p1.left
    };
}

export class DOMLineSegment {
    get width() {
        return Math.abs(this.p0.left - this.p1.left);
    }
    get height() {
        return Math.abs(this.p0.top - this.p1.top);
    }

    constructor(public p0: DOMLocation, public p1: DOMLocation) {}
}

export function getClientRectLocation(element: HTMLElement, xInterpolation: number = 0, yInterpolation: number = 0) {
    let rect = element.getBoundingClientRect();
    return {
        top: rect.top + (yInterpolation * rect.height),
        left: rect.left + (xInterpolation * rect.width)
    }
}
