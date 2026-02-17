import { fetchMovieById } from "@/lib/fetcher";

export default async function MoviePage(props: { params: { id: string } }) {
  const { id } = await props.params;

  const movie = await fetchMovieById(id);

  if (!movie) {
    return <div className="p-8">Filme não encontrado.</div>;
  }

  return (
    <main className="p-8 max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={movie.Poster !== "N/A" ? movie.Poster : "/placeholder.png"}
          alt={movie.Title}
          className="w-64 rounded-lg shadow-md"
        />

        <div>
          <h1 className="text-3xl font-bold mb-2">{movie.Title}</h1>
          <p className="text-gray-500 mb-4">{movie.Year}</p>

          <p className="mb-2">
            <span className="font-semibold">Gênero:</span> {movie.Genre}
          </p>

          <p className="mb-2">
            <span className="font-semibold">Diretor:</span> {movie.Director}
          </p>

          <p className="mb-2">
            <span className="font-semibold">Atores:</span> {movie.Actors}
          </p>

          <p className="mt-4 text-gray-700">{movie.Plot}</p>
        </div>
      </div>
    </main>
  );
}
