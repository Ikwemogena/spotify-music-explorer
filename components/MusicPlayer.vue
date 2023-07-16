<!-- <template>
    <div  >
        <h1>e choke</h1>
      <div>
        <button @click="togglePlayback">{{ isPlaying ? 'Pause' : 'Play' }}</button>
        <button @click="next">Next</button>
      </div>
      <div>
        <input type="range" min="0" max="100" v-model="volume" @input="changeVolume" />
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, watch } from 'vue';
  
  const isPlaying = ref(false);
  const volume = ref(50);
  
  function togglePlayback() {
    isPlaying.value = !isPlaying.value;
    if (isPlaying.value) {
      // Logic to play the audio
    } else {
      // Logic to pause the audio
    }
  }
  
  function next() {
    // Logic to play the next audio track
  }
  
  function changeVolume() {
    // Logic to change the volume
    // You can access the current volume using volume.value
  }
  
  watch(volume, (newVolume) => {
    // Logic to update the audio volume
  });
  
  </script>
  
  <style scoped>
  /* Add your custom styling here */
  </style>
   -->



   <template>
    <div class="music-player bg-black flex">
      <div class="controls">
        <button class="next-button" @click="next">
          <i class="icon prev-icon"></i>
        </button>
        <button class="playback-button" @click="togglePlayback">
          <i :class="['icon', isPlaying ? 'pause-icon' : 'play-icon']"></i>
        </button>
        <button class="next-button" @click="next">
          <i class="icon next-icon"></i>
        </button>
      </div>
      <div class="volume-slider">
        <input type="range" min="0" max="100" v-model="volume" @input="changeVolume" />
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, watch } from 'vue';
  
  const isPlaying = ref(false);
  const volume = ref(50);
  
//   function togglePlayback() {
//     isPlaying.value = !isPlaying.value;
//     if (isPlaying.value) {
//       // Logic to play the audio
//     } else {
//       // Logic to pause the audio
//     }
//   }
  
//   function next() {
//     // Logic to play the next audio track
//   }
  
//   function changeVolume() {
//     // Logic to change the volume
//     // You can access the current volume using volume.value
//   }
  
//   watch(volume, (newVolume) => {
//     // Logic to update the audio volume
//   });

function togglePlayback() {
  isPlaying.value = !isPlaying.value;
  if (isPlaying.value) {
    console.log('Audio played');
  } else {
    console.log('Audio paused');
  }
}

function next() {
  console.log('Next track');
}

function changeVolume() {
  console.log('Volume changed:', volume.value);
}

watch(volume, (newVolume) => {
  console.log('Volume updated:', newVolume);
});
  
  </script>
  
  <style scoped>
  .music-player {
    display: flex;
    /* flex-direction: column; */
    justify-content: center;
    align-items: center;
    gap: 1rem;
  }
  
  .controls {
    display: flex;
    justify-content: center;
    gap: 2rem;
  }
  
  .playback-button,
  .next-button {
    background-color: transparent;
    border: none;
    cursor: pointer;
    outline: none;
  }
  
  .icon {
    font-size: 2rem;
    color: #fff;
  }
  
  .play-icon::before {
    content: '▶️';
  }
  
  .pause-icon::before {
    content: '⏸️';
  }
  
  .next-icon::before {
    content: '⏭️';
  }
  
  .volume-slider {
    width: 100px;
  }
  
  /* Customize the appearance of the volume slider as desired */
  input[type="range"] {
    -webkit-appearance: none;
    width: 100%;
    height: 6px;
    background: #b3b3b3;
    border-radius: 3px;
    outline: none;
    opacity: 0.7;
    transition: opacity 0.2s;
  }
  
  input[type="range"]:hover {
    opacity: 1;
  }
  
  input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: #fff;
    cursor: pointer;
    transition: background 0.15s ease-in-out;
  }
  
  input[type="range"]::-webkit-slider-thumb:hover {
    background: #00bfff;
  }
  
  </style>
  