"use client";

import { useState } from "react";
import { fetchMovies } from "@/lib/fetcher";
import { Movie } from "@/types/movie";

export default function Home() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSearch() {
    setLoading(true);
    setError("");

    const data = await fetchMovies(query);

    if (data.Response === "False") {
      setError(data.Error ?? "Erro desconhecido");
      setMovies([]);
    } else {
      setMovies(data.Search ?? []);
    }

    setLoading(false);
  }

  return (
    <main style={{ padding: "2rem" }}>
      <h1>🎬 Busca de Filmes</h1>

      <div style={{ marginTop: "1rem" }}>
        <input
          placeholder="Digite o nome do filme"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{
            padding: "0.5rem",
            width: "250px",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        />
        <button
          onClick={handleSearch}
          style={{
            marginLeft: "0.5rem",
            padding: "0.5rem 1rem",
            borderRadius: "4px",
            background: "#0e6cff",
            border: "none",
            color: "white",
          }}
        >
          Buscar
        </button>
      </div>

      {loading && <p>Carregando...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div
        style={{
          marginTop: "2rem",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
          gap: "1rem",
        }}
      >
        {movies.map((movie) => (
          <div
            key={movie.imdbID}
            style={{
              padding: "1rem",
              borderRadius: "8px",
              border: "1px solid #ddd",
              textAlign: "center",
            }}
          >
            <img
              src={movie.Poster !== "N/A" ? movie.Poster : "/placeholder.png"}
              alt={movie.Title}
              style={{
                width: "100%",
                height: "220px",
                objectFit: "cover",
                borderRadius: "6px",
              }}
            />
            <h3 style={{ marginTop: "0.5rem" }}>{movie.Title}</h3>
            <p>{movie.Year}</p>
          </div>
        ))}
      </div>
    </main>
  );
}