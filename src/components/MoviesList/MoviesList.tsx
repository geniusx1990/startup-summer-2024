import "./style.css";

import { Genre, Movie } from "../../utils/types";
import MovieCard from "../MovieCard/MovieCard";
import { useState } from "react";
import { Pagination } from "@mantine/core";

export default function MoviesList({
  films,
  genres,
  onChange,
  currentPage,
}: {
  films: Movie[];
  genres: Genre[];
  currentPage: number;
  onChange: (activePage: number) => void;
}) {
  const [activePage, setPage] = useState(currentPage);
  const totalPages = 500;
  const items = films.map((film) => (
    <MovieCard key={film.id} film={film} genres={genres} />
  ));

  const onPageChange = (activePage: number) => {
    setPage(activePage);
    onChange(activePage);
  };

  return (
    <>
      <div className="movies-list">{items}</div>
      <Pagination
        className="pagination"
        value={activePage}
        total={totalPages}
        siblings={0}
        defaultValue={2}
        onChange={onPageChange}
        color="#9854F6"
      />
    </>
  );
}
