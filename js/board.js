const Square = function(posX, posY, offset, color){
  const cubeGeom = new THREE.BoxGeometry(2, .1, 2);
  const cubeMat = new THREE.MeshLambertMaterial({color: color})
  const cube = new THREE.Mesh(cubeGeom, cubeMat);

  cube.receiveShadow = true;
  cube.position.x = posX * 2 - (offset - 1);
  cube.position.y = 0;
  cube.position.z = posY * 2 - (offset - 1);

  return cube;
}

function _board(scene, size){

  for(let x = 0; x < size; x++) for(let y = 0; y < size; y++){
    let isBlack = !!(y % 2)

    if(x % 2)
      isBlack = !isBlack

    let square = new Square(x, y, size, isBlack?0x444444:0xffffff)
    scene.add(square)
  }
}


window.Board = _board;
