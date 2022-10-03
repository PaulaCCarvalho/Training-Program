import { Crown, SignOut, UserCircle } from "phosphor-react";
import { Dispatch } from "react";
import { Link } from "react-router-dom";
import { useGlobal } from "../Context/globalContext";


export function Menu() {
    const { isAdmin, setIsAdmin } = useGlobal();
    return (
        <div className="bg-zinc-700 shadow-lg shadow-black/30">
            <div className="mx-auto px-10 ">
                <div className="relative flex h-16 items-center justify-between text-white ">
                    <div className="">
                        <span className="text-2xl">Training Program</span>
                    </div>

                    <div className="flex flex-row gap-4 text-xl text-white -translate-x-1/4">
                        <Link to="/" className="hover:bg-zinc-600 px-4 py-1 rounded-md">
                            Desafios
                        </Link>

                        <Link to="/ranking" className="hover:bg-zinc-600 px-4 py-1 rounded-md">
                            Ranking
                        </Link>
                    </div>

                    {isAdmin ?
                        <div className="flex items-center gap-2">
                            <div className=" py-1 px-1 rounded-md">Olá, Administrador!</div>

                            <Crown size={40} className="flex rounded-md px-1 py-1 text-yellow-500" />

                            <div onClick={() => setIsAdmin(false)} className="flex ml-3 rounded-md px-3 py-1 hover:bg-zinc-600">
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