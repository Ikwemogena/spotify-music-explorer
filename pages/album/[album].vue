<template>
  <div class="h-screen overflow-y-scroll no-scrollbar">
    <MuseLoader v-if="isLoading" />
    <section
      :class="`flex items-end space-x-7 bg-gradient-to-b ${colorClass} h-70 text-white p-8 w-full`"
      v-if="playlistTitle"
    >
      <img :src="playlistImage" alt="" class="h-44 w-44 shadow-2xl" />

      <div>
        <p>ALBUM</p>
        <h1 class="text-xl md:text-4xl lg:text-7xl font-bold">{{ playlistTitle }}</h1>
      </div>
    </section>

    <div v-if="albumTracks.length > 0">

      <div v-for="(track, index) in albumTracks" :key="track.id" class="py-4 px-5">
        <div class="group grid grid-cols-3 text-gray-500 hover:bg-gray-700 rounded-lg cursor-pointer p-1">
          <div class="col-span-2 flex items-center space-x-4 p-1">
            <p class="opacity-100 group-hover:opacity-0 transition-opacity">{{ index + 1 }}</p>

              <div class="" >
                <Icon name="mdi:play" class="none text-3xl opacity-0 group-hover:opacity-100 transition-opacity" @click="playSong(track)"/>

              </div>
            <div>
              <p class="w-36 lg:w-64 truncate text-white">{{ track.name }}</p>
              <p class="w-40">{{ track.artists[0].name }}</p>
            </div>
          </div>

          <div class="flex items-center justify-end pr-5 gap-4">
            <p>{{ formatDuration(track.duration_ms) }}</p>

            <div class="opacity-0 group-hover:opacity-100 transition-opacity">
              <!-- <p>queue</p> -->
              <button @click="addToQueue(track)">Queue</button>
            </div>

            <div  class="opacity-0 group-hover:opacity-100 transition-opacity" @click="toggleOptions(index)">
              <Icon name="mdi:dots-horizontal" class="none text-4xl"/>
              <!-- @click="showOptions(item)" -->
            </div>
          </div>          
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

import { useStore } from '@/store/currentSong';

const accessToken = localStorage.getItem('accessToken') || '';
const playlistTitle = ref('');
const playlistImage = ref('');
const albumTracks = ref([]);
const isLoading = ref(true);

// const queue = ref([]);

const { album } = useRoute().params;

onMounted(async () => {
  try {
    await getAlbum(accessToken, album);
    isLoading = false;
    } catch (error) {
      console.error(error);
      isLoading.value = false;
    }
});

async function getAlbum(token, albumId) {
  try {
    const response = await fetch(`https://api.spotify.com/v1/albums/${albumId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch album');
    }

    const data = await response.json();

    playlistTitle.value = data.name;
    playlistImage.value = data.images[0].url;
    albumTracks.value = data.tracks.items;

  } catch (error) {
    console.error(error);
  }
}

function formatDuration(durationMs) {
  const minutes = Math.floor(durationMs / 60000);
  const seconds = ((durationMs % 60000) / 1000).toFixed(0);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

// const playSong = async (song) => {
//   // console.log(song.album)
//   // const { album: { images }, name, artists, uri } = song;

//   // console.log(song)
  
//   // Create a new object containing the information
//   // const songInfo = {
//   //   image: images[0].url,
//   //   name,
//   //   artist: artists[0].name,
//   //   uri,
//   // };

//   const playerStore = useStore();
  
//   playerStore.setCurrentSong(songInfo);
// };

const addToQueue = async (song) => {
  try {
    const response = await fetch(`https://api.spotify.com/v1/me/player/queue?uri=${song.uri}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken.value}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to add the song to the queue.');
    }
  } catch (error) {
    console.error(error);
  }
};
</script>

<style  scoped>
/* Add your custom styles here */
</style>
