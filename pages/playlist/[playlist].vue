<template>
    <div class="text-white">
        <h1 class="text-2xl">{{playlistTitle}}</h1>

        <div v-for="(song, index) in playlistSongs" :key="song.id" @click="playSong(song)">

          <div class="flex justify-start gap-8 items-start">
            <p>{{ index + 1 }}</p>
            <p class="pl-4">{{ song.track.name }}</p>
            <p>{{ song.track.album.name }}</p>
            <p>{{ song.added_at }}</p>
            <p>{{ song.track.duration_ms }}</p>
          </div>

        </div>

    </div>
</template>

<script setup>


const {playlist} = useRoute().params;
const accessToken = ref('');
const playlistTitle = ref('');
const playlistSongs = ref([]);

// https://api.spotify.com/v1/playlists/{playlist_id}/tracks

onMounted(async () => {
  accessToken.value = localStorage.getItem('accessToken') || '';
  console.log('Saved Items:', accessToken.value);

  //   await getPlaylists(accessToken.value)
  await getPlaylist(accessToken.value, playlist);
  getPlaylistsItems(accessToken.value, playlist)

  //   if (accessToken.value) {
    
  //   }
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
    console.log('Playlist Title:', playlistTitle.value);
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
    // console.log(data.items[0].track.name);
    console.log(data.items[0])
    // Update playlists ref with the retrieved data
    // playlists.value = data.items;

    playlistSongs.value = data.items

    // console.log(playlists.value)
  } catch (error) {
    console.error(error);
    // Handle error
  }
}


const playSong = async (song) => {
  try {
    const deviceId = 'YOUR_DEVICE_ID'; // Replace with your actual Spotify device ID
    const response = await fetch(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${accessToken.value}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        uris: [`spotify:track:${song.track.id}`],
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to play song');
    }

    console.log('Playing song:', song.track.name);
  } catch (error) {
    console.error(error);
  }
};


    // console.log(playlists.value);

</script>

<style lang="scss" scoped>

</style>