import { nanoid } from 'nanoid';
import type { CanvasManager } from './CanvasManager';
import type { CanvasObjectState } from '../types/CanvasObjectState';

export class CanvasObject {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private cm: CanvasManager;

    public id: string;
    public startBeat: number;
    public duration: number;
    public track: number;
    public baseColor: string = '#00d5be';
    public activeColor: string = 'red';

    public _state: CanvasObjectState = 'default';

    get state() {
        return this._state;
    }

    set state(value: CanvasObjectState) {
        if (this._state === value) {
            return;
        }

        this.canvas.style.cursor = this.getCursorByState(value);

        this._state = value;
        this.draw();
    }

    constructor(
        canvas: HTMLCanvasElement,
        cm: CanvasManager,
        ctx: CanvasRenderingContext2D,
        startBeat: number,
        duration: number,
        track: number
    ) {
        this.canvas = canvas;
        this.cm = cm;
        this.ctx = ctx;
        this.id = nanoid();
        this.startBeat = startBeat;
        this.duration = duration;
        this.track = track;
    }

    draw() {
        this.ctx.fillStyle = this.getColorByState();
        this.ctx.beginPath();

        const { x, y, width, height } = this.getMetrics();

        this.ctx.roundRect(x, y + 4 + this.cm.topbarHeight, width, height - 8, [10]);
        this.ctx.fill();
    }

    getMetrics() {
        const width = this.duration * this.cm.beatWidth * this.cm.zoom;
        const height = this.cm.trackHeight;
        const x = this.startBeat * this.cm.beatWidth * this.cm.zoom;
        const y = this.cm.trackHeight * this.track - this.cm.trackHeight;

        return { width, height, x, y };
    }

    mouseMove(mouseX: number, mouseY: number) {
        const isInBounds = this.isCursorWithinBounds(mouseX, mouseY);

        // If I end up needing more states, consider a proper state machine
        if (isInBounds) {
            if (this.state !== 'drag') {
                this.state = 'hover';
                return;
            }
        } else {
            if (this.state !== 'drag') {
                this.state = 'default';
            }
        }
    }

    mouseDown(mouseX: number, mouseY: number) {
        const isInBounds = this.isCursorWithinBounds(mouseX, mouseY);

        if (isInBounds) {
            this.state = 'drag';
            return true;
        }
    }

    mouseUp(mouseX: number, mouseY: number) {
        const isInBounds = this.isCursorWithinBounds(mouseX, mouseY);
        if (isInBounds) {
            this.state = 'hover';
            return;
        }

        this.state = 'default';
    }

    isCursorWithinBounds(mouseX: number, mouseY: number) {
        const { x: objX, y: objY, width, height } = this.getMetrics();

        const topLeft = {
            x: objX + this.ctx.getTransform().e,
            y: objY + this.ctx.getTransform().f + this.cm.topbarHeight,
        };
        const bottomRight = {
            x: objX + width + this.ctx.getTransform().e,
            y: objY + height + this.ctx.getTransform().f + this.cm.topbarHeight,
        };

        if (
            mouseX > topLeft.x &&
            mouseX < bottomRight.x &&
            mouseY > topLeft.y &&
            mouseY < bottomRight.y
        ) {
            return true;
        }
        return false;
    }

    private getColorByState() {
        switch (this.state) {
            case 'drag':
                return 'oklch(0.8593 0.1546 181.3 / 30%)';
            case 'hover':
                return 'oklch(0.8593 0.1546 181.3 )';
            case 'default':
                return 'oklch(0.783 0.1408 181.38)';
            default:
                return 'oklch(0.783 0.1408 181.38)';
        }
    }

    private getCursorByState(state: CanvasObjectState) {
        switch (state) {
            case 'drag':
                return 'pointer';
            case 'hover':
                return 'pointer';
            case 'default':
                return 'default';
            default:
                return 'default';
        }
    }
}
