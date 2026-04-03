import toast, { Toaster } from "react-hot-toast";
import SearchBar from "../SearchBar/SearchBar";
import { MovieGrid } from "../MovieGrid/MovieGrid";
import "./App.module.css"
import { movieService } from "../../services/movieService";
import { useState } from "react";
import type { Movie } from "../../types/movie";
import { Loader } from "../Loader/Loader";
import { ErrorMessage } from "../ErrorMessage/ErrorMessage";
import { MovieModal } from "../MovieModal/MovieModal";

export default function App() {

  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false)
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

 const handleSearch = async (query: string) => {
    try {
      setIsLoading(true);
      setError(false);

      const movies = await movieService(query);

      if (movies.length === 0) {
        toast("No movies found for your request.");
        setMovies([]);
        return;
      }

      setMovies(movies);
    } catch {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <>
      <SearchBar onSubmit={handleSearch} />
      <Toaster />

      {isLoading && <Loader />}

      {error ? (
        <ErrorMessage />)
        : (
          !isLoading && movies.length > 0 && (
            <MovieGrid
              movies={movies}
              onSelect={(movie) => setSelectedMovie(movie)}
            />
          )
        )}
        {selectedMovie && (
      <MovieModal
        movie={selectedMovie}
        onClose={() => setSelectedMovie(null)}
      />
    )}
    </>
  );
}
