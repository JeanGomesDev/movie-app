import { MovieSearchResponse } from "@/types/movie";

export async function fetchMovies(query: string): Promise<MovieSearchResponse> {
  if (!query.trim()) {
    return { Response: "False", Error: "Query vazia" };
  }

  const res = await fetch(`/api/movies?q=${query}`);
  const data = await res.json();

  return data as MovieSearchResponse;
}