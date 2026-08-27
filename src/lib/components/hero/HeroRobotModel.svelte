<script lang="ts">
	import { onMount } from 'svelte';
	import * as THREE from 'three';
	import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
	import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
	import { heroModel } from '$lib/state/heroModel.svelte';

	const MODEL_URL = '/robots/robot.glb';
	const DRACO_DECODER_PATH = '/draco/';

	// How far the model tilts toward the cursor, in radians -- kept tiny so
	// it barely moves, just enough to feel alive.
	const MAX_YAW = 0.06;
	const MAX_PITCH = 0.03;
	const DAMPING = 0.06;
	const SETTLE_EPSILON = 0.0005;
	// A front-left 3/4 view: -45 degrees shows the shooter mechanism and the
	// left side face together.
	const BASE_ROTATION_Y = -Math.PI / 4;
	const BASE_ROTATION_X = 0.12;

	let containerEl: HTMLDivElement;

	onMount(() => {
		const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

		const scene = new THREE.Scene();
		const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
		camera.position.set(0, 0, 5);

		// This model is ~4.8M triangles -- far heavier than a typical web asset.
		// Antialiasing and a capped pixel ratio keep the per-frame GPU cost down;
		// the render loop below only runs while the tilt is actually animating.
		const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true });
		renderer.setClearColor(0x000000, 0);
		renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
		renderer.outputColorSpace = THREE.SRGBColorSpace;
		renderer.toneMapping = THREE.ACESFilmicToneMapping;
		renderer.toneMappingExposure = 1.1;
		containerEl.appendChild(renderer.domElement);

		scene.add(new THREE.HemisphereLight(0xffffff, 0x222233, 1.3));
		const keyLight = new THREE.DirectionalLight(0xffffff, 1.6);
		keyLight.position.set(3, 5, 4);
		scene.add(keyLight);
		const fillLight = new THREE.DirectionalLight(0xffffff, 0.5);
		fillLight.position.set(-3, 1, -3);
		scene.add(fillLight);

		const pivot = new THREE.Group();
		pivot.rotation.set(BASE_ROTATION_X, BASE_ROTATION_Y, 0);
		scene.add(pivot);

		let targetYaw = 0;
		let targetPitch = 0;
		let currentYaw = 0;
		let currentPitch = 0;
		let raf = 0;
		let running = false;
		let disposed = false;

		function resize() {
			const width = containerEl.clientWidth;
			const height = containerEl.clientHeight;
			if (width === 0 || height === 0) return;
			renderer.setSize(width, height);
			camera.aspect = width / height;
			camera.updateProjectionMatrix();
		}

		function renderFrame() {
			renderer.render(scene, camera);
		}

		function animate() {
			currentYaw += (targetYaw - currentYaw) * DAMPING;
			currentPitch += (targetPitch - currentPitch) * DAMPING;
			pivot.rotation.y = BASE_ROTATION_Y + currentYaw;
			pivot.rotation.x = BASE_ROTATION_X + currentPitch;
			renderFrame();

			const settled =
				Math.abs(targetYaw - currentYaw) < SETTLE_EPSILON &&
				Math.abs(targetPitch - currentPitch) < SETTLE_EPSILON;
			if (settled) {
				running = false;
			} else {
				raf = requestAnimationFrame(animate);
			}
		}

		function wake() {
			if (!running && !prefersReducedMotion) {
				running = true;
				raf = requestAnimationFrame(animate);
			}
		}

		function handlePointerMove(event: PointerEvent) {
			const nx = (event.clientX / window.innerWidth) * 2 - 1;
			const ny = (event.clientY / window.innerHeight) * 2 - 1;
			targetYaw = nx * MAX_YAW;
			targetPitch = ny * MAX_PITCH;
			wake();
		}

		const resizeObserver = new ResizeObserver(() => {
			resize();
			renderFrame();
		});
		resizeObserver.observe(containerEl);
		resize();

		const dracoLoader = new DRACOLoader();
		dracoLoader.setDecoderPath(DRACO_DECODER_PATH);

		const loader = new GLTFLoader();
		loader.setDRACOLoader(dracoLoader);
		loader.load(
			MODEL_URL,
			(gltf) => {
				if (disposed) return;
				const model = gltf.scene;

				const box = new THREE.Box3().setFromObject(model);
				const size = box.getSize(new THREE.Vector3());
				const center = box.getCenter(new THREE.Vector3());
				// Recenter at scale 1 first. Scaling is applied to a separate outer
				// group afterward -- position isn't multiplied by an object's own
				// scale, so doing both on `model` would apply this translation at
				// the wrong magnitude once the scale changed.
				model.position.sub(center);

				const maxDimension = Math.max(size.x, size.y, size.z) || 1;
				// Deliberately leaves ~17% empty margin on each side of the frustum.
				// Perspective magnifies the geometry nearest the camera, so a model
				// sized to fill the view clips against the canvas edge as soon as it
				// tilts. The frame in HeroMedia is scaled up by the matching factor,
				// so the robot's on-screen size is unchanged -- only the room around it.
				const scale = 1.78 / maxDimension;
				const framing = new THREE.Group();
				framing.scale.setScalar(scale);
				framing.add(model);

				pivot.add(framing);
				renderFrame();
				heroModel.ready = true;
			},
			undefined,
			(error) => {
				console.error('Failed to load robot model:', error);
				// Let the loading screen clear anyway -- a stuck spinner over a
				// broken model is worse than showing the empty hero.
				heroModel.ready = true;
			}
		);

		if (!prefersReducedMotion) {
			window.addEventListener('pointermove', handlePointerMove);
		}

		return () => {
			disposed = true;
			cancelAnimationFrame(raf);
			resizeObserver.disconnect();
			window.removeEventListener('pointermove', handlePointerMove);
			dracoLoader.dispose();

			scene.traverse((child) => {
				if (child instanceof THREE.Mesh) {
					child.geometry.dispose();
					const materials = Array.isArray(child.material) ? child.material : [child.material];
					for (const material of materials) {
						for (const key of Object.keys(material)) {
							const value = (material as unknown as Record<string, unknown>)[key];
							if (value instanceof THREE.Texture) value.dispose();
						}
						material.dispose();
					}
				}
			});
			renderer.dispose();
			renderer.domElement.remove();
		};
	});
</script>

<div bind:this={containerEl} class="hero-robot-model" aria-hidden="true"></div>

<style>
	.hero-robot-model {
		width: 100%;
		height: 100%;
	}

	.hero-robot-model :global(canvas) {
		display: block;
		width: 100%;
		height: 100%;
	}
</style>
