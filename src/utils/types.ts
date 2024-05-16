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

export interface ProductionCompany {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}

export interface MovieDetails {
  budget: number;
  genres: Genre[];
  id: number;
  original_title: string;
  overview: string;
  poster_path: string;
  production_companies: ProductionCompany[];
  release_date: string;
  revenue: number;
  runtime: number;
  video: boolean;
  videos: [];
  vote_average: number;
  vote_count: number;
}

export interface Video {
  key: string;
  type: string;
}
