import { AfterViewInit, Component, ElementRef, NgZone, ViewChild } from '@angular/core';

import { CanvasFlasher } from '../../model/canvasflasher';
import { Color, Flasher } from '../../model/flasher';

@Component({
    moduleId: module.id,
    selector: 'ng-lifecylce-hook-flasher',
    templateUrl: 'flasher.component.html',
    styleUrls: ['flasher.component.css']
})
export class FlasherComponent implements AfterViewInit, Flasher {
    @ViewChild('flashCanvas') flashCanvas: ElementRef;
    private _flasher: Flasher; 

    constructor(private _zone: NgZone) { }

    ngAfterViewInit() {
        this._flasher = new CanvasFlasher(this.flashCanvas.nativeElement);
    }

    flash(color: Color) {
        if (!!this._flasher) {
            this._zone.runOutsideAngular(() => this._flasher.flash(color));
        }
    }

    flashAndPause(color: Color) {
        if (!!this._flasher) {
            this._zone.runOutsideAngular(() => this._flasher.flashAndPause(color));
        }
    }

    unpause() {
        if (!!this._flasher) {
            this._zone.runOutsideAngular(() => this._flasher.unpause());
        }
    }
}
