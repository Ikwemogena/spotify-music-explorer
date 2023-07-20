<template>
    <div>
      <!-- Your other content goes here -->
      
  
      <!-- Queue Modal -->
      <div v-if="showQueueModal" class="queue-modal">
        <div class="modal-content">
          <div class="modal-header">
            <h2>Queue</h2>
            <button @click="showQueueModal = false">Close</button>
          </div>
          <div class="queue-list">
            <div v-for="(song, index) in queue" :key="song.id" class="song-item">
              <div>
                <img :src="song.albumCover" alt="Album Cover" class="album-cover" />
              </div>
              <div class="song-info">
                <p class="song-name">{{ song.name }}</p>
                <p class="artist">{{ song.artist }}</p>
              </div>
              <div class="song-actions">
                <button @click="playNow(index)">Play Now</button>
                <button @click="removeFromQueue(index)">Remove</button>
              </div>
            </div>
          </div>
          <div class="queue-controls">
            <button @click="clearQueue">Clear Queue</button>
            <button @click="shuffleQueue">Shuffle Queue</button>
            <!-- Add more queue control buttons here as needed -->
          </div>
        </div>
      </div>
    </div>
  </template>
<script setup>
// Import necessary dependencies and functions

const showQueueModal = ref(false);

// Replace the following data with your actual queue data fetched from the backend or store
const queue = ref([
  {
    id: 1,
    name: "Song 1",
    artist: "Artist 1",
    albumCover: "album_cover_1.jpg",
  },
  {
    id: 2,
    name: "Song 2",
    artist: "Artist 2",
    albumCover: "album_cover_2.jpg",
  },
  // Add more songs to the queue array as needed
]);

function playNow(index) {
  // Implement logic to play the selected song immediately
  // Use the song data at `queue[index]` to play the song
}

function removeFromQueue(index) {
  // Implement logic to remove the selected song from the queue
  queue.value.splice(index, 1);
}

function clearQueue() {
  // Implement logic to clear the entire queue
  queue.value = [];
}

function shuffleQueue() {
  // Implement logic to shuffle the songs in the queue
  // You can use an array shuffling algorithm here
}

</script>

<style>
/* Add your CSS styles for the queue modal here */
/* Customize the styles as per your application's design */
/* For example: */
.queue-modal {
  /* Styles for the modal backdrop */
  /* Make the modal overlay the entire screen */
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  /* Styles for the modal content */
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  max-width: 400px;
}

.modal-header {
  /* Styles for the modal header */
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.queue-list {
  /* Styles for the queue list */
}

.song-item {
  /* Styles for each song item in the queue */
  display: flex;
  align-items: center;
  margin-bottom: 12px;
}

.album-cover {
  /* Styles for the album cover image */
  width: 40px;
  height: 40px;
  object-fit: cover;
  border-radius: 4px;
  margin-right: 12px;
}

.song-info {
  /* Styles for the song information */
}

.song-actions {
  /* Styles for the song action buttons */
}

.queue-controls {
  /* Styles for the queue control buttons */
  display: flex;
  justify-content: space-between;
}

/* Add more CSS styles as needed */
</style>
  