const formatDuration = (durationInMs) => {
    const minutes = Math.floor(durationInMs / 60000);
    const seconds = Math.floor((durationInMs % 60000) / 1000);
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };
  
  export default function (context, inject) {
    inject('formatDuration', formatDuration);
  }

// plugins/formatDuration.js

// const formatDuration = (durationInMs) => {
//   const minutes = Math.floor(durationInMs / 60000);
//   const seconds = Math.floor((durationInMs % 60000) / 1000);
//   return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
// };

// // Export the plugin as an object
// // Use the defineNuxtPlugin function to wrap the plugin
// export default defineNuxtPlugin((nuxtApp) => {
//   // Inject the `formatDuration` function into the app context
//   nuxtApp.inject('formatDuration', formatDuration);
// });
