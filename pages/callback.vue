<template>
  <MuseLoader />
</template>
  
<script setup>

const { setAccessToken } = useAccessToken()

if (process.client) {
  const code = new URLSearchParams(location.search).get('code');
  getAccessToken(code);
}

async function getAccessToken(authorizationCode) {
  const tokenEndpoint = 'https://accounts.spotify.com/api/token';
  const { spotifyClientSecret, spotifyClientID, redirectUri } = useRuntimeConfig().public
  const data = {
    grant_type: 'authorization_code',
    code: authorizationCode,
    redirect_uri: redirectUri,
    client_id: spotifyClientID,
    client_secret: spotifyClientSecret
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

    localStorage.setItem('accessToken', accessToken);

    updateValue(accessToken);

    const router = useRouter();
    await router.push('/');
  } catch (error) {
    console.error('Error:', error);
  }
}

function updateValue(access_token) {  
  setAccessToken(access_token)
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
</style>
