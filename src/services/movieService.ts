import axios from "axios";
import type { Movie } from "../types/movie";

export const movieService = async () => {
    try {
        const response = await axios.get<Movie>(``, {
            params: {
                // твої параметри
            },
            headers: {
                Authorization: import.meta.env.VITE_TMDB_TOKEN,
            }
        }
        );

        console.log('res', response.data);
    } catch (e){
        console.log(e);
        
    }
    
}