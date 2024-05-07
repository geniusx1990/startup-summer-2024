import { Route, Routes } from "react-router-dom";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import RatedMoviesPage from "../RatedMoviesPage/RatedMoviesPage";
import MoviesPage from "../MoviesPage/MoviesPage";

const RouterSwitcher = () => {
  return (
    <Routes>
      <Route path="/" element={<MoviesPage />} />
      <Route path="/movies" element={<MoviesPage />} />
      <Route path="/ratedmovies" element={<RatedMoviesPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default RouterSwitcher;
