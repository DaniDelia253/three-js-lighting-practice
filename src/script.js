import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import GUI from "lil-gui";
import { FontLoader } from "three/examples/jsm/Addons.js";
import { TextGeometry } from "three/examples/jsm/Addons.js";
// import { RectAreaLightHelper } from "three/examples/jsm/Addons.js";

// Debug
const gui = new GUI();
gui.close();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();
// const axesHelper = new THREE.AxesHelper();
// scene.add(axesHelper);

// Load Textures
const textureLoader = new THREE.TextureLoader();
const simpleShadow = textureLoader.load("/textures/simpleShadow.jpg");

// Text
const fontLoader = new FontLoader();
fontLoader.load("/fonts/helvetiker_regular.typeface.json", (font) => {
	const textOptions = {
		font,
		size: 0.6,
		depth: 0.2,
		curveSegments: 5,
		bevelEnabled: true,
		bevelThickness: 0.03,
		bevelSize: 0.02,
		bevelOffset: 0,
		bevelSegments: 5,
	};
	const textGeometry = new TextGeometry("Lights", textOptions);
	const shadowTextGeometry = new TextGeometry("Shadows", textOptions);
	const textMaterial = new THREE.MeshNormalMaterial();
	const text = new THREE.Mesh(textGeometry, textMaterial);
	const shadowText = new THREE.Mesh(shadowTextGeometry, textMaterial);
	textGeometry.computeBoundingBox();
	shadowTextGeometry.computeBoundingBox();
	textGeometry.center();
	shadowTextGeometry.center();
	scene.add(text, shadowText);
	text.position.y = 2.5;
	shadowText.position.y = 2.5;
	shadowText.position.x = shadowText.position.x + 8;
});

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
		ambientLight.color.set(ambientLight.color);
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
		directionalLight.color.set(directionalLight.color);
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
		hemisphereLight.color.set(hemisphereLight.skyColor);
	});
hemisphereLightTweaks
	.addColor(hemisphereLight, "groundColor")
	.name("ground color")
	.onChange(() => {
		hemisphereLight.groundColor.set(hemisphereLight.groundColor);
	});
hemisphereLightTweaks
	.add(hemisphereLight, "intensity")
	.name("light intensity")
	.min(0)
	.max(5)
	.step(0.001);

const pointLight = new THREE.PointLight(0xff9000, 1.5, 4, 3);
pointLight.position.set(1, -0.5, 1);
scene.add(pointLight);
const pointLightTweaks = lightTweaks.addFolder("Point Light");
pointLightTweaks
	.addColor(pointLight, "color")
	.name("color")
	.onChange(() => {
		pointLight.color.set(pointLight.color);
	});
pointLightTweaks
	.add(pointLight, "intensity")
	.name("light intensity")
	.min(0)
	.max(5)
	.step(0.001);
pointLightTweaks
	.add(pointLight, "distance")
	.name("distance")
	.min(0.0001)
	.max(5)
	.step(0.001);
pointLightTweaks
	.add(pointLight, "decay")
	.name("decay")
	.min(0.0001)
	.max(5)
	.step(0.001);
pointLightTweaks
	.add(pointLight.position, "x")
	.name("x position")
	.min(-4)
	.max(4)
	.step(0.1);
pointLightTweaks
	.add(pointLight.position, "y")
	.name("y position")
	.min(-4)
	.max(4)
	.step(0.1);
pointLightTweaks
	.add(pointLight.position, "z")
	.name("z position")
	.min(-4)
	.max(4)
	.step(0.1);

const rectAreaLight = new THREE.RectAreaLight(0x881aff, 0, 1, 1);
// rectAreaLight.position.set(-1.5, 0, 1.5);
rectAreaLight.position.y = 1;
scene.add(rectAreaLight);
const rectAreaLightTweaks = lightTweaks.addFolder("Rect Area Light");
rectAreaLightTweaks
	.addColor(rectAreaLight, "color")
	.name("color")
	.onChange(() => {
		rectAreaLight.color.set(rectAreaLight.color);
	});
rectAreaLightTweaks
	.add(rectAreaLight, "intensity")
	.name("light intensity")
	.min(0)
	.max(10)
	.step(0.001);
