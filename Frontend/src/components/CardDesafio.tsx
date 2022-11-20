import React from 'react';

export interface CardDesafioProps {
    id: number;
    nome: string;
    descricao: string;
    nivel: string;
    tema: string;
    capa: string;
    availabel: number;
    tags: [];
    imagens: [];
}

export function CardDesafio({ data }: { data: CardDesafioProps }) {

    function iconLevel() {
        if (data.nivel === 'facil') {
            return '../../easy.png';
        }
        if (data.nivel === 'medio') {
            return '../../medium.png';
        }
        if (data.nivel === 'dificil') {
            return '../../hard.png';
        }

    }

    const renderTags = () => {
        return (data.tags.map((tag: { id: number, nome: string }) => {
            return (
                <div key={tag.id}>
                    <p className="upercase text-[0.8rem] text-indigo-300 " title="Tags do desafio">#{tag.nome}</p>
                </div>
            )
        }))
    }

    const padrao = ['', null, undefined]

    return (
        <div className="h-[400px] relative m-6 bg-zinc-700/70 w-60  text-white rounded-lg shadow-lg shadow-black/30">
            <div className="relative">
                <img className="rounded-t-lg  " src={data.capa === '' ? '../../imgDesafio.jpg' : 'http://localhost:3333/api/img/' + data.capa} alt="" />
                <img
                    className="absolute bottom-3 right-3"
                    src={data.nivel ? iconLevel() : '../../default-icon.svg'}
                    alt="" />

            </div>
            <div className=" flex flex-col py-2 px-4 gap-4 items-start ">
                <span className="uppercase tracking-wide text-md text-orange-200/95  font-medium my-1">{data.nome}</span>
                <span className="overflow-hidden  max-h-14 text-justify overflow-ellipsis text-[0.8em] font-normal">{data.descricao}</span>
            </div>
            <div className='absolute bottom-2 w-full p-4  flex flex-col items-start'>
                <p className="text-orange-500 uppercase text-[0.9rem] font-black" title="Tema do desafio">{data.tema}</p>

                <div className="flex flex-wrap w-[100%] gap-1.5">
                    {renderTags()}
                </div>

            </div>
        </div>
    )
}