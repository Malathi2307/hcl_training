import { Link } from "react-router-dom";

function MovieCard({ movie }) {
  const poster =
    movie.Poster && movie.Poster !== "N/A"
      ? movie.Poster
      : "https://via.placeholder.com/300x450?text=No+Poster";

  return (
    <Link
      to={`/movie/${movie.imdbID}`}
      className="movie-card"
    >
      <img
        src={poster}
        alt={movie.Title}
      />

      <div className="movie-info">
        <h3>{movie.Title}</h3>

        <p>📅 {movie.Year}</p>

        {movie.imdbRating &&
          movie.imdbRating !== "N/A" && (
            <p>⭐ {movie.imdbRating}</p>
          )}
      </div>
    </Link>
  );
}

export default MovieCard;