"use client";

import { useState } from "react";
import { fetchMovies } from "@/lib/fetcher";
import { Movie } from "@/types/movie";
import { MovieCard } from "@/components/movie/MovieCard";


export default function Home() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSearch() {
    setLoading(true);
    setError("");

    const data = await fetchMovies(query);

    if (data?.Response === "False") {
      setError(data?.Error ?? "Erro desconhecido");
      setMovies([]);
    } else {
      setMovies(data.Search ?? []);
    }

    setLoading(false);
  }

  return (
    <main className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">🎬 Busca de Filmes</h1>

      <div className="flex gap-2 mb-6">
        <input
          placeholder="Digite o nome do filme"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 w-64 focus:ring-2 focus:ring-blue-500 outline-none"
        />

        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Buscar
        </button>
      </div>

      {loading && <p className="text-gray-600">Carregando...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mt-6">
        {movies?.map((movie) => (
          <MovieCard key={movie.imdbID} movie={movie} />
        ))}
      </div>

    </main>
  );
}
