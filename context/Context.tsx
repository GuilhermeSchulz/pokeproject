import { createContext } from 'react';

interface MyContextData {
    message: string;
}


const PokemonContext = createContext<MyContextData | undefined>(undefined);



export default PokemonContext;