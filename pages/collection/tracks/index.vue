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

// const playlistTitle = ref('');

const playlistSongs = ref([])
const playlistImage = 'https://images.unsplash.com/photo-1689317145812-f25d593e2ba9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60'


onMounted(async () => {
  accessToken.value = localStorage.getItem('accessToken') || '';
  console.log('Saved Items:', accessToken.value);

  await getLikedSongs(accessToken.value)
//   await getPlaylist(accessToken.value, playlist);
// getPlaylists(accessToken.value)

//   if (accessToken.value) {
    
//   }
});

// async function getPlaylist(token, playlistId) {
//   try {
//     const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     if (!response.ok) {
//       throw new Error('Failed to fetch playlist');
//     }

//     const data = await response.json();
//     console.log('Playlist:', data);
//     playlistSongs.value = data.name;

//     // console.log('Playlist Title:', playlistTitle.value);
//   } catch (error) {
//     console.error(error);
//   }
// }


async function getLikedSongs(token) {
  console.log('liked songs: ');
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
    // console.log(data.items);
    // Update playlists ref with the retrieved data

    console.log('liked songs: ', data.items);
    playlistSongs.value = data.items;
    // playlistImage.value = data.images[0].url;

    // console.log(likedSongs.value)
  } catch (error) {
    console.error(error);
    // Handle error
  }
}


</script>

<style lang="scss" scoped>

</style>