<!-- <template>
    <div class="container">
      <form @submit.prevent="signInWithSpotify">
        <h1 class="text-2xl font-bold mb-4">Sign in Spotify</h1>
        <div class="mb-4">
          <label for="loginEmail" class="block font-bold">Email:</label>
          <input type="email" id="loginEmail" v-model="loginEmail" class="w-full p-2 border border-gray-300 rounded" required>
        </div>
        <div class="mb-4">
          <label for="loginPassword" class="block font-bold">Password:</label>
          <input type="password" id="loginPassword" v-model="loginPassword" class="w-full p-2 border border-gray-300 rounded" required>
        </div>
        <div class="mb-4">
          <button type="submit" class="bg-[#18D860] hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">LOGIN</button>
        </div>
      </form>
      <div v-if="errorMessage" class="text-red-500">{{ errorMessage }}</div>
      <div v-if="successMessage" class="text-green-500">{{ successMessage }}</div>
      <div class="mt-4">
        <NuxtLink class="text-blue-500 hover:underline" to="/">Go back Home</NuxtLink>
      </div>

      <h1>uiwbn</h1>
  
    </div>
</template>

<script setup>
  
  const loginEmail = ref('');
  const loginPassword = ref('');
  const errorMessage = ref('');
  
  const client = useSupabaseAuthClient();
  const router = useRouter();
  const successMessage = ref(null);

const client_id = '0aea4065bc1b4902ac1f131755def8c8';
const clientSecret = 'aa246931cfbb41bc8bd4acdd7bae2991';

async function signInWithSpotify() {

    // handle sign in to get authorization code and redirect to callback url

    const clientId = client_id;
    const redirectUri = 'http://localhost:3000/callback';

    const scope = 'user-read-private user-read-email'; // Specify the required scopes for your application.
    const authorizationUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=${encodeURIComponent(scope)}`;

    // Step 3.2: Redirect the user to the authorization URL.
    window.location.href = authorizationUrl;
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
      <!-- <div class="mt-4">
        <NuxtLink class="text-blue-500 hover:underline" to="/">Go back Home</NuxtLink>
      </div> -->
    <div class="container bg-black flex justify-center items-center h-screen">

        <div class="flex justify-between items-center gap-6">
            <img src="https://i.imgur.com/fPuEa9V.png" alt="" class="h-32">
            <div class="">
                <button type="submit" class="bg-[#18D860] text-black font-bold py-2 px-4 rounded" @click="signInWithSpotify">LOGIN TO SPOTIFY</button>
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
  const redirectUri = 'http://localhost:3000/callback';
  const scope = 'user-read-private user-library-read user-read-email streaming user-read-playback-state user-modify-playback-state user-read-currently-playing user-read-recently-played';
  
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
  