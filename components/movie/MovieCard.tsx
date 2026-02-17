import { Movie } from "@/types/movie";

interface MovieCardProps {
  movie: Movie;
}

export function MovieCard({ movie }: MovieCardProps) {
  return (
    <div className="border border-gray-200 rounded-lg p-3 shadow-sm hover:shadow-md transition text-center cursor-pointer">
      <img
        src={movie.Poster !== "N/A" ? movie.Poster : "/placeholder.png"}
        alt={movie.Title}
        className="w-full h-56 object-cover rounded-md"
      />

      <h3 className="font-semibold mt-3">{movie.Title}</h3>
      <p className="text-gray-500">{movie.Year}</p>
    </div>
  );
}
