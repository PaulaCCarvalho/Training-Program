
import axios from 'axios'
import { DotsThreeVertical, Heart, PaperPlaneRight, PaperPlaneTilt, ThumbsDown, ThumbsUp } from 'phosphor-react'
import { FC, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Menu } from './Menu'
import React from 'react'
import { Avatar, createTheme, IconButton, Popover, ThemeProvider, Typography } from '@mui/material'
import { useFormik } from 'formik'
import Footer from './Footer'

export default function ComentatiosSolucao() {
    const idParam = useParams()
    const [cards, setCards] = useState({
        id: 0,
        nome: '',
        descricao: '',
        nivel: '',
        tema: '',
        capa: '',
        availabel: 0,
        tags: [],
    });
    const formik = useFormik({
        initialValues: {
            comentário: ''
        },
        onSubmit: () => {

        }
    })

    useEffect(() => {
        axios.get(`http://localhost:3333/api/desafio/3`)
            .then((response) => {
                setCards(response.data)
            })
            .catch(() => console.log('Ops deu ruim!'))

    }, [])

    const renderTags = () => {
        return (cards.tags.map((tag: { id: number, nome: string }) => {
            return (
                <p className="upercase text-[0.65rem] text-indigo-300 "><i>#{tag.nome}</i></p>
            )
        }))
    }

    return (

        <>
            <Menu />

            <div className="relative my-16 w-[50vw] m-auto bg-zinc-700/50 rounded-b-md h-full flex flex-col items-center">
                <div className=" flex flex-row w-auto bg-zinc-700 text-white rounded-t-md shadow-lg shadow-black/25 overflow-hidden">
                    <div className="flex w-full">
                        <div className="shrink-0 relative rounded-l-md">
                            <img className="w-full object-cover  xl:h-full xl:w-40" src={/* padrao.includes(desafio?.capa) ?  */'../../imgDesafio.jpg' /* : desafio?.capa */} alt="" />
                            <div className='w-full pt-24 pb-2 px-2 bg-desafio-gradient absolute bottom-0 left-0 right-0'>
                                <p className="uppercase text-orange-200/95 text-sm mt-2">{cards.tema}</p>

                                <div className="flex flex-wrap gap-1.5">
                                    {renderTags()}
                                </div>

                            </div>
                        </div>

                        <div className="flex-col p-2 w-[38vw]">
                            <div className="flex justify-between ">
                                <a href="https://google.com" className="uppercase tracking-wide text-md text-white font-medium my-1">{cards.nome}</a>
                                <div className="flex p-1 bg-indigo-500 rounded-md items-center">
                                    <p className="font-black text-[0.75rem] text-neutral-100 ">Parcialmente Solucionado</p>
                                </div>
                            </div>

                            <div>
                                <p className="text-orange-200/95">Solução</p>
                                <p className="my-1 text-[0.75rem] font-light text-justify mr-2 border-b-2 border-zinc-500 py-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis ab hic obcaecati laborum assumenda rem magni
                                    perferendis animi dolorum dolorem omnis nesciunt eligendi, id ex laboriosam inventore, accusantium corrupti eum.</p>
                            </div>

                            <div className="flex gap-2 items-center">
                                <button className="flex gap-2 items-center hover:bg-zinc-600 p-2 rounded-md" title="Link da Solução">
                                    <img src="../../github.svg" alt="logo github" className="w-[1.5vw]" />
                                    <p className="font-black text-sm text-neutral-100">GitHub</p>
                                </button>

                                <button className="hover:bg-zinc-600 p-2 rounded-md" title="Gostei">
                                    <ThumbsUp size={20} className="text-indigo-300" />
                                </button>

                                <p className="font-black text-sm text-neutral-100">14</p>

                                <button className="hover:bg-zinc-600 p-2 rounded-md" title="Não gostei">
                                    <ThumbsDown size={20} className="text-indigo-300" />
                                </button>

                            </div>

                        </div>
                    </div>
                </div>

                <div className='relative flex items-center gap-1 w-full border-y-[1px] px-3 py-2 border-zinc-800'>
                    <div className="p-2">
                        <Avatar alt={'Carla Martins'} src='' sx={{ width: '7vh', height: '7vh', bgcolor: '#C0C0C0' }} />
                    </div>

                    <div className='p-2'>
                        <p className="font-black text-[0.85em] text-indigo-300">Carla Martins
                            <p className="font-light text-[0.85em] text-justify text-neutral-200">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam fuga, sed odit vitae esse cupiditate sequi voluptate, velit maiores ipsa voluptates,
                                saepe eius molestiae iusto quas dignissimos quaerat placeat sunt!
                            </p>
                        </p>
                    </div>

                    <div className='flex flex-col p-2 items-center '>
                        <button className="p-[6px]" title="Gostei">
                            <Heart size={35} className="text-indigo-300 bg-indigo-100/10 hover:bg-indigo-200/20 rounded-full p-2 shadow-md shadow-black/25" />
                        </button>

                        <p className="font-black text-[0.6em] text-neutral-100">14</p>
                    </div>

                    <div className='absolute top-0 right-0'>
                        <MoreOptions />
                    </div>
                </div>

                <div className='bg-zinc-700 w-full rounded-b-md p-2 px-5 flex justify-between text-white '>
                    <input
                        id="comentario"
                        name="comentario"
                        type="text"
                        placeholder="Adicionar comentário"
                        onChange={formik.handleChange}
                        required
                        className="bg-zinc-900 py-2 px-4 rounded-3xl text-sm placeholder:text-zinc-400 w-[80%] placeholder:px"
                    />

                    <button className='p-1 px-4 bg-indigo-500 rounded-md items-center gap-2 flex'>
                        <p className='pl-1 font-black text-sm'>Enviar</p>
                        <PaperPlaneTilt size={20} />
                    </button>
                </div>
            </div>
            <Footer />
        </>
    )
}

const MoreOptions: FC = () => {
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    }

    const handleClose = () => {
        setAnchorEl(null);
    }

    const darkTheme = createTheme({
        palette: {
            background: {
                paper: '#111',
            },
            mode: 'dark'
        },
    });

    return (

        <ThemeProvider theme={darkTheme} >
            <button aria-describedby={id} onClick={handleClick} className="p-1">
                <DotsThreeVertical size={20} className='text-white rounded-full hover:bg-indigo-100/10 ' />
            </button>

            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                <div className='flex flex-col'>
                    <button className='hover:bg-indigo-100/10 p-1 px-2'>
                        <p className='font-normal text-sm'>Editar Comentário</p>
                    </button>
                    <button className='hover:bg-indigo-100/10 p-1'>
                        <p className='font-normal text-sm'>Apagar Comentário</p>
                    </button>
                </div>
            </Popover>
        </ThemeProvider>

    )
}