// @/store/queue.js
import { reactive } from 'vue';

const state = reactive({
  queue: [], // Your queue data goes here
});

function addToQueue(song) {
  state.queue.push(song);
}


function clearQueue() {
  state.queue = []; // Clear the queue by assigning an empty array
}

export function useQueue() {
  return {
    queue: state.queue,
    addToQueue,
    clearQueue
  };
}
