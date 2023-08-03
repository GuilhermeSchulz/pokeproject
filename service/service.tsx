export const fetchWithCatch = async (url: string) => {
    try {
        const response = await fetch(url);
        return await response.json();
    } catch (error) {
        return null;
    }
};

import { Pokemon } from "@/types/types";

export async function fetchPokemonData(generation: string = "1"): Promise<Pokemon[]> {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/generation/${generation}/`);
        const data = await response.json();

        const pokemonPromises = data.pokemon_species.map((pokemon: Pokemon) =>
            fetchWithCatch(pokemon.url)
        );
        const pokemonPromisesName = data.pokemon_species.map((pokemon: Pokemon) =>
            fetchWithCatch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
        );

        const pokemonsData = await Promise.all(pokemonPromises);
        const pokemonsDataName = await Promise.all(pokemonPromisesName);

        const pokemonsTotal = pokemonsData.map((pokemon, index) => {
            const data = pokemonsDataName.find((pokeName) => pokeName && pokeName.id === pokemon.id);

            if (pokemon && data) {
                return { ...data, ...pokemon };
            }
            return null;
        }).filter(pokemon => pokemon !== null);

        const sortedPokemon = pokemonsTotal.sort((a, b) => a.order - b.order);
        return sortedPokemon;
    } catch (error) {
        console.error("Erro ao buscar os Pokémon:", error);
        return [];
    }
}

export async function fetchSpecificPokemonData(name: string): Promise<Pokemon | null> {
    try {
        const data = await fetchWithCatch(`https://pokeapi.co/api/v2/pokemon/${name}`);
        const dataByNumber = await fetchWithCatch(`https://pokeapi.co/api/v2/pokemon-species/${data.id}`);
        return { ...data, ...dataByNumber };
    } catch (error) {
        console.error("Erro ao buscar o Pokémon:", error);
        return null;
    }
}