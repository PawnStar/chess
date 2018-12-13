if(!window.kae)
  window.kae = {}

function createCamera(){

  // Set some camera attributes.
  const VIEW_ANGLE = 45;
  const ASPECT = width / height;
  const NEAR = 0.1;
  const FAR = 10000;

  const camera =
  new THREE.PerspectiveCamera(
      VIEW_ANGLE,
      ASPECT,
      NEAR,
      FAR
  );

  kae._controls = new THREE.OrbitControls( camera );
  kae._spherical = new THREE.Spherical(15, 1.0902899496825317, 1.5707963267948966 + Math.PI / 2)
  kae._camera = camera

  kae.updateCamera()

  return camera;
}

window.kae.createCamera = createCamera

window.kae.updateCamera = function(){
  kae._camera.position.setFromSpherical( kae._spherical );
  kae._controls.update()
}

// Rotation
let thetaTarget = null
window.kae.rotateRight = ()=>{
  let current = (thetaTarget!==null)? thetaTarget : kae._spherical.theta
  thetaTarget = current + Math.PI / 2

  new TWEEN.Tween(kae._spherical)
    .to({ theta: thetaTarget }, 500)
    .easing(TWEEN.Easing.Quadratic.Out)
    .onUpdate(kae.updateCamera)
    .onStart(()=>kae.direction = (kae.direction + 3) % 4)
    .start();
}

window.kae.rotateLeft = ()=>{
  let current = (thetaTarget!==null)? thetaTarget : kae._spherical.theta
  thetaTarget = current - Math.PI / 2

  new TWEEN.Tween(kae._spherical)
    .to({ theta: thetaTarget }, 500)
    .easing(TWEEN.Easing.Quadratic.Out)
    .onUpdate(kae.updateCamera)
    .onStart(()=>kae.direction = (kae.direction + 1) % 4)
    .start();
}
