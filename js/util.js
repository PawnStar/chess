if(!window.kae)
  window.kae = {}

if(!kae.util)
  kae.util = {}

kae.util.loadModel = async function loadPlayer(obj, mtl){
  const materials = await new Promise(function(resolve, reject){
    var loader = new THREE.MTLLoader();
    loader.load(mtl, resolve, null, reject)
  })

  const object = await new Promise(function(resolve, reject){
    var loader = new THREE.OBJLoader();
    loader.setMaterials(materials)
    loader.load(obj, resolve, null, reject)
  })

  object.castShadow = true
  object.traverse( function( node ) { if ( node instanceof THREE.Mesh ) { node.castShadow = true; } } );

  return object
}
