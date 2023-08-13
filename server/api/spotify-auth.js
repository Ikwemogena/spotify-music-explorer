export default defineEventHandler(async () =>{
    const { spotifyClientID, redirectUri } = useRuntimeConfig().public    
    // const redirectUri = 'http://localhost:3000/callback';
    const scope = 'user-read-private user-library-read user-read-email streaming user-read-playback-state user-modify-playback-state user-read-currently-playing user-read-recently-played playlist-modify-public playlist-modify-private';
    const authorizationUrl = `https://accounts.spotify.com/authorize?client_id=${spotifyClientID}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=${encodeURIComponent(scope)}`;

    return authorizationUrl;
})
