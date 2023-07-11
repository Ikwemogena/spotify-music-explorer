<!-- <template>
    <div class="container">

      <h1>callback page</h1>
  
    </div>
</template>

<script setup>

const client_id = '0aea4065bc1b4902ac1f131755def8c8';
const clientSecret = 'aa246931cfbb41bc8bd4acdd7bae2991';

const code = new URLSearchParams(window.location.search).get('code');

console.log('Authorization code outside function: ', code);

getAccessToken(code);

async function getAccessToken(authorizationCode){

    console.log('Authorization code in function:', authorizationCode);
    // if authorized
    // if not authorized

    // redirect to home page 
    // Step 4: Exchange the authorization code for an access token and refresh token.
    // Step 4.1: Extract the authorization code from the redirect URI.

    // Step 4.2: Make a POST request to the token endpoint.
    const tokenEndpoint = 'https://accounts.spotify.com/api/token';
    const redirectUri = 'http://localhost:3000/callback';
    // const clientSecret = 'YOUR_CLIENT_SECRET';

    const data = {
        grant_type: 'authorization_code',
        code: authorizationCode,
        redirect_uri: redirectUri,
        client_id: client_id,
        client_secret: clientSecret
    };

    // Step 4.3: Send the POST request using the Fetch API.
    fetch(tokenEndpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams(data)
    })
    .then(response => response.json())
    .then(tokenData => {
        const accessToken = tokenData.access_token;
        const refreshToken = tokenData.refresh_token;

        // Step 5: Handle the response and store the access token securely.
        // You can store the access token securely and use it to make authenticated requests to the Spotify API.
        console.log('Access Token:', accessToken);
        console.log('Refresh Token:', refreshToken);
    })
    .catch(error => {
        console.error('Error:', error);
    });

        // console.log("you have successfully logged in with spotify)

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
/* 183440 */

.calendar-input-chip {
    display: inline-flex;
    align-items: center;
    background-color: #f2f2f2;
    padding: 8px 12px;
    border-radius: 20px;
    cursor: pointer;
}

.selected-month {
    margin-right: 8px;
    font-weight: bold;
}

.arrow-down-icon {
    width: 0;
    height: 0;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-top: 6px solid #999999;
}

</style>
   -->

   <template>
    <div class="container">
      <h1>Callback Page</h1>
    </div>
  </template>
  
  <script setup>
  const client_id = '0aea4065bc1b4902ac1f131755def8c8';
  const clientSecret = 'aa246931cfbb41bc8bd4acdd7bae2991';
  
//   const code = new URLSearchParams(window.location.search).get('code');
  
//   console.log('Authorization code outside function: ', code);
  
//   getAccessToken(code);

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

      // Handle the access token and refresh token as needed

        // Redirect to the home page
        const router = useRouter();
        await router.push('/');
  
      // Handle the access token and refresh token as needed
    } catch (error) {
      console.error('Error:', error);
      // Handle the error appropriately
    }
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
  