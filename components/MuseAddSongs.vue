<template>
    <div v-if="showModal" class="overlay" @click="closeModal"></div>
    <div v-if="showModal" class="fixed inset-0 flex flex-col items-center justify-center z-50">
      <div class="form-container w-[25rem] h-[20rem] bg-white rounded-lg shadow-lg p-4">
        <div class="flex justify-between items-center px-4 py-2">
          <h2 class="text-lg font-bold">Add Songs</h2>
          <span class="chip-remove close text-xl pointer" @click="closeModal">&times;</span>
        </div>
        <div class="flex flex-col">
          <input type="text" v-model="searchQuery" class="w-full mb-2 px-2 py-1 border rounded" placeholder="Search songs">
          <button @click="searchSongs" class="bg-blue-500 text-white px-4 py-2 rounded">Search</button>
        </div>
        <div class="mt-4">
          <p v-if="searchResults.length === 0">No songs found.</p>
          <div v-else>
            <div v-for="song in searchResults" :key="song.id" class="flex items-center justify-between py-2 border-b">
              <div>
                <p class="font-bold">{{ song.name }}</p>
                <p>{{ song.artists.join(', ') }}</p>
              </div>
              <button @click="addSong(song)" class="bg-green-500 text-white px-4 py-1 rounded">Add</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  
  const showModal = ref(false);
  const searchQuery = ref('');
  const searchResults = ref([]);
  
  function openModal() {
    showModal.value = true;
  }
  
  function closeModal() {
    showModal.value = false;
    searchQuery.value = '';
    searchResults.value = [];
  }
  
  async function searchSongs() {
    if (!searchQuery.value) {
      return;
    }
  
    try {
      const response = await fetch(`https://api.spotify.com/v1/search?q=${searchQuery.value}&type=track`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
  
      if (response.ok) {
        const data = await response.json();
        searchResults.value = data.tracks.items.map((item) => ({
          id: item.id,
          name: item.name,
          artists: item.artists.map((artist) => artist.name),
        }));
      } else {
        console.error('Failed to search songs');
      }
    } catch (error) {
      console.error('Error searching songs:', error);
    }
  }
  
  function addSong(song) {
    console.log('Adding song:', song);
  
    // Clear the search query and results
    searchQuery.value = '';
    searchResults.value = [];
  }
  
  </script>
  
  <style scoped>
  /* Styles for the overlay and modal */
  </style>
  