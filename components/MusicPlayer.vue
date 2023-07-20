<template>
  <div class="h-24 bg-gradient-to-b from-black to-gray-900 text-white grid grid-cols-3 text-xs md:text-base px-2 md:px-8" v-if="currentSong">
      <div class="flex items-center space-x-4" >
          <img class="hidden md:inline h-10 w-10" :src="currentSong?.track?.album?.images[0]?.url" alt="">

          <div class="">
              <h3>{{ currentSong?.track?.name }}</h3>
              <p>{{ currentSong?.track?.artists[0]?.name }}</p>
          </div>

      </div>

      <div class="flex items-center justify-evenly">
        
          <Icon name="mdi:skip-previous" @click="previous" />
          <div class="flex pb-4">
            <button v-if="!isPlaying" @click="play" class="w-10 h-10">
              <Icon name="mdi:play" class="text-2xl cursor-pointer bg-white rounded-full p-1 m-2 w-10 h-10" color="black"/>
            </button>
            <button v-else @click="pause" class="w-10 h-10">
              <Icon name="mdi:pause" class="text-2xl cursor-pointer bg-white rounded-full p-1 m-2 w-10 h-10" color="black"/>
            </button>
          </div>
          <Icon name="mdi:skip-next" @click="next" />
      </div>

      <div class=" volume-slider flex items-center space-x-3 md:space-x-4 justify-end">
          <!-- <p class="w-14 md:w-28">Volume</p> -->
          <input type="range" min="0" max="100" v-model="volume" @input="changeVolume"/>
          <div class="queue-text flex items-center">
        <!-- <p @click="showModal = true">Q</p> -->
        
      </div>
          
      </div>

      <!-- <div class="queue-text flex items-center">
        <p>Queue</p>
      </div> -->

      <TestModal :showModal="showModal" @close="showModal = false" />

      

      <!-- <div class="flex items-center justify-center w-full">
        <div class="progress-bar" :style="{ width: `${seekPercentage}%` }"></div>
      </div> -->
  </div>
</template>
  
<script setup>

// definePageMeta({
//   middleware: 'auth'
// })

import { useStore } from '@/store/currentSong';
console.log('player store', useStore())

const playerStore = useStore(); // Access the Player store

const isPlaying = ref(false);
const volume = ref(50);
const currentSong = ref(playerStore.currentSong); // Get the current song from the store
const showModal = ref(false)
const seekPercentage = ref(0);

// import { useTokenStore } from "@/store/storeAccessToken";

// console.log(useTokenStore)
  
// const { accessToken } = useTokenStore();
// console.log('access token from music player', accessToken)

const accessToken = ref('')


onMounted(async () => {
  
  accessToken.value = localStorage.getItem('accessToken') || '';

  console.log(accessToken.value)

  // await getRecentlyPlayed(accessToken.value);
  // await getRecommendedPlaylists(accessToken.value);
  // await getHottestPlaylists(accessToken.value);
});

// Update the currentSong ref when it changes in the store
watch(() => playerStore.currentSong, (newSong) => {
  currentSong.value = newSong;
  console.log('current song', currentSong.value)
  isPlaying.value = true;
  play()
});

function togglePlayback() {
  isPlaying.value = !isPlaying.value;
  if (isPlaying.value) {
    console.log('Audio played');
  } else {
    console.log('Audio paused');
  }
}

async function next() {
  console.log('Next track');
  if (!accessToken.value) {
    // If there is no access token, redirect to the login page or your desired authentication flow
    router.push('/login'); // Replace '/login' with the path to your login page
    return;
  }

  try {
    const response = await fetch('https://api.spotify.com/v1/me/player/next', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken.value}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to skip to the next track.');
    }

    console.log('Skipped to the next track.');
  } catch (error) {
    console.error(error);
  }
  console.log('Next track');
}

