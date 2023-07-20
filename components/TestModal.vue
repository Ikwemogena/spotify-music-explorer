<!-- <template>
    <div class="text-black">
        <div v-if="props.showModal" class="fixed inset-0 flex flex-col items-center justify-center z-50">
            
            <div class="form-container w-[25rem] h-[20rem] bg-white rounded-lg shadow-lg p-4" >
                

                <div class="flex justify-between items-center px-4 py-2">
                    <h2 class="text-lg font-bold ">Create Playlist</h2>
                    <span class="chip-remove close text-xl pointer" @click="closeModal()">&times;</span>
                </div>

                <form @submit.prevent="createPlaylist" class="px-4 py-2">
                    <div>
                        <label for="">Title</label>
                        <input type="text" v-model="playlistTitle" class="w-full mb-2 px-2 py-1 border rounded" placeholder="Playlist Title" required>
                    </div>
                    <div>
                        <label for="">Description</label>
                        <input type="text" v-model="playlistDescription" class="w-full mb-2 px-2 py-1 border rounded" placeholder="Playlist Description">
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


console.log(props.showModal, 'add task modal')


const playlistTitle = ref('');
const playlistDescription = ref('');

const router = useRouter();

const accessToken = ref('');


onMounted(async () => {
  accessToken.value = localStorage.getItem('accessToken') || '';
  console.log('Saved Items:', accessToken.value);

  await getUserId(accessToken.value)
// getPlaylists(accessToken.value)

//   if (accessToken.value) {
    
//   }
});

async function getUserId(token) {
  try {
    const response = await fetch('https://api.spotify.com/v1/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      const userId = data.id;
      console.log('User ID:', userId);
    //   createPlaylist(token, userId)
      return userId;
    } else {
      console.error('Failed to get user ID');
      // Handle error case
    }
  } catch (error) {
    console.error('Error getting user ID:', error);
    // Handle error case
  }
}


async function createPlaylist(token, userId) {

    if(playlistTitle.value){
  try {
    const response = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: playlistTitle.value,
        description: playlistDescription.value,
        // You can add more properties to the request body as needed
      }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log('Playlist created:', data);
      // Clear the form inputs
      playlistTitle.value = '';
      playlistDescription.value = '';
      // Close the modal or perform any other actions
      closeModal();
      // Redirect to the newly created playlist page or perform any other navigation
      router.push(`/playlist/${data.id}`);
    } else {
      console.error('Failed to create playlist');
      // Handle error case
    }
  } catch (error) {
    console.error('Error creating playlist:', error);
    // Handle error case
  }

}
}

function openForm() {
    showModal.value = true;
}

const emits = defineEmits(['close']);
function closeModal() {
    emits('close');
    // Clear the form inputs and close the form
    newTodoText.value = '';
    description.value = '';
    category.value = 'Personal';
    priorityToggle.value = false;
    date.value = '';
    color.value = '#ffffff';
}
</script>

<style scoped>
.switch {
    position: relative;
    display: inline-block;
    width: 48px;
    height: 24px;
  }
  
  .switch input[type="checkbox"] {
    display: none;
  }
  
  .slider {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    cursor: pointer;
    border-radius: 24px;
    background-color: #ccc;
    transition: background-color 0.3s;
  }
  
  .slider:before {
    position: absolute;
    content: "";
    height: 20px;
    width: 20px;
    left: 2px;
    bottom: 2px;
    background-color: white;
    border-radius: 50%;
    transition: transform 0.3s;
  }
  
  input[type="checkbox"]:checked + .slider {
    background-color: #183440;
  }
  
  input[type="checkbox"]:checked + .slider:before {
    transform: translateX(24px);
  }

  .chips-container {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  /* border: 1px solid #ccc; */
  border-radius: 4px;
  /* padding: 4px; */
}

.chips-list {
  display: flex;
  flex-wrap: wrap;
}

.chip {
  display: flex;
  align-items: center;
  /* background-color: #eee; */
  /* border-radius: 16px; */
  padding: 4px 8px;
  margin: 2px;
}

.chip-remove {
  cursor: pointer;
  color: #999;
  font-size: 1rem;
  margin-left: 4px;
}

.close{
    font-size: 2rem;
}

.chip-input {
  flex-grow: 1;
  border: none;
  outline: none;
  font-size: 14px;
  padding: 4px;
}

.overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5); /* Translucent background color */
  z-index: 50;
  backdrop-filter: blur(2px);
}

.create-new {
  margin-top: 7rem;
}

.create-button {
    background-color: #183440;
}

.chip-selected {
  border:1px solid #183440;
  color: #183440;
  background-color: rgba(24, 52, 64, 10%);
  font-weight: 500;
}

</style> -->


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
              <input type="text" v-model="playlistTitle" class="w-full mb-2 px-2 py-1 border rounded" placeholder="Playlist Title" required>
            </div>
            <div>
              <label for="">Description</label>
              <input type="text" v-model="playlistDescription" class="w-full mb-2 px-2 py-1 border rounded" placeholder="Playlist Description">
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
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  
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
    console.log('Saved Items:', accessToken.value);
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
        console.log('Playlist created:', data);
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
        console.log('User ID:', userId);
        return userId;
      } else {
        console.error('Failed to get user ID');
        // Handle error case
      }
    } catch (error) {
      console.error('Error getting user ID:', error);
      // Handle error case
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
  