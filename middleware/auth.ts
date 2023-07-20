// export default function ({ store, redirect }) {
//     // Check if the access token is present in the store (you might store it in Vuex)
//     const accessToken = store.state.accessToken;

import { useTokenStore } from "store/storeAccessToken";

  
   
  
//     if (!accessToken) {
//       // If the access token is missing, redirect the user to the login page
//       return redirect('/login');
//     }
// }


export default defineNuxtRouteMiddleware(() => {
  const { accessToken } = useTokenStore();

  if (!accessToken) {
    console.log('no access token')
      return navigateTo('/login')
  }
})