export const useQueue = () => {
  const queueArray = useState < string[]>('queue', () => [])

  const clearQueue = () => {
    queueArray.value = [];
  };

  return {
    queueArray,
    clearQueue
  }
}
export const useNowPlaying = () => {
    const nowPlaying = useState<Object>('nowPlaying', () => '')
    

    const setNowPlaying = (song: Object) => {
        nowPlaying.value = song;
    }
    return {
        nowPlaying,
        setNowPlaying
    }
}

export const useAccessToken = () => {
  const accessToken = useState<string>('token', () => '')
  
  const setAccessToken = (token: string) => {
    accessToken.value = token
  }
  return {
    accessToken,
    setAccessToken
  }
}
