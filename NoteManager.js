class NoteManager {
    constructor(layout, tileType, tileSize) {
        this.layout = layout;
        this.tileType = tileType;
        this.tileSize = tileSize;
    }

    // Handles the note pickup when a button is pressed
    pickupNoteButtonPress(player) {
        const left = player.x;
        const top = player.y;
        const right = player.x + player.width;
        const bottom = player.y + player.height;

        // Get the starting and ending tile coordinates for the player's bounding box
        const startX = Math.floor(left / this.tileSize);
        const startY = Math.floor(top / this.tileSize);
        const endX = Math.floor((right - 1) / this.tileSize);  // Ensure we round down at the right edge
        const endY = Math.floor((bottom - 1) / this.tileSize);  // Ensure we round down at the bottom edge

        // This will hold the notes under the player
        const notesUnderPlayer = [];

        // Loop through all the tiles the player's bounding box covers
        for (let tileX = startX; tileX <= endX; tileX++) {
            for (let tileY = startY; tileY <= endY; tileY++) {

                // Ensure the tile coordinates are within bounds
                if (tileY < 0 || tileY >= this.layout.length || tileX < 0 || tileX >= this.layout[0].length) {
                    continue; // Skip out-of-bounds tiles
                }

                const tileIndex = this.layout[tileY][tileX];
                const tile = this.tileType[tileIndex];

                // Check if this tile is in the pickupable range
                const pickupableIndices = [3, 4, 5, 6, 7, 8, 9];
                if (pickupableIndices.includes(tileIndex)) {
                    const noteName = tile.name;
                    // Add this note to the list of notes under the player
                    notesUnderPlayer.push({ tileX, tileY, noteName });
                }
            }
        }

        // If there are any notes under the player, pick them up in order
        if (notesUnderPlayer.length > 0) {
            if (player.heldNote) {
                // If the player is already holding a note, release it first
                this.dropHeldNote(player);
            }

            // Pick up the first note in the list
            const noteToPickUp = notesUnderPlayer[0];
            player.heldNote = noteToPickUp.noteName;
            this.layout[noteToPickUp.tileY][noteToPickUp.tileX] = 1; // Replace with 'floor' tile index
            player.notesPickedUp.push(noteToPickUp.noteName); // Add it to the list of picked-up notes
        }
    }

    // Handles the cycling through notes when a key is pressed
    cycleNoteButtonPress(player) {
        if (player.heldNote) {
            // Assume player.heldNote is an array of notes the player has picked up
            let currentNoteIndex = player.notesPickedUp.indexOf(player.heldNote);
            
            // Cycle to the next note (loop back to the first if we're at the end)
            currentNoteIndex = (currentNoteIndex + 1) % player.notesPickedUp.length;

            // Update the player's held note to the next one in the list
            player.heldNote = player.notesPickedUp[currentNoteIndex];
        }
    }

    // Method to drop the held note
    dropHeldNote(player) {
        if (player.heldNote) {
            this.layout[player.heldNote.tileY][player.heldNote.tileX] = 3; // Restore the note to its original location
            player.notesPickedUp = player.notesPickedUp.filter(note => note !== player.heldNote);
            player.heldNote = null;
        }
    }
}

export default NoteManager;
