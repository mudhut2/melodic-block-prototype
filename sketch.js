let player;
let level;

// TEXTURES
let playerTex;
let abyssTex1;
let tileTex1;
let gate1Tex;
let floorTex1;
let finishTile1;
let startTile1;

// Notes
let cTileTex;
let dTileTex;
let eTileTex;
let fTileTex;
let gTileTex;
let aTileTex;
let bTileTex;

// Mappings
let noteTextures = {};
let noteSounds = [];

let keys = {};

let keyWasPressed = {
  'W': false, 'S': false, 'A': false, 'D': false, '': false
}; // Initialize all keys to false

function preload() {
  playerTex = loadImage('textures/fingerTex.png');
  abyssTex1 = loadImage('textures/bottom-tile.png');
  tileTex1 = loadImage('textures/tile.png');
  wallTex1 = loadImage('textures/squidwall.png');
  gate1Tex = loadImage('textures/abyss1.png');
  finishTile1 = loadImage('textures/pillar.png');
  startTile1 = loadImage('textures/filmTex2.jpg');
  tileTex2 = loadImage('textures/sq-mosaic.jpg');

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
}

function setup() {
  createCanvas(850, 650);
  player = new Player(400, 360);
  level = new Level();
}

function draw() {
  background(30);
  level.draw();
  
  player.update(keys, keyWasPressed, level);

  level.drawHeldNotes(player); 
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