rectAreaLightTweaks
	.add(rectAreaLight, "width")
	.name("width")
	.min(0)
	.max(10)
	.step(0.001);
rectAreaLightTweaks
	.add(rectAreaLight, "height")
	.name("height")
	.min(0)
	.max(10)
	.step(0.001);
rectAreaLightTweaks
	.add(rectAreaLight.position, "x")
	.name("x position")
	.min(-4)
	.max(4)
	.step(0.1);
rectAreaLightTweaks
	.add(rectAreaLight.position, "y")
	.name("y position")
	.min(-4)
	.max(4)
	.step(0.1);
rectAreaLightTweaks
	.add(rectAreaLight.position, "z")
	.name("z position")
	.min(-4)
	.max(4)
	.step(0.1);

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
const spotLightLightTweaks = lightTweaks.addFolder("Spotlight");
spotLightLightTweaks
	.addColor(spotLight, "color")
	.name("color")
	.onChange(() => {
		spotLight.color.set(spotLight.color);
	});
spotLightLightTweaks
	.add(spotLight, "intensity")
	.name("light intensity")
	.min(0)
	.max(10)
	.step(0.001);
spotLightLightTweaks
	.add(spotLight, "distance")
	.name("distance")
	.min(0.001)
	.max(10)
	.step(0.001);
spotLightLightTweaks
	.add(spotLight, "angle")
	.name("angle")
	.min(0.001)
	.max(Math.PI / 2)
	.step(0.001);
spotLightLightTweaks
	.add(spotLight, "penumbra")
	.name("penumbra")
	.min(0)
	.max(1)
	.step(0.001);
spotLightLightTweaks
	.add(spotLight, "decay")
	.name("decay")
	.min(0)
	.max(5)
	.step(0.001);
spotLightLightTweaks
	.add(spotLight.target.position, "x")
	.name("x position")
	.min(-4)
	.max(4)
	.step(0.1);
spotLightLightTweaks
	.add(spotLight.target.position, "y")
	.name("y position")
	.min(-4)
	.max(4)
	.step(0.1);
spotLightLightTweaks
	.add(spotLight.target.position, "z")
	.name("z position")
	.min(-4)
	.max(4)
	.step(0.1);

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

// Light Objects
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

// Shadow Objects
const shadowSphere = new THREE.Mesh(
	new THREE.SphereGeometry(0.5, 32, 32),
	material
);
shadowSphere.position.x = 8;

const shadowPlane = new THREE.Mesh(new THREE.PlaneGeometry(5, 5), material);
shadowPlane.rotation.x = -Math.PI * 0.5;
shadowPlane.position.y = -0.65;
shadowPlane.position.x = 8;

scene.add(shadowSphere, shadowPlane);

// Shadow
const shadowSphereShadow = new THREE.Mesh(
	new THREE.PlaneGeometry(1.5, 1.5),
	new THREE.MeshBasicMaterial({
		color: 0x000000,
		alphaMap: simpleShadow,
		transparent: true,
	})
);
shadowSphereShadow.rotation.x = -Math.PI * 0.5;
shadowSphereShadow.position.x = shadowSphere.position.x;
shadowSphereShadow.position.y = shadowPlane.position.y + 0.01;

scene.add(shadowSphereShadow);

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
camera.position.x = -1;
camera.position.y = 1;
camera.position.z = 3;
camera.lookAt(shadowSphere.position.z);
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

	shadowSphere.position.x = Math.cos(elapsedTime) * 1.5 + 8;
	shadowSphere.position.z = Math.sin(elapsedTime) * 1.5;
	shadowSphere.position.y = Math.abs(Math.sin(elapsedTime * 3));

	shadowSphereShadow.position.x = shadowSphere.position.x;
	shadowSphereShadow.position.z = shadowSphere.position.z;
	shadowSphereShadow.material.opacity =
		(1.25 - shadowSphere.position.y) * 0.4;

	// Update controls
	controls.update();

	// Render
	renderer.render(scene, camera);

	// Call tick again on the next frame
	window.requestAnimationFrame(tick);
};

tick();
