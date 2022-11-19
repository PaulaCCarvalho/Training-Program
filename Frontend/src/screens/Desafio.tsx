import { Avatar } from "@mui/material";
import axios from "axios";
import { ChatCircle, DotsThreeOutline, ThumbsDown, ThumbsUp } from "phosphor-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BotaoDesafio } from "../components/BotaoDesafio";
import { CardDesafioProps } from "../components/CardDesafio";
import { CardPerfil } from "../components/CardPerfil";
import ComentatiosSolucao from "../components/ComentariosSolucao";
import Footer from "../components/Footer";
import { Menu } from "../components/Menu";
import { useGlobal } from "../Context/globalContext";
import React from 'react';
import BotaoSolucionarDesafio from "../components/BotaoSolucionarDesafio";


interface DesafioProps extends CardDesafioProps {

}

export function Desafio() {
    const { id } = useParams();
    const padrao = ['', null, undefined];

    const [desafio, setDesafio] = useState<DesafioProps>();

    useEffect(() => {

        async function getDesafio() {
            try {
                const response = await axios.get(`http://localhost:3333/api/desafio/${id}`)
                setDesafio(response.data);
            } catch (error) {
                console.error("ops! ocorreu um erro" + error);

            }
        }
        getDesafio();

    }, []);

    const renderTags = () => {
        return (desafio?.tags.map((tag: { id: number, nome: string }) => {
            return (
                <p key={tag.id} className="upercase text-[0.8rem] text-indigo-300 " title="Tags do desafio">#{tag.nome}</p>

            )
        }))
    }


    function iconLevel() {
        if (desafio?.nivel === 'facil') {
            return '../../easy.png';
        }
        if (desafio?.nivel === 'medio') {
            return '../../medium.png';
        }
        if (desafio?.nivel === 'dificil') {
            return '../../hard.png';
        }
    }

    const { isAdmin } = useGlobal()
    return (
        <>
            <Menu />

            <div className="relative mt-[2rem] max-w-xl h-auto flex flex-row mx-auto bg-zinc-700/95 text-white rounded-t-md shadow-lg shadow-black/60s xl:max-w-4xl " >
                <div className="xl:flex w-full">
                    <div className="xl:shrink-0 relative">
                        <img className="h-[300px] rounded-tl-md w-full object-cover xl:h-full xl:w-[300px] shadow-inner shadow-black" src={/* padrao.includes(desafio?.capa) ?  */'../../imgDesafio.jpg' /* : desafio?.capa */} alt="" />
                        <img
                            className="absolute bottom-3 right-3"
                            src={desafio?.nivel ? iconLevel() : '../../default-icon.svg'}
                            alt="" />
                    </div>
                    <div className=" flex flex-col p-6">
                        <div className="uppercase tracking-wide text-lg font-black">{desafio?.nome}</div>
                        <p className="block my-2 text-sm leading-tight font-light text-justify text-white">{desafio?.descricao}</p>

                        <div className="my-2">
                            <p className="text-orange-500 my-2 uppercase text-[0.9rem] font-black" title="Tema do desafio">{desafio?.tema}</p>

                            <div className="flex flex-wrap w-[100%] gap-1.5">
                                {renderTags()}
                            </div>
                        </div>
                    </div>
                </div>

                {isAdmin ?
                    <div className="inline-flex justify-end items-start p-3 ">
                        <BotaoDesafio key={desafio?.id} idParam={id} />
                    </div>
                    :

                    <div className="absolute bottom-0 right-0 p-3 ">
                        <BotaoSolucionarDesafio challenge_id={Number(id)}/>
                    </div>


                }
            </div>

            <div className="flex flex-col items-center xl:max-w-4xl mx-auto bg-zinc-700/25  rounded-b-md mb-[4rem] h-auto">
                <p className="text-white text-xl font-black mt-4 justify-center">Soluções</p>

                <div className="m-4 p-2 flex flex-col w-auto bg-zinc-700 text-white rounded-md shadow-md shadow-black/25 h-auto ">

                    <div className=" w-auto mx-2 border-b-[1.5px] border-zinc-500 p-1 pbl-2">
                        <button className="flex items-center gap-2">
                            <Avatar alt="Camila Azevedo" src='../../avatars/avatar001.png' sx={{ width: '5vh', height: '5vh', bgcolor: '#C0C0C0' }} />
                            <p className="text-sm font-black ">Camila Azevedo</p>
                        </button>

                    </div>


                    <p className="my-1 px-3 text-[0.75rem] font-light text-justify py-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis ab hic obcaecati laborum assumenda rem magni
                        perferendis animi dolorum dolorem omnis nesciunt eligendi, id ex laboriosam inventore, accusantium corrupti eum.
                    </p>

                    <div className="flex relative gap-1 items-center px-3">
                        <button className="flex mr-3 gap-2 items-center bg-zinc-600 hover:bg-slate-600/50 p-2 rounded-md" title="Link da Solução">
                            <img src="../../github.svg" alt="logo github" className="w-[1.5vw]" />
                            <p className="font-black text-sm text-neutral-100">GitHub</p>
                        </button>


                        <button className="hover:bg-zinc-600 p-2 rounded-md" title="Gostei">
                            <ThumbsUp size={20} className="text-indigo-300" />
                        </button>

                        <p className="font-black text-sm text-neutral-100">14</p>

                        <button className="hover:bg-zinc-600 p-2 rounded-md mr-3" title="Não gostei">
                            <ThumbsDown size={20} className="text-indigo-300" />
                        </button>

                        <button className="hover:bg-zinc-600 p-2 rounded-md" title="Ver comentários">
                            <ChatCircle size={20} className="text-indigo-300" />
                        </button>

                        <div className="absolute bottom-1 right-2 flex ml-3 p-2 bg-indigo-500 rounded-md items-center">
                            <p className="font-black text-[0.75rem] text-neutral-100">Parcialmente Solucionado</p>
                        </div>

                    </div>

                </div>
            </div>

            <Footer />
        </>


    )
}