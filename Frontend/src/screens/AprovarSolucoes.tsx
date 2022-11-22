
import { Avatar, dividerClasses } from '@mui/material'
import axios from 'axios'
import { useFormik } from 'formik'
import { HandbagSimple, Trash } from 'phosphor-react'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Solucao } from '../api/modules/SolucaoDesafio'
import Footer from '../components/Footer'
import { Menu } from '../components/Menu'
import { useGlobal } from '../Context/globalContext'

export function AprovarSolucoes() {
    const { change, update } = useGlobal()
    const [solucoes, setSolucoes] = useState<Solucao[]>([]) 

    const formik = useFormik({
        initialValues: {
            nota: '',
            idSolution: 0
        }, 
        onSubmit: async(values) => {
            if(values.nota !== ''){
                const [nota,id] = values.nota.split('-')
                console.log(nota, id)
                try {
                    console.log('Abadsdssd')
                    await axios.put(`http://localhost:3333/api/solucao`, {
                        nota: nota,
                        id: id,
                    })
                    console.log('despois')
    
                    update()
                } catch (error: any) {
                    console.log(error.response)
                }

            }

        }

    })

    useEffect(() => {

        async function getSolutions() {
            try {
                const response = await axios.get(`http://localhost:3333/api/solucao?nota=-1`);
                setSolucoes(response.data.solutions)

            } catch (error: any) {
                console.error(error.response.status, error.response.data);

            }
        }

        getSolutions();

    }, [change])



    return (
        <>
            <Menu />
            <div className='flex  min-h-[77vh]'>
                <div className='bg-zinc-800/70 mx-auto w-[45vw] self-center  m-16 p-4 rounded-md shadow-lg flex flex-col gap-3 shadow-black/25'>


                    {solucoes.length > 0 ?

                        solucoes.map((solucao: any) => {
                            return (<section key={solucao.id} className='flex mx-auto flex-col items-center  '>
                                <div className=" flex px-2 flex-row w-[40vw] bg-zinc-700 text-white rounded-md shadow-lg shadow-black/25 overflow-hidden">
                                    <div className="flex w-full">

                                        <div className="flex-col p-2 w-[40vw]">

                                            <div className='flex justify-between py-2'>
                                                <div className="flex flex-col">
                                                    <Link to={`/perfil/${solucao.idMember}`} className="text-white font-black text-md ">{solucao.nome}</Link>
                                                    <Link to={`/desafio/${solucao.idSolucao}`} className="uppercase tracking-wide text-sm text-orange-200/95 font-medium my-1">Dialog Responsivo</Link>
                                                </div>
                                                <Link to={`/perfil/${solucao.idMember}`}>
                                                    <Avatar alt={solucao.nome} src='' sx={{ width: '7vh', height: '7vh', bgcolor: '#C0C0C0' }} />
                                                </Link>

                                            </div>

                                            <div>

                                                <p className="my-1 text-[0.75rem] font-light text-justify mr-2 border-b-2 border-zinc-500 py-2">{solucao.descricao}</p>
                                            </div>

                                            <div className="flex gap-2 items-center justify-between">
                                                <a href={solucao.linkCode} target={'_blank'} className="flex gap-2 items-center bg-zinc-600 hover:bg-indigo-500/20 p-2 rounded-md" title="Link da Solução">
                                                    <img src="../../github.svg" alt="logo github" className="w-[1.5vw]" />
                                                    <p className="font-black text-sm text-neutral-100">GitHub</p>
                                                </a>


                                                <form onSubmit={formik.handleSubmit} className='bg-zinc-700 rounded-b-md p-2 flex items-center justify-end text-white  '>
                                                    <div className='m-1'> 
                                                        <select name="nota" id="nota" defaultValue={''}  onChange={formik.handleChange} className='bg-zinc-900 py-2 px-4 rounded-md text-sm  w-[12vw] placeholder:text-zinc-400  placeholder:px'>
                                                            <option value='' disabled>Avaliar solução</option>
                                                            <option value={`0-${solucao.id}`}>Solução errada</option>
                                                            <option value={`1-${solucao.id}`}>Solução parcial</option>
                                                            <option value={`2-${solucao.id}`}>Solução correta</option>
                                                        </select>
                                                    </div>

                                                    <div className='flex m-1 justify-center items-center'>
                                                        <button type='submit' className='py-2 px-4 bg-indigo-500 rounded-md items-center gap-2 flex justify-center' >
                                                            <p className='pl-1 font-black text-center text-sm'>Salvar</p>
                                                        </button>
                                                    </div>
                                                </form>

                                            </div>

                                        </div>
                                    </div>
                                </div>


                            </section>
                            )
                        })
                        :
                        <>
                        <div >
                            <h3 className='text-center font-black  text-white text-xl my-4'>Ainda não há soluções para serem aprovadas</h3>
                        </div>
                        </>}

                </div>

            </div>



            <Footer />
        </>
    )
}

