import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface Pokemon {
  name: string;
  sprites: {
    front_default: string;
  };
}
function usePokemonById({ url }: { url: string }) {
  return useQuery<Pokemon>({
    queryKey: ["pokemon-by-id", url],
    queryFn: () => axios.get(url).then((res) => res.data),
  });
}

export default function PokemonListItem({
  name,
  url,
}: {
  name: string;
  url: string;
}) {
  const { status, error, data } = usePokemonById({ url });

  return (
    <div>
      <h3>{name}</h3>
      {status === "success" && (
        <img src={data?.sprites.front_default} alt={name} />
      )}
    </div>
  );
}
