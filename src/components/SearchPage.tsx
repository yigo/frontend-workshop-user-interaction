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

function usePokemon({ offset = 0, search = "" }) {
  const [data, setData] = useState<PokemonListItem[]>([]);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState<Error>();
  console.log(search);

  const url =
    search !== ""
      ? `https://pokeapi.co/api/v2/pokemon/${search}`
      : "https://pokeapi.co/api/v2/pokemon";

  useEffect(() => {
    setStatus("loading");
    setData([]);
    axios
      .get(url, {
        params: {
          limit: 20,
          offset,
        },
      })
      .then((response) => {
        if (search !== "" && response.data) {
          setData(response.data);
        } else {
          setData(response.data.results);
        }
        setStatus("success");
      })
      .catch((error) => {
        setError(error);
        setStatus("error");
      });
  }, [offset, search]);

  return {
    data,
    status,
    error,
  };
}

function useDebounce(value: string) {
  const [debouncedInputValue, setDebouncedValue] = useState("");
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedValue(value);
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [value]);
  return debouncedInputValue;
}

function App() {
  const [offset, setOffset] = useState(0);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search);
  const { data, status, error } = usePokemon({
    offset,
    search: debouncedSearch,
  });

  const fetchPrevious = () => {
    console.log("fetch previous page: " + offset);
    setOffset(offset <= 0 ? 0 : offset - 20);
  };

  const fetchNext = () => {
    console.log("fetch next page: " + offset);
    setOffset(offset + 20);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  //if (status === "loading") return <h1>Cargando...</h1>;

  // if (status === "error") {
  //   return (
  //     <>
  //       <h1>Ha ocurrido un error</h1>
  //       <pre>{error?.message}</pre>
  //     </>
  //   );
  // }

  console.log(data);
  return (
    <>
      <h1>Search Pokemons</h1>
      <input type="text" onChange={handleSearch} />
      <button disabled={status === "loading"} onClick={fetchPrevious}>
        previous
      </button>
      <button disabled={status === "loading"} onClick={fetchNext}>
        next
      </button>
      <h2>Results</h2>
      {search !== "" && data && <p>{data.name}</p>}
      {search === "" && (
        <ul>
          {data?.map((pokemon) => (
            <li key={pokemon.name}>{pokemon.name}</li>
          ))}
        </ul>
      )}
    </>
  );
}

export default App;
