
import axios from "axios";
import { MagnifyingGlass, Plus } from "phosphor-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CadastrarDesafio from "./CadastrarDesafio";
import { CardDesafio, CardDesafioProps } from "../components/CardDesafio";
import { Menu } from "../components/Menu";
import Footer from "../components/Footer";

interface Desafio extends CardDesafioProps { }

export default function Home() {
    const [cards, setCards] = useState<Desafio[]>([]);

    useEffect(() => {
        axios.get('http://localhost:3333/api/desafio')
            .then((response) => {
                setCards(response.data);
            })
            .catch((err) => {
                console.error("ops! ocorreu um erro" + err);
            });
    }, []);

    return (
        <>
            <div className="-z-10 fixed w-80 h-full bg-zinc-800 left-0 ">
                <div>
                </div>
            </div>

            <Menu />

            <div className="ml-72 flex w-auto h-1/2 flex-col items-center">
                <div className="px-6 py-6 flex flex-col items-center">
                    <div className="m-6 inline-flex items-center">
                        <input type="text" name="search" className="bg-[#4F545C] w-[800px] py-3 px-4 rounded-[14px] text-sm placeholder:text-zinc-400" placeholder="Pesquise um desafio" />
                        <MagnifyingGlass size={28} className="text-[#B9BBBE] right-3 -translate-x-11" />

                        <Link to="/cadastro-desafio" className="bg-[#4F545C] text-white px-2 py-2 rounded-3xl hover:bg-slate-100 hover:text-[#4F545C] delay-200">
                            <Plus size={32} />
                        </Link>

                    </div>

                    <div className="flex flex-wrap items-center justify-center overflow-auto">
                        {
                            cards.map((card) => {
                                return (
                                    <Link to={"/Desafio/" + card.id} >
                                        <CardDesafio key={card.id} data={card} />
                                    </Link>
                                )
                            })
                        }



                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}