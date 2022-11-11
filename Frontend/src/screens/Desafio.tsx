import axios from "axios";
import { DotsThreeOutline } from "phosphor-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BotaoDesafio } from "../components/BotaoDesafio";
import { CardDesafioProps } from "../components/CardDesafio";
import { CardPerfil } from "../components/CardPerfil";
import Footer from "../components/Footer";
import { Menu } from "../components/Menu";
import { useGlobal } from "../Context/globalContext";
import React from 'react';


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
                <p className="upercase text-[0.8rem] text-indigo-300 " title="Tags do desafio">#{tag.nome}</p>

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

            <div className="mt-[4rem] max-w-xl flex flex-row mx-auto bg-zinc-700 text-white rounded-lg shadow-lg overflow-hidden xl:max-w-4xl " >
                <div className="xl:flex w-full">
                    <div className="xl:shrink-0 relative">
                        <img className="h-[300px] w-full object-cover xl:h-full xl:w-[300px] shadow-inner shadow-black" src={/* padrao.includes(desafio?.capa) ?  */'../../imgDesafio.jpg' /* : desafio?.capa */} alt="" />
                        <img
                            className="absolute bottom-3 right-3"
                            src={desafio?.nivel ? iconLevel() : '../../default-icon.svg'}
                            alt="" />
                    </div>
                    <div className="relative flex flex-col p-6">
                        <div className="uppercase tracking-wide text-lg font-black">{desafio?.nome}</div>
                        <p className="block my-2 text-sm leading-tight font-light text-justify text-white">{desafio?.descricao}</p>

                        <div className="absolute bottom-4">
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
                    : null
                }
            </div>

            <div className="flex flex-col items-center xl:max-w-4xl mx-auto bg-zinc-700/25 justify-center rounded-sm mt-3">
                <p className="text-white text-xl font-black my-2">Soluções</p>
            </div>

            <Footer />
        </>


    )
}