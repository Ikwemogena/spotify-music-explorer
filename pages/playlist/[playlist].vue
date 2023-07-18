<template>
    <div class="text-white">

      <div class="flex-grow h-screen overflow-y-scroll no-scrollbar">
            <MusicList :playlistImage="playlistImage" :playlistTitle="playlistTitle" :playlistSongs="playlistSongs"/>
        </div>

        

    </div>
</template>

<script setup>

// const { playlistSongs: likedSongs } = defineProps(['likedSongs']);

import { useStore } from '@/store/currentSong';

// const colorClass = ref('');
// const colors = [
//   "from-indigo-500",
//   "from-blue-500",
//   "from-lightBlue-500",
//   "from-cyan-500",
//   "from-emerald-500",
//   "from-green-500",
//   "from-lime-500",
//   "from-yellow-500",
//   "from-amber-500",
//   "from-orange-500",
//   "from-red-500",
//   "from-pink-500",
//   "from-rose-500",
//   "from-fuchsia-500",
//   "from-purple-500",
//   "from-violet-500",
// ];

// const randomColorClass = colors[Math.floor(Math.random() * colors.length)];
// colorClass.value = randomColorClass;


const {playlist} = useRoute().params;
const accessToken = ref('');
const playlistTitle = ref('');
const playlistSongs = ref([]);
const playlistImage = ref('');


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
    console.log('Playlist:', data);
    playlistTitle.value = data.name;
    playlistImage.value = data.images[0].url;
    // console.log('Playlist Title:', playlistTitle.value);
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

    console.log(data.items[0].track.album.images[0].url)

    // console.log(playlists.value)
  } catch (error) {
    console.error(error);
    // Handle error
  }
}

// const playSong = async (song) => {

//   const playerStore = useStore();

//   console.log('Playing song:', useStore())

//   playerStore.setCurrentSong(song);
// try {
//     // Get a list of available devices
//     const devicesResponse = await fetch('https://api.spotify.com/v1/me/player/devices', {
//       headers: {
//         Authorization: `Bearer BQBdUK5Vmv21Ze-wzP_t06WbySMs4h9ztBk_m2Wib0rufvY40jCppL42NQXk_mKzPLUvYAWth99xiCr-sHoWE-kq9KwEWXNgRwNUfcK-Ihlb5tPe00bhM1rWvW189yakeVl1W2rVWffJKvAYoGvJ173aMiwhdRf4JI1ei341IAlpkrtnwsWqOu3ywhgS2UT6q_MhzMWBgo2FcqsLuTl4Pw-_Nkyo3R4`,
//       },
//     });

//     console.log(devicesResponse.ok)

//     if (!devicesResponse.ok) {
//       throw new Error('Failed to retrieve devices');
//     }

//     const devicesData = await devicesResponse.json();

//     console.log(devicesData)

//     console.log(devicesData.devices)
//     console.log(devicesResponse.status)

//     // Find your phone device
//     const phoneDevice = devicesData.devices.find(device => device.type === 'Computer');

//     // const currentDevice = devicesData.devices.find(device => device.is_active);
//     // const phoneDevice = devicesData.devices.find(device => device.is_active);

//     console.log(phoneDevice)

//     if (!phoneDevice) {
//       throw new Error('Phone device not found');
//     }

//     const deviceName = phoneDevice.name;
//     const deviceId = phoneDevice.id;

//     console.log('Phone device name:', deviceName);


    // // Stop the currently playing song
    // await fetch(`https://api.spotify.com/v1/me/player/pause?device_id=${deviceId}`, {
    //   method: 'PUT',
    //   headers: {
    //     Authorization: `Bearer BQD5iYxaKd6DC8krMUFg-bWALOazXBLtKuz4-DJ3ZbHQIqlzjxwmbtCuI2HaLg8DAyqWxvyv3TMjPaZ6sGiuhuuxetU1zf8RNoSwrOCIVK4dWJ0joPk_wmX4I8iZWknW3WhpeCmu56cQ-UXVIkgNyjcpfc8snCOHR18wGVbCKjLjbaMsIOihA1MNsX7Qu1YmtedULeWBDjAesQNYMiEwpbV6QV33uc0`,
    //   },
    // });

    // Play the song on your phone
    // const response = await fetch(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, {
    //   method: 'PUT',
    //   headers: {
    //     Authorization: `Bearer BQBdUK5Vmv21Ze-wzP_t06WbySMs4h9ztBk_m2Wib0rufvY40jCppL42NQXk_mKzPLUvYAWth99xiCr-sHoWE-kq9KwEWXNgRwNUfcK-Ihlb5tPe00bhM1rWvW189yakeVl1W2rVWffJKvAYoGvJ173aMiwhdRf4JI1ei341IAlpkrtnwsWqOu3ywhgS2UT6q_MhzMWBgo2FcqsLuTl4Pw-_Nkyo3R4`,
    //   },
    //   body: JSON.stringify({
    //     uris: [`${song.track.uri}`],
    //   }),
    // });

    // if (!response.ok) {
    //   throw new Error('Failed to play song');
    // }

    // // Create a new Audio object
    // const audio = new Audio(song.track.preview_url);

    // console.log(song)

    // console.log(song.track.preview_url)
    // console.log(song.track.id)
    
    // // Play the audio
    // audio.play();

//     console.log('Playing song:', song.track.name);
//   } catch (error) {
//     console.error(error);
//   }
// };

// const playSong = async (song) => {
//   console.log('Playing song:', song.track.name)
//   console.log('Playing song:', song.track.id)
//   try {
//     // const deviceId = 'YOUR_DEVICE_ID'; // Replace with your actual Spotify device ID
//     // const response = await fetch(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, {
//     const response = await fetch(`https://api.spotify.com/v1/me/player/play`, {
//       method: 'PUT',
//       headers: {
//         Authorization: `Bearer BQAgTwJCm9X1jLiBqQ5zEwW4VvYYbzj84CgWCBYxEsoKRmWs8K5nhIVC73BtAksfrHshvbdyEpb4I_Jzf8N_AE3c5Np0ZFqTjiPoSX5FZnobxuBKWZiNMmwxrwj1_9aXBssmPXOAgY7_4XJtxeUWA5dcRKJqC2PwQYTKdH1N5_Bn2QucpubKzWJ6cmfntKST7gN3S_Ix7aknDcbV_100EF-AyevHMAo`,
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         uris: [`spotify:track:${song.track.id}`],
//       }),
//     });

//     if (!response.ok) {
//       throw new Error('Failed to play song');
//     }

//     console.log('Playing song:', song.track.name);
//   } catch (error) {
//     console.error(error);
//   }
// };


    // console.log(playlists.value);

</script>

<style lang="scss" scoped>

</style>