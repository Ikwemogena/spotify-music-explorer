<template>
    <div class="text-white">
      <MuseLoader v-if="isLoading" />
      <div class="flex-grow h-screen overflow-y-scroll no-scrollbar" v-else>
          <MusicList :playlistImage="playlistImage" :playlistTitle="playlistTitle" :playlistSongs="playlistSongs"/>
      </div>
    </div>
</template>

<script setup>

const isLoading = ref(true);
const {playlist} = useRoute().params;
const accessToken = ref('');
const playlistTitle = ref('');
const playlistSongs = ref([]);
const playlistImage = ref('');

onMounted(async () => {
  accessToken.value = localStorage.getItem('accessToken') || '';

  try {
    await getPlaylist(accessToken.value, playlist);
    await getPlaylistsItems(accessToken.value, playlist);
    isLoading.value = false;
  } catch (error) {
    console.error(error);
    isLoading.value = false;
  }
});

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
    playlistTitle.value = data.name;
    playlistImage.value = data.images[0].url;
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
  }
}
</script>

<style lang="scss" scoped>

</style>