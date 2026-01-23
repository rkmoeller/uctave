import { type MouseEvent } from 'react';
import { CanvasObject } from './CanvasObject';
import * as Tone from 'tone';

export class CanvasManager {
    private canvas;
    private ctx;

    public bpm = 128;

    public zoom = 1;
    public beatWidth = 15;
    public trackHeight = 80;
    public topbarHeight = 25;

    public tracks = 10;

    private objects: CanvasObject[] = [];

    private draggedObject: CanvasObject | undefined;
    private dragStart: { x: number; y: number } | undefined;
    private dragStartBeat: number | undefined;
    private dragStartTrack: number | undefined;

    private playheadPosition: number = 0; // Current beat position
    private rafId: number | null = null;

    constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
        this.canvas = canvas;
        this.ctx = ctx;

        this.render();
    }

    setObjects(objects: { startBeat: number; duration: number; track: number }[]) {
        this.objects = objects.map((o) => {
            return new CanvasObject(this.canvas, this, this.ctx, o.startBeat, o.duration, o.track);
        });

        this.render();
    }

    // Rendering
    private drawGrid() {
        this.ctx.fillStyle = 'oklch(1 0 22 / 5%)';
        // Draw horizontal track lines
        for (let i = 0; i < this.tracks; i++) {
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
                this.tracks * this.trackHeight
            );
        }
    }

    private drawTopbar() {
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

    private drawTimeIndicator() {
        const savedTransform = this.ctx.getTransform();
        this.ctx.setTransform(1, 0, 0, 1, savedTransform.e, 0);
        this.ctx.translate(this.playheadPosition * this.zoom, 0);

        const center = 0;
        const width = 18;
        const height = 24;

        // Line
        this.ctx.fillStyle = 'oklch(1 0 22 / 10%)';
        this.ctx.fillRect(0, height, 1, this.canvas.height);

        // Hand
        this.ctx.beginPath();
        this.ctx.moveTo((width / 2) * -1, 0); // Set starting point at top left
        this.ctx.lineTo(width / 2, 0); // Straight line to top right
        this.ctx.lineTo(width / 2, height / 3); // Top right straight vertical
        this.ctx.quadraticCurveTo(4, height, center, height); // Right curve to point
        this.ctx.quadraticCurveTo(-4, height, (width / 2) * -1, height / 3); // Left curve to point
        this.ctx.lineTo((width / 2) * -1, 0); // Top left straight vertical

        this.ctx.closePath();

        this.ctx.fillStyle = 'oklch(0.3457 0.0041 285.97 / 70%)';
        this.ctx.fill();

        this.ctx.lineWidth = 1;

        this.ctx.setTransform(savedTransform);
    }

    drawObjects() {
        this.objects.forEach((object) => object.draw());
    }

    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    render() {
        this.clear();

        this.drawGrid();
        this.drawObjects();
        this.drawTopbar();
        this.drawTimeIndicator();
    }

    // Event Handlers
    onScroll(e: WheelEvent) {
        const currentTransform = this.ctx.getTransform();

        const newX = currentTransform.e + e.deltaY * -1;
        const newY = currentTransform.f + e.deltaY * -1;

        // Clamp zoom to 0.5
        if (e.ctrlKey) {
            e.preventDefault();
            this.zoom = Math.max(this.zoom + (e.deltaY / 1000) * -1, 0.5);
            this.render();
            return;
        }

        // Min clamp scroll to 0
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

        this.render();
    }

    onMouseMove(e: MouseEvent) {
        const { x, y } = this.mouseToCanvasCoords(e.pageX, e.pageY);

        this.objects.forEach((object) => object.mouseMove(x, y));

        let needsRender = false;

        if (
            this.draggedObject !== undefined &&
            this.dragStart !== undefined &&
            this.dragStartBeat !== undefined
        ) {
            const dragDiff = x - this.dragStart.x;
            const beatDiff = Math.round(dragDiff / (this.beatWidth * this.zoom));

            const track = this.getTrackByYCoords(y);
            if (track && track !== this.draggedObject.track) {
                this.draggedObject.track = track;
                needsRender = true;
            }

            // Only rerender if the beat actually changes
            if (this.draggedObject.startBeat !== this.dragStartBeat + beatDiff) {
                this.draggedObject.startBeat = this.dragStartBeat + beatDiff;
                needsRender = true;
            }

            if (needsRender) this.render();
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

    // Actions
    startPlayback() {
        Tone.getTransport().start();
        this.startPlayheadAnimation();
    }

    pausePlayback() {
        Tone.getTransport().pause();
        this.stopPlayheadAnimation();
    }

    stopPlayback() {
        Tone.getTransport().stop();
        this.playheadPosition = 0;
        this.stopPlayheadAnimation();
        this.render();
    }

    private startPlayheadAnimation() {
        Tone.getTransport().set({ bpm: this.bpm });

        const animate = () => {
            // Get current position in beats
            this.playheadPosition =
                (this.bpm / 60) * Tone.getTransport().seconds * this.beatWidth * this.zoom;

            this.render();

            this.rafId = requestAnimationFrame(animate);
        };

        animate();
    }

    private stopPlayheadAnimation() {
        if (this.rafId !== null) {
            cancelAnimationFrame(this.rafId);
            this.rafId = null;
        }
    }

    // Helpers
    private mouseToCanvasCoords(mouseX: number, mouseY: number) {
        const rect = this.canvas.getBoundingClientRect();
        const x = mouseX - rect.left;
        const y = mouseY - rect.top;
        return { x, y };
    }

    private getTrackByYCoords(y: number): number | undefined {
        const adjustedY = y - this.topbarHeight;

        if (adjustedY < 0 || adjustedY > this.tracks * this.trackHeight) return undefined;

        const trackIndex = Math.floor(adjustedY / this.trackHeight);

        if (trackIndex >= 0 && trackIndex < this.tracks) {
            return trackIndex + 1;
        }
    }
}
