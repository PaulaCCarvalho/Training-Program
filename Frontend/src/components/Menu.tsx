import { Avatar } from "@mui/material";
import axios from "axios";
import { Crown, SignOut, UserCircle } from "phosphor-react";
import { Dispatch, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useGlobal } from "../Context/globalContext";

type user = {
    nome: string
    foto: string
}

export function Menu() {
    const { isAdmin, setIsAdmin, isMembro, setIsMembro } = useGlobal();
    const id = localStorage.getItem('id');
    const [user, setUser] = useState<user>({
        nome: 'User',
        foto: ''
    })

    useEffect(() => {
        if (id !== null) {
            setIsMembro(true)
        }

        axios.get(`http://localhost:3333/api/usuario/${id}`)
            .then((response: any) => setUser(response.data))
            .catch((err) => console.error("Ops algo de errado aconteceu!"))
    }, [])

    const handleLogout = () => {
        if (isAdmin === true) {
            setIsAdmin(false)
        }

        localStorage.removeItem('token');
        localStorage.removeItem('id');

        setIsMembro(false);


    }

    return (
        <div className="bg-zinc-700 shadow-lg shadow-black/30">
            <div className="mx-auto px-10 ">
                <div className="relative flex h-16 items-center justify-between text-white ">
                    <div className="">
                        <span className="text-2xl">Training Program</span>
                    </div>

                    <div className="flex flex-row gap-4 text-xl text-white ">
                        <Link to="/" className="hover:bg-zinc-600 px-4 py-1 rounded-md">
                            Desafios
                        </Link>

                        <Link to="/ranking" className="hover:bg-zinc-600 px-4 py-1 rounded-md">
                            Ranking
                        </Link>
                    </div>

                    {isAdmin &&
                        <div className="flex items-center gap-2">
                            <div className=" py-1 px-1 rounded-md">Olá, Administrador!</div>

                            <Crown size={40} className="flex rounded-md px-1 py-1 text-yellow-500" />

                            <div onClick={handleLogout} className="flex ml-3 rounded-md px-3 py-1 hover:bg-zinc-600">
                                <SignOut size={24} />
                            </div>


                        </div>
                    }

                    {isMembro ?
                        <div className="flex items-center text-lg gap-4">
                            <p>Bem-vindo(a), {user.nome.split(' ',1)}! </p>
                            <Link to={'/perfil/' + id}>
                                <Avatar alt={user.nome} src={user.foto} sx={{ width: '6.5vh', height: '6.5vh', bgcolor: '#C0C0C0'}} />
                            </Link>

                            <div onClick={handleLogout} className="flex rounded-md px-3 py-1 hover:bg-zinc-600">
                                <SignOut size={24} />
                            </div>
                        </div>
                        :
                        <div className="flex items-center gap-6">
                            <Link to="/cadastro" className="hover:bg-zinc-600 py-1 px-2 rounded-md">Cadastrar</Link>

                            <Link to="/login" className="flex bg-violet-500 rounded-md px-3 py-1 hover:bg-violet-600">
                                Login
                            </Link>
                        </div>
                    }


                </div>
            </div>
        </div>
    )
}