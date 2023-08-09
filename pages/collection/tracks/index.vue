<template>
    <div>
        <section :class="`flex items-end space-x-7 bg-gradient-to-b ${colorClass} h-70 text-white p-8 w-full`">
          <img :src="playlistImage" alt="" class="h-44 w-44 shadow-2xl">
          <div>
            <p>PLAYLIST</p>
            <h1 class="text-2xl md:text-3xl xl:text-6xl font-bold">Liked Songs</h1>
          </div>
        </section>
        <MusicList :playlistSongs="playlistSongs"/>
    </div>
</template>

<script setup>

const accessToken = ref('');
const playlistSongs = ref([])
const playlistImage = 'https://images.unsplash.com/photo-1689317145812-f25d593e2ba9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60'

onMounted(async () => {
  accessToken.value = localStorage.getItem('accessToken') || '';
  await getLikedSongs(accessToken.value);
});

async function getLikedSongs(token) {
  try {
    const response = await fetch('https://api.spotify.com/v1/me/tracks', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch playlists');
    }

    const data = await response.json();
    playlistSongs.value = data.items;
  } catch (error) {
    console.error(error);
  }
}


</script>

<style lang="scss" scoped>

</style>