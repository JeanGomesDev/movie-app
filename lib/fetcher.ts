import { MovieSearchResponse, Movie } from "@/types/movie";

export async function fetchMovies(query: string): Promise<MovieSearchResponse> {
  if (!query.trim()) {
    return { Response: "False", Error: "Query vazia" };
  }

  const res = await fetch(`/api/movies?q=${query}`);
  return res.json();
}

export async function fetchMovieById(id: string) {
  if (!id) return null;

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/movies?id=${id}`);
  const data = await res.json();

  if (data.Response === "False") return null;

  return data;
}


