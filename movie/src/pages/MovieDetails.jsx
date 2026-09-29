import { useEffect, useState } from "react";

import {
  Link,
  useParams
} from "react-router-dom";

import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";

import {
  getMovieDetails
} from "../services/movieApi";

function MovieDetails() {
  const { id } = useParams();

  const [movie, setMovie] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");


  useEffect(() => {
    const loadMovie = async () => {
      setLoading(true);
      setError("");

      try {
        const data =
          await getMovieDetails(id);

        setMovie(data);

      } catch (err) {
        setError(err.message);

      } finally {
        setLoading(false);
      }
    };

    loadMovie();
  }, [id]);


  if (loading) {
    return <Loading />;
  }


  if (error) {
    return (
      <div className="details-page">
        <ErrorMessage
          message={error}
        />

        <Link
          to="/"
          className="back-button"
        >
          ← Back to Movies
        </Link>
      </div>
    );
  }


  if (!movie) {
    return null;
  }


  const poster =
    movie.Poster &&
    movie.Poster !== "N/A"
      ? movie.Poster
      : "https://via.placeholder.com/400x600?text=No+Poster";


  return (
    <div className="details-page">

      <Link
        to="/"
        className="back-button"
      >
        ← Back to Movies
      </Link>


      <div className="details-container">

        {/* POSTER */}

        <div className="details-poster">

          <img
            src={poster}
            alt={movie.Title}
          />

        </div>


        {/* INFORMATION */}

        <div className="details-info">

          <h1>
            {movie.Title}
          </h1>


          <div className="rating">

            ⭐{" "}
            {movie.imdbRating !== "N/A"
              ? movie.imdbRating
              : "N/A"}{" "}
            / 10

          </div>


          <div className="movie-meta">

            <span>
              📅 {movie.Year}
            </span>

            <span>
              ⏱️ {movie.Runtime}
            </span>

            <span>
              🎬 {movie.Rated}
            </span>

          </div>


          <div className="detail-item">
            <strong>
              Genre:
            </strong>

            <span>
              {movie.Genre}
            </span>
          </div>


          <div className="detail-item">
            <strong>
              Director:
            </strong>

            <span>
              {movie.Director}
            </span>
          </div>


          <div className="detail-item">
            <strong>
              Actors:
            </strong>

            <span>
              {movie.Actors}
            </span>
          </div>


          <div className="detail-item">
            <strong>
              Language:
            </strong>

            <span>
              {movie.Language}
            </span>
          </div>


          <div className="detail-item">
            <strong>
              Released:
            </strong>

            <span>
              {movie.Released}
            </span>
          </div>


          <div className="plot">

            <h2>
              Plot
            </h2>

            <p>
              {movie.Plot}
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default MovieDetails;