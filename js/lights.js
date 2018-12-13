if(!window.kae)
  window.kae = {}

window.kae.createLights = function createLights(){
  var lights = new THREE.Group();
  lights.name = 'lights'

  var ambient = new THREE.AmbientLight( 0xffffff, .1 ); // soft white light
  ambient.name = 'ambientLight'
  lights.add(ambient)

  var spot = new THREE.SpotLight(0xFFFFFF);
  spot.castShadow = true
  spot.angle = Math.PI/7
  spot.shadowDarkness = .7
  spot.shadowMapWidth = 2000
  spot.shadowMapHeight = 2000
  spot.shadow.update(spot)
  spot.name = 'spotlight'
  spot.position.set(15,15,0);
  spot.target.position.set(4,0,0);
  lights.add(spot);
  lights.add( spot.target );

  return lights;
}