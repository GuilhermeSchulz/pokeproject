"use client"
import { fetchWithCatch } from '@/service/service';
import { Pokemon, PokemonListProps } from '@/types/types';
import { getStatLabel, getTypeColors } from '@/app/utils/utils';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const PokemonPage: React.FC = () => {
    const router = useRouter();
    const page = usePathname()
    const name = page.slice(9)
    const [pokemon, setPokemon] = useState<Pokemon | null>(null)
    const [shiny, setShiny] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(true)

    const shinyToggle = () => {
        setShiny(!shiny)
    }
    console.log(pokemon)

    const fetchSpecificPokemon = async () => {
        if (name) {
            const data = await fetchWithCatch(`https://pokeapi.co/api/v2/pokemon/${name}`)

            const dataByNumber = await fetchWithCatch(`https://pokeapi.co/api/v2/pokemon-species/${data.id}`)

            setPokemon({ ...data, ...dataByNumber })
            setLoading(false)

        }
    }


    useEffect(() => {
        fetchSpecificPokemon()
    }, [name])


    function calculatePercentage(value: number) {
        const result = `${Math.round((value * 100) / 255)}%`
        return result
    }
    const fixName = pokemon?.name.charAt(0).toUpperCase() + pokemon?.name.slice(1)


    return (
        loading ?
            <h1 className="text-center text-lg font-bold text-white">Carregando...</h1>
            :
            (<div className='w-[100%] h-[90%] flex items-center flex-col gap-1 p-5'>
                <Link className='p-2 bg-carmine rounded text-white w-[80px] text-center self-end' href='/'>Voltar</Link>

                <div className='w-[100%] h-[100%] flex items-center gap-5 p-5 justify-between'>

                    <div className='w-[30%] bg-black drop-shadow-xl p-2 flex gap-5 rounded flex-col justify-center items-center h-[100%]'>

                        <span className='p-2 bg-carmine rounded text-white w-[80px] text-center cursor-pointer' onClick={shinyToggle}>{shiny ? "Normal" : "Shiny"}</span>
                        <img className="h-[40%]" src={shiny ? pokemon?.sprites.front_shiny : pokemon?.sprites.front_default} alt={pokemon?.name} />
                        <h1 className='text-center text-lg font-bold text-white'>{fixName}</h1>
                        <p className='text-center text-m font-bold text-white'>Peso: {pokemon?.weight * 0.1} kg</p>
                        <p className='text-center text-m font-bold text-white'>Altura: {(pokemon?.height * 0.1).toFixed(1)} m</p>
                        <div className='flex gap-1'>
                            {pokemon?.types.map((type) => (<span className={`w-[70px] text-white p-1 rounded-full text-center text-sm ${getTypeColors(
                                type.type.name
                            )}`} key={`${type.type.name} ${pokemon.id}`}>{type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1)}</span>))}
                        </div>
                        <p className='text-center text-sm text-white'>Descrição: {pokemon?.flavor_text_entries.find((text) => text.language.name === 'en')?.flavor_text.replace(/\n/g, ' ').replace(/\f/g, ' ')}</p>
                    </div>

                    <div className="flex flex-col w-[65%]  h-[100%] gap-5">
                        <div className='w-[100%] bg-black drop-shadow-xl p-5 rounded flex gap-5 flex-col justify-center items-center h-[50%]'>
                            <h2 className='text-center text-lg font-bold text-white'>Status:</h2>
                            {
                                pokemon?.stats.map((stat) => (
                                    <div className="w-[100%] flex gap-3" key={`${stat.stat.name} ${pokemon.order}`}>
                                        <h3 className='text-lg font-bold text-white w-[20%] text-left'>{stat?.stat?.name.includes("special-attack")
                                            ? stat?.stat?.name.replace("special-attack", "Sp.Atk")
                                            : stat?.stat?.name.includes("special-defense")
                                                ? stat?.stat?.name.replace("special-defense", "Sp.Def")
                                                : stat.stat.name.charAt(0).toUpperCase() + stat.stat.name.slice(1)}:</h3>
                                        <p className={`${getStatLabel(stat.stat.name)} rounded text-carmine text-right font-bold p-1`} style={{ width: calculatePercentage(stat.base_stat) }}>{stat.base_stat}</p>
                                    </div>


                                ))
                            }
                        </div>
                        <div className='w-[100%] bg-black drop-shadow-xl p-5 flex rounded gap-5 flex-col justify-center items-center h-[50%]'></div>
                    </div>
                </div>

            </div >)
    );
};

export default PokemonPage;