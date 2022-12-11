import { Menu } from "../components/Menu";
import React, { FC, useEffect, useState } from 'react';
import Footer from "../components/Footer";
import { initialvalueMyRanking, RankingProps } from "../api/modules/Ranking";
import { Avatar } from "@mui/material";
import axios from "axios";
import { PaginationComponent } from "../components/PaginationComponent";
import { useFormik } from "formik";

export default function Ranking() {
    const [infoTable, setInfoTable] = useState<RankingProps[]>([])
    const [myRanking, setMyRanking] = useState<RankingProps>(initialvalueMyRanking)
    const myId = Number(localStorage.getItem('id'))
    const [page, setPage] = useState(1)

    const formik = useFormik({
        initialValues: {
            nome: ''
        },
        onSubmit: (values) => {
            console.log(values)
        }
    })

    useEffect(() => {

        async function allMembers() {
            try {
                const response = await axios.get(`http://localhost:3333/api/usuario?page=${page}&id=${myId}`)
                setMyRanking(response.data.curMember)
                setInfoTable(response.data.members)
                console.log(response.data.members)
            } catch (error) {
                console.log(error)
            }
        }

        allMembers()

        
        console.log(infoTable.filter((member) => {
            console.log('MyId', myId, 'Member.id', member.id)
            return (
                member.id === myId
            )
        }))
        

    }, [])



    return (
        <>
            <Menu />
            <div className='flex  min-h-[77vh]'>
                <div className='bg-zinc-800/70 mx-auto w-[45vw] self-center  m-16 py-4 rounded-md shadow-lg flex flex-col gap-3 shadow-black/25'>
                    <form onSubmit={formik.handleSubmit} className=' w-full p-2 px-5 flex justify-between text-white '>
                        <input
                            id="nome"
                            name="nome"
                            type="text"
                            placeholder="Nome do membro"
                            onChange={formik.handleChange}
                            required
                            className="bg-zinc-900 py-2 px-4 rounded-3xl text-sm placeholder:text-zinc-400 w-[80%] placeholder:px"
                        />

                        <button className='p-1 px-4 bg-indigo-500 rounded-md items-center gap-2 flex' type='submit'>
                            <p className='pl-1 font-black text-sm'>Pesquisar</p>
                            
                        </button>
                    </form>

                    <table className="table-auto text-white">
                        <thead >
                            <tr className="bg-zinc-700/90 h-10">
                                <th>#</th>
                                <th>Usuário</th>
                                <th>N° Soluções</th>
                                <th>Pontuação</th>
                            </tr>
                        </thead>

                        <tbody className="" >
                            <>
                                {
                                    infoTable.map((data: RankingProps) => {
                                        return (
                                            <tr key={data.id} className={`${(data.ranking % 2) === 0 && 'bg-zinc-700/30'} ${data.id === myId && 'bg-slate-700 border-collapse border border-slate-600'} h-16`}>
                                                <RowTable rowData={data} isMyRanking={data.id === myId ? true : false} />
                                            </tr>
                                        )
                                    })

                                }
                            </>
                            <>
                                {
                                    (infoTable.filter((member) => member.id === myId).length === 0) && (
                                        <tr key={myRanking.id} className={`bg-slate-700 border-collapse border border-slate-600 h-16`}>
                                            <RowTable rowData={myRanking} isMyRanking={true} />
                                        </tr>
                                    )
                                }

                            </>


                        </tbody>
                    </table>

                    <div className="flex justify-center">
                        <PaginationComponent page={1} setPage={() => { }} count={1} />
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

const RowTable = ({ rowData, isMyRanking }: { rowData: RankingProps, isMyRanking?: boolean }) => {
    return (

        <>
            <td className="text-center align-middle">{rowData.ranking}°</td>
            <td className="text-center align-center">
                <div className="flex items-center justify-start px-4">
                    <Avatar alt={rowData.nome} src={rowData.foto} sx={{ width: '6vh', height: '6vh', bgcolor: '#C0C0C0' }} />
                    <p className="ml-2">{isMyRanking ? 'Você' : rowData.nome}</p>
                </div>
            </td>
            <td className="text-center align-center">
                {rowData.solucoes}
            </td>
            <td className="text-center align-center">
                <div className="flex items-center justify-center w-full">
                    <p>{rowData.pontuacao}</p>
                    <img
                        src="/duck.png"
                        alt="logo pontuação"
                        className="w-10" />
                </div>
            </td>
        </>

    )
}
