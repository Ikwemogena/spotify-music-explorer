// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  pages: true,
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/tailwindcss",
    "nuxt-icon",
  ],
  runtimeConfig: {
    public: {
      spotifyClientSecret: process.env.SPOTIFY_CLIENT_SECRET,
      spotifyClientID: process.env.SPOTIFY_CLIENT_ID,
      redirectUri: process.env.REDIRECT_URI,
    }
  },
})
