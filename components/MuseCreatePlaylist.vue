<template>
  <div class="text-black">
    <div v-if="props.showModal" class="overlay" @click="closeModal()"></div>
    <div v-if="props.showModal" class="fixed inset-0 flex flex-col items-center justify-center z-50">
      <div class="form-container w-[25rem] h-[20rem] bg-white rounded-lg shadow-lg p-4">
        <div class="flex justify-between items-center px-4 py-2">
          <h2 class="text-lg font-bold">Create Playlist</h2>
          <span class="chip-remove close text-xl pointer" @click="closeModal()">&times;</span>
        </div>
        <form @submit.prevent="createPlaylist" class="px-4 py-2">
          <div>
            <label for="">Title</label>
            <input type="text" v-model="playlistTitle" class="w-full mb-2 px-2 py-1 border rounded"
              placeholder="Playlist Title" required>
          </div>
          <div>
            <label for="">Description</label>
            <input type="text" v-model="playlistDescription" class="w-full mb-2 px-2 py-1 border rounded"
              placeholder="Playlist Description">
          </div>
          <div class="flex justify-center mt-2">
            <button class="create-button w-full px-4 py-2 text-white bg-blue-500 rounded" type="submit">Create</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
  
<script setup>
const props = defineProps({
  showModal: {
    type: Boolean,
    required: true,
  },
});
const playlistTitle = ref('');
const playlistDescription = ref('');
const router = useRouter();
const accessToken = ref('');

onMounted(async () => {
  accessToken.value = localStorage.getItem('accessToken') || '';
});

async function createPlaylist() {
  try {
    const userId = await getUserId();
    const response = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken.value}`,
      },
      body: JSON.stringify({
        name: playlistTitle.value,
        description: playlistDescription.value,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      playlistTitle.value = '';
      playlistDescription.value = '';
      closeModal();
      router.push(`/playlist/${data.id}`);
    } else {
      console.error('Failed to create playlist');
    }
  } catch (error) {
    console.error('Error creating playlist:', error);
  }
}

async function getUserId() {
  try {
    const response = await fetch('https://api.spotify.com/v1/me', {
      headers: {
        Authorization: `Bearer ${accessToken.value}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      const userId = data.id;
      return userId;
    } else {
      console.error('Failed to get user ID');
    }
  } catch (error) {
    console.error('Error getting user ID:', error);
  }
}

const emits = defineEmits(['close']);
function closeModal() {
  emits('close');
  playlistTitle.value = '';
  playlistDescription.value = '';
}
</script>
  
<style scoped>
.overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 50;
  backdrop-filter: blur(2px);
}

.form-container {
  width: 25rem;
  height: 20rem;
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  padding: 1rem;
}

.close {
  font-size: 2rem;
  cursor: pointer;
}

.create-button {
  background-color: #183440;
}
</style>
  