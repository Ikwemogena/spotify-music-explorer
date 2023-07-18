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


   <!-- h-24 bg-gradient-to-b to-gray-900 -->
   <template>
    <div class="h-24 bg-gradient-to-b from-black to-gray-900 text-white grid grid-cols-3 text-xs md:text-base px-2 md:px-8" v-if="currentSong">
        <div class="flex items-center space-x-4" >
            <img class="hidden md:inline h-10 w-10" :src="currentSong?.track?.album?.images[0]?.url" alt="">

            <div class="">
                <h3>{{ currentSong?.track?.name }}</h3>
                <p>{{ currentSong?.track?.artists[0]?.name }}</p>
            </div>

        </div>


        <!-- left side -->
        


        <!-- <div class="flex items-center space-x-3 md:space-x-4 justify-end pr-5">
            <p class="w-14 md:w-28">volume</p>
        </div> -->



        <div class="flex items-center justify-evenly">
            <button @click="next">Previous</button>
            <button @click="togglePlayback" class="w-10 h-10">{{ isPlaying ? 'Pause' : 'Play' }}</button>
            <button @click="next">Next</button>
        </div>

        <div class=" volume-slider flex items-center space-x-3 md:space-x-4 justify-end pr-5">
            <!-- <p class="w-14 md:w-28">Volume</p> -->
            <input type="range" min="0" max="100" v-model="volume" @input="changeVolume" />
        </div>
      <!-- <div class="controls">
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
      </div> -->
    </div>
  </template>
  
  <script setup>
  import { useStore } from '@/store/currentSong';
  console.log('player store', useStore())

  import { ref, watch } from 'vue';
// import { usePlayerStore } from '@/store/player';

const playerStore = useStore(); // Access the Player store

const isPlaying = ref(false);
const volume = ref(50);
const currentSong = ref(playerStore.currentSong); // Get the current song from the store

// ...

// Update the currentSong ref when it changes in the store
watch(() => playerStore.currentSong, (newSong) => {
  currentSong.value = newSong;
});

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

// watch(volume, (newVolume) => {
//   console.log('Volume updated:', newVolume);
// });

const playSong = async (song) => {

// const playerStore = useStore();

console.log('Playing song:', useStore())

playerStore.setCurrentSong(song);
try {
  // Get a list of available devices
  const devicesResponse = await fetch('https://api.spotify.com/v1/me/player/devices', {
    headers: {
      Authorization: `Bearer BQCmcSnRXjmgxPaAbqy1vvjgCMO56fpDyJAOWoL8QoDUCOwB7zGM4LBLGGRr7XtCqOyVtH74Cv2GU74v-3B7T_nr7hlPLeRwv8klCiUi83yp-Q4KDO14Dns2bQEG1VGwLeyV0GV1gxS3uL5tYxijJXOVuLURzTAgENwLiHkKILp_8UgP0q7WuXAOxc4WR7fDkyzq1saupDhiuN7jLUCDR6Q7oYapwu8`,
    },
  });

  console.log(devicesResponse.ok)

  if (!devicesResponse.ok) {
    throw new Error('Failed to retrieve devices');
  }

  const devicesData = await devicesResponse.json();

  console.log(devicesData)

  console.log(devicesData.devices)
  console.log(devicesResponse.status)

  // Find your phone device
  const phoneDevice = devicesData.devices.find(device => device.type === 'Smartphone');

  // const currentDevice = devicesData.devices.find(device => device.is_active);
  // const phoneDevice = devicesData.devices.find(device => device.is_active);

  console.log(phoneDevice)

  if (!phoneDevice) {
    throw new Error('Phone device not found');
  }

  const deviceName = phoneDevice.name;
  const deviceId = phoneDevice.id;

  console.log('Phone device name:', deviceName);


  // // Stop the currently playing song
  // await fetch(`https://api.spotify.com/v1/me/player/pause?device_id=${deviceId}`, {
  //   method: 'PUT',
  //   headers: {
  //     Authorization: `Bearer BQD5iYxaKd6DC8krMUFg-bWALOazXBLtKuz4-DJ3ZbHQIqlzjxwmbtCuI2HaLg8DAyqWxvyv3TMjPaZ6sGiuhuuxetU1zf8RNoSwrOCIVK4dWJ0joPk_wmX4I8iZWknW3WhpeCmu56cQ-UXVIkgNyjcpfc8snCOHR18wGVbCKjLjbaMsIOihA1MNsX7Qu1YmtedULeWBDjAesQNYMiEwpbV6QV33uc0`,
  //   },
  // });

  // Play the song on your phone
  const response = await fetch(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer BQCmcSnRXjmgxPaAbqy1vvjgCMO56fpDyJAOWoL8QoDUCOwB7zGM4LBLGGRr7XtCqOyVtH74Cv2GU74v-3B7T_nr7hlPLeRwv8klCiUi83yp-Q4KDO14Dns2bQEG1VGwLeyV0GV1gxS3uL5tYxijJXOVuLURzTAgENwLiHkKILp_8UgP0q7WuXAOxc4WR7fDkyzq1saupDhiuN7jLUCDR6Q7oYapwu8`,
    },
    body: JSON.stringify({
      uris: [`spotify:track:${song.track.id}`],
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to play song');
  }

  // Create a new Audio object
  const audio = new Audio(song.track.preview_url);

  console.log(song)

  console.log(song.track.preview_url)
  console.log(song.track.id)
  
  // Play the audio
  audio.play();

  console.log('Playing song:', song.track.name);
} catch (error) {
  console.error(error);
}
}

// fetch current song
  
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
    width: 150px;
  }
  
  /* Customize the appearance of the volume slider as desired */
  input[type="range"] {
    /* -webkit-appearance: none; */
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
  