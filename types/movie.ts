export interface Movie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;

  Genre?: string;
  Director?: string;
  Actors?: string;
  Plot?: string;
}

export interface MovieSearchResponse {
  Search?: Movie[];
  totalResults?: string;
  Response: "True" | "False";
  Error?: string;
}
