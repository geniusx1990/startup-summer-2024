import "./style.css";
import { Genre, Movie } from "../../utils/types";
import { Card, Image, Text /* Badge, Button, Group */ } from "@mantine/core";
import { getImgUrl } from "../../utils/getImage";

function formatNumber(num: number) {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M";
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K";
  } else {
    return num.toFixed(1);
  }
}

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
    <Card shadow="sm" padding="24px" radius="md" className="movie-card">
      <div className="card-container">
        <Image
          src={`https://image.tmdb.org/t/p/original/${film.poster_path}`}
          height={170}
          width={119}
          alt={film.title}
        />
        <div className="card-movie-content">
          <div className="card-movie-info-top">
            <Text className="card-movie-title">{film.title}</Text>
            <Text className="card-movie-year">
              {film.release_date.slice(0, 4)}
            </Text>
            <div className="card-movie-container">
              <div className="card-movie-rating-container">
                <img
                  src={getImgUrl("star.svg")}
                  alt="star"
                  width={"23.3px"}
                  height={"23.3px"}
                />
                <Text className="card-movie-vote">
                  {film.vote_average.toFixed(1)}
                </Text>
                <Text className="card-movie-popularity">
                  ({formatNumber(film.popularity)})
                </Text>
              </div>
            </div>
          </div>
          <div className="card-movie-genres-container">
            <Text className="genre-title-static">Genres</Text>
            <Text className="card-movie-genres-list">
              {filmGenresNames.join(", ")}
            </Text>
          </div>
        </div>
      </div>
      <img
        src={getImgUrl("star.svg")}
        alt="star"
        width={"23.3px"}
        height={"23.3px"}
      />
    </Card>
  );
}
