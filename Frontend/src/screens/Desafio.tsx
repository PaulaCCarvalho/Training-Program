import axios from "axios";
import { DotsThreeOutline } from "phosphor-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BotaoDesafio } from "../components/BotaoDesafio";
import { CardDesafioProps } from "../components/CardDesafio";
import Footer from "../components/Footer";
import { Menu } from "../components/Menu";
import { useGlobal } from "../Context/globalContext";


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
                console.log(response.data)
            } catch (error) {
                console.error("ops! ocorreu um erro" + error);

            }
        }
        getDesafio();


    }, []);

    const renderTags = () => {
        return (desafio?.tags.map((tag: { id: number, nome: string }) => {
            return (
                <div key={tag.id} className="px-6 py-1 border border-yellow-300 rounded-3xl gap-3 ">
                    <p className="text-yellow-300">{tag.nome}</p>
                </div>
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
            <div></div>
            <div className="my-[7.6rem] max-w-xl flex flex-row mx-auto bg-zinc-700 text-white rounded-xl shadow-lg overflow-hidden xl:max-w-6xl " >
                <div className="xl:flex w-full">
                    <div className="xl:shrink-0 relative">
                        <img className="h-[480px] w-full object-cover xl:h-full xl:w-[480px] shadow-inner shadow-black" src={/* padrao.includes(desafio?.capa) ?  */'../../imgDesafio.jpg' /* : desafio?.capa */} alt="" />
                        <img
                            className="absolute bottom-3 right-3"
                            src={desafio?.nivel ? iconLevel() : '../../default-icon.svg'}
                            alt="" />
                    </div>
                    <div className="p-6 ml-6">
                        <div className="uppercase tracking-wide text-xl text-white font-semibold my-4">{desafio?.nome}</div>
                        <p className="block mt-2  text-md leading-tight font-normal text-justify text-white">{desafio?.descricao}</p>
                        <div className="inline-flex px-6 py-1 border border-orange-500 rounded-3xl my-4">
                            <p className="text-orange-500">{desafio?.tema}</p>
                        </div>


                        <div className="flex flex-wrap w-[100%] gap-1.5">
                            {renderTags()}
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
            <Footer />
        </>


    )
}