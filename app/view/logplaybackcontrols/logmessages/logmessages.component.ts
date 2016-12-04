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

    ngAfterViewChecked() {
        if (!this.linesContainer || !this.currentStepMarker) {
            return;
        }
        
        if (this.currentStepMarker.nativeElement.parentElement.offsetTop < this.linesContainer.nativeElement.scrollTop 
            || this.currentStepMarker.nativeElement.parentElement.offsetTop > this.linesContainer.nativeElement.scrollTop + this.linesContainer.nativeElement.offsetHeight) {
                this.linesContainer.nativeElement.scrollTop = this.currentStepMarker.nativeElement.parentElement.offsetTop;
        }
    }
}
