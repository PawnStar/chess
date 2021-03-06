if(!window.kae)
  window.kae = {}

let player = {
  position: [0,0],
  ref: null
}

kae.getPlayerPosition = function getPlayerPosition(){
  return player.ref.position
}

const updatePlayerPosition = ()=>{
  if(!player.ref) return;
  const pos = kae.boardToWorldCoord(player.position[0], player.position[1])
  player.ref.position.set(pos.x, pos.y, pos.z)
}

window.kae.createPlayer = async function createPlayer(){
  const model = await kae.util.loadModel('./models/pawn.obj','./models/pawn.mtl')
  // model.children[0].material = new THREE.MeshStandardMaterial({color: 0x0899a5, metalness: 0})

  // Default position center of board
  const boardSize = kae._boardSize
  const center = Math.floor(boardSize / 2)
  player.position = [center, center]
  player.ref = model

  updatePlayerPosition()

  return model
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
  const next = [...player.position]
  next[1] = capPosition(next[1] + 1)
  return next
}

moveSouth = ()=>{
  const next = [...player.position]
  next[1] = capPosition(next[1] - 1)
  return next
}

moveEast = ()=>{
  const next = [...player.position]
  next[0] = capPosition(next[0] - 1)
  return next
}

moveWest = ()=>{
  const next = [...player.position]
  next[0] = capPosition(next[0] + 1)
  return next
}

const moveDirs = [
  moveNorth,
  moveEast,
  moveSouth,
  moveWest
]

let canMove = true
player._nextMove = null
const moveDir = index=>{
  if(!canMove) {
    player._nextMove = index;
    return;
  };
  player._nextMove = null


  const next = moveDirs[(index + kae.direction) % 4]()
  const world = kae.boardToWorldCoord(next[0], next[1])
  const current = {
    x: player.ref.position.x,
    y: player.ref.position.y,
    z: player.ref.position.z
  }

  new TWEEN.Tween(current)
    .to({x: world.x, y: world.y, z: world.z}, 350)
    .easing(TWEEN.Easing.Quadratic.Out)
    .onStart(()=>{canMove = false})
    .onUpdate(()=>{
      player.ref.position.set(current.x, current.y, current.z)
    })
    .onComplete(()=>{
      player.position = next
      canMove = true
      if(player._nextMove !== null)
        moveDir(player._nextMove)
    })
    .start();
}

kae.moveNorth = ()=>moveDir(0)
kae.moveEast = ()=>moveDir(1)
kae.moveSouth = ()=>moveDir(2)
kae.moveWest = ()=>moveDir(3)
