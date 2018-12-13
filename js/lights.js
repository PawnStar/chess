if(!window.kae)
  window.kae = {}

window.kae.createLights = function createLights(){
  var lights = new THREE.Group();
  lights.name = 'lights'

  var ambient = new THREE.AmbientLight( 0xffffff, .1 ); // soft white light
  ambient.name = 'ambientLight'

  var directionalLight = new THREE.DirectionalLight( 0xffffff, .7 );
  directionalLight.position.set(0, 15, -15)
  directionalLight.castShadow = true
  directionalLight.shadowDarkness = .7
  directionalLight.name = 'directionalLight'

  lights.add(ambient)
  lights.add(directionalLight)

  return lights;
}