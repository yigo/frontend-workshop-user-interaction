import axios from "axios";
import { useEffect, useState } from "react";

interface PokemonListItem {
  name: string;
  url: string;
}
export default function usePokemonList({ offset = 0 }) {
  const [data, setData] = useState<PokemonListItem[]>([]);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState<Error>();

  const url = "https://pokeapi.co/api/v2/pokemon";

  useEffect(() => {
    setStatus("loading");
    setData([]);
    axios
      .get(url, {
        params: {
          limit: 5,
          offset,
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
  }, [offset]);

  return {
    data,
    status,
    error,
  };
}
