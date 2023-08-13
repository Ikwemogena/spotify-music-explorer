<template>
  <div class="bg-[#1c3e6022] text-white">
    <div v-if="props.queueModal" class="overlay" @click="closeModal()"></div>
    <div v-if="props.queueModal" class="fixed inset-0 flex flex-col items-center justify-center z-50">
      <div class="bg-[#000]  w-[25rem] h-[20rem] rounded-lg shadow-lg p-4">
        <div class="flex justify-between pb-2">
          <h1>Queue</h1>
          <span class="chip-remove close text-xl pointer" @click="closeModal()">&times;</span>
        </div>
        <div v-if="queueArray.length > 0">
          <div class="flex justify-between pb-2">
            <h1>Songs</h1>
            <p class="cursor-pointer text-red-500" @click="emptyQueue">Clear Queue</p>
          </div>
          <ul>
            <li v-for="(song, index) in queueArray" :key="index" class="flex justify-between">
              <p class="pb-1">{{ song.name }} by {{ song.artists[0].name }}</p>
              <p class="pb-1" @click="queueArray.splice(index, 1);">Remove</p>
            </li>
          </ul>

        </div>

        <div v-else>
          <h1>No songs in queue yet.</h1>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script setup>
const {queueArray, clearQueue} = useQueue();
// const { clearQueue } = useNowPlaying();

const props = defineProps({
  queueModal: {
    type: Boolean,
    required: true,
  },
});

const playlistTitle = ref('');
const playlistDescription = ref('');
const accessToken = ref('');

onMounted(async () => {
  accessToken.value = localStorage.getItem('accessToken') || '';
});

const emits = defineEmits(['close']);

function closeModal() {
  emits('close');
  playlistTitle.value = '';
  playlistDescription.value = '';
}

function emptyQueue() {
  clearQueue();
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
  