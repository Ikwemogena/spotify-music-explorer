<template>
      <!-- <div class="mt-4">
        <NuxtLink class="text-blue-500 hover:underline" to="/">Go back Home</NuxtLink>
      </div> -->
    <div class="container bg-black flex justify-center items-center h-screen">

        <div class="flex justify-between items-center gap-6">
            <img src="https://i.imgur.com/fPuEa9V.png" alt="" class="h-32">
            <div class="">
                <button type="submit" class="bg-[#18D860] text-black font-bold py-2 px-4 rounded" @click="signInWithSpotify">LOGIN TO MUSE WITH SPOTIFY</button>
            </div>
        </div>

    </div>
  </template>
  
  <script setup>
  
//   const loginEmail = ref('');
//   const loginPassword = ref('');
  const errorMessage = ref('');
  const successMessage = ref('');
  
  const client_id = '0aea4065bc1b4902ac1f131755def8c8';
  const redirectUri = 'https://spotify-music-explorer.vercel.app/callback';
  const scope = 'user-read-private user-library-read user-read-email streaming user-read-playback-state user-modify-playback-state user-read-currently-playing user-read-recently-played playlist-modify-public playlist-modify-private';
  
  const signInWithSpotify = () => {
    const authorizationUrl = `https://accounts.spotify.com/authorize?client_id=${client_id}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=${encodeURIComponent(scope)}`;
  
    window.location.href = authorizationUrl;
  };
  </script>
  
  <style scoped>
  /* .container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    max-width: 400px;
    margin: 0 auto;
    padding: 40px;
    border: 1px solid #ccc;
    border-radius: 8px;
  } */
  
  /* Rest of your styles */
  </style>
  