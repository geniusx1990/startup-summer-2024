import {
  Button,
  Divider,
  Flex,
  Group,
  Modal,
  Rating,
  Text,
} from "@mantine/core";
import { Genre, Movie, MovieDetails } from "../../utils/types";
import { getStarImage } from "../../utils/getStarImage";
import { useDisclosure } from "@mantine/hooks";
import { displayBlock, getValueById } from "../../utils/functions";
import { useState } from "react";

function isMovieDetails(film: Movie | MovieDetails): film is MovieDetails {
  return (film as MovieDetails).runtime !== undefined;
}

export default function RatingModal({ film }: { film: Movie | MovieDetails }) {
  const [opened, { open, close }] = useDisclosure(false);
  const savedRatingArray = JSON.parse(`${localStorage.getItem("cardsRated")}`);
  const savedRating = getValueById(savedRatingArray, film.id);
  const [rating, setRating] = useState(savedRating);

  const handleRemoveRating = () => {
    const arr: Movie[] = JSON.parse(`${localStorage.getItem("cardsRated")}`);
    const updatedArr = arr.filter((movie) => movie.id !== film.id);
    localStorage.setItem("cardsRated", JSON.stringify(updatedArr));

    setRating(0);
    close();
  };

  const handleSaveRating = () => {
    const arr: Movie[] = JSON.parse(`${localStorage.getItem("cardsRated")}`);
    const existingFilmIndex = arr.findIndex((item) => item.id === film.id);
    if (existingFilmIndex !== -1) {
      arr[existingFilmIndex].rating = rating;
    } else {
      const movie: Movie = {
        id: film.id,
        original_title: film.original_title,
        poster_path: film.poster_path,
        release_date: film.release_date,
        vote_average: film.vote_average,
        vote_count: film.vote_count,
        genre_ids: isMovieDetails(film)
          ? film.genres.map((genre: Genre) => genre.id)
          : film.genre_ids,
        rating: rating,
      };

      arr.push(movie);
    }
    localStorage.setItem("cardsRated", JSON.stringify(arr));
    close();
  };

  const handleClose = () => {
    setRating(savedRating);
    close();
  };

  return (
    <>
      <Group
        gap={4}
        justify="flex-end"
        align="flex-start"
        style={{ flexWrap: "nowrap" }}
      >
        <img
          src={getStarImage(savedRating)}
          alt="star"
          width={"28.px"}
          height={"28px"}
          onClick={(e) => {
            e.stopPropagation();
            open();
          }}
        />
        <Text style={{ display: displayBlock(savedRating) }}>
          {savedRating}
        </Text>
      </Group>

      <Modal.Root opened={opened} onClose={handleClose}>
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
                onChange={setRating}
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
                  onClick={handleSaveRating}
                >
                  Save
                </Button>
                <Button
                  variant="white"
                  color="violet"
                  w="fit-content"
                  onClick={handleRemoveRating}
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
