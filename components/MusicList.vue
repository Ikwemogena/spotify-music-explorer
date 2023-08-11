<template>
  <div class="text-white">
    <div class="flex-grow h-screen overflow-y-scroll no-scrollbar">
      <section :class="`flex items-end space-x-7 bg-gradient-to-b ${colorClass} h-70 text-white p-8 w-full`"
        v-if="playlistTitle">
        <img :src="playlistImage" alt="" class="h-44 w-44 shadow-2xl" />
        <div>
          <p>PLAYLIST</p>
          <h1 class="text-xl md:text-4xl lg:text-7xl  font-bold">{{ playlistTitle }}</h1>
        </div>
      </section>
      <div v-if="playlistSongs.length === 0" class="flex justify-center h-full pt-4">
        <p class="text-gray-500 text-2xl">No songs in this playlist</p>
        <button class="text-blue-500 hover:underline" @click="openAddSongsModal">Add songs</button>
      </div>
      <div v-else>
        <div v-for="(song, index) in playlistSongs" :key="song.id">
          <div class="grid grid-cols-3 text-gray-500 py-4 px-5 group hover:bg-gray-700 rounded-lg cursor-pointer">
            <div class="flex items-center space-x-4">
              <p class="opacity-100 group-hover:opacity-0 transition-opacity">{{ index + 1 }}</p>
              <div>
                <Icon name="mdi:play"
                  class="none text-3xl opacity-0 group-hover:opacity-100 transition-opacity hover:text-white"
                  @click="playSong(song)" />
              </div>
              <img class="h-10 w-10" :src="song.track.album.images[2].url" alt="">
              <div>
                <NuxtLink :to="`/track/${song.track.id}`" class="flex justify-between gap-4 pr-4">
                  <p class="w-36 lg:w-64 truncate text-white hover:underline">{{ song.track.name }}</p>
                </NuxtLink>
                <p class="w-40">{{ song.track.artists[0].name }}</p>
              </div>
              <div class="flex items-center justify-between ml-auto md:ml-0">
                <NuxtLink :to="`/album/${song.track.album.id}`" class="flex justify-between gap-4 pr-4">
                  <p class="w-40 hidden md:inline hover:underline truncate pr-6">{{ song.track.album.name }}</p>
                </NuxtLink>
                <p>{{ formatDuration(song.track.duration_ms) }}</p>
              </div>
              <div class="opacity-0 group-hover:opacity-100 transition-opacity flex gap-4 items-center"
                @click="addToQueue(song)">
                <Icon name="mdi:plus-box-multiple-outline" class="none text-2xl hover:text-white" />
              </div>
              <div class="opacity-0 group-hover:opacity-100 transition-opacity" @click="openShareModal(song.track)">
                <Icon name="ic:twotone-share" class="none text-2xl hover:text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>


    <MuseSocialModal :shareModal="shareModal"  @close="shareModal = false" :externalUrl="externalUrlProp" />
  </div>
</template>

<script setup>

import { useStore } from '@/store/currentSong';
import { useQueue } from '@/store/queue';
import useFormatDuration from '@/composables/useFormatDuration';
const { formatDuration } = useFormatDuration();

const shareModal = ref(false);
const externalUrlProp = ref('');
const queue = ref([]);
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

const { playlistTitle, playlistSongs } = defineProps({
  playlistTitle: String,
  playlistSongs: Array,
  playlistImage: String,
});

const accessToken = ref('');
onMounted(async () => {
  accessToken.value = localStorage.getItem('accessToken') || '';
});

const playSong = async (song) => {
  const playerStore = useStore();
  playerStore.setCurrentSong(song);
};

const addToQueue = async (song) => {
  queue.value.push(song.track);
  const updateQueue = useQueue();
  updateQueue.addToQueue(song.track.name);
  try {
    const response = await fetch(`https://api.spotify.com/v1/me/player/queue?uri=${song.track.uri}`, {
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

function openShareModal(external) {
  shareModal.value = true;
  externalUrlProp.value = external; // Set the external URL as a prop
  console.log('Opening share modal for song in playlist:', externalUrl);
}
URL
</script>

<style lang="scss" scoped></style>