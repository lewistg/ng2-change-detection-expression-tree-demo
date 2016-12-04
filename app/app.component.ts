import { Component } from '@angular/core';

import { FlashLog } from './model/flashlog';
import { FlashLogPlayback } from './model/flashlogplayback';

@Component({
  selector: 'my-app',
  template: `
    <expression-tree></expression-tree>
    <div class="controls">
        <log-playback-slider></log-playback-slider>
        <log-playback-controls></log-playback-controls>
        <log-playback-messages></log-playback-messages>
    </div>
  `,
  providers: [FlashLog, FlashLogPlayback],
  styles: [`
      .controls {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      .controls log-playback-controls {
        margin-bottom: 10px;
      }
  `]
})
export class AppComponent  { 
    constructor(private _log: FlashLog) {
        this._log.record = false;
    }
}
