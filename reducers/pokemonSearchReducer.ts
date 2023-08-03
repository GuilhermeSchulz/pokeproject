import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Pokemon } from "@/types/types";

interface PokemonSearchState {
  searchedPokemon: Pokemon | null;
}

const initialState: PokemonSearchState = {
  searchedPokemon: null,
};

const pokemonSearchSlice = createSlice({
  name: "pokemonSearch",
  initialState,
  reducers: {
    setSearchedPokemon: (state, action: PayloadAction<Pokemon | null>) => {
      state.searchedPokemon = action.payload;
    },
  },
});

export const { setSearchedPokemon } = pokemonSearchSlice.actions;
export default pokemonSearchSlice.reducer;
