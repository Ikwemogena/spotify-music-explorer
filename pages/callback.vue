<template>
  <div class="container">
      <h1>Callback Page</h1>
  </div>
</template>
  
<script setup>
  import {useTokenStore} from '@/store/storeAccessToken';

  const store = useTokenStore();

  console.log('store in callback: ', store);

    // const store = useStore();
  
  // Wrap the code in a check to run only in the browser environment
  if (process.client) {
    const code = new URLSearchParams(window.location.search).get('code');
    console.log('Authorization code outside function: ', code);
    getAccessToken(code);
  }
  
  async function getAccessToken(authorizationCode) {
    console.log('Authorization code in function:', authorizationCode);
    const tokenEndpoint = 'https://accounts.spotify.com/api/token';
    const redirectUri = 'http://localhost:3000/callback';
    const client_id = '0aea4065bc1b4902ac1f131755def8c8';
    const clientSecret = 'aa246931cfbb41bc8bd4acdd7bae2991';
  
    const data = {
      grant_type: 'authorization_code',
      code: authorizationCode,
      redirect_uri: redirectUri,
      client_id: client_id,
      client_secret: clientSecret
    };
  
    try {
      const response = await fetch(tokenEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams(data)
      });
  
      if (!response.ok) {
        throw new Error('Failed to exchange authorization code for access token');
      }
  
      const tokenData = await response.json();
      const accessToken = tokenData.access_token;
      const refreshToken = tokenData.refresh_token;
  
      console.log('Access Token:', accessToken);
      console.log('Refresh Token:', refreshToken);
      // Set the access token in local storage
      // useStorage('accessToken', accessToken);
      localStorage.setItem('accessToken', accessToken);


      updateValue(accessToken);

      
  
      // Set the access token in the store
    //   const store = useStore();
      // store.commit('setAccessToken', accessToken);
  
      // Redirect to the home page
      const router = useRouter();
      await router.push('/');
    } catch (error) {
      console.error('Error:', error);
      // Handle the error appropriately
    }
  }


  function updateValue(access_token) {
    store.setAccessToken(access_token);
    console.log('store in callback: ', store);
  }
</script>
  
<style scoped>
  .container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    max-width: 400px;
    margin: 0 auto;
    padding: 40px;
    border: 1px solid #ccc;
    border-radius: 8px;
  }
  /* Rest of your styles */
</style>
