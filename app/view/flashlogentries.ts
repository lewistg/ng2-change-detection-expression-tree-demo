import { Color, Flasher } from '../model/flasher';
import { FlashLogEntry } from '../model/flashlog';
import { Expression } from '../model/expression';

export class NgOnChangesCalled implements FlashLogEntry {
    readonly color: Color = {r: 153, g: 255, b: 0};
    readonly message: string = 'ngOnChanges called'
    constructor(public flasher: Flasher) {}
}

export class NgAfterViewChecked implements FlashLogEntry {
    readonly color: Color = {r: 221, g: 0, b: 72};
    readonly message: string = 'ngAfterViewChecked called'
    constructor(public flasher: Flasher) {}
}

export class ExpressionChanged implements FlashLogEntry {
    readonly color: Color = {r: 255, g: 193, b: 7};
    readonly message: string;
    constructor(public flasher: Flasher, prevValue: Expression, nextValue: Expression) {
        this.message = `expression updated: ${prevValue} -> ${nextValue}`;
    }
}
