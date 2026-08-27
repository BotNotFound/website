<script lang="ts">
	import { onMount } from 'svelte';

	const ICON_COLOR = '#424242';
	const BG_COLOR = '#252626';

	const CELL_SIZE = 130;
	const JITTER = 22;

	const REPEL_RADIUS = 120;
	const REPEL_STRENGTH = 1.8;
	const SPRING = 0.02;
	const FRICTION = 0.82;

	let canvasEl: HTMLCanvasElement;

	type Particle = {
		x: number;
		y: number;
		vx: number;
		vy: number;
		baseX: number;
		baseY: number;
		size: number;
		rotation: number;
		shape: (ctx: CanvasRenderingContext2D, size: number) => void;
	};

	function roundedRect(
		ctx: CanvasRenderingContext2D,
		x: number,
		y: number,
		w: number,
		h: number,
		r: number
	) {
		ctx.beginPath();
		ctx.moveTo(x + r, y);
		ctx.arcTo(x + w, y, x + w, y + h, r);
		ctx.arcTo(x + w, y + h, x, y + h, r);
		ctx.arcTo(x, y + h, x, y, r);
		ctx.arcTo(x, y, x + w, y, r);
		ctx.closePath();
	}

	function drawRobot(ctx: CanvasRenderingContext2D, size: number) {
		ctx.strokeStyle = ICON_COLOR;
		ctx.fillStyle = ICON_COLOR;
		ctx.lineWidth = size * 0.12;
		ctx.lineJoin = 'round';
		ctx.lineCap = 'round';

		ctx.beginPath();
		ctx.moveTo(0, -size * 1.55);
		ctx.lineTo(0, -size * 1.15);
		ctx.stroke();
		ctx.beginPath();
		ctx.arc(0, -size * 1.65, size * 0.1, 0, Math.PI * 2);
		ctx.fill();

		roundedRect(ctx, -size * 0.55, -size * 1.15, size * 1.1, size * 0.75, size * 0.18);
		ctx.stroke();

		ctx.beginPath();
		ctx.arc(-size * 0.22, -size * 0.8, size * 0.08, 0, Math.PI * 2);
		ctx.arc(size * 0.22, -size * 0.8, size * 0.08, 0, Math.PI * 2);
		ctx.fill();

		roundedRect(ctx, -size * 0.7, -size * 0.32, size * 1.4, size * 1.0, size * 0.2);
		ctx.stroke();

		ctx.beginPath();
		ctx.arc(-size * 0.25, size * 0.18, size * 0.1, 0, Math.PI * 2);
		ctx.arc(size * 0.25, size * 0.18, size * 0.1, 0, Math.PI * 2);
		ctx.stroke();

		ctx.beginPath();
		ctx.moveTo(-size * 0.7, -size * 0.05);
		ctx.lineTo(-size * 0.98, size * 0.22);
		ctx.moveTo(size * 0.7, -size * 0.05);
		ctx.lineTo(size * 0.98, size * 0.22);
		ctx.stroke();
	}

	function drawComputer(ctx: CanvasRenderingContext2D, size: number) {
		ctx.strokeStyle = ICON_COLOR;
		ctx.lineWidth = size * 0.11;
		ctx.lineJoin = 'round';

		roundedRect(ctx, -size, -size * 0.85, size * 2, size * 1.25, size * 0.14);
		ctx.stroke();

		roundedRect(ctx, -size * 0.78, -size * 0.63, size * 1.56, size * 0.82, size * 0.06);
		ctx.stroke();

		ctx.beginPath();
		ctx.moveTo(-size * 0.28, size * 0.4);
		ctx.lineTo(-size * 0.4, size * 0.68);
		ctx.lineTo(size * 0.4, size * 0.68);
		ctx.lineTo(size * 0.28, size * 0.4);
		ctx.stroke();

		roundedRect(ctx, -size * 0.65, size * 0.68, size * 1.3, size * 0.16, size * 0.07);
		ctx.stroke();
	}

	function drawWrench(ctx: CanvasRenderingContext2D, size: number) {
		ctx.strokeStyle = ICON_COLOR;
		ctx.lineWidth = size * 0.34;
		ctx.lineCap = 'round';
		ctx.beginPath();
		ctx.moveTo(-size * 0.4, -size * 0.4);
		ctx.lineTo(size * 0.4, size * 0.4);
		ctx.stroke();

		ctx.fillStyle = ICON_COLOR;
		for (const [cx, cy] of [
			[-size * 0.62, -size * 0.62],
			[size * 0.62, size * 0.62]
		]) {
			ctx.beginPath();
			ctx.arc(cx, cy, size * 0.42, 0, Math.PI * 2);
			ctx.fill();
			ctx.beginPath();
			ctx.arc(cx, cy, size * 0.2, 0, Math.PI * 2);
			ctx.fillStyle = BG_COLOR;
			ctx.fill();
			ctx.fillStyle = ICON_COLOR;
		}
	}

	function drawScrewdriver(ctx: CanvasRenderingContext2D, size: number) {
		ctx.fillStyle = ICON_COLOR;

		roundedRect(ctx, -size * 0.42, -size * 1.05, size * 0.84, size * 0.52, size * 0.16);
		ctx.fill();

		roundedRect(ctx, -size * 0.1, -size * 0.56, size * 0.2, size * 1.4, size * 0.05);
		ctx.fill();

		ctx.beginPath();
		ctx.moveTo(-size * 0.22, size * 0.82);
		ctx.lineTo(size * 0.22, size * 0.82);
		ctx.lineTo(0, size * 1.05);
		ctx.closePath();
		ctx.fill();
	}

	const shapes = [drawRobot, drawComputer, drawWrench, drawScrewdriver];

	onMount(() => {
		const context = canvasEl.getContext('2d');
		if (!context) return;
		const ctx: CanvasRenderingContext2D = context;

		const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

		let width = 0;
		let height = 0;
		let particles: Particle[] = [];
		let mouseX: number | null = null;
		let mouseY: number | null = null;
		let resizeTimer: ReturnType<typeof setTimeout>;

		function makeParticles() {
			const cols = Math.ceil(width / CELL_SIZE) + 1;
			const rows = Math.ceil(height / CELL_SIZE) + 1;
			particles = [];
			for (let row = 0; row < rows; row++) {
				for (let col = 0; col < cols; col++) {
					const x = col * CELL_SIZE + CELL_SIZE / 2 + (Math.random() - 0.5) * JITTER;
					const y = row * CELL_SIZE + CELL_SIZE / 2 + (Math.random() - 0.5) * JITTER;
					particles.push({
						x,
						y,
						baseX: x,
						baseY: y,
						vx: 0,
						vy: 0,
						size: 18 + Math.random() * 8,
						rotation: (Math.random() - 0.5) * 0.3,
						shape: shapes[Math.floor(Math.random() * shapes.length)]
					});
				}
			}
		}

		function resize() {
			const dpr = Math.min(window.devicePixelRatio || 1, 2);
			width = window.innerWidth;
			height = window.innerHeight;
			canvasEl.width = width * dpr;
			canvasEl.height = height * dpr;
			canvasEl.style.width = `${width}px`;
			canvasEl.style.height = `${height}px`;
			ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
			makeParticles();
		}

		function handlePointerMove(event: PointerEvent) {
			mouseX = event.clientX;
			mouseY = event.clientY;
			wake();
		}

		function handlePointerLeave() {
			mouseX = null;
			mouseY = null;
		}

		function handleResize() {
			clearTimeout(resizeTimer);
			resizeTimer = setTimeout(resize, 150);
		}

		function draw() {
			ctx.clearRect(0, 0, width, height);
			for (const p of particles) {
				ctx.save();
				ctx.translate(p.x, p.y);
				ctx.rotate(p.rotation);
				p.shape(ctx, p.size);
				ctx.restore();
			}
		}

		function step() {
			let anyMoving = false;

			for (const p of particles) {
				if (mouseX !== null && mouseY !== null) {
					const dx = p.x - mouseX;
					const dy = p.y - mouseY;
					const dist = Math.hypot(dx, dy) || 1;
					if (dist < REPEL_RADIUS) {
						const force = ((REPEL_RADIUS - dist) / REPEL_RADIUS) * REPEL_STRENGTH;
						p.vx += (dx / dist) * force;
						p.vy += (dy / dist) * force;
					}
				}

				p.vx += (p.baseX - p.x) * SPRING;
				p.vy += (p.baseY - p.y) * SPRING;
				p.vx *= FRICTION;
				p.vy *= FRICTION;
				p.x += p.vx;
				p.y += p.vy;

				if (Math.abs(p.vx) > 0.02 || Math.abs(p.vy) > 0.02) anyMoving = true;
			}

			draw();

			if (anyMoving || (mouseX !== null && mouseY !== null)) {
				raf = requestAnimationFrame(step);
			} else {
				running = false;
			}
		}

		let raf = 0;
		let running = false;

		function wake() {
			if (!running && !prefersReducedMotion) {
				running = true;
				raf = requestAnimationFrame(step);
			}
		}

		resize();
		draw();
		window.addEventListener('resize', handleResize);
		window.addEventListener('pointermove', handlePointerMove);
		window.addEventListener('pointerleave', handlePointerLeave);

		return () => {
			cancelAnimationFrame(raf);
			clearTimeout(resizeTimer);
			window.removeEventListener('resize', handleResize);
			window.removeEventListener('pointermove', handlePointerMove);
			window.removeEventListener('pointerleave', handlePointerLeave);
		};
	});
</script>

<div class="emoji-background" aria-hidden="true">
	<canvas bind:this={canvasEl}></canvas>
</div>

<style>
	.emoji-background {
		position: fixed;
		inset: 0;
		z-index: -1;
		background: #252626;
		pointer-events: none;
	}

	canvas {
		display: block;
	}
</style>
