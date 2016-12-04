import { Component, ElementRef, Input } from '@angular/core';

import { DOMLineSegment, DOMLocation } from '../../model/domgeometry';

@Component({
    moduleId: module.id,
    selector: 'connector',
    templateUrl: 'connector.component.html',
    styleUrls: ['connector.component.css']
})
export class ConnectorComponent {
    private _padding: number = 10;
    private _strokeWidth: number = 2;
    get width(): number {
        return this.domLineSegment.width + (2 * this._padding);
    }
    get height(): number {
        return this.domLineSegment.height + (2 * this._padding);
    }
    get left(): number {
        return Math.min(this.domLineSegment.p0.left, this.domLineSegment.p1.left);
    }
    get top(): number {
        return Math.min(this.domLineSegment.p0.top, this.domLineSegment.p1.top);
    }
    get x0(): number {
        return Math.min(this.domLineSegment.p0.left, this.domLineSegment.p1.left) - this._padding;
    }
    get y0(): number {
        return Math.min(this.domLineSegment.p0.top, this.domLineSegment.p1.top) - this._padding;
    }
    get x1(): number {
        return this.domLineSegment.p0.left - this.x0;
    }
    get y1(): number {
        return this.domLineSegment.p0.top - this.y0;
    }
    get x2(): number {
        return this.domLineSegment.p1.left - this.x0;
    }
    get y2(): number {
        return this.domLineSegment.p1.top - this.y0;
    }

    @Input() domLineSegment: DOMLineSegment;
}
