<template>
  <div>
    <MuseLoader v-if="isLoading" />
    <div>
      <div class="flex justify-between items-start px-12 py-4">
        <h2 class="text-xl md:text-2xl lg:text-3xl ">Recently Played</h2>
      </div>
      <div class="flex flex-col lg:grid grid-cols-3 gap-6 justify-center playlist-card pb-10 px-12 sm:pb-3">
        <div class="flex items-start justify-between rounded-lg shadow-2xl sm:pb-2" v-for="song in recentlyPlayed"
          :key="song.id">
          <div class="flex items-center">
            <img class="rounded-lg w-[7rem] h-[7rem]" :src="song.track.album.images[1].url" alt="">
            <div class="pl-2 pr-4">
              <NuxtLink :to="`/track/${song.track.id}`" class="flex justify-between gap-2 pr-4">
                <p class="hover:underline hover:text-gray-500">{{ song.track.name }}</p>
              </NuxtLink>
              <h3 class="text-gray-500">{{ song.track.artists[0].name }}</h3>
              <p class="text-gray-500">{{ formatDuration(song.track.duration_ms) }}</p>
            </div>
          </div>
          <Icon name="mdi:play" @click="playSong(song)"
            class="text-2xl cursor-pointer bg-white rounded-full p-1 m-2 w-10 h-10" color="black" />
        </div>
      </div>
    </div>

    <div>
      <div class="flex justify-between px-12 py-4">
        <h2 class="text-xl md:text-2xl lg:text-3xl">Recommended Playlists</h2>
        <div class="flex gap-4 text-3xl ">
          <button class="prev-btn " @click="slidePrev">&#8249;</button>
          <button class="next-btn" @click="slideNext">&#8250;</button>
        </div>
      </div>
      <div class="flex gap-4 justify-center recommended">
        <div class="rounded-lg shadow-2xl" v-for="playlist in recommendedPlaylists" :key="playlist.id">
          <NuxtLink :to="`/playlist/${playlist.id}`">
            <img class="rounded-lg w-50 h-60" :src="playlist.images[0].url" alt="">
            <div class="py-4 pt-2">
              <p class="md:text-xl sm:text-sm">{{ playlist.name }}</p>
              <h3 class="w-36 text-gray-500">{{ playlist.description }}</h3>
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const { formatDuration } = useFormatDuration();
const { setNowPlaying } = useNowPlaying();

const accessToken = ref('');
const isLoading = ref(true);
const recentlyPlayed = ref([]);
const recommendedPlaylists = ref([]);
const hottestPlaylists = ref([]);

onMounted(async () => {
  accessToken.value = localStorage.getItem('accessToken') || '';
  await getRecentlyPlayed(accessToken.value);
  await getRecommendedPlaylists(accessToken.value);
  await getHottestPlaylists(accessToken.value);
});

async function getRecentlyPlayed(token) {
  try {
    isLoading.value = true;

    const response = await fetch('https://api.spotify.com/v1/me/player/recently-played?limit=6', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch playlists');
    }

    const data = await response.json();
    recentlyPlayed.value = data.items;

    isLoading.value = false;
  } catch (error) {
    console.error(error);
    isLoading.value = false;
  }
}

async function getRecommendedPlaylists(token) {
  try {
    isLoading.value = true;

    const response = await fetch('https://api.spotify.com/v1/browse/featured-playlists?limit=5', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch recently played songs');
    }

    const data = await response.json();
    recommendedPlaylists.value = data.playlists.items;

    isLoading.value = false;
  } catch (error) {
    console.error(error);
    isLoading.value = false;
  }
}

async function getHottestPlaylists(token) {
  try {
    isLoading.value = true;

    const response = await fetch('https://api.spotify.com/v1/browse/categories/toplists/playlists?limit=10', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch hottest playlists');
    }

    const data = await response.json();
    hottestPlaylists.value = data.playlists.items;

    isLoading.value = false;
  } catch (error) {
    console.error(error);
    isLoading.value = false;
  }
}

const playSong = async (song) => {
  setNowPlaying(song.track);
};
</script>

<style scoped>
.play-button {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  font-size: 1.5rem;
  color: #000;
  background-color: transparent;
  border: none;
  cursor: pointer;
}

@media screen and (max-width: 468px) {
  .recommended {
    flex-direction: column;
    align-items: center;

  }
}
</style>
