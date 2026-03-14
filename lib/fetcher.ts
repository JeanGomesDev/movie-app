import { MovieSearchResponse, Movie } from "@/types/movie";

export async function fetchMovies(query: string): Promise<MovieSearchResponse> {
  if (!query.trim()) {
    return { Response: "False", Error: "Query vazia" };
  }

  const res = await fetch(`/api/movies?q=${query}`);

  if (!res.ok) {
    throw new Error("Erro ao buscar filmes");
  }

  return res.json();
}

export async function fetchMovieById(id: string): Promise<Movie | null> {
  if (!id) return null;

  const res = await fetch(`/api/movies?id=${id}`);

  if (!res.ok) {
    throw new Error("Erro ao buscar filme");
  }

  const data = await res.json();

  if (data.Response === "False") return null;

  return data;
}