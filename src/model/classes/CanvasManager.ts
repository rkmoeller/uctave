import { type MouseEvent } from 'react';
import { CanvasObject } from './CanvasObject';

export class CanvasManager {
    private canvas;
    private ctx;

    public zoom = 1;
    public beatWidth = 15;
    public trackHeight = 80;
    public topbarHeight = 25;

    private objects: CanvasObject[] = [];

    private draggedObject: CanvasObject | undefined;
    private dragStart: { x: number; y: number } | undefined;
    private dragStartBeat: number | undefined;
    private dragStartTrack: number | undefined;

    private rafId: number | null = null;
    private needsRender = false;

    constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
        this.canvas = canvas;
        this.ctx = ctx;

        this.clear();
        this.render();
    }

    setObjects(objects: { startBeat: number; duration: number; track: number }[]) {
        this.objects = objects.map((o) => {
            return new CanvasObject(this.canvas, this, this.ctx, o.startBeat, o.duration, o.track);
        });

        this.clear();
        this.render();
    }

    // Rendering
    drawGrid(amountOfTracks: number) {
        this.ctx.fillStyle = 'oklch(1 0 22 / 5%)';
        // Draw horizontal track lines
        for (let i = 0; i < amountOfTracks; i++) {
            this.ctx.fillRect(
                0,
                this.trackHeight * (i + 1) + this.topbarHeight,
                this.canvas.width,
                1
            );
        }

        // Draw vertical beat lines
        for (let i = 0; i < this.canvas.width / this.beatWidth; i++) {
            if ((i + 1) % 4 === 0) {
                this.ctx.fillStyle = 'oklch(1 0 22 / 3%)';
            } else {
                this.ctx.fillStyle = 'oklch(1 0 22 / 1%)';
            }

            this.ctx.fillRect(
                (i + 1) * (this.beatWidth * this.zoom),
                this.topbarHeight,
                1,
                amountOfTracks * this.trackHeight
            );
        }
    }

    drawTopbar() {
        const savedTransform = this.ctx.getTransform();
        this.ctx.setTransform(1, 0, 0, 1, savedTransform.e, 0);

        this.ctx.fillStyle = 'oklch(0.1839 0.0041 285.97)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.topbarHeight);

        this.ctx.fillStyle = 'oklch(1 0 22 / 5%)';
        this.ctx.fillRect(0, this.topbarHeight, this.canvas.width, 1);

        this.ctx.fillStyle = 'oklch(1 0 22 / 20%)';
        for (let i = 0; i < this.canvas.width / (this.beatWidth * 4); i++) {
            this.ctx.font = '200 12px inter ';
            this.ctx.fillText(`${i}`, i * (this.beatWidth * 4 * this.zoom) + 8, 17);
        }

        this.ctx.fillStyle = 'oklch(1 0 22 / 3%)';
        for (let i = 0; i < this.canvas.width / (this.beatWidth * 4); i++) {
            this.ctx.fillRect((i + 1) * (this.beatWidth * 4 * this.zoom), 0, 1, this.topbarHeight);
        }

        this.ctx.setTransform(savedTransform);
    }

    drawObjects() {
        this.objects.forEach((object) => object.draw());
    }

    render() {
        this.drawGrid(10);
        this.drawObjects();
        this.drawTopbar();
    }

    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    // Event Handlers
    onScroll(e: WheelEvent) {
        const currentTransform = this.ctx.getTransform();

        const newX = currentTransform.e + e.deltaY * -1;
        const newY = currentTransform.f + e.deltaY * -1;

        if (e.ctrlKey) {
            e.preventDefault();
            this.zoom = Math.max(this.zoom + (e.deltaY / 1000) * -1, 0.5);
            this.clear();
            this.render();
            return;
        }

        if (e.shiftKey) {
            if (newX > 0) {
                return;
            }
        } else {
            if (newY > 0) {
                return;
            }
        }

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

        this.clear();
        this.render();
    }

    onMouseMove(e: MouseEvent) {
        const { x, y } = this.mouseToCanvasCoords(e.pageX, e.pageY);

        this.objects.forEach((object) => object.mouseMove(x, y));

        if (
            this.draggedObject !== undefined &&
            this.dragStart !== undefined &&
            this.dragStartBeat !== undefined
        ) {
            const dragDiff = x - this.dragStart.x;

            const beatDiff = Math.round(dragDiff / (this.beatWidth * this.zoom));

            // Only rerender if the beat actually changes
            if (this.draggedObject.startBeat !== this.dragStartBeat + beatDiff) {
                this.draggedObject.startBeat = this.dragStartBeat + beatDiff;

                this.clear();
                this.render();
            }

            // this.draggedObject.startBeat = this.dragStartBeat + beatDiff;
            // this.scheduleRender();
        }
    }

    onMouseDown(e: MouseEvent) {
        const { x, y } = this.mouseToCanvasCoords(e.pageX, e.pageY);

        const obj = this.objects.find((object) => object.mouseDown(x, y));

        this.dragStart = { x, y };
        this.dragStartBeat = obj?.startBeat;
        this.dragStartTrack = obj?.track;
        this.draggedObject = obj;
    }

    onMouseUp(e: MouseEvent) {
        const { x, y } = this.mouseToCanvasCoords(e.pageX, e.pageY);
        if (this.draggedObject) {
            this.draggedObject?.mouseUp(x, y);
            this.draggedObject = undefined;
        }
    }

    // Helpers
    private mouseToCanvasCoords(mouseX: number, mouseY: number) {
        const rect = this.canvas.getBoundingClientRect();
        const x = mouseX - rect.left;
        const y = mouseY - rect.top;
        return { x, y };
    }

    private getTrackByCoords(x: number, y: number) {
        //
    }

    private scheduleRender() {
        if (this.needsRender) return;

        this.needsRender = true;
        this.rafId = requestAnimationFrame(() => {
            this.clear();
            this.render();
            this.needsRender = false;
        });
    }
}
