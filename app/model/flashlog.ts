import { Color, Flasher } from './flasher';

export interface FlashLogEntry {
    flasher: Flasher,
    color: Color,
    message: string
}

export class FlashLog {
    private _entries: FlashLogEntry[] = [];
    get entries(): ReadonlyArray<FlashLogEntry> {
        return this._entries;
    }

    record: boolean = true;

    get length(): number {
        return this._entries.length;
    }

    clear() {
        this._entries = [];
    }

    getEntry(index: number): FlashLogEntry|undefined {
        return this._entries[index];
    }

    log(entry: FlashLogEntry, flash: boolean = false) {
        if (this.record) {
            this._entries.push(entry);
        }

        if (flash) {
            entry.flasher.flash(entry.color);
        }
    }
}
