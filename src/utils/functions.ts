export function fillGenresArray(genres: string[]): string {
  if (!genres || genres.length === 0) {
    return "";
  }
  const index = genres.indexOf("Science Fiction");

  if (index !== -1) {
    genres[index] = "Si-Fi";
  }

  const result = genres.slice(0, 3).join(", ");

  return result;
}

export function formatNumber(num: number) {
  if (!num) {
    return "";
  }
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M";
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K";
  } else {
    return num.toFixed(1);
  }
}


export function filmReleaseDate(releaseDate: string): string {
  if (!releaseDate) {
    return "";
  }
  return releaseDate.slice(0.4);
}

export function voteAverateToFixed(vote: number) {
  if (!vote) {
    return "";
  }
  return vote.toFixed(1).toString();
}

