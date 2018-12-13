// Set the view size.
var width = window.innerWidth - 3
var height = window.innerHeight - 3

// Get the DOM element to attach to
const container = document.querySelector('#container');

// Set up renderer
const renderer = new THREE.WebGLRenderer();
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadPCowMap; // default THREE.PCFShadowMap
renderer.setSize(width, height);
container.appendChild(renderer.domElement);

// Set up scene
const scene = new THREE.Scene();

const camera = kae.createCamera()
scene.add(camera);
scene.add(kae.createBoard(7))
scene.add(kae.createLights());

kae.updateCamera()
kae.initKeys()

// Render loop
function update (time) {
  // Update animations
  TWEEN.update(time);

  // Update monster
  kae.updateMonster()

  // Draw!
  renderer.render(scene, camera);

  // Schedule the next frame.
  requestAnimationFrame(update);
}
console.log(scene);

// Load the model
(async ()=>{
  scene.add(await kae.createPlayer());
  scene.add(await kae.createMonster());

  document.querySelector('#loading').remove()
  document.querySelector('#container').style.display = 'block'

  requestAnimationFrame(update)
})()
