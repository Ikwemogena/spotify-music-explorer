const formatDuration = (durationInMs) => {
    const minutes = Math.floor(durationInMs / 60000);
    const seconds = Math.floor((durationInMs % 60000) / 1000);
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };
  
  export default function (context, inject) {
    inject('formatDuration', formatDuration);
  }
  