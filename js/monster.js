if(!window.kae)
  window.kae = {}

const states = [
  'following',
  'rumbling',
  'leaping',
  'cooldown'
]

let monster = {
  model: null,
  state: null,
  target: null
}

kae.createMonster = async function createMonster(){
  const model = await kae.util.loadModel('./models/monster.obj','./models/monster.mtl')

  // Default position center of board
  const position = kae.boardToWorldCoord(0,0)
  model.position.set(position.x, position.y, position.z)
  monster.model = model
  // model.children[0].material = new THREE.MeshStandardMaterial({color: 0x3a0a00})

  return model
}

const advanceMonsterState = function(){
  const current = states.indexOf(monster.state)
  const next = (current + 1) % states.length
  monster.state = states[next]

  if(monster.state === 'following')
    setTimeout(advanceMonsterState, 3000)

  if(monster.state === 'rumbling'){
    monster.target = {...kae.getPlayerPosition()}
    setTimeout(advanceMonsterState, 1500)
  }

  if(monster.state === 'leaping')
    kae.leapMonster()

  if(monster.state === 'cooldown')
    setTimeout(advanceMonsterState, 500)
}


kae.startMonster = function(){
  advanceMonsterState()
}

const rumble = function(){
  const x = (Math.random() * 2 - 1) / 10
  const z = (Math.random() * 2 - 1) / 10

  monster.model.position.x += x
  monster.model.position.z += z
}

kae.updateMonster = function updateMonster(){
  if(monster.state === 'following')
    monster.model.children[0].lookAt(kae.getPlayerPosition())

  if(monster.state === 'rumbling')
    rumble()

  // Check for collision
  if(monster.model.position.distanceTo(kae.getPlayerPosition()) < 1)
    kae.loseGame()
}

kae.leapMonster = function leapMonster(){
  const current = {...monster.model.position}
  const target = monster.target

  new TWEEN.Tween(current)
    .to({x: target.x, z: target.z}, 300)
    .easing(TWEEN.Easing.Quadratic.Out)
    .onUpdate(()=>{
      monster.model.position.set(current.x, 0, current.z)
    })
    .onComplete(advanceMonsterState)
    .start(); // Start the tween immediately.
}
