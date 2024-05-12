export interface Genre {
  id: number;
  name: string;
}

export interface Movie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: [];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface FilterOptions {
  genre: string | null;
  year: string | null;
}

export interface Rating {
  value: string;
  label: string;
}

export interface UserInputFilter {
  selectedGenres: string[];
  selectedYears: string | null;
  ratingFrom: string | null;
  ratingTo: string | null;
  sortBy: string | null;
}

export interface OptionInterface {
  label: string;
  value: string;
}
