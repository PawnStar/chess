if(!window.kae)
  window.kae = {}

const keyHandlers = {}
window.kae.keyHandlers = keyHandlers

window.kae.initKeys = function initKeys(){
  document.addEventListener('keydown', ev=>{
    if(keyHandlers[ev.key])
      keyHandlers[ev.key](ev)
  })
}

keyHandlers.e = kae.rotateRight
keyHandlers.q = kae.rotateLeft
keyHandlers.w = kae.moveNorth
keyHandlers.a = kae.moveWest
keyHandlers.s = kae.moveSouth
keyHandlers.d = kae.moveEast