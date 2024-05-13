export function fillGenresArray(genres: string[]): string {
  const index = genres.indexOf("Science Fiction");

  if (index !== -1) {
    genres[index] = "Si-Fi";
  }

  const result = genres.slice(0, 3).join(", ");

  return result;
}

export function formatNumber(num: number) {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M";
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K";
  } else {
    return num.toFixed(1);
  }
}
