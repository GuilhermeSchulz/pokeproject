import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Pokemon } from "@/types/types";

interface PokemonState {
  pokemonsDescription: Pokemon[];
  loading: boolean;
}

const initialState: PokemonState = {
  pokemonsDescription: [],
  loading: true,
};

const pokemonSlice = createSlice({
  name: "pokemon",
  initialState,
  reducers: {
    setPokemons: (state, action: PayloadAction<Pokemon[]>) => {
      state.pokemonsDescription = action.payload;
      state.loading = false;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { setPokemons, setLoading } = pokemonSlice.actions;
export default pokemonSlice.reducer;
