<template>
  
    <div class="text-white">
        <div class="flex-grow h-screen overflow-y-scroll no-scrollbar">
            <!-- <div v-for="(song, index) in likedSongs" :key="song.id" @click="playSong(song)">
                <p>{{ song }}</p>
            </div> -->
            <!-- <section class="flex items-end space-x-7 bg-gradient-to-b to-black from-red-500 h-80 text-white p-8"> -->
            <section :class="`flex items-end space-x-7 bg-gradient-to-b ${colorClass} h-70 text-white p-8 w-full`" v-if="playlistTitle">
                <!-- <img src="https://mosaic.scdn.co/640/ab67616d0000b2730a7a29be24e9d5cf030ccd6bab67616d0000b27310426b9f47266bad330be9edab67616d0000b2734467b1b14466adeec3d7ee9fab67616d0000b273d77e0b25066081fd50e66a14" alt="" class="h-44 w-44 shadow-2xl"> -->

                <img :src="playlistImage" alt="" class="h-44 w-44 shadow-2xl" />
                <div>
                    <p>PLAYLIST</p>
                    <h1 class="text-xl md:text-4xl lg:text-7xl  font-bold">{{playlistTitle}}</h1>
                    
                </div>
                

            </section>

            <div v-if="playlistSongs.length === 0" class="flex justify-center h-full pt-4">
              <p class="text-gray-500 text-2xl">No songs in this playlist</p>
              <button class="text-blue-500 hover:underline" @click="openAddSongsModal">Add songs</button>
            </div>


            <div v-else>
              <div v-for="(song, index) in playlistSongs" :key="song.id" @click="playSong(song)">

                <div class="grid grid-cols-2 text-gray-500 py-4 px-5 hover:bg-gray-700 rounded-lg cursor-pointer">
                  <div class="flex items-center space-x-4">
                    <p>{{ index + 1 }}</p>

                    <img class="h-10 w-10" :src="song.track.album.images[2].url" alt="">

                    <div>
                      <NuxtLink :to="`/track/${song.track.id}`" class="flex justify-between gap-4 pr-4"><p class="w-36 lg:w-64 truncate text-white hover:underline">{{ song.track.name }}</p></NuxtLink>
                      
                      <!-- <p>{{ song.added_at }}</p> -->
                      
                      <p class="w-40">{{ song.track.artists[0].name }}</p>
                    </div>

                    <div class="flex items-center justify-between ml-auto md:ml-0">
                      <NuxtLink :to="`/album/${song.track.album.id}`" class="flex justify-between gap-4 pr-4"><p class="w-40 hidden md:inline hover:underline truncate pr-6">{{ song.track.album.name }}</p></NuxtLink>
                      <!-- <p>{{ song.track.duration_ms }}</p> -->
                      <p>{{ formatDuration(song.track.duration_ms)}}</p>
                    </div>

                  </div>
                </div>

              </div>

            </div>
            <!-- <MusicList /> -->
        </div>


    </div>
</template>

<script setup>
import { useStore } from '@/store/currentSong';
const isLoading = ref(true);

// const playlistImage = ref('');
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

// const playlistTitle = ref('');
const accessToken = ref('');

// console.log(playlistTitle)

// const { playlistSongs } = defineProps(['playlistSongs']);
// const props = defineProps({
//   playlistTitle: String,
//   playlistSongs: Array,
// });

// const props = defineProps({
//   playlistTitle: String,
//   playlistSongs: Array,
// });

const { playlistTitle, playlistSongs } = defineProps({
  playlistTitle: String,
  playlistSongs: Array,
  playlistImage: String,
});

console.log('liked songs here:', playlistSongs);

onMounted(async () => {
  accessToken.value = localStorage.getItem('accessToken') || '';
  console.log('Saved Items:', accessToken.value);

  //   await getPlaylists(accessToken.value)
//   await getPlaylist(accessToken.value, playlist);
//   getPlaylistsItems(accessToken.value, playlist)

  //   if (accessToken.value) {
    
  //   }
});



const playSong = async (song) => {

const playerStore = useStore();

console.log('Playing song:', useStore())

playerStore.setCurrentSong(song);

try {
  // Get a list of available devices
  const devicesResponse = await fetch('https://api.spotify.com/v1/me/player/devices', {
    headers: {
      Authorization: `Bearer BQBdUK5Vmv21Ze-wzP_t06WbySMs4h9ztBk_m2Wib0rufvY40jCppL42NQXk_mKzPLUvYAWth99xiCr-sHoWE-kq9KwEWXNgRwNUfcK-Ihlb5tPe00bhM1rWvW189yakeVl1W2rVWffJKvAYoGvJ173aMiwhdRf4JI1ei341IAlpkrtnwsWqOu3ywhgS2UT6q_MhzMWBgo2FcqsLuTl4Pw-_Nkyo3R4`,
    },
  });

  console.log(devicesResponse.ok)

  if (!devicesResponse.ok) {
    throw new Error('Failed to retrieve devices');
  }

  const devicesData = await devicesResponse.json();

  console.log(devicesData)

  console.log(devicesData.devices)
  console.log(devicesResponse.status)

  // Find your phone device
  const phoneDevice = devicesData.devices.find(device => device.type === 'Computer');

  // const currentDevice = devicesData.devices.find(device => device.is_active);
  // const phoneDevice = devicesData.devices.find(device => device.is_active);

  console.log(phoneDevice)

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
      Authorization: `Bearer BQBdUK5Vmv21Ze-wzP_t06WbySMs4h9ztBk_m2Wib0rufvY40jCppL42NQXk_mKzPLUvYAWth99xiCr-sHoWE-kq9KwEWXNgRwNUfcK-Ihlb5tPe00bhM1rWvW189yakeVl1W2rVWffJKvAYoGvJ173aMiwhdRf4JI1ei341IAlpkrtnwsWqOu3ywhgS2UT6q_MhzMWBgo2FcqsLuTl4Pw-_Nkyo3R4`,
    },
    body: JSON.stringify({
      uris: [`${song.track.uri}`],
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to play song');
  }

  // Create a new Audio object
  const audio = new Audio(song.track.preview_url);

  console.log(song)

  console.log(song.track.preview_url)
  console.log(song.track.id)
  
  // Play the audio
  audio.play();

  console.log('Playing song:', song.track.name);
} catch (error) {
  console.error(error);
}
};


function formatDuration(durationMs) {
  const minutes = Math.floor(durationMs / 60000);
  const seconds = ((durationMs % 60000) / 1000).toFixed(0);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}


</script>

<style lang="scss" scoped>

</style>