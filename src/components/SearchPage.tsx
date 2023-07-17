import axios from "axios";
import { useEffect, useState } from "react";

console.log("RENDER FORM APP");

interface PokemonListItem {
  name: string;
  url: string;
  sprites: {
    front_default: string;
  };
}

function usePokemon({ search = "" }) {
  const [data, setData] = useState<PokemonListItem>();
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState<Error>();

  useEffect(() => {
    if (search === "") {
      return;
    }
    setStatus("loading");
    setData(undefined);
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${search}`, {
        params: {
          limit: 1,
        },
      })
      .then((response) => {
        setData(response.data);
        setStatus("success");
      })
      .catch((error) => {
        setError(error);
        setStatus("error");
      });
  }, [search]);

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
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search);
  const { data, status } = usePokemon({
    search: debouncedSearch,
  });

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };
  return (
    <>
      <h1>Search Pokemons</h1>
      <h2>search for: {search}</h2>
      <input type="text" onChange={handleSearch} />
      {data && (
        <div>
          {status === "success" && (
            <img src={data.sprites.front_default} alt={data.name} />
          )}
        </div>
      )}
    </>
  );
}

export default App;
