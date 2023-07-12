<template>
    <div>
        <div class="flex-grow">
            <header class="absolute top-5 right-8">
                <div class="flex items-center bg-red-300 space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 pr-2">
                    <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png" alt="" class="rounded-full w-10 h-10" />
                    <h2 class="">FullName</h2>
                    <p class="h-5 w-5">i</p>
                </div>
            </header>

            <!-- <section class="flex items-end space-x-7 bg-gradient-to-b to-black from-red-500 h-80 text-white p-8"> -->
            <section :class="`flex items-end space-x-7 bg-gradient-to-b ${colorClass} h-70 text-white p-8`">
                <img src="https://thumbs.dreamstime.com/b/vinyl-player-good-design-textile-t-shirt-print-flyer-posters-background-vector-illustration-image-playlist-vinyl-228018032.jpg" alt="" class="h-44 w-44 shadow-2xl">

                <div>
                    <p>PLAYLIST</p>
                    <h1 class="text-2xl md:text-3xl xl:text-5xl font-bold">PLAYLIST NAME</h1>
                </div>

            </section>
            <!-- <MusicList /> -->
        </div>
    </div>
</template>

<script setup>

const colorClass = ref('');
const colors = [
  "from-indigo-500",
  "from-blue-500",
  "from-lightBlue-500",
  "from-cyan-500",
  "from-emerald-500",
  "from-green-500",
  "from-lime-500",
  "from-yellow-500",
  "from-amber-500",
  "from-orange-500",
  "from-red-500",
  "from-pink-500",
  "from-rose-500",
  "from-fuchsia-500",
  "from-purple-500",
  "from-violet-500",
];

const randomColorClass = colors[Math.floor(Math.random() * colors.length)];
colorClass.value = randomColorClass;

// const colors = [
//     "from-indigo-500",
//     "from-blue-500",
//     "from-lightBlue-500",
//     "from-cyan-500",
//     "from-emerald-500",
//     "from-green-500",
//     "from-lime-500",
//     "from-yellow-500",
//     "from-amber-500",
//     "from-orange-500",
//     "from-red-500",
//     "from-pink-500",
//     "from-rose-500",
//     "from-fuchsia-500",
//     "from-purple-500",
//     "from-violet-500",
// ]


// const colorClass = ref('');

//   const randomColorClass = colors[Math.floor(Math.random() * colors.length)];
//   colorClass.value = randomColorClass;

// const client = useSupabaseClient();
// console.log(client)
// const urlParams = new URLSearchParams(window.location.search);
//     const authorizationCode = urlParams.get('code');
//     // const code = useRoute().params

//     console.log('Authorization code:', authorizationCode);

// console.log('Query Parameters:', this.$route.query);




// const clientId = '0aea4065bc1b4902ac1f131755def8c8';
// const clientSecret = 'aa246931cfbb41bc8bd4acdd7bae2991';

// const code = useRoute().value.params;
// const code = useRoute().value.query.code;
// console.log(code)


// const code = this.$route.query.code


// Extract the code from the URL parameters
// const code = this.$route.query.code;
    
    // Log the code to the console
    // console.log('Code:', code);

    // console.log('Authorization code:', code);





    // private methods
    // const getToken = async () => {

    //     const result = await fetch('https://accounts.spotify.com/api/token', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type' : 'application/x-www-form-urlencoded', 
    //             'Authorization' : 'Basic ' + btoa( clientId + ':' + clientSecret)
    //         },
    //         body: 'grant_type=client_credentials'
    //     });

    //     const data = await result.json();
    //     return data.access_token;
    // }

    // getToken().then(token => {
    //     console.log(token);
    //     getGenres(token).then(genres => console.log(genres));

    // });

// const getGenres = async (token) => {

//         const result = await fetch(`https://api.spotify.com/v1/browse/categories?locale=sv_US`, {
//             method: 'GET',
//             headers: { 'Authorization' : 'Bearer ' + token}
//         });

//         const data = await result.json();
//         return data.categories.items;
//     }

// console.log(client.changedAccessToken)

// console.log(client)    

// const accessToken = client.changedAccessToken; // Retrieve the user's access token from Supabase
// const response = await fetch('https://api.spotify.com/v1/me', {
//   headers: {
//     // 'Authorization': `Bearer ${accessToken}`,
//     'Authorization': `Bearer BQC8nJdtL-ImrRAkcrmjRKHIcjA9mdIhGOEn6pskTLxlIMqFQFruPmChQgGiBioo37pVlkdKjOVxnfsfxFislIPUbqHdXEGqkurLt5sBbkt5FHFIMcE`,
//   },
// });
// const userProfile = await response.json();
// console.log(userProfile);


</script>

<style lang="scss" scoped>

</style>