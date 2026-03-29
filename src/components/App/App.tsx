
import { useEffect } from "react";
import SearchBar from "../SearchBar/SearchBar";
import "./App.module.css"

  

export default function App () {

  useEffect(()=>{
    movieService();
  });
 return (
  <>
    <SearchBar />
  </>
 );
}
