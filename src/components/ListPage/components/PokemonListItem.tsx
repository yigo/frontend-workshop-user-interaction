import usePokemonById from "../hooks/usePokemonById";

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
