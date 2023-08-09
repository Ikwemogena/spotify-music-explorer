<template>
  <div class="container bg-black flex justify-center items-center h-screen">
    <div class="flex justify-between items-center gap-6">
      <img src="https://i.imgur.com/fPuEa9V.png" alt="" class="h-32">
      <div class="">
        <button type="submit" class="bg-[#18D860] text-black font-bold py-2 px-4 rounded" @click="signInWithSpotify">LOGIN
          TO MUSE WITH SPOTIFY</button>
      </div>
    </div>

  </div>
</template>
  
<script setup>
const signInWithSpotify = async () => {
  try {
    const response = await fetch('/api/spotify-auth');
    const authorizationUrl = await response.text();
    location.href = authorizationUrl;
  } catch (error) {
    console.error('Error signing in with Spotify:', error);
  }
};
</script>
  
<style scoped></style>
  