<template>
  <div class=" text-white">

      <div>
        <MuseHome/>
      </div>

  </div>
</template>

<script setup>

import {useTokenStore} from '@/store/storeAccessToken';
const accessToken = ref('');

// const store = useTokenStore();

import { useRouter } from 'vue-router'; // Import the useRouter function from the Vue Router package

// const accessToken = ref('');

const store = useTokenStore();

const router = useRouter();

onMounted(async () => {
  accessToken.value = localStorage.getItem('accessToken') || '';
  console.log('Saved Items: from default', accessToken.value);

  updateValue(accessToken.value);
  if (!accessToken.value) {
    // If there is no access token, redirect to the login page or your desired authentication flow
        router.push('/login'); // Replace '/login' with the path to your login page
        return;
    }

  
});


  
  

  function updateValue(access_token) {
    store.setAccessToken(access_token);
    console.log('store in callback: ', store);

    // if (!accessToken.value) {
    // // If there is no access token, redirect to the login page or your desired authentication flow
    //     router.push('/login'); // Replace '/login' with the path to your login page
    //     return;
    // }
  }

</script>

<style lang="scss" scoped>

</style>