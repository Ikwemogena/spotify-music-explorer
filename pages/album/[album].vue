<template>
  <div class="h-screen overflow-y-scroll no-scrollbar">
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
        <div class="grid grid-cols-3 text-gray-500 hover:bg-gray-700 rounded-lg cursor-pointer p-1">
          <div class="col-span-2 flex items-center space-x-4 p-1">
            <p>{{ index + 1 }}</p>

            <!-- <img class="h-10 w-10" :src="track.album.images[2].url" alt="" /> -->

            <div>
              <p class="w-36 lg:w-64 truncate text-white">{{ track.name }}</p>
              <p class="w-40">{{ track.artists[0].name }}</p>
            </div>
          </div>

          <div class="flex items-center justify-end pr-5">
            <p>{{ formatDuration(track.duration_ms) }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useStore } from '@/store/currentSong';
import { useRoute } from 'vue-router';

const accessToken = localStorage.getItem('accessToken') || '';
const playlistTitle = ref('');
const playlistImage = ref('');
const albumTracks = ref([]);

const { album } = useRoute().params;

onMounted(async () => {
  await getAlbum(accessToken, album);
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

    console.log(playlistImage.value)
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

function playSong(song) {
  // Play the song
  console.log('Playing song:', song.track.name);
}
</script>

<style  scoped>
/* Add your custom styles here */
</style>
