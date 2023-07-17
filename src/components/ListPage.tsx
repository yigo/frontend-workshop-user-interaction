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
import { useState } from "react";
import PokemonListItem from "./ListItem";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface PokemonListItem {
  name: string;
  url: string;
}
const url = "https://pokeapi.co/api/v2/pokemon";
function usePokemonList({ offset = 0 }) {
  return useQuery<PokemonListItem[]>({
    queryKey: ["pokemon-list", offset],
    queryFn: () =>
      axios
        .get(url, { params: { offset, limit: 20 } })
        .then((res) => res.data.results),
  });
}

console.log("RENDER LIST APP");
function App() {
  const [offset, setOffset] = useState(0);
  const { data, status } = usePokemonList({
    offset,
  });

  const fetchPrevious = () => {
    console.log("fetch previous page: " + offset);
    setOffset(offset <= 0 ? 0 : offset - 20);
  };

  const fetchNext = () => {
    console.log("fetch next page: " + offset);
    setOffset(offset + 20);
  };

  const ButtonPrevious = () => {
    return (
      <button disabled={status === "loading"} onClick={() => fetchPrevious()}>
        previous
      </button>
    );
  };

  const ButtonNext = () => {
    return (
      <button disabled={status === "loading"} onClick={() => fetchNext()}>
        previous
      </button>
    );
  };

  return (
    <>
      <h1>List Pokemons</h1>
      <ButtonPrevious />
      <ButtonNext />
      {status === "loading" && <div>Loading...</div>}

      {data?.map((pokemon) => (
        <PokemonListItem
          key={pokemon.name}
          name={pokemon.name}
          url={pokemon.url}
        />
      ))}
    </>
  );
}

export default App;
