
import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import SearchBar from "../SearchBar/SearchBar";
import "./App.module.css"
import { movieService } from "../../services/movieService";


export default function App() {

  useEffect(() => {
    // movieService();
  }, []);

  const handleSubmitSearch = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;

    const formData = new FormData(form);

    const query = formData.get('query') as string;

    if (query === '') {
      toast('Please enter your search query');
      return;
    }

    const movies = await movieService(query);

    if (movies?.total_results === 0) {
      toast('No movies found for your request.');

    }
    console.log(movies);



    form.reset();
  }
  return (
    <>
      <SearchBar onSubmit={handleSubmitSearch} />
      <Toaster />
    </>
  );
}
