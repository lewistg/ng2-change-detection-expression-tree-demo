import { Component } from '@angular/core';

import { FlashLog } from './model/flashlog';
import { FlashLogPlayback } from './model/flashlogplayback';

@Component({
  selector: 'expression-tree-app',
  template: `
    <expression-tree></expression-tree>
    <div class="controls">
        <log-playback-slider></log-playback-slider>
        <log-playback-controls></log-playback-controls>
        <log-playback-messages></log-playback-messages>
        <div (click)="clearPlayback()" class="reset-button">Clear Playback</div>
    </div>
  `,
  providers: [FlashLog, FlashLogPlayback],
  styles: [`
      .controls {
        display: flex;
        -webkit-display: flex;
        flex-direction: column;
        -webkit-flex-direction: column;
        align-items: center;
      }
      .controls log-playback-controls {
        margin-bottom: 10px;
      }
      .reset-button {
        margin-top: 10px;
        font-family: sans-serif;
        font-size: 13px;
        color: gray;
        cursor: pointer;
      }
      .reset-button:hover {
        text-decoration: underline;
      }
  `]
})
export class AppComponent  {
    constructor(private _log: FlashLog, private _flashLogPlayback: FlashLogPlayback) {
        this._log.record = false;
    }

    clearPlayback() {
        this._flashLogPlayback.endCurrentOperation();
        this._log.clear();
    }
}
