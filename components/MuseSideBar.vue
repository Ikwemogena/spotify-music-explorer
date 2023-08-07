<template>
  <div>
      <div v-if="isOpen" class="bg-[#212124] p-3 text-[#FCFCFC] md:text-base sm:text-sm border-r border-gray-900 overflow-y-scroll h-screen no-scrollbar   md:inline-flex pb-36 pt-4">
              <div class="flex gap-4 flex-col items-start">
                <img src="../assets/images/MUSE-logo.png" alt="Logo">
                  <div class="sm:w-[10rem] flex flex-col gap-2">
                    <NuxtLink to="/" class="flex items-center space-x-2 hover:text-white">
                    
                      <Icon name="heroicons-solid:home" @click="playSong(song)" class="text-xl cursor-pointer"/>
                      <p>Home</p>
                    </NuxtLink>
                    <NuxtLink to="/search" class="flex items-center space-x-2 hover:text-white">
                      <Icon name="mdi:magnify" class="text-xl cursor-pointer"/>
                        <p>Search</p>
                    </NuxtLink>
                    <NuxtLink class="flex items-center space-x-2 hover:text-white">
                      <Icon name="mdi:library-books" class="text-xl cursor-pointer"/>
                        <p>Your Library</p>
                    </NuxtLink>
                  </div>

                  <hr class="border-t-[0.1px] border-gray-700 w-full"/>

                  <div class="flex flex-col gap-4">
                    <NuxtLink to="/collection/tracks" class="flex items-center space-x-2 hover:text-white">
                      <Icon name="mdi:heart" class="text-xl cursor-pointer"/>
                        <p>Liked Songs</p>
                    </NuxtLink>

                    <NuxtLink to="" @click="showModal = true" class="flex items-center space-x-2 hover:rounded hover:text-white hover:bg-gray-900">
                      <Icon name="mdi:folder-plus" class="text-xl cursor-pointer"/>
                        <p>Create Playlist</p>
                    </NuxtLink>
                  </div>
                  
                  <hr class="border-t-[0.1px] border-gray-700 w-full"/>
                  <!-- <MuseQueue /> -->

                  


                  <!-- <div>
                      <p>playlists/..</p>
                      <p>playlists/..</p><p>playlists/..</p><p>playlists/..</p><p>playlists/..</p><p>playlists/..</p><p>playlists/..</p><p>playlists/..</p><p>playlists/..</p><p>playlists/..</p><p>playlists/..</p><p>playlists/..</p><p>playlists/..</p><p>playlists/..</p><p>playlists/..</p><p>playlists/..</p><p>playlists/..</p><p>playlists/..</p><p>playlists/..</p><p>playlists/..</p>
                  </div> -->

                  <!-- <MuseCreatePlaylistModal :isOpen="isOpen" :closeModal="closeModal" :MuseCreatePlaylistModal="MuseCreatePlaylistModal" /> -->

                  <!-- <MuseCreatePlaylistModal :showModal="showModal" @close="showModal = false" /> -->


                  
                  <div >
                    <p class="text-xs pt-1 text-gray-400">Playlists</p>
                      <div class="flex flex-col">
                        
                        <p class="cursor-pointer hover:text-white py-1" v-for="playlist in playlists" :key="playlist.id" @click="logPlaylist(playlist.id)">
                          <NuxtLink :to="`/playlist/${playlist.id}`">{{ playlist.name }}</NuxtLink>
                        </p>
                      </div>
                  </div>

              </div>
              <TestModal :showModal="showModal" @close="showModal = false" />
              
      </div>

  </div>
</template>

<script setup>

const { isOpen } = defineProps(['isOpen']);
// const { shouldSidebarBeOpen } = defineProps(['shouldSidebarBeOpen']);

const showModal = ref(false)

const accessToken = ref('');

const playlists = ref([])

onMounted(async () => {
accessToken.value = localStorage.getItem('accessToken') || '';
console.log('Saved Items:', accessToken.value);

await getPlaylists(accessToken.value)
// getPlaylists(accessToken.value)

//   if (accessToken.value) {
  
//   }
});


async function getPlaylists(token) {
console.log('playlistsss');
try {
  const response = await fetch('https://api.spotify.com/v1/me/playlists', {
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
  playlists.value = data.items;

  console.log(playlists.value)
} catch (error) {
  console.error(error);
  // Handle error
}
}

const logPlaylist = (playlist) => {
console.log('You picked:', playlist);
};


</script>

<style scoped>
.router-link-exact-active {
  color: #EF2B2B;
;
}



</style>