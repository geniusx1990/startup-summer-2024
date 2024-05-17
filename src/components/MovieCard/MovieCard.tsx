import "./style.css";
import { Genre, Movie } from "../../utils/types";
import { Card, Image, Text } from "@mantine/core";
import {
  fillGenresArray,
  filmReleaseDate,
  formatNumber,
  voteAverateToFixed,
} from "../../utils/functions";
import { getStarImage } from "../../utils/getStarImage";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import RatingModal from "../RatingModal/RatingModal";
import { getImgUrl } from "../../utils/getImage";

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

  const navigate = useNavigate();
  const handleCardClick = () => {
    navigate(`/movies/${film.id}`);
  };

  const filmGenresNames = getGenresNames(film.genre_ids || [], genres);

  const savedRating = localStorage.getItem(`${film.id}`);

  const [rating, setRating] = useState(Number(savedRating));

  const [opened, { open, close }] = useDisclosure(false);
  const handleRemoveRating = () => {
    localStorage.removeItem(`${film.id}`);
    setRating(0);
    close();
  };

  const handleSaveRating = () => {
    localStorage.setItem(`${film.id}`, rating.toString());
    close();
  };

  const handleClose = () => {
    if (localStorage.getItem(`${film.id}`) === null) {
      setRating(0);
      close();
    } else {
      close();
    }
  };

  return (
    <>
      <Card
        shadow="sm"
        radius="md"
        className="movie-card"
        p={"24px"}
        onClick={handleCardClick}
      >
        <div className="card-container">
          <Image
            src={`https://image.tmdb.org/t/p/original/${film.poster_path}`}
            height={170}
            width={119}
            fallbackSrc={getImgUrl('noposterBig.png')}
            alt={film.title}
          />
          <div className="card-movie-content">
            <div className="card-movie-info-top">
              <Text className="card-movie-title">{film.original_title}</Text>
              <Text className="card-movie-year">
                {filmReleaseDate(film.release_date)}
              </Text>
              <div className="card-movie-rating-container">
                <img
                  src={getStarImage("yellow")}
                  alt="star"
                  width={"23.3px"}
                  height={"23.3px"}
                />
                <Text className="card-movie-vote">
                  {voteAverateToFixed(film.vote_average)}
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
        <div className="rating-container">
          <img
            src={getStarImage(savedRating?.toString())}
            alt="star"
            width={"23.3px"}
            height={"23.3px"}
            onClick={(e) => {
              e.stopPropagation();
              open();
            }}
          />
          <p className="rating-star">{savedRating}</p>
        </div>
      </Card>
      <RatingModal
        film={film}
        rating={rating}
        setRating={setRating}
        opened={opened}
        onClose={handleClose}
        handleSaveRating={handleSaveRating}
        handleRemoveRating={handleRemoveRating}
      />
    </>
  );
}
