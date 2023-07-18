<template>


<div class="flex-grow h-screen overflow-y-scroll no-scrollbar p-4">
    <div class="flex flex-col justify-center">
      <input type="text" v-model="query" placeholder="Search for songs, podcasts, or albums" @change="search"/>
      <button @click="search">Search</button>
        <div id="recentSearches">
            <h3>Recent Searches</h3>
            <ul>
                <li v-for="search in recentSearches" :key="search">{{ search }}</li>
            </ul>
        </div>

  
      <div id="searchResults">
        <!-- Search results will be dynamically updated here -->
        <div v-for="result in results" :key="result.id">
            <NuxtLink :to="`/playlist/${result.id}`"><p>{{ result.name }}</p></NuxtLink>
        </div>
      </div>

      <h3>Browse All</h3>
    <div class="genre-cards ">
      <div v-for="(genre, index) in genres" :key="index" class="genre-card h-[12rem] w-[10rem]"  :style="{ backgroundColor: getRandomColor() }" @click="searchByGenre(genre)">
        <NuxtLink :to="`/playlist/${genre.id}`"><p class="genre-title">{{ genre }} test</p></NuxtLink>
      </div>
    </div>


    </div>
</div>
    
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  
  const query = ref('');
  const results = ref([]);
  const accessToken = ref('');
  const recentSearches = ref([]);

  const genres = ref([]);

  
  onMounted(async () => {
    
    accessToken.value = localStorage.getItem('accessToken') || '';
    console.log('Saved Access Token:', accessToken.value);
    displayGenres(accessToken.value)
  });
  
  async function displayGenres(token){
    try {
      const response = await fetch('https://api.spotify.com/v1/recommendations/available-genre-seeds', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch genres');
      }
  
      const data = await response.json();
      genres.value = data.genres;
      console.log('Genres:', data.genres);
    } catch (error) {
      console.error(error);
    }
  }

  async function searchByGenre(genre) {
  try {
    const response = await fetch(
    //   `https://api.spotify.com/v1/search?q=${encodeURIComponent(genre)}&type=track,episode,album`,
      {
        headers: {
          'Authorization': `Bearer ${accessToken.value}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to perform search');
    }

    const data = await response.json();

    // Process and update search results
    results.value = processResults(data);

    console.log('Genre Searches:', results.value);
    addToRecentSearches(genre);
  } catch (error) {
    console.error(error);
    // Handle error
  }
}



  async function search() {
    try {
      const response = await fetch(
        `https://api.spotify.com/v1/search?q=${encodeURIComponent(query.value)}&type=track,episode,album`,
        {
          headers: {
            'Authorization': `Bearer ${accessToken.value}`,
          },
        }
      );
  
      if (!response.ok) {
        throw new Error('Failed to perform search');
      }
  
      const data = await response.json();
  
      // Process and update search results
      results.value = processResults(data);
      addToRecentSearches(query.value);
      console.log('Recent Searches:', results.value);
    } catch (error) {
      console.error(error);
      // Handle error
    }
  }

  function getRandomColor() {
  // Generate a random color for each genre card
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
  
  function processResults(data) {
    // Process the search results from the Spotify API response
    // and return an array of formatted result objects
  
    const results = [];
  
    // Process and format track results
    if (data.tracks && data.tracks.items.length > 0) {
      const tracks = data.tracks.items;
      for (const track of tracks) {
        results.push({
          id: track.id,
          name: track.name,
          type: 'track',
        });
      }
    }
  
    // Process and format episode results
    if (data.episodes && data.episodes.items.length > 0) {
      const episodes = data.episodes.items;
      for (const episode of episodes) {
        results.push({
          id: episode.id,
          name: episode.name,
          type: 'episode',
        });
      }
    }
  
    // Process and format album results
    if (data.albums && data.albums.items.length > 0) {
      const albums = data.albums.items;
      for (const album of albums) {
        results.push({
          id: album.id,
          name: album.name,
          type: 'album',
        });
      }
    }
  
    return results;
  }

  function addToRecentSearches(query) {
  // Check if the query already exists in the recent searches
  if (!recentSearches.value.includes(query)) {
    // Add the query to the beginning of the recent searches list
    recentSearches.value.unshift(query);

    // Limit the number of recent searches to a certain number (e.g., 10)
    if (recentSearches.value.length > 10) {
      recentSearches.value = recentSearches.value.slice(0, 10);
    }
  }
}

  
  </script>

<style scoped>
.genre-cards {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.genre-card {
  padding: 10px;
  border-radius: 5px;
  color: white;
  text-align: center;
  font-weight: bold;
  cursor: pointer;
}

.genre-title {
  margin: 0;
}
</style>
  