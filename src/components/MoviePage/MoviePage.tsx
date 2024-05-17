import "./style.css";
import { useEffect, useState } from "react";
import { MovieDetails } from "../../utils/types";
import { proxyURL, routes } from "../../utils/api";
import { useParams, useNavigate } from "react-router-dom";
import { Breadcrumbs, Anchor } from "@mantine/core";
import MovieDetailsCard from "../MovieDetailsCard/MovieDetailsCard";
import { LoaderComponent } from "../LoaderComponent/LoaderComponent";
import MoveDescription from "../MoveDescription/MoveDescription";

export default function MoviePage() {
  const { movie_id } = useParams();
  const navigate = useNavigate();

  const [movieDetails, setMovieDetails] = useState<MovieDetails>();
  const [isLoading, setIsLoading] = useState(false);

  const movieURL = `${proxyURL}${routes.movie}?movie_id=${movie_id}`;

  const items = [
    { title: "Movies", href: "/" },
    { title: movieDetails?.original_title, href: "" },
  ].map((item, index) => (
    <Anchor href={item.href} key={index}>
      {item.title}
    </Anchor>
  ));

  useEffect(() => {
    setIsLoading(true);
    fetch(movieURL)
      .then((response) => response.json())
      .then((data) => {
        setMovieDetails(data as MovieDetails);
        if (data.status_code === 34) {
          navigate("/404");
        } else {
          setMovieDetails(data as MovieDetails);
          setIsLoading(false);
        }
      });
  }, []);

  return (
    <>
      <div className="movie-container-details">
        <Breadcrumbs className="breadcrumbs">{items}</Breadcrumbs>
        {isLoading ? (
          <LoaderComponent />
        ) : (
          <>
            <MovieDetailsCard movieDetails={movieDetails} />
            <MoveDescription movieDetails={movieDetails} />
          </>
        )}
      </div>
    </>
  );
}
