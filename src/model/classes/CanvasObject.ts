import { nanoid } from 'nanoid';
import type { CanvasManager } from './CanvasManager';

export class CanvasObject {
    private ctx: CanvasRenderingContext2D;
    private cm: CanvasManager;

    public id: string;
    public startBeat: number;
    public duration: number;
    public track: number;
    public color: string;

    private _isHovered: boolean = false;

    get isHovered() {
        return this._isHovered;
    }

    set isHovered(value: boolean) {
        if (value === true) {
            this.color = 'red';
            if (this.isHovered !== true) {
                this.draw();
            }
        } else {
            this.color = '#00d5be';
            if (this.isHovered === true) {
                this.draw();
            }
        }

        this._isHovered = value;
    }

    private isDragging: boolean = false;

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
        this.color = '#00d5be';
    }

    draw() {
        this.ctx.fillStyle = this.color;
        this.ctx.beginPath();

        const { x, y, width, height } = this.getMetrics();

        this.ctx.roundRect(x, y + 4, width, height - 8, [10]);
        this.ctx.fill();
    }

    getMetrics() {
        const width = this.duration * this.cm.barWidth * this.cm.zoom;
        const height = this.cm.trackHeight;
        const x = this.startBeat * this.cm.barWidth * this.cm.zoom;
        const y = this.cm.trackHeight * this.track - this.cm.trackHeight;

        return { width, height, x, y };
    }

    mouseMove(mouseX: number, mouseY: number) {
        const { x: objX, y: objY, width, height } = this.getMetrics();

        const topLeft = {
            x: objX + this.ctx.getTransform().e,
            y: objY + this.ctx.getTransform().f,
        };
        const bottomRight = {
            x: objX + width + this.ctx.getTransform().e,
            y: objY + height + this.ctx.getTransform().f,
        };

        if (
            mouseX > topLeft.x &&
            mouseX < bottomRight.x &&
            mouseY > topLeft.y &&
            mouseY < bottomRight.y
        ) {
            this.isHovered = true;
        } else {
            this.isHovered = false;
        }
    }

    mouseDown(mouseX: number, mouseY: number) {
        const { x: objX, y: objY, width, height } = this.getMetrics();

        const topLeft = {
            x: objX + this.ctx.getTransform().e,
            y: objY + this.ctx.getTransform().f,
        };
        const bottomRight = {
            x: objX + width + this.ctx.getTransform().e,
            y: objY + height + this.ctx.getTransform().f,
        };

        if (
            mouseX > topLeft.x &&
            mouseX < bottomRight.x &&
            mouseY > topLeft.y &&
            mouseY < bottomRight.y
        ) {
            this.isDragging = true;
            return true;
        }
    }

    mouseUp() {
        this.isDragging = false;
    }
}
