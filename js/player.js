if(!window.kae)
  window.kae = {}

let player = {
  position: [0,0],
  ref: null
}

const updatePlayerPosition = ()=>{
  if(!player.ref) return;
  const pos = kae.boardToWorldCoord(player.position[0], player.position[1])
  player.ref.position.set(pos.x, pos.y, pos.z)
}

window.kae.createPlayer = function createPlayer(){
  // Set up the sphere vars
  const RADIUS = 1;
  const SEGMENTS = 16;
  const RINGS = 16;// create the sphere's material
  const sphereMaterial = new THREE.MeshLambertMaterial({ color: 0xCC0000 });

  // Create a new mesh with
  // sphere geometry - we will cover
  // the sphereMaterial next!
  const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(RADIUS, SEGMENTS, RINGS),
    sphereMaterial
  );

  
  // Cast shadow
  sphere.castShadow = true;
  
  // Default position center of board
  const boardSize = kae._boardSize
  const center = Math.floor(boardSize / 2)
  player.position = [center, center]
  player.ref = sphere

  updatePlayerPosition()
  
  return sphere
}

kae.direction = 0;

const capPosition = pos=>{
  if(pos >= kae._boardSize)
    pos = kae._boardSize - 1
  
  if(pos < 0)
    pos = 0
  
  return pos
}

moveNorth = ()=>{
  player.position[1] = capPosition(player.position[1] + 1)
  updatePlayerPosition()
}

moveSouth = ()=>{
  player.position[1] = capPosition(player.position[1] - 1)
  updatePlayerPosition()
}

moveEast = ()=>{
  player.position[0] = capPosition(player.position[0] - 1)
  updatePlayerPosition()
}

moveWest = ()=>{
  player.position[0] = capPosition(player.position[0] + 1)
  updatePlayerPosition()
}

const moveDirs = [
  moveNorth,
  moveEast,
  moveSouth,
  moveWest
]

const moveDir = index=>{
  moveDirs[(index + kae.direction) % 4]()
}

kae.moveNorth = ()=>moveDir(0)
kae.moveEast = ()=>moveDir(1)
kae.moveSouth = ()=>moveDir(2)
kae.moveWest = ()=>moveDir(3)