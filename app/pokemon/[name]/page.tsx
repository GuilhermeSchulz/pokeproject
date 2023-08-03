"use client"
import { fetchSpecificPokemonData } from '@/service/service';
import { getStatLabel, getTypeColors } from '@/app/utils/utils';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/redux';
import { setLoading } from '@/reducers/pokemonReducer';
import { setSearchedPokemon } from '@/reducers/pokemonSearchReducer';


const CustomSkeleton = () => (
    <div className="w-[100%] p-2 flex gap-5 rounded justify-center items-center h-[100%]">
        <div className="w-[30%] h-[100%] bg-gray-800 animate-pulse rounded" />
        <div className='flex flex-col w-[65%] h-[100%] gap-5'>

            <div className="w-[100%] h-[50%] drop-shadow-xl p-5 bg-gray-800 animate-pulse rounded" />
            <div className="w-[100%] h-[50%] drop-shadow-xl p-5 bg-gray-800 animate-pulse rounded" />
        </div>

    </div>
);


const PokemonPage: React.FC = () => {
    const router = useRouter();
    const page = usePathname()
    const dispatch = useDispatch();
    const name = page.slice(9);
    const pokemon = useSelector((state: RootState) => state.pokemonSearch.searchedPokemon);
    const loading = useSelector((state: RootState) => state.pokemon.loading);
    const [shiny, setShiny] = useState<boolean>(false);

    const shinyToggle = () => {
        setShiny(!shiny);

    }

    const fetchSpecificPokemon = async () => {
        if (name) {
            const data = await fetchSpecificPokemonData(name);
            if (data) {
                dispatch(setSearchedPokemon(data));
                dispatch(setLoading(false));
            }
        }
    };

    useEffect(() => {
        fetchSpecificPokemon();
    }, [name]);


    function calculatePercentage(value: number) {
        const result = `${Math.round((value * 100) / 255)}%`
        return result
    }

    const fixName = pokemon && pokemon?.name.charAt(0).toUpperCase() + pokemon?.name.slice(1)
    const pokemonWeight = pokemon && (pokemon.weight * 0.1).toFixed(1)
    const pokemonHeight = pokemon && (pokemon.height * 0.1).toFixed(1)


    return (
        <div className='w-[100%] h-[90%] flex items-center flex-col gap-1 p-5 max-sm:h-[80%] overflow-auto min-h-[768px]'>
            <Link className='p-2 bg-carmine rounded text-white w-[80px] text-center self-end' href='/'>Voltar</Link>
            {loading ? (
                <>
                    <CustomSkeleton />
                </>
            ) : (
                <div className='w-[100%] h-[100%] flex items-center gap-5 p-5 justify-between max-sm:flex-col max-sm:overflow-auto max-sm:h-[85%]'>

                    <div className='w-[30%] bg-black drop-shadow-xl p-2 flex gap-5 rounded flex-col justify-center items-center h-[100%] max-sm:w-[100%] max-sm:h-[600px]'>
                        <p className='text-center text-lg font-bold text-white'>Numero: {pokemon?.id}</p>
                        <span className='p-2 bg-carmine rounded text-white w-[80px] text-center cursor-pointer' onClick={shinyToggle}>{shiny ? "Normal" : "Shiny"}</span>
                        <img className="w-[200px]" src={shiny ? pokemon?.sprites.front_shiny : pokemon?.sprites.front_default} alt={pokemon?.name} />
                        <h1 className='text-center text-lg font-bold text-white'>{fixName}</h1>
                        <p className='text-center text-m font-bold text-white'>Peso: {pokemonWeight} kg</p>
                        <p className='text-center text-m font-bold text-white'>Altura: {pokemonHeight} m</p>
                        <div className='flex gap-1'>
                            {pokemon?.types.map((type) => (<span className={`w-[70px] text-white p-1 rounded-full text-center text-sm ${getTypeColors(
                                type.type.name
                            )}`} key={`${type.type.name} ${pokemon.id}`}>{type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1)}</span>))}
                        </div>
                    </div>

                    <div className="flex flex-col w-[65%]  h-[100%] gap-5 max-sm:flex-col max-sm:w-[100%] max-sm:h-[400px] min-h-max">
                        <div className='w-[100%] bg-black drop-shadow-xl p-5 rounded flex gap-5 flex-col justify-center items-center h-[50%] max-sm:h-[100%] min-h-max'>
                            <h2 className='text-center text-lg font-bold text-white'>Status:</h2>
                            {
                                pokemon?.stats.map((stat) => (
                                    <div className="w-[100%] flex gap-3 h-6" key={`${stat.stat.name} ${pokemon.order}`}>
                                        <h3 className='text-lg font-bold text-white w-[20%] text-left'>{stat?.stat?.name.includes("special-attack")
                                            ? stat?.stat?.name.replace("special-attack", "Sp.Atk")
                                            : stat?.stat?.name.includes("special-defense")
                                                ? stat?.stat?.name.replace("special-defense", "Sp.Def")
                                                : stat.stat.name.charAt(0).toUpperCase() + stat.stat.name.slice(1)}:</h3>
                                        <div className={`rounded w-[75%] relative`}>
                                            <div className={`${getStatLabel(stat.stat.name)} rounded w-[100%] h-[100%] absolute opacity-50 z-[-1]`}></div>
                                            <p className={`${getStatLabel(stat.stat.name)} rounded text-carmine text-center font-bold`} style={{ width: calculatePercentage(stat.base_stat) }}>{stat.base_stat}</p>
                                        </div>
                                    </div>


                                ))
                            }
                        </div>
                        <div className='w-[100%] bg-black drop-shadow-xl p-5 flex rounded gap-5 flex-col justify-center items-center h-[50%]'>
                            <h2 className='text-center text-lg font-bold text-white'>Descrição:</h2>
                            <p className='text-center text-lg text-white'>{pokemon?.flavor_text_entries.find((text) => text.language.name === 'en')?.flavor_text.replace(/\n/g, ' ').replace(/\f/g, ' ')}</p>
                        </div>
                    </div>
                </div>

            )


            }
        </div >

    );
};

export default PokemonPage;