if(!window.kae)
  window.kae = {}

window.kae.boardToWorldCoord = function(x,y){
  const vec = new THREE.Vector3(
    x * 2 - (kae._boardSize - 1),
    0,
    y * 2 - (kae._boardSize - 1)
  )
  return vec
}

const Square = function(posX, posY, color){
  const cubeGeom = new THREE.BoxGeometry(2, .1, 2);
  const cubeMat = new THREE.MeshLambertMaterial({color: color})
  const cube = new THREE.Mesh(cubeGeom, cubeMat);

  cube.receiveShadow = true;
  const vec = kae.boardToWorldCoord(posX, posY)
  cube.position.set(vec.x, vec.y, vec.z)

  cube.name = `board_${posX}/${posY}`

  return cube;
}

window.kae.createBoard = function createBoard(size){
  var board = new THREE.Group();

  window.kae._boardSize = size

  for(let x = 0; x < size; x++) for(let y = 0; y < size; y++){
    let isBlack = !!(y % 2)

    if(x % 2)
      isBlack = !isBlack

    let square = new Square(x, y, isBlack?0x444444:0xffffff)
    board.add(square)
  }

  board.name='board'

  return board
}
