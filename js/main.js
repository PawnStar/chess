// Set the scene size.
 var width = window.innerWidth / 2;
var height = window.innerHeight / 2;

// Set some camera attributes.
const VIEW_ANGLE = 45;
const ASPECT = width / height;
const NEAR = 0.1;
const FAR = 10000;

// Get the DOM element to attach to
const container =
    document.querySelector('#container');

// Create a WebGL renderer, camera
// and a scene
const renderer = new THREE.WebGLRenderer();
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap
const camera =
    new THREE.PerspectiveCamera(
        VIEW_ANGLE,
        ASPECT,
        NEAR,
        FAR
    );

const scene = new THREE.Scene();

// Set up the sphere vars
const RADIUS = 1;
const SEGMENTS = 16;
const RINGS = 16;// create the sphere's material
const sphereMaterial =
  new THREE.MeshLambertMaterial(
    {
      color: 0xCC0000
    });

// Create a new mesh with
// sphere geometry - we will cover
// the sphereMaterial next!
const sphere = new THREE.Mesh(

  new THREE.SphereGeometry(
    RADIUS,
    SEGMENTS,
    RINGS),

  sphereMaterial);

  // Move the Sphere back in Z so we
  // can see it.
  sphere.position.z = 3;
  sphere.castShadow = true;

  // Finally, add the sphere to the scene.
  scene.add(sphere);

// Add the camera to the scene.
scene.add(camera);

var controls = new THREE.OrbitControls( camera );
camera.position.set( 20, 8, 0 );
controls.update();

// Start the renderer.
renderer.setSize(width, height);

// Attach the renderer-supplied
// DOM element.
container.appendChild(renderer.domElement);

const board = new window.Board(scene, 5);

// create a point light
// const pointLight =
//   new THREE.PointLight(0xFFFFFF);


// // set its position
// pointLight.position.x = 1;
// pointLight.position.y = 3;
// pointLight.position.z = 1;

// // add to the scene
// scene.add(pointLight);

var light = new THREE.AmbientLight( 0xffffff, .2 ); // soft white light
scene.add( light );

var directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
directionalLight.position.set(0, 15, -10)
directionalLight.castShadow = true

scene.add( directionalLight );

function update () {
  // Draw!
  renderer.render(scene, camera);

  // Schedule the next frame.
  requestAnimationFrame(update);
}

// Schedule the first frame.
requestAnimationFrame(update);
