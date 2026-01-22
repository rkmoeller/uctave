import { nanoid } from 'nanoid';
import type { CanvasManager } from './CanvasManager';

export class CanvasObject {
    private ctx: CanvasRenderingContext2D;
    private cm: CanvasManager;

    public id: string;
    public startBeat: number;
    public duration: number;
    public track: number;
    public baseColor: string = '#00d5be';
    public activeColor: string = 'red';

    public _state: 'default' | 'hovered' | 'dragging' = 'default';

    get state() {
        return this._state;
    }

    set state(value: 'default' | 'hovered' | 'dragging') {
        if (this._state === value) {
            return;
        }

        this._state = value;
        this.draw();
    }

    constructor(
        cm: CanvasManager,
        ctx: CanvasRenderingContext2D,
        startBeat: number,
        duration: number,
        track: number
    ) {
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
            if (this.state !== 'dragging') {
                this.state = 'hovered';
                return;
            }
        } else {
            if (this.state !== 'dragging') {
                this.state = 'default';
            }
        }
    }

    mouseDown(mouseX: number, mouseY: number) {
        const isInBounds = this.isCursorWithinBounds(mouseX, mouseY);

        if (isInBounds) {
            this.state = 'dragging';
            return true;
        }
    }

    mouseUp(mouseX: number, mouseY: number) {
        const isInBounds = this.isCursorWithinBounds(mouseX, mouseY);
        if (isInBounds) {
            this.state = 'hovered';
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
            case 'dragging':
                return 'red';
            case 'hovered':
                return 'red';
            case 'default':
                return '#00d5be';
            default:
                return '#00d5be';
        }
    }
}
