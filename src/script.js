import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import GUI from "lil-gui";
import { RectAreaLightHelper } from "three/examples/jsm/Addons.js";

// Debug
const gui = new GUI();
gui.close();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// Lights
const lightTweaks = gui.addFolder("Light Options");

const ambientLight = new THREE.AmbientLight();
ambientLight.color = new THREE.Color(0xffffff);
ambientLight.intensity = 1;
scene.add(ambientLight);
const ambientLightTweaks = lightTweaks.addFolder("Ambient Light");
ambientLightTweaks
	.add(ambientLight, "intensity")
	.name("light intensity")
	.min(0)
	.max(3)
	.step(0.001);
ambientLightTweaks
	.addColor(ambientLight, "color")
	.name("light color")
	.onChange(() => {
		material.color.set(ambientLight.color);
	});

const directionalLight = new THREE.DirectionalLight(0x00fffc, 0.9);
directionalLight.position.x = 1;
scene.add(directionalLight);
const directionalLightTweaks = lightTweaks.addFolder("Directional Light");
directionalLightTweaks
	.add(directionalLight, "intensity")
	.name("light intensity")
	.min(0)
	.max(3)
	.step(0.001);
directionalLightTweaks
	.addColor(directionalLight, "color")
	.name("light color")
	.onChange(() => {
		material.color.set(directionalLight.color);
	});
directionalLightTweaks
	.add(directionalLight.position, "x")
	.name("x position")
	.min(-4)
	.max(4)
	.step(0.1);
directionalLightTweaks
	.add(directionalLight.position, "y")
	.name("y position")
	.min(-4)
	.max(4)
	.step(0.1);
directionalLightTweaks
	.add(directionalLight.position, "z")
	.name("z position")
	.min(-4)
	.max(4)
	.step(0.1);

const hemisphereLight = new THREE.HemisphereLight(0x0000ff, 0xff0000, 0.9);
scene.add(hemisphereLight);
const hemisphereLightTweaks = lightTweaks.addFolder("Hemisphere Light");
hemisphereLightTweaks
	.addColor(hemisphereLight, "color")
	.name("sky color")
	.onChange(() => {
		material.color.set(hemisphereLight.skyColor);
	});
hemisphereLightTweaks
	.addColor(hemisphereLight, "groundColor")
	.name("ground color")
	.onChange(() => {
		material.color.set(hemisphereLight.groundColor);
	});
hemisphereLightTweaks
	.add(hemisphereLight, "intensity")
	.name("light intensity")
	.min(0)
	.max(3)
	.step(0.001);

const pointLight = new THREE.PointLight(0xff9000, 1.5, 4, 3);
pointLight.position.set(1, -0.5, 1);
scene.add(pointLight);

const rectAreaLight = new THREE.RectAreaLight(0x4e00ff, 6, 1, 1);
rectAreaLight.position.set(-1.5, 0, 1.5);
rectAreaLight.lookAt(new THREE.Vector3());
scene.add(rectAreaLight);

const spotLight = new THREE.SpotLight(
	0x78ff00,
	4.5,
	10,
	Math.PI * 0.1,
	0.25,
	1
);
spotLight.position.set(0, 2, 3);
scene.add(spotLight.target);
spotLight.target.position.x = -2;
scene.add(spotLight);

// const hemisphereLightHelper = new THREE.HemisphereLightHelper(
// 	hemisphereLight,
// 	0.2
// );
// scene.add(hemisphereLightHelper);
// const directionalLightHelper = new THREE.DirectionalLightHelper(
// 	directionalLight,
// 	0.2
// );
// scene.add(directionalLightHelper);
// const pointLightHelper = new THREE.PointLightHelper(pointLight, 0.2);
// scene.add(pointLightHelper);

// const SpotLightHelper = new THREE.SpotLightHelper(spotLight);
// scene.add(SpotLightHelper);

// const rectAreaLightHelper = new RectAreaLightHelper(rectAreaLight);
// scene.add(rectAreaLightHelper);

// Material
const material = new THREE.MeshStandardMaterial();
material.metalness = 0.2;
material.roughness = 0.4;

const materialTweaks = gui.addFolder("Material Options");
materialTweaks.add(material, "metalness").min(0).max(1).step(0.01);
materialTweaks.add(material, "roughness").min(0).max(1).step(0.01);

// Objects
const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 32, 32), material);
sphere.position.x = -1.5;

const cube = new THREE.Mesh(new THREE.BoxGeometry(0.75, 0.75, 0.75), material);

const torus = new THREE.Mesh(
	new THREE.TorusGeometry(0.3, 0.2, 32, 64),
	material
);
torus.position.x = 1.5;

const plane = new THREE.Mesh(new THREE.PlaneGeometry(5, 5), material);
plane.rotation.x = -Math.PI * 0.5;
plane.position.y = -0.65;

scene.add(sphere, cube, torus, plane);

// Sizes
const sizes = {
	width: window.innerWidth,
	height: window.innerHeight,
};

window.addEventListener("resize", () => {
	// Update sizes
	sizes.width = window.innerWidth;
	sizes.height = window.innerHeight;

	// Update camera
	camera.aspect = sizes.width / sizes.height;
	camera.updateProjectionMatrix();

	// Update renderer
	renderer.setSize(sizes.width, sizes.height);
	renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// Base camera
const camera = new THREE.PerspectiveCamera(
	75,
	sizes.width / sizes.height,
	0.1,
	100
);
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 2;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// Renderer
const renderer = new THREE.WebGLRenderer({
	canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Animate
const clock = new THREE.Clock();

const tick = () => {
	const elapsedTime = clock.getElapsedTime();

	// Update objects
	sphere.rotation.y = 0.1 * elapsedTime;
	cube.rotation.y = 0.1 * elapsedTime;
	torus.rotation.y = 0.1 * elapsedTime;

	sphere.rotation.x = 0.15 * elapsedTime;
	cube.rotation.x = 0.15 * elapsedTime;
	torus.rotation.x = 0.15 * elapsedTime;

	// Update controls
	controls.update();

	// Render
	renderer.render(scene, camera);

	// Call tick again on the next frame
	window.requestAnimationFrame(tick);
};

tick();
