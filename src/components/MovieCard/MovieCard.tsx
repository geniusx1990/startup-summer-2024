import "./style.css";
import { Genre, Movie } from "../../utils/types";
import { Card, Image, Text /* Badge, Button, Group */ } from "@mantine/core";
import {
  fillGenresArray,
  formatNumber,
} from "../../utils/functions";
import { getStarImage } from "../../utils/getStarImage";

export default function MovieCard({
  film,
  genres,
}: {
  film: Movie;
  genres: Genre[];
}) {
  const getGenresNames = (genreIds: number[], genres: Genre[]): string[] => {
    return genres
      .filter((genre) => genreIds.includes(genre.id))
      .map((genre) => genre.name);
  };
  const filmGenresNames = getGenresNames(film.genre_ids, genres);

  return (
    <Card shadow="sm" radius="md" className="movie-card">
      <div className="card-container">
        <Image
          src={`https://image.tmdb.org/t/p/original/${film.poster_path}`}
          height={170}
          width={119}
          alt={film.title}
        />
        <div className="card-movie-content">
          <div className="card-movie-info-top">
            <Text className="card-movie-title">{film.original_title}</Text>
            <Text className="card-movie-year">
              {film.release_date.slice(0, 4)}
            </Text>
            <div className="card-movie-rating-container">
              <img
                src={getStarImage('#FAB005')}
                alt="star"
                width={"23.3px"}
                height={"23.3px"}
              />
              <Text className="card-movie-vote">
                {film.vote_average.toFixed(1)}
              </Text>
              <Text className="card-movie-popularity">
                ({formatNumber(film.vote_count)})
              </Text>
            </div>
          </div>
          <div className="card-movie-genres-container">
            <Text className="genre-title-static">Genres</Text>
            <Text className="card-movie-genres-list">
              {fillGenresArray(filmGenresNames)}
            </Text>
          </div>
        </div>
      </div>
      <img
        src={getStarImage('#D5D6DC')}
        alt="star"
        width={"23.3px"}
        height={"23.3px"}
      />
    </Card>
  );
}
