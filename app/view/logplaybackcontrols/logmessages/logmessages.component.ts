import { AfterViewChecked, Component, ElementRef, ViewChild } from '@angular/core';

import { FlashLog, FlashLogEntry } from '../../../model/flashlog';
import { FlashLogPlayback } from '../../../model/flashlogplayback';

@Component({
    moduleId: module.id,
    selector: 'log-playback-messages',
    templateUrl: 'logmessages.component.html',
    styleUrls: ['logmessages.component.css']
})
export class LogMessagesPlaybackComponent implements AfterViewChecked {
    @ViewChild('linesContainer') linesContainer: ElementRef;
    @ViewChild('currentStepMarker') currentStepMarker: ElementRef;

    constructor(public log: FlashLog, public flashLogPlayback: FlashLogPlayback) {}

    lineColor(entry: FlashLogEntry): string {
        return `rgb(${entry.color.r}, ${entry.color.g}, ${entry.color.b})`
    }

    private _setScrollDuringRecording() {
        if (!this.linesContainer) {
            return;
        }
        this.linesContainer.nativeElement.scrollTop = this.linesContainer.nativeElement.scrollHeight;
    }

    private _setScrollDuringPlayback() {
        if (!this.linesContainer || !this.currentStepMarker) {
            return;
        }

        let containerElt = this.linesContainer.nativeElement;
        let markerElt = this.currentStepMarker.nativeElement;

        if (markerElt.offsetTop < containerElt.scrollTop) {
            containerElt.scrollTop = markerElt.offsetTop
        }

        let markerEltOffsetBottom = markerElt.offsetTop + markerElt.offsetHeight;
        if (markerEltOffsetBottom > containerElt.scrollTop + containerElt.offsetHeight) {
            containerElt.scrollTop = markerEltOffsetBottom - containerElt.offsetHeight;
        }
    }

    ngAfterViewChecked() {
        if (this.flashLogPlayback.isRecording) {
            this._setScrollDuringRecording();
        } else if (this.flashLogPlayback.isPlayingBack) {
            this._setScrollDuringPlayback();
        }
    }
}
