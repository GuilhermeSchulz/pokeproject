import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import pokemonReducer from "../reducers/pokemonReducer";
import pokemonSearchReducer from "@/reducers/pokemonSearchReducer";

const store = configureStore({
  reducer: {
    pokemon: pokemonReducer,
    pokemonSearch: pokemonSearchReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
