class Level {
    constructor(noteTextures) {
      this.noteTextures = noteTextures;
      this.tileSize = 40;
      this.notes = {};
      this.tileType = {
        0:  { name: 'abyss',        solid: false, texture: tileTex1,      action: null, sticky: false },
        1:  { name: 'floor',        solid: false, texture: abyssTex1,     action: null, sticky: false },
        2:  { name: 'wall',         solid: true,  texture: wallTex1,      action: this.triggerSpecialAction, sticky: false },
        3:  { name: 'c-tile',       solid: false, texture: cTileTex,      action: null, sticky: true},
        4:  { name: 'd-tile',       solid: false, texture: dTileTex,      action: null, sticky: true },
        5:  { name: 'e-tile',       solid: false, texture: eTileTex,      action: null, sticky: true},
        6:  { name: 'f-tile',       solid: false, texture: fTileTex,      action: null, sticky: true },
        7:  { name: 'g-tile',       solid: false, texture: gTileTex,      action: null, sticky: true },
        8:  { name: 'a-tile',       solid: false, texture: aTileTex,      action: null, sticky: true },
        9:  { name: 'b-tile',       solid: false, texture: bTileTex,      action: null, sticky: true },
        10: { name: 'gate1',        solid: true,  texture: gateTex1,      action: null, sticky: false },
        11: { name: 'finish-tile1', solid: false, texture: finishTile1,   action: null, sticky: false },
        12: { name: 'startTile',    solid: false, texture: startTile1,    action: null, sticky: false },
        13: { name: 'floorTex2',    solid: false, texture: floorTex2,     action: null, sticky: true },
        14: { name: 'keyTex1',      solid: false, texture: keyTex1,        action: null, sticky: true }
      };
                        // LEVEL x
      this.layout = [
        [3, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 13, 13, 4, 13],
        [0, 0, 2, 2, 13, 13, 13, 13, 13, 10, 13, 0, 0, 0, 0, 2, 13, 13, 13, 13],
        [0, 0, 2, 2, 13, 13, 13, 13, 13, 10, 13, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 2, 2, 13, 13, 13, 13, 13, 10, 13, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 8, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 0, 0, 0],
        [0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 4, 0, 0, 0, 2, 2, 0, 0, 0],
        [0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0],
        [0, 0, 0, 0, 0, 2, 0, 0, 0, 6, 12, 12, 0, 0, 0, 2, 2, 0, 0, 0],
        [9, 0, 0, 0, 0, 2, 2, 2, 2, 2, 12, 12, 0, 0, 0, 2, 2, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 13, 13, 0, 2, 2, 0, 0, 0],
        [2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 13, 13, 0, 2, 0, 0, 0, 0],
        [2, 2, 2, 2, 2, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 10, 0, 0, 11, 11],
        [2, 2, 2, 2, 2, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 10, 0, 0,11 , 11]
      ];   
      /*                            TEST ARENA
      this.layout = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 7, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 13, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 5, 0, 0, 0, 6, 0, 0, 0],
        [0, 0, 0, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 13, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      ]; */
    }

    draw() {
        for (let row = 0; row < this.layout.length; row++) {
          for (let col = 0; col < this.layout[row].length; col++) {
            let tileIndex = this.layout[row][col];  // This is the index representing the tile type (e.g., 0, 1, or 2)
            let x = col * this.tileSize;
            let y = row * this.tileSize;
      
            let tile = this.tileType[tileIndex];  // Get the actual tile object from the tileType dictionary
            
            // Now use the texture associated with the tile type to draw
            if (tile) {
              image(tile.texture, x, y, this.tileSize, this.tileSize);
            }
          }
        }
      }
      
      playNoteButtonPress(player, noteSounds, slotIndex) {              // J key
        const notesUnderPlayer = this.getNotesUnderPlayer(player);
        
        if (notesUnderPlayer.length > 0) {
            const note = notesUnderPlayer[0]; // play what's under you
            if (noteSounds[note.noteName]) {
                noteSounds[note.noteName].play();
                console.log(`Played tile note '${note.noteName}'`);
            } else {
                console.warn(`No sound for tile note: ${note.noteName}`);
            }
        } else {
            const heldNote = player.heldNotes[slotIndex];
            if (heldNote && noteSounds[heldNote]) {
                noteSounds[heldNote].play();
                console.log(`Played held note '${heldNote}' from slot ${slotIndex}`);
            } else {
                console.log(`No note to play in slot ${slotIndex}`);
            }
        }
    }

    storeNoteButtonPress(player, slotIndex) { // SPACE
      const notesUnderPlayer = this.getNotesUnderPlayer(player);
  
      if (notesUnderPlayer.length > 0) {
          const note = notesUnderPlayer[0];
          const tileIndex = this.layout[note.tileY][note.tileX];
          const tile = this.tileType[tileIndex];
  
          // Only store if the tile is sticky
          if (tile && tile.sticky) {
              const oldNote = player.heldNotes[slotIndex];
  
              if (oldNote && oldNote !== note.noteName) {
                  console.log(`Dropped note '${oldNote}' from slot ${slotIndex}`);
              }
  
              player.heldNotes[slotIndex] = note.noteName;
              console.log(`Stored note '${note.noteName}' into slot ${slotIndex}`);
          } else {
              console.log(`Cannot pick up note: tile at (${note.tileX}, ${note.tileY}) is not sticky.`);
          }
      } else {
          console.log(`No note under player to store.`);
      }
  }
  
