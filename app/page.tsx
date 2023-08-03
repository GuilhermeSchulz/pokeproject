"use client"
import { PokemonList } from "@/components/pokemonCard/pokemonCard";
import { fetchPokemonData } from "@/service/service";
import { useEffect } from "react";
import { Skeleton } from "@mui/material"
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/redux";
import { setLoading, setPokemons } from "@/reducers/pokemonReducer";



export default function Home() {

  const dispatch = useDispatch();
  const pokemonsDescription = useSelector(
    (state: RootState) => state.pokemon.pokemonsDescription
  );
  const loading = useSelector((state: RootState) => state.pokemon.loading);

  const fetchPokemons = async (generation: string = "1") => {
    const sortedPokemon = await fetchPokemonData(generation);
    dispatch(setPokemons(sortedPokemon));
    dispatch(setLoading(false));
  };

  useEffect(() => {
    fetchPokemons("1");
  }, []);

  return (
    <main className="p-5 flex flex-col gap-2 justify-end w-[100%]">
      <select className="p-2 bg-black text-white w-[200px]" onChange={(e) => {
        dispatch(setLoading(true));
        if (e.target.value === "0")
          return;
        else
          fetchPokemons(e.target.value);
      }}>
        <option value={0} disabled selected>Selecione a Geração</option>
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
      <ul className="flex flex-wrap gap-8 justify-center max-sm:gap-2 w-[100%]">
        {loading ? (
          Array.from({ length: 24 }).map((_, i) => (
            <Skeleton key={i} variant="rounded" width={200} height={250} />
          ))
        ) : (
          pokemonsDescription.map((pokemon) => (
            <PokemonList key={pokemon.order} pokemon={pokemon} />
          ))
        )}
      </ul>
    </main>
  );
};
