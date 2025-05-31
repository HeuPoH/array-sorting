export function getTime() {
  const date = new Date();
  const h = correctPartOfTime(date.getHours());
  const m = correctPartOfTime(date.getMinutes());
  const s = correctPartOfTime(date.getSeconds());
  const ms = date.getMilliseconds();
  return `${h}:${m}:${s}:${ms}`;
}

function correctPartOfTime(part: number) {
  return part / 10 < 1 ? `0${part}` : `${part}`;
}
