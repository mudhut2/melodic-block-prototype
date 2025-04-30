let player;
let level;

// TEXTURES
let playerTex;
let abyssTex1;
let tileTex1;
let wallTex1;
let wallTex2;
let gateTex1;
let finishTile1;
let startTile1;
let floorTex2;
let bgTex1;
let inventoryTex;
let keyTex1;

// Notes
let cTileTex;
let dTileTex;
let eTileTex;
let fTileTex;
let gTileTex;
let aTileTex;
let bTileTex;

let bg_music1;

// Mappings

let noteSounds = [];
let keys = {};
// Define custom colors for each note - glow effect

let keyWasPressed = {
  'W': false, 'S': false, 'A': false, 'D': false, '': false
};

function preload() {
  playerTex = loadImage('textures/fingerTex.png');
  abyssTex1 = loadImage('textures/bottom-tile.png');
  tileTex1 = loadImage('textures/tile.png');
  wallTex1 = loadImage('textures/squidwall.png');
  wallTex2 = loadImage("textures/neo-wall.jpg")
  gateTex1 = loadImage('textures/abyss1.png');
  finishTile1 = loadImage('textures/pillar.png');
  startTile1 = loadImage('textures/filmTex2.jpg');
  floorTex2 = loadImage('textures/sq-mosaic.jpg');
  bgTex1 = loadImage('textures/bottom.png');
  inventoryTex = loadImage('textures/lone4sided.jpg');
  keyTex1 = loadImage('textures/evil3.jpg')

  // Load note textures
  cTileTex = loadImage('textures/c-tile.jpg');
  dTileTex = loadImage('textures/d-tile.jpg');
  eTileTex = loadImage('textures/e-tile.jpg');
  fTileTex = loadImage('textures/f-tile.jpg');
  gTileTex = loadImage('textures/g-tile.jpg');
  aTileTex = loadImage('textures/a-tile.jpg');
  bTileTex = loadImage('textures/b-tile.jpg');

  // Load sounds for notes
  noteSounds["c-tile"] = loadSound('sounds/c-marimba.wav');
  noteSounds["d-tile"] = loadSound('sounds/d-marimba.wav');
  noteSounds["e-tile"] = loadSound('sounds/e-marimba.wav');
  noteSounds["f-tile"] = loadSound('sounds/f-marimba.wav');
  noteSounds["g-tile"] = loadSound('sounds/g-marimba.wav');
  noteSounds["a-tile"] = loadSound('sounds/a-marimba.wav');
  noteSounds["b-tile"] = loadSound('sounds/b-marimba.wav');

  bg_music1 = loadSound('sounds/level1break.wav')
 
}

function setup() {
  createCanvas(850, 700);
  let noteTextures = {    
    "c-tile": cTileTex,
    "d-tile": dTileTex,
    "e-tile": eTileTex,
    "f-tile": fTileTex,
    "g-tile": gTileTex,
    "a-tile": aTileTex,
    "b-tile": bTileTex,
    "stickTestTile" : floorTex2,
  };

  player = new Player(400, 360);
  level = new Level(noteTextures);
  bg_music1.setVolume(0.3);
  //bg_music1.loop();
}

function drawTiledBackground(tex) {
  const tileWidth = tex.width;
  const tileHeight = tex.height;

  for (let x = 0; x < width; x += tileWidth) {
    for (let y = 0; y < height; y += tileHeight) {
      image(tex, x, y);
    }
  }
}

function draw() {
  drawTiledBackground(finishTile1);
  level.draw();
  
  player.update(keys, keyWasPressed, level);

  level.drawHeldNotes(player); 
  level.drawHeldNotes(player, inventoryTex);

  player.show();
}

function keyPressed() {
  userStartAudio();
  keys[key.toUpperCase()] = true;
}

function keyReleased() {
  keys[key.toUpperCase()] = false;
  keyWasPressed[key.toUpperCase()] = false;
}
