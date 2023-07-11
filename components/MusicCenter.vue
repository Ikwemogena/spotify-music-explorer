<template>
    <div>
        <h1>jhiyvbu</h1>
        <div class="flex flex-grow text-white">
            <h1>I am center</h1>
            <p>i am not showing oh</p>
            <header>
                <div>
                    <img src="" alt="" />
                </div>
            </header>
        </div>
        <p>show music center</p>
    </div>
</template>

<script setup>

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