import React from 'next';
import Image from 'next/image'
import logo from '@/public/pokelogo.png'
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
import { fetchWithCatch } from '@/service/service';
import { useRouter } from 'next/navigation'


export const Header = () => {
    const [search, setSearch] = useState<string>('');
    const router = useRouter()
    const requestPoke = async () => {
        const data = await fetchWithCatch(`https://pokeapi.co/api/v2/pokemon/${search}`)
        if (data) {
            router.push(`/pokemon/${data.name}`)
        } else {
        }



    }


    return (
        <header className="p-5 flex justify-between items-center border-b-2 border-carmine bg-slate-950">
            <div className="flex items-center gap-5">
                <Image src={logo} className="w-[30px]" alt="PokeProject Logo" />
                <h1>PokeProject</h1>
            </div>
            <div className="flex items-center h-10">
                <input onChange={(e) => setSearch(e.target.value)} className='h-[99%] w-[300px] bg-white rounded-l-sm px-2 text-black focus:outline-none' placeholder='Search Pokemon Here' id='search' type="text" name='Search' />
                <button onClick={() => requestPoke()} className='bg-white rounded-r-sm px-2 text-black h-[99%] flex items-center justify-center' ><SearchIcon /></button>
            </div>
        </header>
    )
}