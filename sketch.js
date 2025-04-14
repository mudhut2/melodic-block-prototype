let player;
let playerTex;
let level;
let abyssTex1;
let wallTex1;
let floorTex1;
let keys = {};
let keyWasPressed = {
  'W': false, 'S': false, 'A': false, 'D': false
}; // Initialize all keys to false

function preload() {
  // Load the texture image
  playerTex = loadImage('textures/fingerTex.png');
  abyssTex1 = loadImage('textures/bottom-tile.png');
  tileTex1 = loadImage('textures/tile.png')
  wallTex1 = loadImage('textures/squidwall.png');
 // wallTex1 = loadImage('textures/bottom-tile.png');
}

function setup() {
  createCanvas(800, 600);
  player = new Player(400, 360);
  level = new Level();
}

function draw() { // GAME LOOP
  background(2);
  level.draw(); // Draw the level first
  player.update(keys, keyWasPressed,level);
  player.show();
}

// When key is pressed down
function keyPressed() {
  keys[key.toUpperCase()] = true;
}

// When key is released
function keyReleased() {
  keys[key.toUpperCase()] = false;
  keyWasPressed[key.toUpperCase()] = false; // Allow movement again
}
