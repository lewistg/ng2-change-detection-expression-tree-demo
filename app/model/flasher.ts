export interface Color {
    r: number,
    g: number,
    b: number
}

export interface Flash {
    color: Color;
    lifeSpan: number|undefined;
}

export interface Flasher {
    flash(color: Color): void;
    flashAndPause(color: Color): void;
    unpause(): void;
}
