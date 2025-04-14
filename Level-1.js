class Level {
    constructor() {
      this.tileSize = 40;
      this.notes = {};
      this.tileType = {
        0: { name: 'abyss', solid: false, texture: tileTex1, action: null },
        1: { name: 'floor', solid: false, texture: abyssTex1, action: null },
        2: { name: 'wall', solid: true, texture: wallTex1, action: this.triggerSpecialAction },
        // You can add more types with different properties, such as damage, interaction, etc.
      };
      this.layout = [
        [, , 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0],
        [0, 0, 2, 2, , 0, 0, 0, 0, , 0, 0, 0, 0, 0, 2, 2, 2, 2, 0],
        [0, 0, 2, 2, , 0, 0, 0, 0, , 0, 0, 0, 0, 0, 2, 2, 2, 2, 0],
        [0, 0, 2, 2, , 0, 0, 0, 0, , 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 2, 2, 2, 2, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 2, 0],
        [0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0, 2, 0],
        [0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 2, 0],
        [0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 0],
        [0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 2, 2, 2, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 2, 2, 2, 0],
        [2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 2, 2, 2, 0],
        [2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
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
      
    // Trigger a sound or event when stepping on a tile
    triggerAction(x, y) {
      console.log(`Triggered action at ${x}, ${y}`);
      // Example: play a sound or some other event here
    }
  
    // Special action for test blocks
    triggerSpecialAction(x, y) {
      console.log(`Special action triggered at ${x}, ${y}`);
      // You can add more advanced actions for special blocks, such as playing a specific sound
      // Example: playSpecialSound(x, y);
    }
  }
  