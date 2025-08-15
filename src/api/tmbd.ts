import axios from "axios";

const API_KEY = "94ddb6c20e9ee62138c57617ae5d7e51";
const BASE_URL = "https://api.themoviedb.org/3";

export const fetchPopularMovies = async () => {
  const response = await axios.get(`${BASE_URL}/movie/popular`, {
    params: { api_key: API_KEY, language: "en-US", page: 1 },
  });
  return response.data.results;
};
