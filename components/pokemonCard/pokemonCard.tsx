import { PokemonListProps } from '@/types/types';
import { getTypeColors } from '@/app/utils/utils';
import Link from 'next/link';
import React from 'react';

export const PokemonList: React.FC<PokemonListProps> = ({ pokemon }) => {


    return (
        <li className={`p-2 rounded w-[200px] h-[250px]  bg-black drop-shadow-xl ${pokemon.is_legendary ? "border-2 border-amber-300" : ""}`}>
            <Link className='w-[100%] h-[100%] flex items-center flex-col gap-1'
                href={`/pokemon/${encodeURIComponent(pokemon.name)}`
                }
            >
                <p className='text-center text-sm font-light text-white'>Pokedex Nº: {pokemon.id}</p>
                <img className='w-[150px]' src={pokemon.sprites.front_default} alt={pokemon.name} />
                <p className='text-center text-lg font-bold text-white'>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</p>
                <div className='flex gap-1'>
                    {pokemon.types.map((type) => (<span className={`w-[70px] text-white p-1 rounded-full text-center text-sm ${getTypeColors(
                        type.type.name
                    )}`} key={`${type.type.name} ${pokemon.order}`}>{type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1)}</span>))}
                </div>
            </Link>
        </li>
    )
}