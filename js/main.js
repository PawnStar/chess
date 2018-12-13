// Set the view size.
var width = window.innerWidth - 3
var height = window.innerHeight - 3

// Get the DOM element to attach to
const container = document.querySelector('#container');

// Set up renderer
const renderer = new THREE.WebGLRenderer();
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap
renderer.setSize(width, height);
container.appendChild(renderer.domElement);

// Set up scene
const scene = new THREE.Scene();

const camera = kae.createCamera()
scene.add(camera);
scene.add(kae.createBoard(5))
scene.add(kae.createLights());
scene.add(kae.createPlayer());

kae.updateCamera()
kae.initKeys()

// Render loop
function update (time) {
  // Update animations
  TWEEN.update(time);
  
  // Draw!
  renderer.render(scene, camera);

  // Schedule the next frame.
  requestAnimationFrame(update);
}
console.log(scene)

// Schedule the first frame.
requestAnimationFrame(update);
