if(!window.kae)
  window.kae = {}

let monster = {
  model: null
}

kae.createMonster = async function createMonster(){
  const model = await kae.util.loadModel('./models/monster.obj','./models/monster.mtl')

  // Default position center of board
  const position = kae.boardToWorldCoord(0,0)
  model.position.set(position.x, position.y, position.z)
  monster.model = model

  return model
}

kae.updateMonster = function updateMonster(){

}
