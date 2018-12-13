// Set the view size.
var width = window.innerWidth
var height = window.innerHeight

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

window.addEventListener('resize', ()=>{
  renderer.setSize(window.innerWidth, window.innerHeight)
  kae.updateCamera()
})

kae.updateCamera()
kae.initKeys()

var playing = true

// Render loop
function update (time) {
  // Update animations
  TWEEN.update(time);

  // Update monster
  kae.updateMonster()

  // Draw!
  renderer.render(scene, camera);

  // Schedule the next frame.
  if(playing)
    requestAnimationFrame(update);
}
console.log(scene);

// Load the model
(async ()=>{
  scene.add(await kae.createPlayer());
  scene.add(await kae.createMonster());

  document.querySelector('#loading').remove()
  document.querySelector('#ready').style.display = 'block'

  const button = document.querySelector('#startGame')

  if(button)
    button.addEventListener('click', ()=>{
      document.querySelector('#ready').remove()
      document.querySelector('#container').style.display = 'block'
      kae.startMonster()

      requestAnimationFrame(update)
    })
})()

kae.loseGame = ()=>{
  playing = false
  document.querySelector('#container').remove()
  document.querySelector('#lose').style.display = 'block'
}
