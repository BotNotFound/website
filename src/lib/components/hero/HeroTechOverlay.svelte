<script lang="ts">
	// A CAD-drawing layer sized to the same box as the robot model, so every
	// annotation tracks the robot at any viewport instead of drifting.
	//
	// Coordinates are percentages of that box. The model itself renders across
	// roughly 17%-83% of it (the frustum deliberately leaves ~17% margin each
	// side), so those numbers are the robot's visual bounds and everything here
	// is pinned to them.
	const BOUND_MIN = 17;
	const BOUND_MAX = 83;
	const ARM = 6;
</script>

<div class="hero-tech" aria-hidden="true">
	<svg class="tech-lines" viewBox="0 0 100 100" fill="none">
		<!-- Registration brackets on the robot's bounding box corners. -->
		<g class="tech-bracket">
			<path
				d="M{BOUND_MIN} {BOUND_MIN + ARM} L{BOUND_MIN} {BOUND_MIN} L{BOUND_MIN + ARM} {BOUND_MIN}"
			/>
			<path
				d="M{BOUND_MAX - ARM} {BOUND_MIN} L{BOUND_MAX} {BOUND_MIN} L{BOUND_MAX} {BOUND_MIN + ARM}"
			/>
			<path
				d="M{BOUND_MIN} {BOUND_MAX - ARM} L{BOUND_MIN} {BOUND_MAX} L{BOUND_MIN + ARM} {BOUND_MAX}"
			/>
			<path
				d="M{BOUND_MAX - ARM} {BOUND_MAX} L{BOUND_MAX} {BOUND_MAX} L{BOUND_MAX} {BOUND_MAX - ARM}"
			/>
		</g>

		<!-- Dimension line: the FTC 18in sizing cube the robot must fit inside. -->
		<g class="tech-dim">
			<path d="M17 89 L83 89" />
			<path d="M17 86.6 L17 91.4 M83 86.6 L83 91.4" />
		</g>

		<!-- Callout on the turret, upper-centre of the robot. The leader runs out
		     and slightly down: aimed higher, the label clears the top of the
		     viewport entirely on short screens, since this box overhangs it. -->
		<g class="tech-callout">
			<circle cx="57" cy="27" r="7.5" />
			<path d="M63.6 29.6 L76 30 L84 30" />
		</g>
	</svg>

	<span class="tech-label tech-label--dim">457 mm</span>
	<span class="tech-label tech-label--callout">Turret 270°</span>
</div>

<style>
	/* Absolutely centred rather than placed in the wrapper's grid: a second grid
	   child would be auto-placed into its own row and push the model off centre.
	   Same box as .hero-model-frame, so the two line up exactly. */
	.hero-tech {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		z-index: 2;
		width: min(97vmin, 920px);
		aspect-ratio: 1;
		/* Never intercepts the pointer -- the model's cursor tracking reads
		   pointermove on the window and must stay unobstructed. */
		pointer-events: none;
	}

	.tech-lines {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		overflow: visible;
	}

	/* non-scaling-stroke keeps every line a true hairline no matter how large
	   the box scales, rather than fattening with the viewBox. */
	.tech-lines path,
	.tech-lines circle {
		vector-effect: non-scaling-stroke;
		stroke-width: 1;
		stroke-linecap: round;
		stroke-linejoin: round;
	}

	.tech-bracket path {
		stroke: rgba(255, 255, 255, 0.13);
	}

	.tech-dim path {
		stroke: rgba(255, 255, 255, 0.1);
	}

	.tech-callout circle,
	.tech-callout path {
		stroke: rgba(255, 255, 255, 0.11);
	}

	.tech-label {
		position: absolute;
		font-family: var(--font-body);
		font-size: 9.5px;
		font-weight: var(--weight-regular);
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: rgba(255, 255, 255, 0.26);
		white-space: nowrap;
	}

	.tech-label--dim {
		left: 50%;
		top: 89%;
		transform: translate(-50%, -160%);
	}

	.tech-label--callout {
		left: 84.5%;
		top: 30%;
		transform: translateY(-50%);
	}

	/* Below this the box is narrow enough that the callout label runs into the
	   header's icon buttons, so it only appears where there is room for it. */
	@media (max-width: 899px) {
		.tech-callout,
		.tech-label--callout {
			display: none;
		}
	}
</style>
