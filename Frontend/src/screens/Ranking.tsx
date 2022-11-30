import { Menu } from "../components/Menu";
import React, { useEffect, useState } from 'react';
import Footer from "../components/Footer";
import { MembroProps } from "../api/modules/Membro";
import { Link } from "react-router-dom";
import { Avatar } from "@mui/material";
import axios from "axios";

export default function Ranking() {
    const [membros, setMembros] = useState<MembroProps[]>([])

    useEffect(() => {

        async function allMembers() {

            try {
                const response = await axios.get(`http://localhost:3333/api/usuario`);
                setMembros(response.data)
                console.log(response.data)
            } catch (error) {
                console.log(error)
            }

        }

        allMembers()

    }, [])

    return (
        <>
            <Menu />
            <div className='flex  min-h-[77vh]'>
                <div className='bg-zinc-800/70 mx-auto w-[45vw] self-center  m-16 p-4 rounded-md shadow-lg flex flex-col gap-3 shadow-black/25'>
                    {membros.map((membro: MembroProps) => {
                        return (

                            <div key={membro.id} className='relative flex items-center gap-1 w-full border-y-[1px] px-3 py-2 border-zinc-800 bg-zinc-700/25 rounded-md justify-between'>
                                <div className="p-2 flex items-center  gap-2">
                                    <Link to={`/perfil/${membro.id}`}>
                                        <Avatar alt={membro.nome} src={membro.foto} sx={{ width: '7vh', height: '7vh', bgcolor: '#C0C0C0' }} />
                                    </Link>
                                    <div className='p-2  flex flex-col'>
                                        <Link to={`/perfil/${membro.id}`} className="font-black text-md text-indigo-300">{membro.nome}</Link>

                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
            <Footer />
        </>
    )
}