async function previous() {
  play();
  console.log('Previous track');
  if (!accessToken.value) {
    // If there is no access token, redirect to the login page or your desired authentication flow
    router.push('/login'); // Replace '/login' with the path to your login page
    return;
  }

  try {
    const response = await fetch('https://api.spotify.com/v1/me/player/previous', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken.value}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to skip to the previous track.');
    }

    console.log('Skipped to the previous track.');
  } catch (error) {
    console.error(error);
  }
}
function changeVolume() {

  // if (!accessToken.value) {
  //   // If there is no access token, redirect to the login page or your desired authentication flow
  //   router.push('/login'); // Replace '/login' with the path to your login page
  //   return;
  // }
  // Send volume change command to Spotify API
  // Replace 'YOUR_ACCESS_TOKEN' with the actual access token
  // const accessToken = 'BQCRSnalQrG0wAXiGasyfZcx0h8fqaIm8btMb4SPc4Wdlth9jvij61hK5fBdSt3pYRzX-iFOUbeUSimiUBERA3H74xjOFeezkVu5xabcpfN2jwvv-bg1h5SNcxOmOouGNhmKyHrxyz8UpwMbTYpeXabpTVuSIZj_ikJhIgextDtLXRra2aUc0qHz_2jcUFJZW1Hqpr1Immm955JsyHXX-v7zZ3-TR2nWEEQwjOAqozadj9QfSev9VAz2elBopivfBE5DLrQhj7SN9Wr4IWcUuJczWbBIr6fYFTK5gQY';
  // const deviceId = "4926ee8a3a6ca168fbf310c4c06ab91ba7c2e2c0";
  const newVolume = volume.value;

  fetch(`https://api.spotify.com/v1/me/player/volume?volume_percent=${newVolume}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${accessToken.value}`
    }
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Failed to change volume');
    }
    console.log('Volume changed successfully');
  })
  .catch(error => {
    console.error(error);
  });
  console.log('Volume changed:', volume.value);
}


async function play() {
  if (!accessToken.value) {
    // If there is no access token, redirect to the login page or your desired authentication flow
    router.push('/login'); // Replace '/login' with the path to your login page
    return;
  }

  isPlaying.value = true;

  try {
    // Get a list of available devices
    const devicesResponse = await fetch('https://api.spotify.com/v1/me/player/devices', {
      headers: {
        Authorization: `Bearer ${accessToken.value}`,
      },
  });

  console.log(accessToken.value)

  console.log(devicesResponse.ok)

  if (!devicesResponse.ok) {
    throw new Error('Failed to retrieve devices');
  }

  const devicesData = await devicesResponse.json();

  console.log(devicesData)

  console.log(devicesData.devices)
  console.log(devicesResponse.status)

  // Find your phone device
  const phoneDevice = devicesData.devices.find(device => device.type === 'Computer');

  // const currentDevice = devicesData.devices.find(device => device.is_active);
  // const phoneDevice = devicesData.devices.find(device => device.is_active);

  console.log(phoneDevice)

  if (!phoneDevice) {
    throw new Error('Phone device not found');
  }

  const deviceName = phoneDevice.name;
  const deviceId = phoneDevice.id;

  console.log('Phone device name:', deviceName);

  const trackUri = currentSong.value.track.uri;
  console.log(currentSong.value.track.uri)

  // Play the song on your phone
  const response = await fetch(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${accessToken.value}`,
    },
    body: JSON.stringify({
      // uris: [`spotify:track:${song.track.id}`],
      uris: [trackUri],
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to play song');
  }

  // Create a new Audio object
  // const audio = new Audio(song.track.preview_url);

  // console.log(song)

  // console.log(song.track.preview_url)
  // console.log(song.track.id)
  
  // Play the audio
  // audio.play();

  // console.log('Playing song:', song.track.name);
} catch (error) {
  console.error(error);
}
}

function pause() {

  if (!accessToken.value) {
    // If there is no access token, redirect to the login page or your desired authentication flow
    router.push('/login'); // Replace '/login' with the path to your login page
    return;
  }
  isPlaying.value = false;
  console.log('Pause audio');

  // Send pause command to Spotify API
  // Replace 'YOUR_ACCESS_TOKEN' with the actual access token
  // const accessToken = accessToken.value;
  // const deviceId = 'YOUR_DEVICE_ID';

  fetch(`https://api.spotify.com/v1/me/player/pause?device_id=15f39c11672626d4669801e325391ebda976099b`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${accessToken.value}`
    }
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Failed to pause song');
    }
    console.log('Song paused successfully');
  })
  .catch(error => {
    console.error(error);
  });
}  
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
  