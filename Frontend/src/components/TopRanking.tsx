import React from 'react';

export default function TopRanking() {

    const usuarios = [
        {nome: 'MarkesXd', pontuacao: 10102 },
        {nome: 'MarkesXd', pontuacao: 10102 },
        {nome: 'MarkesXd', pontuacao: 10102 },
        {nome: 'MarkesXd', pontuacao: 10102 },
        {nome: 'MarkesXd', pontuacao: 10102 },
        {nome: 'MarkesXd', pontuacao: 10102 },
        {nome: 'MarkesXd', pontuacao: 10102 },
        {nome: 'MarkesXd', pontuacao: 10102 },
        {nome: 'MarkesXd', pontuacao: 10102 },
        {nome: 'MarkesXd', pontuacao: 10102 }
        ]

    return (

        <div className="ml-[45px] my-6 w-64  border-zinc-400  border-solid border-2 rounded-lg">

            <div className="flex justify-center text-3xl font-semibold bg-zinc-700 text-white  py-4 rounded-t-lg ">
                Ranking
            </div>

            {
                usuarios.map((usuario, pos) => {
                    return(
                        <div key={pos} className="my-1 px-6 flex items-center justify-between text-white h-6 py-4">
                            <span>{pos+1}. {usuario.nome} </span> <span>{usuario.pontuacao}</span>
                        </div>
                    )
                })
            }


        </div>
    )
}
