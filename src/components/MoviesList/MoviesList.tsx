import "./style.css";

import { Genre, Movie } from "../../utils/types";
import MovieCard from "../MovieCard/MovieCard";

export default function MoviesList({
  films,
  genres,
}: {
  films: Movie[];
  genres: Genre[];
}) {
  return (
    <div className="movies-list">
      {films.map((film) => (
        <MovieCard key={film.id} film={film} genres={genres} />
      ))}
    </div>
  );
}
