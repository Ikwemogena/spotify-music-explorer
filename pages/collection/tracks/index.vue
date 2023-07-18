<template>
    <div>
        <section :class="`flex items-end space-x-7 bg-gradient-to-b ${colorClass} h-70 text-white p-8 w-full`">
                <img src="https://mosaic.scdn.co/640/ab67616d0000b2730a7a29be24e9d5cf030ccd6bab67616d0000b27310426b9f47266bad330be9edab67616d0000b2734467b1b14466adeec3d7ee9fab67616d0000b273d77e0b25066081fd50e66a14" alt="" class="h-44 w-44 shadow-2xl">

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

    // console.log(likedSongs.value)
  } catch (error) {
    console.error(error);
    // Handle error
  }
}


</script>

<style lang="scss" scoped>

</style>