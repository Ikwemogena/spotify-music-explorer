// setup store
import { defineStore } from 'pinia';

export const useStore = defineStore('store', {
  state: () => ({
    currentSong: null, // Initial value is null
  }),
  actions: {
    setCurrentSong(song) {
      this.currentSong = song;
    },
  },
});
