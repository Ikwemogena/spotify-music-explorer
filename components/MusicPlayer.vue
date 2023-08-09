<template>
    <div class=" h-24 bg-gradient-to-b from-black to-gray-900 text-white flex justify-between px-6" v-if="currentSong">
      <div class="flex items-center gap-2" >
          <img class="hidden md:inline h-10 w-10" :src="currentSong?.track?.album?.images[0]?.url" alt="">
          <div>
            <h3>{{ currentSong?.track?.name }}</h3>
            <p>{{ currentSong?.track?.artists[0]?.name }}</p>
          </div>
      </div>

      <div class="flex items-center gap-2">
          <Icon name="mdi:skip-previous" @click="previous" />
          <div class="flex pb-4">
            <button @click="togglePlayPause" class="h-10">
              <Icon
                :name="isPlaying ? 'mdi:pause' : 'mdi:play'"
                class="text-2xl cursor-pointer bg-white rounded-full p-1 m-2 w-10 h-10"
                color="black"
              />
            </button>
          </div>
          <Icon name="mdi:skip-next" @click="next" />
      </div>
      <div class=" volume-slider flex items-center justify-end">
          <input type="range" min="0" max="100" v-model="volume" @input="changeVolume" class="custom-slider"/>
      </div>
  </div>
</template>
  
<script setup>
import { useStore } from '@/store/currentSong';

const playerStore = useStore(); 
const isPlaying = ref(false);
const volume = ref(50);
const currentSong = ref(playerStore.currentSong);
const device = ref(null);
const accessToken = ref('')

onMounted(async () => {
  accessToken.value = localStorage.getItem('accessToken') || '';
});

watch(() => playerStore.currentSong, (newSong) => {
  currentSong.value = newSong;
  isPlaying.value = true;
  play()
});

async function next() {
  if (!accessToken.value) {
    router.push('/login');
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
  } catch (error) {
    console.error(error);
  }
}

async function previous() {
  play();
  if (!accessToken.value) {
    router.push('/login');
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
  } catch (error) {
    console.error(error);
  }
}
function changeVolume() {
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
  })
  .catch(error => {
    console.error(error);
  });
}


async function play() {
  if (!accessToken.value) {
    router.push('/login');
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
  if (!devicesResponse.ok) {
    throw new Error('Failed to retrieve devices');
    }
  
  const devicesData = await devicesResponse.json();
  device.value = devicesData.devices.find(device => device.is_active === true);

  if (!device.value) {
    throw new Error('device not found');
    }
  
  const deviceId = device.value.id;
  const trackUri = currentSong.value.track.uri;

  // Play the song on active device
  const response = await fetch(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${accessToken.value}`,
    },
    body: JSON.stringify({
      uris: [trackUri],
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to play song');
  }
} catch (error) {
  console.error(error);
}
}

async function pause() {
  isPlaying.value = false;
  fetch(`https://api.spotify.com/v1/me/player/pause?device_id=${device.value.id}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${accessToken.value}`
    }
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Failed to pause song');
    }
  })
  .catch(error => {
    console.error(error);
  });
}  

const togglePlayPause = () => {
  if (isPlaying.value) {
    pause();
  } else {
    play();
  }
};
</script>

<style scoped>
.music-player {
  display: flex;
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

.custom-slider {
  color: #9f9e9e;
  /* -webkit-appearance: none; */
  width: 100%;
  height: 6px;
  background: #9f9e9e;
  border-radius: 3px;
  outline: none;
  opacity: 0.7;
  transition: opacity 0.2s;
}

.custom-slider:hover {
  opacity: 1;
}

.custom-slider::-webkit-slider-thumb {
  background-color: #333131;
  -webkit-appearance: none;
  appearance: none;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #292727;
  cursor: pointer;
  transition: background 0.15s ease-in-out;
}

.custom-slider::-webkit-slider-thumb:hover {
  background-color: #b3b3b3;
}
</style>
  