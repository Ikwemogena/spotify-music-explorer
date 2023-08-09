<template>
  <div>
    <main class="flex">
      <MuseSideBar :isOpen="isSidebarOpen" />
      <div class="flex-grow h-screen overflow-y-scroll no-scrollbar">
        <header class="bg-black text-white p-4" v-if="userProfile">
          <div class="flex justify-between items-center">
            <div class="flex gap-2">
              <Icon @click="toggleSidebar" name="mdi:menu" class="text-3xl" />
              <button>Back</button>
              <button>Forward</button>
            </div>

            <div>
              <div>{{ userProfile.display_name }}</div>
            </div>
          </div>
        </header>
        <div class="bg-[#1F1F22] no-scrollbar">
          <slot />
        </div>
      </div>
    </main>
    <div class="sticky bottom-0">
      <MusicPlayer />
    </div>
  </div>
</template>

<script setup>
import { useTokenStore } from '@/store/storeAccessToken';

const isSidebarOpen = ref(false);
const accessToken = ref('');
const store = useTokenStore();
const userProfile = ref(null);

function toggleSidebar() {
  console.log('toggleSidebar')
  isSidebarOpen.value = !isSidebarOpen.value;
}

onMounted(async () => {
  accessToken.value = localStorage.getItem('accessToken') || '';

  updateValue(accessToken.value);
  if (!accessToken.value) {
    router.push('/login'); 
    return;
  }

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

.sidebar-enter {
  transform: translateX(-100%);
}

.sidebar-leave-to {
  transform: translateX(-100%);
}
</style>