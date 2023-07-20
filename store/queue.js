// setup store
import { defineStore } from 'pinia';

export const addToQueue = defineStore('store', {
  state: () => ({
    queue: [], // Initial value is null
  }),
  actions: {
    addToQueue(song) {
        this.queue.push(song);
    },
  },
});
