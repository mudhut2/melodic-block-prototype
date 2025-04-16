
class Player {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.width = 80;
      this.height = 80;
      this.state = 'standing';
      this.smallMoveStep = 80;
      this.bigMoveStep = 120;
      this.heldNote = null;
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
                    //level.triggerAction(this.x, this.y, this); // PICKUP FUNC
                }
            } else if (this.state === 'vertical') {
                newY = this.y - this.smallMoveStep;
                newHeight = this.smallMoveStep;
                if (this.canMoveTo(this.x, newY, this.width, newHeight, level)) {
                    this.y = newY;
                    this.height = newHeight;
                    this.state = 'standing';
                   // level.triggerAction(this.x, this.y, this); 
                }
            } else if (this.state === 'horizontal') {
                newY = this.y - this.smallMoveStep;
                newHeight = this.smallMoveStep;
                if (this.canMoveTo(this.x, newY, this.width, newHeight, level)) {
                    this.y = newY;
                    this.height = newHeight;
                    //level.triggerAction(this.x, this.y, this);
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
                    //level.triggerAction(this.x, this.y, this);
                }
            } else if (this.state === 'vertical') {
                newY += this.bigMoveStep;
                newHeight = this.smallMoveStep;
                if (this.canMoveTo(this.x, newY, this.width, newHeight, level)) {
                    this.y = newY;
                    this.height = newHeight;
                    this.state = 'standing';
                   // level.triggerAction(this.x, this.y, this);
                }
            } else if (this.state === 'standing') {
                newY += this.smallMoveStep;
                newHeight = this.bigMoveStep;
                if (this.canMoveTo(this.x, newY, this.width, newHeight, level)) {
                    this.y = newY;
                    this.height = newHeight;
                    this.state = 'vertical';
                    //level.triggerAction(this.x, this.y, this);
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
                    //level.triggerAction(this.x, this.y, this); 
                }
            } else if (this.state === 'vertical') {
                newX -= this.smallMoveStep;
                if (this.canMoveTo(newX, this.y, this.width, this.height, level)) {
                    this.x = newX;
                   // level.triggerAction(this.x, this.y, this); 
                }
            } else if (this.state === 'standing') {
                newX -= this.bigMoveStep;
                newWidth = this.bigMoveStep;
                if (this.canMoveTo(newX, this.y, newWidth, this.height, level)) {
                    this.x = newX;
                    this.width = newWidth;
                    this.state = 'horizontal';
                   // level.triggerAction(this.x, this.y, this); 
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
                   // level.triggerAction(this.x, this.y, this);
                }
            } else if (this.state === 'vertical') {
                newX += this.smallMoveStep;
                if (this.canMoveTo(newX, this.y, this.width, this.height, level)) {
                    this.x = newX;
                  //  level.triggerAction(this.x, this.y, this); 
                }
            } else if (this.state === 'standing') {
                newX += this.smallMoveStep;
                newWidth = this.bigMoveStep;
                if (this.canMoveTo(newX, this.y, newWidth, this.height, level)) {
                    this.x = newX;
                    this.width = newWidth;
                    this.state = 'horizontal';
                   // level.triggerAction(this.x, this.y, this);
                }
            }
        }
        if ((keys['E'] || keys['e']) && !keyWasPressed['E']) {
            keyWasPressed['E'] = true;
            level.pickupNoteButtonPress(this, noteSounds);    
        }        
    }

    tryAction(level) {
        let actionX = this.x;
        let actionY = this.y;
    
        if (this.state === 'standing') {
            // Trigger from center bottom
            actionX += this.width / 2;
            actionY += this.height / 2;
        } else if (this.state === 'horizontal') {
            // Trigger from the edge that's furthest to the right
            actionX += this.width - this.smallMoveStep / 2;
            actionY += this.height / 2;
        } else if (this.state === 'vertical') {
            // Trigger from the bottom tile
            actionX += this.width / 2;
            actionY += this.height - this.smallMoveStep / 2;
        }
    
        //level.triggerAction(actionX, actionY, this);
    }       

      pickupNote(tileIndex, level) {
        this.heldNote = tileIndex;
        console.log(`Picked up note: ${level.tileType[tileIndex].name}`);
      }
      
      dropNote(level) {
        if (this.heldNote !== null) {
          console.log(`Dropped note ${level.tileType[this.heldNote].name} at gate/finish`);
          this.heldNote = null;
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
  