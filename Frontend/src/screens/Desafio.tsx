import { Avatar } from "@mui/material";
import axios from "axios";
import { ChatCircle, DotsThreeOutline, ThumbsDown, ThumbsUp } from "phosphor-react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BotaoDesafio } from "../components/BotaoDesafio";
import { CardDesafioProps } from "../components/CardDesafio";
import { CardPerfil, MoreOptions } from "../components/CardPerfil";
import ComentariosSolucao from "../components/ComentariosSolucao";
import Footer from "../components/Footer";
import { Menu } from "../components/Menu";
import { useGlobal } from "../Context/globalContext";
import React from 'react';
import BotaoSolucionarDesafio from "../components/BotaoSolucionarDesafio";
import { initValuesSolucao } from "../api/modules/SolucaoDesafio";


interface DesafioProps extends CardDesafioProps {

}

export function Desafio() {
    const {update, change} = useGlobal()
    const { id } = useParams();
    const [solucoes, setSolucoes] = useState<Object[]>([])
    const { isAdmin } = useGlobal()
    const navigate = useNavigate()

    const [desafio, setDesafio] = useState<DesafioProps>();

    useEffect(() => {

        async function getDesafio() {
            try {
                const response = await axios.get(`http://localhost:3333/api/desafio/${id}`)
                setDesafio(response.data);
            } catch (error: any) {
                if(error.response.status === 404){
                    navigate('/not-found')
                }
                console.error("ops! ocorreu um erro" + error);

            }
        }

        async function getSolutions() {
            try {
                const response = await axios.get(`http://localhost:3333/api/solucao?challenge_id=${id}&id=${localStorage.getItem('id')}`);
                setSolucoes(response.data.solutions)
            } catch (error: any) {
                console.error(error.response.status, error.response.data);

            }
        }

        getSolutions();
        getDesafio();

    }, [change]);

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

    const handleLiked = async(isLike: number, idSolution: number) => {
        try {
            await axios.post(`http://localhost:3333/api/like`, {
                member: localStorage.getItem('id'),
                ref: idSolution,
                positive: isLike,
            })
            

           update();

        } catch (error: any) {
            console.error(error.response.status, error.response.data);
        }
    }

    const isMySolution = (solucao: any) => {
        if (localStorage.getItem('id') === String(solucao.idMember))
            return <MoreOptions solucao={solucao} update={update} challenge_id={id}/>
    }

    const handleNota = (nota: number) => {

        switch (nota){
            
            case 0:
                return ['Solução errada', 'bg-red-500'];
            case 1:
                return ['Solução parcial','bg-orange-500'];
            case 2:
                return ['Solução correta','bg-lime-600' ];
            default:
                return ['Não avaliado','bg-indigo-500'];
        }
    }


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
                        <BotaoSolucionarDesafio update={update} challenge_id={Number(id)} />
                    </div>


                }
            </div>

            <div className="flex flex-col items-center p-4 xl:max-w-4xl mx-auto bg-zinc-700/25  rounded-b-md mb-[4rem] h-auto">
                <p className="text-white text-xl font-black mt-4 justify-center">Soluções</p>

                {
                    solucoes?.map((solucao: any) => {
                        const [nota, corNota] = handleNota(solucao.nota);
                        return (
                            <div key={solucao.id} className="m-4 p-2 flex flex-col w-full bg-zinc-700 text-white rounded-md shadow-md shadow-black/25 h-auto ">

                                <div className="flex justify-between w-auto mx-2 border-b-[1.5px] border-zinc-500 p-1 pbl-2 ">
                                    <Link to={`/perfil/${solucao.idMember}`} className="flex items-center gap-2">
                                        <Avatar alt={solucao.nome} src={solucao.foto} sx={{ width: '5vh', height: '5vh', bgcolor: '#C0C0C0' }} />
                                        <p className="text-sm font-black ">{solucao.nome}</p>
                                    </Link>

                                    <div className="">
                                        {isMySolution(solucao)}
                                    </div>

                                </div>

                                <p className="my-1 px-3 text-[0.75rem] font-light text-justify py-2">{solucao.descricao}
                                </p>

                                <div className="flex relative gap-1 items-center px-3">
                                    <a target={"_blank"} href={solucao.linkCode} className="flex mr-3 gap-2 items-center bg-zinc-600 hover:bg-slate-600/50 p-2 rounded-md" title="Link da Solução">
                                        <img src="../../github.svg" alt="logo github" className="w-[1.5vw]" />
                                        <p className="font-black text-sm text-neutral-100">GitHub</p>
                                    </a>


                                    <button onClick={() => handleLiked(1, solucao.id)} className={`hover:bg-zinc-600 p-2 rounded-md`} title="Gostei">
                                        <ThumbsUp size={20} className="text-indigo-300" weight={solucao.hasLiked === 1 ? "fill" : 'regular' } />
                                    </button>

                                    <p className="font-black text-sm text-neutral-100">{solucao.likes}</p>

                                    <button onClick={() => handleLiked(-1, solucao.id)} className={`hover:bg-zinc-600 p-2 rounded-md mr-3`} title="Não gostei">
                                        <ThumbsDown size={20} className="text-indigo-300"  weight={solucao.hasLiked === -1 ? "fill" : 'regular' }/>
                                    </button>

                                    <Link to={`/solucao/${solucao.id}`} className="hover:bg-zinc-600 p-2 rounded-md" title="Ver comentários">
                                        <ChatCircle size={20} className="text-indigo-300" />
                                    </Link>
   

                                    <div className={`absolute bottom-1 right-2 flex ml-3 p-2 bg-indigo-500 rounded-md items-center ${corNota}`}>
                                        <p className="font-black text-[0.75rem] text-neutral-100">{nota}</p>
                                    </div>

                                </div>

                            </div>
                        )
                    })
                }


            </div>

            <Footer />
        </>


    )
}