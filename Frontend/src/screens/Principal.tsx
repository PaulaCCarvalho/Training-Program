
import axios from "axios";
import { MagnifyingGlass, Plus } from "phosphor-react";
import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { CardDesafio, CardDesafioProps } from "../components/CardDesafio";
import { Menu } from "../components/Menu";
import Footer from "../components/Footer";
import FiltroPesquisa from "../components/FiltroPesquisa";
import TopRanking from "../components/TopRanking";
import { PaginationComponent } from "../components/PaginationComponent";
import React from 'react';

interface Desafio extends CardDesafioProps { }

export default function Home() {
    const [cards, setCards] = useState<Desafio[]>([]);
    const navigate = useNavigate()
    const [page, setPage] = useState(1)

    useEffect(() => {
        axios.get(`http://localhost:3333/api/desafio?page=${page}`)
            .then((response) => {
                setCards(response.data);
            })
            .catch((err) => {
                console.error("ops! ocorreu um erro" + err);
            });
    }, [page]);

    return (
        <>
            <Menu />

            <div className="overflow-y-scroll overflow-x-hidden flex w-auto h-[90.3vh] flex-col items-center">
                <div className="flex justify-between">
                    <div className=" w-[25vw] h-full bg-zinc-800  ">
                        <div className="flex justify-center">
                            <FiltroPesquisa/>
                        </div>

                        <div className="flex justify-center items-start">
                            <TopRanking/>
                        </div>
                    </div>
                    <div className=" px-6 py-6 flex flex-col items-center w-[80vw]">
                        <div className="m-6 inline-flex items-center">
                            <input type="text" name="search" className="bg-[#4F545C] w-[800px] py-3 px-4 rounded-[14px] text-sm placeholder:text-zinc-400" placeholder="Pesquise um desafio" />
                            <MagnifyingGlass size={28} className="text-[#B9BBBE] right-3 -translate-x-11" />

                            <button onClick={() => navigate("/cadastrar-desafio")} className="bg-[#4F545C] text-white px-2 py-2 rounded-3xl hover:bg-slate-100 hover:text-[#4F545C] delay-200">
                                <Plus size={32} />
                            </button>

                        </div>

                        <div className="w-[80vw] flex flex-wrap items-center justify-center overflow-auto mb-14">
                            {
                                cards.map((card) => {
                                    return (
                                        <button onClick={() => navigate("/Desafio/" + card.id)} key={card.id} >
                                            <CardDesafio data={card} />
                                        </button>
                                    )
                                })
                            }
                             
                        </div>
                        <PaginationComponent setPage={setPage}/>
                    </div>
                    
                </div>
                <Footer />
            </div>

        </>
    )
}