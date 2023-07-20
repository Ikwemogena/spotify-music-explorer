<template>
    <div>

      <!-- <button @click="toggleSidebar">Toggle Sidebar</button> -->
      
        <main class="flex">
            <MuseSideBar :isOpen="isSidebarOpen" />

            <div class="flex-grow h-screen overflow-y-scroll no-scrollbar">

                <header class="bg-black text-white p-4" v-if="userProfile">

                    <div class="flex justify-between items-center">
                      
                        <div class="flex gap-2">
                          <Icon @click="toggleSidebar" name="mdi:menu" class="text-3xl"/>
                            <button>Back</button>
                            <button>Forward</button>
                        </div>


                        <div>
                            <div>{{ userProfile.display_name }}</div>
                        </div>
                    </div>
                </header>

                <div class="bg-[#1F1F22] no-scrollbar">

                    <!-- <MuseCreatePlaylistModal /> -->
                    <slot />

                </div>
                
            </div>

        </main>

        <div class="sticky bottom-0">
                <MusicPlayer />

                <!-- <TestPlayer /> -->
            </div>
       

    </div>
</template>

<script setup>

import { ref } from 'vue';
const isSidebarOpen = ref(false);

function toggleSidebar() {
  console.log('toggleSidebar')
  isSidebarOpen.value = !isSidebarOpen.value;
}


import {useTokenStore} from '@/store/storeAccessToken';


const accessToken = ref('');

const store = useTokenStore();

const userProfile = ref(null);

onMounted(async () => {
  accessToken.value = localStorage.getItem('accessToken') || '';
  console.log('Saved Items: from default', accessToken.value);

  updateValue(accessToken.value);
  if (!accessToken.value) {
    // If there is no access token, redirect to the login page or your desired authentication flow
        router.push('/login'); // Replace '/login' with the path to your login page
        return;
    }

    // Fetch user profile from Spotify
  try {
    const response = await fetch('https://api.spotify.com/v1/me', {
      headers: {
        Authorization: `Bearer ${accessToken.value}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user profile');
    }

    const profileData = await response.json();
    userProfile.value = profileData;
  } catch (error) {
    console.error(error);
  }

  
});





  
  

  function updateValue(access_token) {
    store.setAccessToken(access_token);
    console.log('store in callback: ', store);

    // if (!accessToken.value) {
    // // If there is no access token, redirect to the login page or your desired authentication flow
    //     router.push('/login'); // Replace '/login' with the path to your login page
    //     return;
    // }
  }



</script>

<style scoped>

body {
    background-color: rgba(33, 33, 36, 1);
}

.sidebar-enter-active,
.sidebar-leave-active {
  transition: transform 0.3s ease;
}

/* Define the starting position for the slide-in transition */
.sidebar-enter {
  transform: translateX(-100%);
}

/* Define the ending position for the slide-out transition */
.sidebar-leave-to {
  transform: translateX(-100%);
}

</style>