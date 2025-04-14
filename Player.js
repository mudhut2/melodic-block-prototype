let topTexture, bottomTexture; 

class Player {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.width = 80;
      this.height = 80;
      this.state = 'standing';
      this.smallMoveStep = 80;
      this.bigMoveStep = 120;
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
    }
    
  
    show() {
      fill(0, 0, 255); // Blue for the main body of the player
      rect(this.x, this.y, this.width, this.height);
      
      // Draw the top texture
      //image(topTexture, this.x, this.y - 20, this.width, 20);  // Adjust position and size as needed

      // Draw the bottom texture
     // image(bottomTexture, this.x, this.y + this.height, this.width, 20);  // Adjust position and size as needed
    }
  }
  