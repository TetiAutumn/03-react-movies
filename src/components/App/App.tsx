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

  const handleSubmitSearch = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;

    const formData = new FormData(form);

    try {
      setIsLoading(true);
      setError(false);
      const query = formData.get('query') as string;
      if (query === '') {
        toast('Please enter your search query');
        return;
      }
      const data = await movieService(query);

      if (data?.total_results === 0) {
        toast('No movies found for your request.');
        setMovies([]);
        return;
      }

      if (data) {
        setMovies(data.results);
      }
    } catch {
      setError(true);
    } finally {
      setIsLoading(false);
    }


    form.reset();
  }


  return (
    <>
      <SearchBar onSubmit={handleSubmitSearch} />
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
