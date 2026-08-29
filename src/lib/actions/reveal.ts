import { animate, inView } from 'motion';
import { HERO_EASE } from '$lib/components/hero/ease';

let armedAt = 0;
let batchAt = 0;
let batchN = 0;

/**
 * Called from a page's <script> body, which runs on every mount and before any
 * child action. Resets the "was this already on screen at load" window so
 * navigating between pages doesn't compare against module load.
 */
export function armReveals() {
	armedAt = performance.now();
	batchAt = 0;
	batchN = 0;
}

/** Entries crossing into view together get a short cascade; entries that
    trickle in one at a time during a slow scroll get none. */
function nextDelay() {
	const now = performance.now();
	if (now - batchAt > 120) {
		batchAt = now;
		batchN = 0;
	}
	return Math.min(batchN++, 5) * 0.055;
}

/**
 * Fades an element up as it enters view. Nothing is ever pre-hidden: `amount: 0`
 * fires the instant the element's top edge touches the viewport bottom, when 0px
 * of it is visible, and animate() sets the opacity:0 keyframe at that same
 * instant. So there is no frame where visible content disappears, and the worst
 * possible failure is an entry that simply doesn't animate.
 */
export function revealOnView(node: HTMLElement) {
	if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

	let done = false;
	const stop = inView(
		node,
		() => {
			if (done) return;
			done = true;
			stop();
			// Entries already on screen at mount are covered by .page-main's rise-in;
			// animating them again double-fades. Erring long loses one animation the
			// user never sees, erring short shows a visible double-fade.
			if (performance.now() - armedAt < 400) return;
			animate(
				node,
				{ opacity: [0, 1], y: [18, 0] },
				{ duration: 0.55, delay: nextDelay(), ease: HERO_EASE }
			);
		},
		{ amount: 0 }
	);

	return { destroy: stop };
}
