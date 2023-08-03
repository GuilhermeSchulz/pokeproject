"use client"
import React from 'next';
import Image from 'next/image'
import logo from '@/public/images/pokelogo.png'
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
import { fetchSpecificPokemonData } from '@/service/service';
import { useRouter } from 'next/navigation'
import { useAppDispatch } from '@/store/redux';
import { setSearchedPokemon } from '@/reducers/pokemonSearchReducer';
import { toast } from 'react-toastify';


export const Header = () => {
    const [search, setSearch] = useState<string>("");
    const dispatch = useAppDispatch();
    const router = useRouter()
    const requestPoke = async () => {
        const data = await fetchSpecificPokemonData(search);
        dispatch(setSearchedPokemon(data));
        if (data) {
            toast.success
                ('Pokemon encontrado, redirecionando!', {
                    position: 'bottom-right',
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            router.push(`/pokemon/${data.name}`);
        } else {
            toast.error
                ('Pokemon não encontrado!', {
                    position: 'bottom-right',
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
        }
    };



    return (
        <header className="p-5 flex justify-between items-center border-b-2 border-carmine bg-slate-950 max-sm:flex-col max-sm:gap-4">
            <div className="flex items-center gap-5">
                <Image src={logo} className="w-[30px]" alt="PokeProject Logo" />
                <h1>PokeProject</h1>
            </div>
            <div className="flex items-center w-[20%] h-10 max-sm:w-[80%]">
                <input onChange={(e) => setSearch(e.target.value)} className='h-[99%] w-[90%] bg-white rounded-l-sm px-2 text-black focus:outline-none' placeholder='Search Pokemon Here' id='search' type="text" name='Search' />
                <button onClick={() => requestPoke()} className='bg-white rounded-r-sm px-2 text-black h-[99%] flex items-center justify-center' ><SearchIcon /></button>
            </div>
        </header>
    )
}