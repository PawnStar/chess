if(!window.kae)
  window.kae = {}

window.kae.createLights = function createLights(){
  var lights = new THREE.Group();
  lights.name = 'lights'

  var ambient = new THREE.AmbientLight( 0xffffff, .2 ); // soft white light
  ambient.name = 'ambientLight'

  var directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
  directionalLight.position.set(0, 15, -10)
  directionalLight.castShadow = true
  directionalLight.name = 'directionalLight'

  lights.add(ambient)
  lights.add(directionalLight)

  return lights;
}