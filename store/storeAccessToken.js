// // setup store
// import { defineStore } from 'pinia';
// export const  useTokenStore = defineStore('token', ()=>{
//     const accessToken = ref('');

//     function setAccessToken(value) {
//         accessToken.value = value;
//     }


//     return { accessToken, setAccessToken}
// })


// store/token.js
import { defineStore } from 'pinia';
export const useTokenStore = defineStore('token', () => {
  const accessToken = ref('');

  function setAccessToken(value) {
    accessToken.value = value;
  }

  return {
    accessToken,
    setAccessToken,
  };
});
