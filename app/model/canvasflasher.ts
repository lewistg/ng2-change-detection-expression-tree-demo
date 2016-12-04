import { Flasher, Flash, Color } from './flasher';

export class CanvasFlasher implements Flasher {
    private static readonly FLASH_LIFESPAN = 1000.0;
    private _context: CanvasRenderingContext2D;
    private _flashes: Flash[] = [];
    private _prevTime: number|undefined;
    private _animationCallbackId: number|undefined;

    constructor(private _canvas: HTMLCanvasElement) {
        this._context = <CanvasRenderingContext2D> this._canvas.getContext('2d');
    }

    flash(color: Color) {
        this._flashes.push({
            color: color,
            lifeSpan: undefined
        })

        if (this._flashes.length == 1) {
            this._step();
        }
    }

    flashAndPause(color: Color) {
        cancelAnimationFrame(this._animationCallbackId);

        this._flashes.push({
            color: color,
            lifeSpan: undefined
        })
        this._draw();
    }

    unpause() {
        this._step();
    }

    private _draw() {
        this._context.clearRect(
            0,
            0,
            this._canvas.width,
            this._canvas.height);

        this._flashes.forEach((flash) => {
            let opacity = 1 - ((flash.lifeSpan || 0) / CanvasFlasher.FLASH_LIFESPAN);
            this._context.fillStyle =
                `rgba(${flash.color.r}, ${flash.color.g}, ${flash.color.b}, ${opacity})`
            this._context.fillRect(0, 0, this._canvas.width, this._canvas.height);
        });
    }

    private _step() {
        let currTime = Date.now();
        let timeDelta = (this._prevTime === undefined ? 0 : currTime - this._prevTime);

        let unexpiredFlashes: Flash[] = [];
        this._flashes.forEach((flash) => {
            if (flash.lifeSpan === undefined) {
                flash.lifeSpan = 0;
            } else {
                flash.lifeSpan += timeDelta;
            }

            if (flash.lifeSpan > CanvasFlasher.FLASH_LIFESPAN) {
                return;
            }

            unexpiredFlashes.push(flash);
        });
        this._flashes = unexpiredFlashes;

        this._draw();

        if (this._flashes.length > 0) {
            this._animationCallbackId = requestAnimationFrame(() => this._step());
            this._prevTime = currTime;
        } else {
            this._prevTime = undefined;
        }
    }
}
