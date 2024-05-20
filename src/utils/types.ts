export interface Genre {
  id: number;
  name: string;
}

export interface Movie {
  id: number;
  original_title: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
  rating: number;
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
  id: number;
  original_title: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
  runtime: number;
  budget: number;
  revenue: number;
  genres: Genre[];
  overview: string;
  production_companies: ProductionCompany[];
  rating: number;
}

export interface Video {
  key: string;
  type: string;
}
