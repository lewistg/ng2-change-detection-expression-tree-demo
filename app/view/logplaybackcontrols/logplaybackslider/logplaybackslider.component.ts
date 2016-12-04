import { Component, NgZone } from '@angular/core';

import { FlashLog } from '../../../model/flashlog';
import { FlashLogPlayback } from '../../../model/flashlogplayback';

@Component({
    moduleId: module.id,
    selector: 'log-playback-slider',
    templateUrl: 'logplaybackslider.component.html',
    styleUrls: ['logplaybackslider.component.css']
})
export class LogPlaybackSliderComponent {
    constructor(
        public log: FlashLog, 
        public flashLogPlayback: FlashLogPlayback,
        private _zone: NgZone
    ) { }

    onValueChange(entryIndex: number) {
        this.flashLogPlayback.jumpToEntry(entryIndex);
    }
}
