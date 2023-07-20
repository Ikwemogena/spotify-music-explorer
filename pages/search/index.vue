<template>


<div class="flex-grow h-screen overflow-y-scroll no-scrollbar p-8">
    <div class="flex flex-col justify-center">
      <div class="flex justify-between">
        <input class="rounded p-2" type="text" v-model="query" placeholder="Search for songs, podcasts, or albums" @change="search"/>
      <button @click="search" class="border p-2 rounded px-3 text-white">Search</button>
      </div>
        <!-- <div id="recentSearches">
            <h3>Recent Searches</h3>
            <ul>
                <li v-for="search in recentSearches" :key="search">{{ search }}</li>
            </ul>
        </div> -->

        <!-- Input chips for sorting -->
        <div class="flex gap-2 pt-2">
          <button class="chips" @click="sortResults('relevance')">Relevance</button>
          <button class="chips" @click="sortResults('popularity')">Popularity</button>
          <button class="chips" @click="sortResults('genre')">Genre</button>
        </div>


      <div id="searchResults" class="flex flex-col items-center lg:grid grid-cols-4 gap-4 pt-4">
        <!-- Search results will be dynamically updated here -->
        <div v-for="result in results" :key="result.id">
          <!-- <NuxtLink :to="`/playlist/${result.id}`"> -->
          <NuxtLink :to="getResultLink(result)">
            <div class="result-card flex flex-col h-[14rem] w-[20rem]" :style="{ backgroundColor: getRandomColor() }">
              <h3 class="text-3xl font-bold text-white h-36">{{ result.name }}</h3>
              <img src="" alt="">
              <p class="text-gray-900">Type: {{ result.type }}</p>
            </div>
          </NuxtLink>
        </div>
      </div>
      <!-- <div>
        <h2 class="text-3xl">Songs</h2>
      </div>

      <div>
        <h2 class="text-3xl">Artists</h2>
      </div>

      <div>
        <h2 class="text-3xl">Albums</h2>
      </div>

      <div>
        <h2 class="text-3xl">Playlists</h2>
      </div>

      <div>
        <h2 class="text-3xl">Podcasts</h2>
      </div>

      <div>
        <h2 class="text-3xl">Episodes</h2>
      </div> -->

      <h3 class="text-2xl lg:text-4xl text-white py-2">Browse All</h3>
      <div class="genre-cards flex flex-col items-center lg:grid grid-cols-5 gap-4 ">
        <div v-for="(genre, index) in genres" :key="index" class="genre-card h-[14rem] w-[15rem]"  :style="{ backgroundColor: getRandomColor() }" @click="searchByGenre(genre)">
          <NuxtLink :to="`/playlist/${genre.id}`"><p class="genre-title text-2xl">{{ genre }}</p></NuxtLink>
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
          popularity: track.popularity,
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
          popularity: episode.popularity,
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
          popularity: album.popularity,          
        });
      }
    }
  
    return results;
  }

  function sortResults(sortBy) {
  switch (sortBy) {
    case 'relevance':
      // Sort the results by relevance (e.g., the default order)
      results.value.sort((a, b) => a.id.localeCompare(b.id));
      break;
    case 'popularity':
      // Sort the results by popularity (e.g., based on a popularity metric)
      results.value.sort((a, b) => a.popularity - b.popularity);
      break;
    case 'genre':
      // Sort the results by genre (e.g., alphabetically)
      results.value.sort((a, b) => a.genre.localeCompare(b.genre));
      break;
    default:
      break;
  }
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
function getResultLink(result) {
    if (result.type === 'track') {
      return `/track/${result.id}`;
    } else if (result.type === 'album'){
      return `/album/${result.id}`;
    } else {
      return `/playlist/${result.id}`;      
    }
  }
  
  </script>

<style scoped>

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

.result-card {
  background-color: #f3f3f3;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
}

.chips {
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  background-color: #e2e8f0;
  border: 1px solid #cbd5e0;
  color: #4a5568;
  cursor: pointer;
  transition: background-color 0.2s, border-color 0.2s, color 0.2s;
}

.chips:hover {
  background-color: #cbd5e0;
  border-color: #a0aec0;
  color: #2d3748;
}
</style>
  