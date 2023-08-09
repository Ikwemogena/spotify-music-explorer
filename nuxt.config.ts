// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  pages: true,
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/tailwindcss",
    "@pinia/nuxt",
    "nuxt-icon",
  ],
  runtimeConfig: {
    public: {
      spotifyClientSecret: process.env.SPOTIFY_CLIENT_SECRET,
      spotifyClientID: process.env.SPOTIFY_CLIENT_ID,
    }
  }
})
