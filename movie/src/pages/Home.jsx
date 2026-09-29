import { useEffect, useMemo, useState } from "react";

import SearchBar from "../components/SearchBar";
import MovieGrid from "../components/MovieGrid";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";

import {
  searchMovies,
  getMovieDetails
} from "../services/movieApi";

function Home() {
  const [movies, setMovies] = useState([]);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [selectedCategory, setSelectedCategory] =
    useState("All");

  const categories = [
    "All",
    "Action",
    "Comedy",
    "Drama",
    "Horror",
    "Romance",
    "Thriller",
    "Sci-Fi",
    "Animation"
  ];

  const enrichMovies = async (results) => {
    const detailedMovies = await Promise.all(
      results.map(async (movie) => {
        try {
          return await getMovieDetails(movie.imdbID);
        } catch {
          return movie;
        }
      })
    );

    return detailedMovies;
  };

  const handleSearch = async (query) => {
    setLoading(true);
    setError("");
    setSelectedCategory("All");

    try {
      const results = await searchMovies(query);
      const detailedMovies = await enrichMovies(results);

      setMovies(detailedMovies);
    } catch (err) {
      setMovies([]);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadTrendingMovies = async () => {
      const searchQueries = [
        "Avengers",
        "Batman",
        "Spider-Man",
        "Inception",
        "The Matrix",
        "Jurassic Park",
        "Harry Potter",
        "Transformers"
      ];

      setLoading(true);
      setError("");
      setSelectedCategory("All");

      try {
        const allResults = await Promise.all(
          searchQueries.map(async (query) => {
            try {
              return await searchMovies(query);
            } catch {
              return [];
            }
          })
        );

        const mergedResults = allResults
          .flat()
          .filter(
            (movie, index, array) =>
              array.findIndex(
                (item) => item.imdbID === movie.imdbID
              ) === index
          );

        const detailedMovies = await enrichMovies(
          mergedResults
        );

        setMovies(detailedMovies);
      } catch (err) {
        setMovies([]);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadTrendingMovies();
  }, []);

  const filteredMovies = useMemo(() => {
    if (selectedCategory === "All") {
      return movies;
    }

    return movies.filter((movie) => {
      if (!movie.Genre) {
        return false;
      }

      return movie.Genre
        .toLowerCase()
        .includes(selectedCategory.toLowerCase());
    });
  }, [movies, selectedCategory]);

  return (
    <div className="home-page">

      {/* HERO SECTION */}

      <section className="hero">
        <h1>Movie Explorer</h1>

        <p>
          Search and explore your favorite movies
        </p>

        <SearchBar
          onSearch={handleSearch}
        />
      </section>


      {/* MAIN CONTENT */}

      <section className="content">

        {/* CATEGORY FILTER */}

        <div className="category-section">
          <h2>Categories</h2>

          <div className="category-buttons">
            {categories.map((category) => (
              <button
                key={category}
                className={
                  selectedCategory === category
                    ? "category-button active"
                    : "category-button"
                }
                onClick={() =>
                  setSelectedCategory(category)
                }
              >
                {category}
              </button>
            ))}
          </div>
        </div>


        {/* LOADING */}

        {loading && <Loading />}


        {/* ERROR */}

        {!loading && error && (
          <ErrorMessage
            message={error}
          />
        )}


        {/* NO RESULTS */}

        {!loading &&
          !error &&
          filteredMovies.length === 0 && (
            <div className="no-results">

              <h2>
                No movies found
              </h2>

              <p>
                Try another search or category.
              </p>

            </div>
          )}


        {/* MOVIES */}

        {!loading &&
          !error &&
          filteredMovies.length > 0 && (
            <>
              <div className="results-header">

                <h2>
                  Search Results
                </h2>

                <span>
                  {filteredMovies.length} movies
                </span>

              </div>

              <MovieGrid
                movies={filteredMovies}
              />
            </>
          )}

      </section>
    </div>
  );
}

export default Home;