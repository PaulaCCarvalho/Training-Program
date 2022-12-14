import { Avatar } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { initialvalueMyRanking, RankingProps } from '../api/modules/Ranking';
import { useGlobal } from '../Context/globalContext';

export default function TopRanking() {
    const {isAdmin} = useGlobal()
    const [rankingMembers, setRankingMembers] = useState<RankingProps[]>([])
    const [myRanking, setMyRanking] = useState<RankingProps>(initialvalueMyRanking)
    const myId = localStorage.getItem('id')
    useEffect(() => {
        async function top10Members() {
            try {
                const response = await axios.get(`http://localhost:3333/api/usuario?id=${myId}&isAdm=${0}`)
                if (myId !== null) {
                    setMyRanking(response.data.curMember)
                }
                setRankingMembers(response.data.members)

                console.log('members: ', response.data.members)
                console.log('myRanking', myRanking)
                console.log('myId', myId)

            } catch (error) {
                console.log(error)
            }
        }

        top10Members()
    }, [])

    return (

        <div className="ml-[45px] mr-10  my-6 w-60  border-zinc-400  border-solid border-2 rounded-lg">

            <div className="flex justify-center text-2xl font-black bg-zinc-700 text-white  py-4 rounded-t-lg ">
                Ranking
            </div>

            {
                rankingMembers.map((usuario: RankingProps) => {
                    return (
                        <div key={usuario.id} className="my-1 px-6 flex items-center justify-between text-white h-6 py-4">
                            <div>
                                <span>{usuario.ranking}. </span>
                                <Link to={`/perfil/${usuario.id}`} className='hover:text-indigo-300 '>
                                    {usuario.nome}
                                </Link>
                            </div>
                            <span>{usuario.pontuacao}</span>
                        </div>
                    )
                })
            }

            {
                myId !== null && !isAdmin &&
                (
                    <div className="flex justify-between text-sm font-black bg-zinc-700 text-white  py-4 rounded-b-lg">
                        <div className="text-start align-center">
                            <Link to={`/perfil/${myRanking.id}`} className="flex items-center justify-start px-4">
                                <Avatar alt={myRanking.nome} src={myRanking.foto} sx={{ width: '6vh', height: '6vh', bgcolor: '#C0C0C0' }} />
                                <p className="ml-2 hover:text-indigo-300">{myRanking.ranking}. Você</p>
                            </Link>
                        </div>
                        <div className="text-end px-3 align-center">
                            <div className="flex items-center justify-center w-full">
                                <p>{myRanking.pontuacao}</p>
                                <img
                                    src="/duck.png"
                                    alt="logo pontuação"
                                    className="w-7" />
                            </div>
                        </div>
                    </div>
                )
            }


        </div>
    )
}
