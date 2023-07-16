<template>
    <div class="text-white">

      <div class="flex-grow h-screen overflow-y-scroll no-scrollbar">
            

            <!-- <section class="flex items-end space-x-7 bg-gradient-to-b to-black from-red-500 h-80 text-white p-8"> -->
            <section :class="`flex items-end space-x-7 bg-gradient-to-b ${colorClass} h-70 text-white p-8 w-full`">
                <img src="https://mosaic.scdn.co/640/ab67616d0000b2730a7a29be24e9d5cf030ccd6bab67616d0000b27310426b9f47266bad330be9edab67616d0000b2734467b1b14466adeec3d7ee9fab67616d0000b273d77e0b25066081fd50e66a14" alt="" class="h-44 w-44 shadow-2xl">

                <div>
                    <p>PLAYLIST</p>
                    <h1 class="text-2xl md:text-3xl xl:text-5xl font-bold">{{playlistTitle}}</h1>
                    
                </div>
                

            </section>

            <div v-for="(song, index) in playlistSongs" :key="song.id" @click="playSong(song)" class="border">

              <div class="grid grid-cols-2 text-gray-500 py-4 px-5 hover:bg-gray-900 rounded-lg cursor-pointer">
                <div class="flex items-center space-x-4">
                  <p>{{ index + 1 }}</p>

                  <img class="h-10 w-10" :src="song.track.album.images[2].url" alt="">

                  <div>
                    <p class="w-36 lg:w-64 truncate text-white">{{ song.track.name }}</p>
                    
                    <!-- <p>{{ song.added_at }}</p> -->
                    
                    <p class="w-40">{{ song.track.artists[0].name }}</p>
                  </div>

                  <div class="flex items-center justify-between ml-auto md:ml-0 border">
                    <p class="w-40 hidden md:inline">{{ song.track.album.name }}</p>
                    <p>{{ song.track.duration_ms }}</p>
                  </div>

                </div>
              </div>

            </div>
            <!-- <MusicList /> -->
        </div>

        

    </div>
</template>

<script setup>

const colorClass = ref('');
const colors = [
  "from-indigo-500",
  "from-blue-500",
  "from-lightBlue-500",
  "from-cyan-500",
  "from-emerald-500",
  "from-green-500",
  "from-lime-500",
  "from-yellow-500",
  "from-amber-500",
  "from-orange-500",
  "from-red-500",
  "from-pink-500",
  "from-rose-500",
  "from-fuchsia-500",
  "from-purple-500",
  "from-violet-500",
];

const randomColorClass = colors[Math.floor(Math.random() * colors.length)];
colorClass.value = randomColorClass;


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
    console.log('Playlist:', data);
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

    console.log(data.items[0].track.album.images[0].url)

    // console.log(playlists.value)
  } catch (error) {
    console.error(error);
    // Handle error
  }
}

const playSong = async (song) => {
try {
    // Get a list of available devices
    const devicesResponse = await fetch('https://api.spotify.com/v1/me/player/devices', {
      headers: {
        Authorization: `Bearer BQAgTwJCm9X1jLiBqQ5zEwW4VvYYbzj84CgWCBYxEsoKRmWs8K5nhIVC73BtAksfrHshvbdyEpb4I_Jzf8N_AE3c5Np0ZFqTjiPoSX5FZnobxuBKWZiNMmwxrwj1_9aXBssmPXOAgY7_4XJtxeUWA5dcRKJqC2PwQYTKdH1N5_Bn2QucpubKzWJ6cmfntKST7gN3S_Ix7aknDcbV_100EF-AyevHMAo`,
      },
    });

    if (!devicesResponse.ok) {
      throw new Error('Failed to retrieve devices');
    }

    const devicesData = await devicesResponse.json();

    // Find your phone device
    const phoneDevice = devicesData.devices.find(device => device.type === 'Smartphone');

    if (!phoneDevice) {
      throw new Error('Phone device not found');
    }

    const deviceName = phoneDevice.name;
    const deviceId = phoneDevice.id;

    console.log('Phone device name:', deviceName);

    // Play the song on your phone
    const response = await fetch(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer BQAgTwJCm9X1jLiBqQ5zEwW4VvYYbzj84CgWCBYxEsoKRmWs8K5nhIVC73BtAksfrHshvbdyEpb4I_Jzf8N_AE3c5Np0ZFqTjiPoSX5FZnobxuBKWZiNMmwxrwj1_9aXBssmPXOAgY7_4XJtxeUWA5dcRKJqC2PwQYTKdH1N5_Bn2QucpubKzWJ6cmfntKST7gN3S_Ix7aknDcbV_100EF-AyevHMAo`,
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