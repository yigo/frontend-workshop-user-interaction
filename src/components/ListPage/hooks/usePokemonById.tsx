import axios from "axios";
import { useEffect, useState } from "react";

interface Pokemon {
  name: string;
  sprites: {
    front_default: string;
  };
}
export default function usePokemonById({ url }: { url: string }) {
  const [data, setData] = useState<Pokemon>();
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState<Error>();

  useEffect(() => {
    setStatus("loading");
    setData(undefined);
    axios
      .get(url)
      .then((response) => {
        setData(response.data);
        setStatus("success");
      })
      .catch((error) => {
        setError(error);
        setStatus("error");
      });
  }, [url]);

  return {
    data,
    status,
    error,
  };
}
