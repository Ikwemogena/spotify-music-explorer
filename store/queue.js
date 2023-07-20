// // setup store
// import { defineStore } from 'pinia';

// export const useQueue = defineStore('store', {
//   state: () => ({
//     queue: [], // Initial value is null
//   }),
//   actions: {
//     addToQueue(song) {
//         this.queue.push(song);
//     },
//   },
// });


// @/store/queue.js
import { reactive } from 'vue';

const state = reactive({
  queue: [], // Your queue data goes here
});

function addToQueue(song) {
  state.queue.push(song);
}

export function useQueue() {
  return {
    queue: state.queue,
    addToQueue,
  };
}
