import { Route, Routes } from "react-router-dom";
import RatedMoviesPage from "../../pages/RatedMoviesPage/RatedMoviesPage";
import MoviePage from "../../pages/MoviePage/MoviePage";
import MoviesPage from "../../pages/MoviesPage/MoviesPage";
import NotFoundPage from "../../pages/NotFoundPage/NotFoundPage";

const RouterSwitcher = () => {
  return (
    <Routes>
      <Route path="/" element={<MoviesPage />} />
      <Route path="/movies" element={<MoviesPage />} />
      <Route path="/movies/:movie_id" element={<MoviePage />} />
      <Route path="/ratedmovies" element={<RatedMoviesPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default RouterSwitcher;
