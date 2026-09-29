const API_KEY =
  import.meta.env.VITE_OMDB_API_KEY || "trilogy";

const BASE_URL = "https://www.omdbapi.com/";

async function makeRequest(params) {
  const url = new URL(BASE_URL);

  url.searchParams.append("apikey", API_KEY);

  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, value);
  });

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Unable to connect to movie API.");
  }

  const data = await response.json();

  if (data.Response === "False") {
    throw new Error(
      data.Error || "Movie information not found."
    );
  }

  return data;
}

export async function searchMovies(query) {
  const data = await makeRequest({
    s: query,
    type: "movie"
  });

  return data.Search || [];
}

export async function getMovieDetails(id) {
  return await makeRequest({
    i: id,
    plot: "full"
  });
}