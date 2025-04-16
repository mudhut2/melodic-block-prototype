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
        12: { name: 'startTile', solid: false, texture: startTile1, action: null } //   <--ADD ACTION ... replay melody/chord/ key for level when player is on this tile 
      };
      this.layout = [
        [3, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0],
        [0, 0, 2, 2, 9, 0, 0, 0, 0, 10, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0],
        [0, 0, 2, 2, 6, 0, 0, 0, 0, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 2, 2, 4, 0, 0, 0, 0, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 2, 2, 2, 2, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 8, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 0, 0, 0],
        [0, 0, 0, 0, 0, 2, 0, 0, 0, 3, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0],
        [0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0],
        [0, 0, 0, 0, 0, 2, 0, 0, 0, 3, 12, 12, 0, 0, 0, 2, 2, 0, 0, 0],
        [9, 0, 0, 0, 0, 2, 2, 2, 2, 2, 12, 12, 0, 0, 0, 2, 2, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 2, 2, 0, 0, 0],
        [2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 2, 0, 0, 0, 0],
        [2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 0, 0, 11, 11],
        [2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 10, 0, 0,11 , 11]
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
      pickupNoteButtonPress(player, noteSounds) {
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
                if (tileY < 0 || tileY >= this.layout.length || tileX < 0 || tileX >= this.layout[0].length) {
                    console.log(`Skipping out-of-bounds tile at (${tileX}, ${tileY})`);
                    continue;
                }
                const tileIndex = this.layout[tileY][tileX];
                const tile = this.tileType[tileIndex];
    
                console.log(`Checking tile at (${tileX}, ${tileY}) with index ${tileIndex} and type`, tile);
    
                const pickupableIndices = [3, 4, 5, 6, 7, 8, 9];
                if (pickupableIndices.includes(tileIndex)) {
                    const noteName = tile.name;
                    console.log(`Found pickupable note: ${noteName} at (${tileX}, ${tileY})`);
                    notesUnderPlayer.push({ tileX, tileY, noteName });
                }
            }
        }
        if (notesUnderPlayer.length > 0) {
            console.log(`Notes under player:`, notesUnderPlayer.map(n => n.noteName));
    
            if (player.heldNote) {
                console.log(`Player is currently holding note: ${player.heldNote}. Dropping it.`);
                this.dropHeldNote(player);
            }
            const noteToPickUp = notesUnderPlayer[0];
            player.heldNote = noteToPickUp.noteName;
            console.log(`Picking up note: ${noteToPickUp.noteName} at (${noteToPickUp.tileX}, ${noteToPickUp.tileY})`);
    
            //this.layout[noteToPickUp.tileY][noteToPickUp.tileX] = 1; // Replace with floor
            player.notesPickedUp = notesUnderPlayer.map(note => note.noteName);
            console.log(`Stored picked up notes:`, player.notesPickedUp);
    
            // 🔊 Play the sound of the note
            if (noteSounds[player.heldNote]) {
                noteSounds[player.heldNote].play();
            } else {
                console.warn(`No sound found for note: ${player.heldNote}`);
            }
        } else {
            console.log(`No notes under player to pick up.`);
        }
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
  
    
   /*pickupNoteButtonPress(player) { // can make into class later for more functionality/mechanics??
        const left = player.x;
        const top = player.y;
        const right = player.x + player.width;
        const bottom = player.y + player.height;
    
        // Get the starting and ending tile coordinates for the player's bounding box
        const startX = Math.floor(left / this.tileSize);
        const startY = Math.floor(top / this.tileSize);
        const endX = Math.floor((right - 1) / this.tileSize);  // Ensure we round down at the right edge
        const endY = Math.floor((bottom - 1) / this.tileSize);  // Ensure we round down at the bottom edge
    
        // Loop through all the tiles the player's bounding box covers
        for (let tileX = startX; tileX <= endX; tileX++) {
            for (let tileY = startY; tileY <= endY; tileY++) {
                
                // Ensure the tile coordinates are within bounds
                if (tileY < 0 || tileY >= this.layout.length || tileX < 0 || tileX >= this.layout[0].length) {
                    continue; // Skip out-of-bounds tiles
                }
    
                const tileIndex = this.layout[tileY][tileX];
                const tile = this.tileType[tileIndex];
    
                // Debug log to check tile properties and the area being covered
                console.log(`Checking tile at (${tileX}, ${tileY}):`, tile);
    
                // Check if this tile is in the pickupable range
                const pickupableIndices = [3, 4, 5, 6, 7, 8, 9];
                if (pickupableIndices.includes(tileIndex) ) {
                    const noteName = tile.name;
                    if (player.heldNote) {
                      console.log(`Dropping held note: ${player.heldNote}`);
                      this.notes[player.heldNote] = false; // Mark the previous note as unheld
                      // You could also add code to return the previously held note to the grid if necessary
                  }
                    console.log(`Picked up note: ${noteName}`);
                    this.notes[noteName] = true;
                    player.heldNote = noteName;
                    //this.layout[tileY][tileX] = 1; // Replace with tile index for 'floor'
                    return; 
                }
            }
        } 
        // If no note was picked up
        if (!player.heldNote) {
            console.log('No note under the player to pick up.');
        } else {
            console.log(`You're already holding the note: ${player.heldNote}`);
        }
    }
     
 */
      
    // Special action for test blocks
    triggerSpecialAction(x, y) {
      console.log(`Special action triggered at ${x}, ${y}`);
      // You can add more advanced actions for special blocks, such as playing a specific sound
      // Example: playSpecialSound(x, y);
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

  }
  