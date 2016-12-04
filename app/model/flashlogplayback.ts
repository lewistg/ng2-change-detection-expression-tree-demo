import { Injectable } from '@angular/core';

import { FlashLog, FlashLogEntry } from './flashlog';

@Injectable()
export class FlashLogPlayback {
    private _currEntryIndex: number = -1;

    get isRecording(): boolean {
        return this._log.record;
    }

    get isPlayingBack(): boolean {
        return this._currEntryIndex > -1;
    }

    get canPlayback(): boolean {
        return this._log.length > 0 && !this._log.record;
    }

    get canStepForwards(): boolean {
        return this.isPlayingBack && this._currEntryIndex < this._log.length - 1;
    }

    get canStepBackwards(): boolean {
        return this.isPlayingBack && this._currEntryIndex > 0;
    }

    get currEntryIndex(): number {
        return this._currEntryIndex;
    }
    set currEntryIndex(value: number) {
        this._currEntryIndex = Math.max(0, Math.min(this._log.length, value));
    }

    get currEntry(): FlashLogEntry {
        if (this.isPlayingBack) {
            return this._log.getEntry(this._currEntryIndex);
        }
    }

    constructor(private _log: FlashLog) { }

    toggleRecording() {
        if (this.isRecording) {
            this.endRecording();
        } else {
            this.startRecording();
        }
    }

    startRecording() {
        if (this.currEntry) {
            this.currEntry.flasher.unpause();
        }
        this._log.record = true;
        this._log.clear();
        this._currEntryIndex = -1;
    }

    endRecording() {
        this._log.record = false;
    }

    startPlayback() {
        if (this.canPlayback) {
            this._currEntryIndex = 0;
            this.currEntry.flasher.flashAndPause(this.currEntry.color);
        }
    }

    endPlayback() {
        if (this.currEntry) {
            this.currEntry.flasher.unpause();
        }
        this._currEntryIndex = -1;
    }

    jumpToEntry(entryIndex: number) {
        let prevCurrEntry = this.currEntry;
        this._currEntryIndex = Math.max(0, Math.min(this._log.length, entryIndex));
        if (this.currEntry == prevCurrEntry) {
            return;
        } else {
            if (!!prevCurrEntry) {
                prevCurrEntry.flasher.unpause()
            }
            this.currEntry.flasher.flashAndPause(this.currEntry.color);
        }
    }

    stepForwards() {
        if (this.canStepForwards) {
            this.jumpToEntry(this._currEntryIndex + 1);
        }
    }

    stepBackwards() {
        if (this.canStepBackwards) {
            this.jumpToEntry(this._currEntryIndex - 1);
        }
    }
}
