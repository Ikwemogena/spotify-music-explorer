<template>
    <div>
       <div class="text-gray-500 p-5 md:text-xl sm:text-sm border-r border-gray-900 overflow-y-scroll h-screen no-scrollbar sm:max-w-[12rem] lg:max-w-[15rem] hidden md:inline-flex">
            <div class="space-y-4">
                <button class="flex flex-col items-center space-x-2 hover:text-white">
                    <p>Home</p>
                </button>
                <button class="flex flex-col items-center space-x-2 hover:text-white">
                    <p>Search</p>
                </button>
                <button class="flex flex-col items-center space-x-2 hover:text-white">
                    <p>Your Library</p>
                </button>

                <hr class="border-t-[0.1px] border-gray-900"/>

                <button class="flex flex-col items-center space-x-2 hover:text-white">
                    <p>Create Playlist</p>
                </button>
                <button class="flex flex-col items-center space-x-2 hover:text-white">
                    <p>Liked Songs</p>
                </button>
                <button class="flex flex-col items-center space-x-2 hover:text-white">
                    <p>Your Episodes</p>
                </button>
                <hr class="border-t-[0.1px] border-gray-900"/>


                <div>
                    <p class="cursor-pointer hover:text-white" v-for="playlist in playlists" :key="playlist.id" @click="logPlaylist(playlist.id)">
                        <NuxtLink :to="`/playlist/${playlist.id}`">{{ playlist.name }}</NuxtLink>
                        
                </p>
                </div>

                <!-- <div v-for="playlist in playlists.items">
                    <p>{{ playlist.name }}</p>
                </div> -->

            </div>
       </div>

    </div>
</template>

<script setup>

// const playlists = ref([]);
// https://api.spotify.com/v1/users/{pa5kapybbaoarvhxqmokzqi56}/playlists
// https://api.spotify.com/v1/me/playlists

    // 

    // console.log(items.value.items);
    // console.log(playlists.value.items);

    // if (process.client) {
    //     const accessToken = localStorage.getItem('accessToken');

    //     console.log('Saved Items:', accessToken);
    // }

    // const accessToken = localStorage.getItem('accessToken');

    // console.log('Saved Items:', accessToken);

    const accessToken = ref('');

    const playlists = ref([])

// onMounted(() => {
//   accessToken.value = localStorage.getItem('accessToken') || '';
//   console.log('Saved Items:', accessToken.value);
// });

onMounted(async () => {
  accessToken.value = localStorage.getItem('accessToken') || '';
  console.log('Saved Items:', accessToken.value);

//   await getPlaylists(accessToken.value)
getPlaylists(accessToken.value)

//   if (accessToken.value) {
    
//   }
});


// async function getPlaylists(token) {

//     console.log(token)
//     const response= await fetch('https://api.spotify.com/v1/me/playlists', {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     console.log(response)

// }

async function getPlaylists(token) {
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


    // const {data: playlists} = await useFetch('https://api.spotify.com/v1/me/playlists', {
    //   headers: {
    //     Authorization: `Bearer ${accessToken}`, // Replace accessToken with your actual access token
    //   },
    // });

    // console.log(playlists.items)


    // const logPlaylist = (playlist) => {
    //     console.log("you picked:", playlist);
    // };

    // playlists.value = items.value.items;

</script>

<style lang="scss" scoped>

</style>