import { useParams } from "react-router";
import { useQuery } from '@tanstack/react-query';
import PokeSearchBar from "../components/PokeSearchBar";

function PokeSearch() {
    const params = useParams();
    const { name } = params;
    const { data: pokemon, isLoading, error } = useQuery({
        queryFn: () =>
            fetch(`https://pokeapi.co/api/v2/pokemon/${name}`).then(
                (res) => res.json()
            ),
        enabled: !!name,
        queryKey: ['pokemon', name],
    });
    return (
        <div>
			<PokeSearchBar />
            <h1>PokeSearch: {name}</h1>
            {isLoading && <h2>Loading...</h2>}
            {error && <div className="error">Error: error fetching</div>}
            {pokemon && pokemon.sprites && (
                <div>
                    <h2>{pokemon.name}</h2>
                    <p>Height: {pokemon.height}</p>
                    <p>Weight: {pokemon.weight}</p>
                    <div style={{ display: "flex", flexDirection: "row", gap: "1rem", flexWrap: "wrap" }}>
                        {Object.entries(pokemon.sprites).map(([spriteKey, spriteUrl]) =>
                            typeof spriteUrl === "string" && spriteUrl ? (
                                <div key={spriteKey}>
                                    <p>{spriteKey}</p>
                                    <img src={spriteUrl} alt={spriteKey} />
                                </div>
                            ) : null
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default PokeSearch;