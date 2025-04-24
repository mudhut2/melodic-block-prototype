class Level {
    constructor() {
      this.tileSize = 40;
      this.notes = {};
      this.tileType = {
        0: { name: 'abyss', solid: false, texture: tileTex1, action: null },
        1: { name: 'floor', solid: false, texture: abyssTex1, action: null },
        2: { name: 'wall', solid: true, texture: wallTex1, action: this.triggerSpecialAction },
        3: { name: 'c-tile' , solid: false, texture: cTileTex, action: null},
        4: { name: 'd-tile' , solid: false, texture: dTileTex, action: null },
        5: { name: 'e-tile' , solid: false, texture: eTileTex, action: null },
        6: { name: 'f-tile' , solid: false, texture: fTileTex, action: null },
        7: { name: 'g-tile' , solid: false, texture: gTileTex, action: null },
        8: { name: 'a-tile' , solid: false, texture: aTileTex, action: null },
        9: { name: 'b-tile' , solid: false, texture: bTileTex, action: null },
        10: { name: 'gate1', solid: true, texture: gate1Tex, action: null },
        11: { name: 'finish-tile1', solid: false, texture: finishTile1, action: null},
        12: { name: 'startTile', solid: false, texture: startTile1, action: null }, //   <--ADD ACTION ... replay melody/chord/ key for level when player is on this tile
        13: { name: 'floor2', solid: false, texture: tileTex2, action: null }, // make starttile dynamically change while level is being compleded to unlcok the full melody then when it is finally unlcoked it play the final melody to finish that level
        14: { name:'tileTex2', solid: false, texture: tileTex2, action: null }
      };
      this.layout = [
        [3, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 13, 13, 4, 13],
        [0, 0, 2, 2, 13, 13, 13, 13, 13, 10, 13, 0, 0, 0, 0, 2, 13, 13, 13, 13],
        [0, 0, 2, 2, 13, 13, 13, 13, 13, 10, 13, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 2, 2, 13, 13, 13, 13, 13, 10, 13, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 2, 2, 2, 2, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 8, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 0, 0, 0],
        [0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 4, 0, 0, 0, 2, 2, 0, 0, 0],
        [0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0],
        [0, 0, 0, 0, 0, 2, 0, 0, 0, 6, 12, 12, 13, 13, 0, 2, 2, 0, 0, 0],
        [9, 0, 0, 0, 0, 2, 2, 2, 2, 2, 12, 12, 13, 13, 0, 2, 2, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 13, 13, 0, 2, 2, 0, 0, 0],
        [2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 13, 13, 0, 2, 0, 0, 0, 0],
        [2, 2, 2, 2, 2, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 10, 0, 0, 11, 11],
        [2, 2, 2, 2, 2, 13, 13, 13, 13, 13, 13, 13, 13, 13, 13, 10, 0, 0,11 , 11]
      ];      
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
      pickupNoteButtonPress(player, noteSounds, slotIndex) {
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
    
        if (notesUnderPlayer.length > 0) {
            const note = notesUnderPlayer[0]; // First note under player
            const oldNote = player.heldNotes[slotIndex];
    
            if (oldNote && oldNote !== note.noteName) {
                console.log(`Dropped note '${oldNote}' from slot ${slotIndex}`);
            }
    
            player.heldNotes[slotIndex] = note.noteName;
            console.log(`Picked up note '${note.noteName}' into slot ${slotIndex}`);
    
            if (noteSounds[note.noteName]) {
                noteSounds[note.noteName].play(); // Play only the new note
            } else {
                console.warn(`No sound found for note: ${note.noteName}`);
            }
        } else {
            // No note under player, just play the held note
            const heldNote = player.heldNotes[slotIndex];
            if (heldNote && noteSounds[heldNote]) {
                noteSounds[heldNote].play();
                console.log(`Played held note '${heldNote}' from slot ${slotIndex}`);
            } else {
                console.log(`No note held in slot ${slotIndex} to play.`);
            }
        }
        console.log(`Player is now holding:`, player.heldNotes);
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
  
    dropAllNotes(player, noteSounds) {
      for (const noteName of player.heldNotes) {
        if (noteSounds[noteName]) {
          noteSounds[noteName].play();
        } else {
          console.warn(`No sound found for note: ${noteName}`);
        }
      }
    
      player.heldNotes = [];
      console.log("Dropped all held notes.");
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

    drawHeldNotes(player) {
      const baseY = height - 45;  // position near bottom of canvas
      const boxSize = 40;
    
      for (let i = 0; i < player.heldNotes.length; i++) {
        const noteName = player.heldNotes[i];
        const x = 420 + i * (boxSize + 10);  // space out the boxes
    
        // Draw box
        fill(255);
        stroke(0);
        rect(x, baseY, boxSize, boxSize);
    
        // Show note name
        fill(0);
        textAlign(CENTER, CENTER);
        textSize(20);
        if (noteName) {
          text(noteName[0].toUpperCase(), x + boxSize / 2, baseY + boxSize / 2);
        }
      }
    }
  }
  