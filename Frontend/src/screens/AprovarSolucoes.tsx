
import { Avatar } from '@mui/material'
import { Trash } from 'phosphor-react'
import React from 'react'
import Footer from '../components/Footer'
import { Menu } from '../components/Menu'

export function AprovarSolucoes() {
    return (
        <>
            <Menu />
            <div className='flex '>
                <div className='bg-zinc-800/70 mx-auto w-[45vw] m-16 p-4 rounded-md shadow-lg flex flex-col gap-3 shadow-black/25'>
                    <section className='flex mx-auto flex-col items-center  '>
                        <div className=" flex px-2 flex-row w-[40vw] bg-zinc-700 text-white rounded-md shadow-lg shadow-black/25 overflow-hidden">
                            <div className="flex w-full">

                                <div className="flex-col p-2 w-[40vw]">

                                    <div className='flex justify-between py-2'>
                                        <div className="flex flex-col">
                                            <p className="text-white font-black text-md ">Camila Martins</p>
                                            <a href="https://google.com" className="uppercase tracking-wide text-sm text-orange-200/95 font-medium my-1">Dialog Responsivo</a>
                                        </div>

                                        <Avatar alt={'Carla Martins'} src='' sx={{ width: '7vh', height: '7vh', bgcolor: '#C0C0C0' }} />

                                    </div>

                                    <div>

                                        <p className="my-1 text-[0.75rem] font-light text-justify mr-2 border-b-2 border-zinc-500 py-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis ab hic obcaecati laborum assumenda rem magni
                                            perferendis animi dolorum dolorem omnis nesciunt eligendi, id ex laboriosam inventore, accusantium corrupti eum.</p>
                                    </div>

                                    <div className="flex gap-2 items-center justify-between">
                                        <button className="flex gap-2 items-center bg-zinc-600 hover:bg-indigo-500/20 p-2 rounded-md" title="Link da Solução">
                                            <img src="../../github.svg" alt="logo github" className="w-[1.5vw]" />
                                            <p className="font-black text-sm text-neutral-100">GitHub</p>
                                        </button>


                                        <div className='bg-zinc-700 rounded-b-md p-2 flex items-center justify-end text-white  '>
                                            <div className='m-1'>
                                                <select name="avaliar" id="avaliar" defaultValue={''} className='bg-zinc-900 py-2 px-4 rounded-md text-sm  w-[12vw] placeholder:text-zinc-400  placeholder:px'>
                                                    <option value='' disabled>Avaliar solução</option>
                                                    <option value="0">Solução errada</option>
                                                    <option value="1">Solução parcial</option>
                                                    <option value="2">Solução correta</option>
                                                </select>
                                            </div>

                                            <div className='flex m-1 justify-center items-center'>
                                                <button className='py-2 px-4 bg-indigo-500 rounded-md items-center gap-2 flex justify-center'>
                                                    <p className='pl-1 font-black text-center text-sm'>Salvar</p>
                                                </button>
                                            </div>
                                        </div>

                                    </div>

                                </div>
                            </div>
                        </div>


                    </section>


                </div>

            </div>



            <Footer />
        </>
    )
}

