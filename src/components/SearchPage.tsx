/**
 * ASSIGNMENT:
 * 1. Create a paginated list of pokemons using the pokeapi
 * the user should be able to paginate through the list
 * using a next and previous button
 * pressing the next button fecth the next 20 pokemons
 * pressing the previous button fetch the previous 20 pokemons
 *
 * 2. Create an input that allows the user to search for a pokemon
 * the user should be able to search for a pokemon by name
 * when the user press the search button the app should fetch the pokemon
 *
 * 3. Make the search without the need of pressing the search button
 *
 * 4. make the search debounced
 *
 * REFERENCES:
 * - pokemon api https://pokeapi.co/
 * - debounce https://www.developerway.com/posts/debouncing-in-react
 */

import axios from "axios";
import { useEffect, useState } from "react";

interface PokemonListItem {
  name: string;
  url: string;
}

function usePokemon() {
  const [data, setData] = useState<PokemonListItem[]>([]);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState<Error>();

  useEffect(() => {
    setStatus("loading");
    axios
      .get("https://pokeapi.co/api/v2/pokemon", {
        params: {
          limit: 20,
          offset: 0,
        },
      })
      .then((response) => {
        setData(response.data.results);
        setStatus("success");
      })
      .catch((error) => {
        setError(error);
        setStatus("error");
      });
  }, []);

  return {
    data,
    status,
    error,
  };
}

function App() {
  const { data, status, error } = usePokemon();

  const fetchPrevious = () => {
    console.log("fetch previous page");
  };

  const fetchNext = () => {
    console.log("fetch next page");
  };

  if (status === "loading") return <h1>Cargando...</h1>;

  if (status === "error") {
    return (
      <>
        <h1>Ha ocurrido un error</h1>
        <pre>{error?.message}</pre>
      </>
    );
  }

  return (
    <>
      <h1>Search Pokemons</h1>
      <button onClick={fetchPrevious}>previous</button>
      <button onClick={fetchNext}>next</button>
      <ul>
        {data.map((pokemon) => (
          <li key={pokemon.name}>{pokemon.name}</li>
        ))}
      </ul>
    </>
  );
}

export default App;
