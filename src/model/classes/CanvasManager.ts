import { type WheelEvent, type MouseEvent } from 'react';
import { CanvasObject } from './CanvasObject';

export class CanvasManager {
    private canvas;
    private ctx;

    public zoom = 1;
    public barWidth = 15;
    public trackHeight = 80;

    private objects: CanvasObject[];

    constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
        this.canvas = canvas;
        this.ctx = ctx;

        this.objects = [
            new CanvasObject(this, this.ctx, 5, 8, 3),
            new CanvasObject(this, this.ctx, 18, 4, 2),
        ];

        this.draw();
    }

    // Rendering
    drawGrid(amountOfTracks: number) {
        this.ctx.fillStyle = 'oklch(1 0 22 / 5%)';

        for (let i = 0; i < amountOfTracks; i++) {
            this.ctx.fillRect(0, this.trackHeight * (i + 1), this.canvas.width, 1);
        }

        this.ctx.fillStyle = 'oklch(1 0 22 / 2%)';
        for (let i = 0; i < 100; i++) {
            this.ctx.fillRect(
                (i + 1) * (this.barWidth * this.zoom),
                0,
                1,
                amountOfTracks * this.trackHeight
            );
        }
    }

    drawObjects() {
        this.objects.forEach((object) => object.draw());
    }

    draw() {
        this.drawGrid(10);
        this.drawObjects();
    }

    clear() {
        this.ctx.resetTransform();
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    // Event Handlers
    onScroll(e: WheelEvent) {
        const currentTransform = this.ctx.getTransform();

        const newX = currentTransform.e + e.deltaY * -1;
        const newY = currentTransform.f + e.deltaY * -1;

        if (e.shiftKey) {
            if (newX > 0) {
                return;
            }
        } else {
            if (newY > 0) {
                return;
            }
        }

        this.clear();

        if (e.shiftKey) {
            this.ctx.setTransform({
                a: 1,
                b: 0,
                c: 0,
                d: 1,
                e: newX,
                f: currentTransform.f,
            });
        } else {
            this.ctx.setTransform({
                a: 1,
                b: 0,
                c: 0,
                d: 1,
                e: currentTransform.e,
                f: newY,
            });
        }

        this.draw();
    }

    onMouseMove(e: MouseEvent) {
        const { x, y } = this.mouseToCanvasCoords(e.pageX, e.pageY);

        this.objects.find((object) => object.hover(x, y));
    }

    onClick(e: MouseEvent) {
        const { x, y } = this.mouseToCanvasCoords(e.pageX, e.pageY);

        const foundObject = this.objects.find((object) => {
            const { x: objX, y: objY, width, height } = object.getMetrics();

            const topLeft = { x: objX, y: objY };
            const bottomRight = { x: objX + width, y: objY + height };

            if (x > topLeft.x && x < bottomRight.x && y > topLeft.y && y < bottomRight.y) {
                return object;
            }
        });

        console.log(foundObject);
        // Do something with found object..
    }

    // Helpers
    private mouseToCanvasCoords(mouseX: number, mouseY: number) {
        const rect = this.canvas.getBoundingClientRect();
        const x = mouseX - rect.left;
        const y = mouseY - rect.top;
        return { x, y };
    }
}