  getNotesUnderPlayer(player) {
    const left = player.x;
    const top = player.y;
    const right = player.x + player.width;
    const bottom = player.y + player.height;
    const startX = Math.floor(left / this.tileSize);
    const startY = Math.floor(top / this.tileSize);
    const endX = Math.floor((right - 1) / this.tileSize);
    const endY = Math.floor((bottom - 1) / this.tileSize);
    const notesUnderPlayer = [];

    for (let tileX = startX; tileX <= endX; tileX++) {
        for (let tileY = startY; tileY <= endY; tileY++) {
            if (
                tileY < 0 || tileY >= this.layout.length ||
                tileX < 0 || tileX >= this.layout[0].length
            ) continue;

            const tileIndex = this.layout[tileY][tileX];
            const pickupableIndices = [3, 4, 5, 6, 7, 8, 9];

            if (pickupableIndices.includes(tileIndex)) {
                const noteName = this.tileType[tileIndex].name;
                notesUnderPlayer.push({ tileX, tileY, noteName });
            }
        }
    }
    return notesUnderPlayer;
  }   
   
    dropHeldNote(player) {
      if (!player.heldNote) {
          console.log('No held note to drop.');
          return;
      }
  
      console.log(`Dropping held note: ${player.heldNote}`);
  
      // Optional: Re-add the note to the tile
      if (player.lastPickupTile) {
          const { x, y, tileIndex } = player.lastPickupTile;
          this.layout[y][x] = tileIndex;
          console.log(`Restored note tile at (${x}, ${y})`);
      }
  
      player.heldNote = null;
      player.lastPickupTile = null;
    }

    isTileSolid(x, y) {
      const tileX = Math.floor(x / this.tileSize);
      const tileY = Math.floor(y / this.tileSize);
    
      // Check bounds
      if (
        tileY < 0 || tileY >= this.layout.length ||
        tileX < 0 || tileX >= this.layout[0].length
      ) {
        return true; // Treat out-of-bounds as solid
      }
    
      const tileIndex = this.layout[tileY][tileX];
      const tile = this.tileType[tileIndex];
    
      return tile && tile.solid;
    }

    getTileAt(x, y) {
      if (
        y < 0 || y >= this.layout.length ||
        x < 0 || x >= this.layout[0].length
      ) return null;
      return this.layout[y][x];
    }

    isNoteTile (x, y) {
      const pickupableIndices = [3, 4, 5, 6, 7, 8, 9]; // c-tile through b-tile
      const tileIndex = this.getTileAt(x, y);
      return pickupableIndices.includes(tileIndex);
    }  

    drawHeldNotes(player, inventoryTex) { // make fingerTex hover over note that can be pushed, push when sound?? 
      const baseY = height - 76;  
      const boxSize = 50;
      const spacing = 15;
    
      const noteUnderPlayerX = 370;
      const heldNoteX = noteUnderPlayerX + boxSize + spacing;
    
      // === DRAW INVENTORY BACKGROUND ===
      if (inventoryTex) {
        const inventoryWidth = boxSize * 2 + spacing;  // enough for two boxes
        const inventoryHeight = boxSize;
        imageMode(CORNER);
        image(inventoryTex, noteUnderPlayerX - spacing/2, baseY - spacing/2, inventoryWidth + spacing, inventoryHeight + spacing);
      }

      // === DRAW FIRST NOTE (under player) ===
      const notesUnderPlayer = this.getNotesUnderPlayer(player);
    
      if (notesUnderPlayer.length > 0) {
        const note = notesUnderPlayer[0];
        const noteName = note.noteName;
        const x = noteUnderPlayerX;
    
        fill(255);
        stroke(0);
        rect(x, baseY, boxSize, boxSize);
    
        if (noteName && this.noteTextures[noteName]) {
          imageMode(CORNER);
          image(this.noteTextures[noteName], x, baseY, boxSize, boxSize);
        } else if (noteName) {
          fill(0);
          textAlign(CENTER, CENTER);
          textSize(20);
          text(noteName[0].toUpperCase(), x + boxSize / 2, baseY + boxSize / 2);
        }
      }
    
      // === DRAW HELD NOTE ===
      if (player.heldNotes.length > 0) {
        const noteName = player.heldNotes[0];
        const x = heldNoteX;
    
        fill(255);
        stroke(0);
        rect(x, baseY, boxSize, boxSize);
    
        if (noteName && this.noteTextures[noteName]) {
          imageMode(CORNER);
    
          // ✅ Apply tint if standing on another note
          if (notesUnderPlayer.length > 0) {
            tint(80, 80, 180, 150); // gray and transparent
          } else {
            noTint();
          }
    
          image(this.noteTextures[noteName], x, baseY, boxSize, boxSize);
          noTint(); // reset
        } else if (noteName) {
          if (notesUnderPlayer.length > 0) {
            fill(100, 100, 100, 150); // grayish text
          } else {
            fill(0);
          }
    
          textAlign(CENTER, CENTER);
          textSize(20);
          text(noteName[0].toUpperCase(), x + boxSize / 2, baseY + boxSize / 2);
        }
      }
    }
    
  }
  