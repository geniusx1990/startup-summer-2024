import "./style.css";
import { Genre, Movie } from "../../utils/types";
import {
  Button,
  Card,
  Divider,
  Flex,
  Image,
  Modal,
  Rating,
  Text,
} from "@mantine/core";
import { fillGenresArray, formatNumber } from "../../utils/functions";
import { getStarImage } from "../../utils/getStarImage";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";

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

  return (
    <>
      <Card shadow="sm" radius="md" className="movie-card" p={"24px"}>
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
                  src={getStarImage("yellow")}
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
        <div className="rating-container">
          <img
            src={getStarImage(savedRating?.toString())}
            alt="star"
            width={"23.3px"}
            height={"23.3px"}
            onClick={() => {
              open();
            }}
          />
          <p className="rating-star">{savedRating}</p>
        </div>
      </Card>
      <Modal.Root opened={opened} onClose={close}>
        <Modal.Overlay />
        <Modal.Content w="100%" maw={{ xs: "380px", base: "320px" }} radius={8}>
          <Modal.Header>
            <Modal.Title fw={700}>Your rating</Modal.Title>
            <Modal.CloseButton />
          </Modal.Header>
          <Divider />
          <Modal.Body p={16}>
            <Flex direction="column" rowGap={16}>
              <Text fw={700}>{film.original_title}</Text>
              <Rating
                value={rating}
                onChange={(rating) => setRating(rating)}
                defaultValue={rating}
                w="100%"
                styles={{
                  root: { display: "flex", justifyContent: "space-between" },
                }}
                count={10}
                size={28}
              />
              <Flex gap={16}>
                <Button
                  w="fit-content"
                  radius={8}
                  bg={"#9854F6"}
                  onClick={() => {
                    handleSaveRating();
                  }}
                >
                  Save
                </Button>
                <Button
                  variant="white"
                  color="violet"
                  w="fit-content"
                  onClick={() => {
                    handleRemoveRating();
                  }}
                >
                  Remove rating
                </Button>
              </Flex>
            </Flex>
          </Modal.Body>
        </Modal.Content>
      </Modal.Root>
    </>
  );
}
