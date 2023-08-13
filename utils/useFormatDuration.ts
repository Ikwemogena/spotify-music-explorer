export default function useFormatDuration() {
  const formatDuration = (durationMs: number): string => {
    const minutes = Math.floor(durationMs / 60000);
    const seconds = Number(((durationMs % 60000) / 1000).toFixed(0));
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return {
    formatDuration,
  };
}
