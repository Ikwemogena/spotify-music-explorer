<template>
    <div class="text-white">
        <a
          v-for="(genre, index) in genres"
          :key="index"
          :href="getGenreLink(genre.id)"
          class="genre-card"
          :style="{ backgroundColor: getRandomColor() }"
        >
  <p class="genre-title">{{ genre.name }}</p>
</a>


        

    </div>
</template>

<script setup>

const {genre} = useRoute().params;
const accessToken = ref('');
const playlistTitle = ref('');
const playlistSongs = ref([]);

onMounted(async () => {
  accessToken.value = localStorage.getItem('accessToken') || '';
  console.log('Saved Items:', accessToken.value);
  await getPlaylist(accessToken.value, playlist);
  getPlaylistsItems(accessToken.value, playlist);
  getGenreLink(genre.id);
});


function getGenreLink(genreId) {
  return `https://open.spotify.com/genre/${genreId}`;
}

async function getPlaylist(token, playlistId) {
  try {
    const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch playlist');
    }
    const data = await response.json();
    console.log('Playlist:', data);
    playlistTitle.value = data.name;
  } catch (error) {
    console.error(error);
  }
}

async function getPlaylistsItems(token, playlistId) {
  try {
    const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch playlists');
    }

    const data = await response.json();
    playlistSongs.value = data.items
  } catch (error) {
    console.error(error);
    // Handle error
  }
}


</script>

<style lang="scss" scoped>

</style>