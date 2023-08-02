"use client"
import { PokemonList } from "@/components/pokemonCard/pokemonCard";
import { fetchWithCatch } from "@/service/service";
import { Pokemon } from "@/types/types";
import { useEffect, useState } from "react";


export default function Home() {

  const [pokemonsDescription, setPokemonsDescription] = useState<Pokemon[] | []>([]);
  const [loading, setLoading] = useState<boolean>(true)

  const fetchPokemon = async (generation: string = "1") => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/generation/${generation}/`);
      const data = await response.json();

      const pokemonPromises = data.pokemon_species.map((pokemon: Pokemon) => fetchWithCatch(pokemon.url));
      const pokemonPromisesName = data.pokemon_species.map((pokemon: Pokemon) => fetchWithCatch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`));

      const pokemonsData = await Promise.all(pokemonPromises);
      const pokemonsDataName = await Promise.all(pokemonPromisesName);

      const pokemonsTotal = pokemonsData.map((pokemon, index) => {

        const data = pokemonsDataName.find(pokeName => pokeName && pokeName.id === pokemon.id)


        if (pokemon && data) {
          return { ...data, ...pokemon }
        }
        return null;
      }).filter(pokemon => pokemon !== null);

      const sortedPokemon = pokemonsTotal.sort((a, b) => a.order - b.order);
      setPokemonsDescription(sortedPokemon);
      setLoading(false)
    } catch (error) {
      console.error('Erro ao buscar os Pokémon:', error);
    }
  };
  useEffect(() => {
    fetchPokemon()
  }, [])
  return (
    <>
      <main className="p-5 flex flex-col gap-2 justify-end">
        {loading ?
          (<h1 className="text-center text-lg font-bold text-white">Carregando...</h1>)
          : (
            <>
              <select className="p-2 bg-black text-white w-[200px]" onChange={(e) => {
                setLoading(true)
                if (e.target.value == "0")
                  return;
                else

                  fetchPokemon(e.target.value)
              }}>
                <option value={0}>Selecione a Geração</option>
                <option value={1}>Geração 1</option>
                <option value={2}>Geração 2</option>
                <option value={3}>Geração 3</option>
                <option value={4}>Geração 4</option>
                <option value={5}>Geração 5</option>
                <option value={6}>Geração 6</option>
                <option value={7}>Geração 7</option>
                <option value={8}>Geração 8</option>
                <option value={9}>Geração 9</option>
              </select>
              <ul className="flex flex-wrap gap-8 justify-center">
                {pokemonsDescription?.map((pokemon: any) => (
                  <PokemonList key={pokemon.order} pokemon={pokemon} />

                ))}
              </ul>
            </>
          )
        }
      </main>
    </>

  )
}
