import { Component } from '@angular/core';

import { FlashLogPlayback } from '../../../model/flashlogplayback';

@Component({
    moduleId: module.id,
    selector: 'log-playback-controls',
    templateUrl: 'mediabuttons.component.html',
    styleUrls: ['mediabuttons.component.css']
})
export class LogPlaybackControlsComponent {
    constructor(
        public flashLogPlayback: FlashLogPlayback,
    ) {}
}
