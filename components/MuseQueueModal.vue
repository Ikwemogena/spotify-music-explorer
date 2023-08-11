<template>
  <div class="bg-[#1c3e6022] text-white">
    <div v-if="props.queueModal" class="overlay" @click="closeModal()"></div>
    <div v-if="props.queueModal" class="fixed inset-0 flex flex-col items-center justify-center z-50">
      <div class="bg-[#000]  w-[25rem] h-[20rem] rounded-lg shadow-lg p-4">
        <div class="flex justify-between pb-2">
          <h1>Queue</h1>
          <span class="chip-remove close text-xl pointer" @click="closeModal()">&times;</span>
        </div>
        <div v-if="queue.length > 0">
          <div class="flex justify-between pb-2">
            <h1>Songs</h1>
            <p class="cursor-pointer text-red-500">Clear Queue</p>
          </div>
          <ul>
            <li v-for="(song, index) in queue" :key="index">
              <p class="pb-1">{{ song }}</p>
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
import { useQueue } from '@/store/queue';

const { queue, clearQueue } = useQueue();
const props = defineProps({
  shareModal: {
    type: Boolean,
    required: true,
  },
});

const playlistTitle = ref('');
const playlistDescription = ref('');
const accessToken = ref('');

onMounted(async () => {
  console.log('SUp', queue)
  console.log(queue == false)
  accessToken.value = localStorage.getItem('accessToken') || '';
  console.log('Saved Items:', accessToken.value);
});

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
  