// add vibration to player when note plays
class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 80;
        this.height = 80;
        this.state = 'standing';
        this.smallMoveStep = 80;
        this.bigMoveStep = 120;
        this.heldNotes = []; 
        this.maxNotes = 1;
      }

    canMoveTo(newX, newY, newWidth, newHeight, level) {
      // Check corners
      const left = newX;
      const right = newX + newWidth - 1;
      const top = newY;
      const bottom = newY + newHeight - 1;
      const centerX = newX + newWidth / 2;
      const centerY = newY + newHeight / 2;
    
      return !(
        level.isTileSolid(left, top) ||
        level.isTileSolid(right, top) ||
        level.isTileSolid(left, bottom) ||
        level.isTileSolid(right, bottom) ||
    
        // Add middle edge checks
        level.isTileSolid(centerX, top) ||       // Top edge center
        level.isTileSolid(centerX, bottom) ||    // Bottom edge center
        level.isTileSolid(left, centerY) ||      // Left edge center
        level.isTileSolid(right, centerY)        // Right edge center
      );
    }
    
    update(keys, keyWasPressed, level) {
        console.log('Player:', this.x, this.y, 'State:', this.state);
        
        if (keys['W'] && !keyWasPressed['W']) {
            keyWasPressed['W'] = true;
            let newY, newHeight;
            if (this.state === 'standing') {
                newY = this.y - this.bigMoveStep;
                newHeight = this.bigMoveStep;
                if (this.canMoveTo(this.x, newY, this.width, newHeight, level)) {
                    this.y = newY;
                    this.height = newHeight;
                    this.state = 'vertical';
                }
            } else if (this.state === 'vertical') {
                newY = this.y - this.smallMoveStep;
                newHeight = this.smallMoveStep;
                if (this.canMoveTo(this.x, newY, this.width, newHeight, level)) {
                    this.y = newY;
                    this.height = newHeight;
                    this.state = 'standing';
                }
            } else if (this.state === 'horizontal') {
                newY = this.y - this.smallMoveStep;
                newHeight = this.smallMoveStep;
                if (this.canMoveTo(this.x, newY, this.width, newHeight, level)) {
                    this.y = newY;
                    this.height = newHeight;
                }
            }
    }
    
    else if (keys['S'] && !keyWasPressed['S']) {
        keyWasPressed['S'] = true;
        let newY = this.y, newHeight = this.height;
        if (this.state === 'horizontal') {
            newY += this.smallMoveStep;
            newHeight = this.smallMoveStep;
            if (this.canMoveTo(this.x, newY, this.width, newHeight, level)) {
                this.y = newY;
                this.height = newHeight;
            }
        } else if (this.state === 'vertical') {
            newY += this.bigMoveStep;
            newHeight = this.smallMoveStep;
            if (this.canMoveTo(this.x, newY, this.width, newHeight, level)) {
                this.y = newY;
                this.height = newHeight;
                this.state = 'standing';
            }
            } else if (this.state === 'standing') {
                newY += this.smallMoveStep;
                newHeight = this.bigMoveStep;
                if (this.canMoveTo(this.x, newY, this.width, newHeight, level)) {
                    this.y = newY;
                    this.height = newHeight;
                    this.state = 'vertical';
                }
            }
        }

    else if (keys['A'] && !keyWasPressed['A']) {
        keyWasPressed['A'] = true;
        let newX = this.x, newWidth = this.width;
        if (this.state === 'horizontal') {
            newX -= this.smallMoveStep;
            newWidth = this.smallMoveStep;
            if (this.canMoveTo(newX, this.y, newWidth, this.height, level)) {
                this.x = newX;
                this.width = newWidth;
                this.state = 'standing';
            }
        } else if (this.state === 'vertical') {
            newX -= this.smallMoveStep;
            if (this.canMoveTo(newX, this.y, this.width, this.height, level)) {
                   this.x = newX;
            }
        } else if (this.state === 'standing') {
                newX -= this.bigMoveStep;
                newWidth = this.bigMoveStep;
                if (this.canMoveTo(newX, this.y, newWidth, this.height, level)) {
                    this.x = newX;
                    this.width = newWidth;
                    this.state = 'horizontal';
                }
            }
        }
        else if (keys['D'] && !keyWasPressed['D']) {
            keyWasPressed['D'] = true;
            let newX = this.x, newWidth = this.width;
            if (this.state === 'horizontal') {
                newX += this.bigMoveStep;
                newWidth = this.smallMoveStep;
                if (this.canMoveTo(newX, this.y, newWidth, this.height, level)) {
                    this.x = newX;
                    this.width = newWidth;
                    this.state = 'standing';
                }
            } else if (this.state === 'vertical') {
                newX += this.smallMoveStep;
                if (this.canMoveTo(newX, this.y, this.width, this.height, level)) {
                    this.x = newX;
                }
            } else if (this.state === 'standing') {
                newX += this.smallMoveStep;
                newWidth = this.bigMoveStep;
                if (this.canMoveTo(newX, this.y, newWidth, this.height, level)) {
                    this.x = newX;
                    this.width = newWidth;
                    this.state = 'horizontal';
                }
            }
        }
        if ((keys['J'] || keys['j']) && !keyWasPressed['J']) {
            keyWasPressed['J'] = true;
        
            const heldNote = this.heldNotes[0];
    
            // If the player is over a note to pick up, replace the held note with it
            level.playNoteButtonPress(player, noteSounds, 0);

        } else if (!(keys['J'] || keys['j'])) {
            keyWasPressed['J'] = false;
        }

        if ((keys[' '] || keys['SPACE']) && !keyWasPressed[' ']) {
            keyWasPressed[' '] = true;
        
            const heldNote = this.heldNotes[0];
        
            // If the player is over a note to pick up, replace the held note with it
            level.storeNoteButtonPress(player, 0);
        } else if (!(keys[' '] || keys['SPACE'])) {
            keyWasPressed[' '] = false;
        }
    }

      pickupNote(tileIndex, level) {
        this.heldNote = tileIndex;
        console.log(`Picked up note: ${level.tileType[tileIndex].name}`);
      }
      
      dropNote(level) { // swaps dropped not into picked up notes place
        if (this.heldNote !== null) {
            const tileX = Math.floor((this.x + this.width / 2) / level.tileSize);
            const tileY = Math.floor((this.y + this.height / 2) / level.tileSize);
            const currentTile = level.getTile(tileX, tileY);
            if (currentTile !== null) {
                // Swap the held note with the tile
                const temp = level.tiles[tileY][tileX];
                level.tiles[tileY][tileX] = this.heldNote;
                this.heldNote = temp;
                console.log(`Swapped tile at (${tileX}, ${tileY}) with held note`);
            } else {
                console.log("No tile to swap with");
            }
        }
    }
    
    show() {
        // Draw the main body of the player (block)
        fill(0, 0, 250);  // Blue as the block's color (for fallback)
        rect(this.x, this.y, this.width, this.height);

        // Front texture
        if (playerTex) {
          image(playerTex, this.x, this.y, this.width, this.height);  // Adjust position and size as needed
        }
        // 3D frame using lines (edges)
        stroke(0);  
        strokeWeight(3);  
        line(this.x, this.y, this.x + this.width, this.y);  // Top edge
        line(this.x, this.y, this.x, this.y + this.height);  // Left edge
        line(this.x + this.width, this.y, this.x + this.width, this.y + this.height);  // Right edge
        line(this.x, this.y + this.height, this.x + this.width, this.y + this.height);  // Bottom edge
        let depthOffset = 20;  
        // Draw the 3D edges
        line(this.x + depthOffset, this.y + depthOffset, this.x + this.width + depthOffset, this.y + depthOffset);  // Top back edge
        line(this.x + depthOffset, this.y + depthOffset, this.x + depthOffset, this.y + this.height + depthOffset);  // Left back edge
        line(this.x + this.width + depthOffset, this.y + depthOffset, this.x + this.width + depthOffset, this.y + this.height + depthOffset);  // Right back edge
        line(this.x + depthOffset, this.y + this.height + depthOffset, this.x + this.width + depthOffset, this.y + this.height + depthOffset);  // Bottom back edge
        line(this.x, this.y, this.x + depthOffset, this.y + depthOffset);  // Front-left to back-left
        line(this.x + this.width, this.y, this.x + this.width + depthOffset, this.y + depthOffset);  // Front-right to back-right
        line(this.x, this.y + this.height, this.x + depthOffset, this.y + this.height + depthOffset);  // Front-bottom to back-bottom
        line(this.x + this.width, this.y + this.height, this.x + this.width + depthOffset, this.y + this.height + depthOffset);  // Front-bottom-right to back-bottom-right
    }    
}
  