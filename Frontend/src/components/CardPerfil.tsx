import { ChatCircle, DotsThreeVertical, ThumbsDown, ThumbsUp, X } from "phosphor-react";
import { Link } from "react-router-dom";
import React, { FC, useState } from 'react';
import { Alert, AlertColor, createTheme, Popover, Snackbar, ThemeProvider } from "@mui/material";
import * as Dialog from '@radix-ui/react-dialog';
import { useFormik } from "formik";
import { initValuesSolucao } from "../api/modules/SolucaoDesafio";
import axios from "axios";

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

export function CardPerfil({ data }: { data: any }) {

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
                <p className="upercase text-[0.65rem] text-indigo-300 "><i>#{tag.nome}</i></p>
            )
        }))
    }

    const padrao = ['', null, undefined]

    return (
        <div className="my-4 flex flex-row w-auto bg-zinc-700 text-white rounded-md shadow-md shadow-black/25  overflow-hidden"  >
            <div className="flex">
                <div className="shrink-0 relative rounded-l-sm">
                    <img className="w-full object-cover  xl:h-full xl:w-40" src={/* padrao.includes(desafio?.capa) ?  */'../../imgDesafio.jpg' /* : desafio?.capa */} alt="" />
                    <div className='w-full pt-24 pb-2 px-2 bg-desafio-gradient absolute bottom-0 left-0 right-0'>
                        <p className="uppercase text-orange-200/95 text-sm mt-2">{data.tema}</p>

                        <div className="flex flex-wrap gap-1.5">
                            {renderTags()}
                        </div>

                    </div>
                </div>
                <div className="flex-col p-2 w-[40vw]">
                    <div className="flex justify-between">
                        <div className="flex flex-col">
                            <a href="https://google.com" className="uppercase tracking-wide text-md text-white font-medium my-1">{data.nome}</a>
                            <p className="text-orange-200/95" >Solução</p>
                        </div>
                        <div className="flex flex-row h-[50%]">
                            <div className="flex text-center p-1 mx-1 bg-indigo-500 w rounded-md items-center">
                                <p className="font-black text-[0.75rem] text-neutral-100 ">Parcialmente Solucionado</p>
                            </div>
                            <div className="self-start">
                                <MoreOptions />

                            </div>
                        </div>
                    </div>

                    <div>
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

                        <Link to={`/solucao/${3}`} className="hover:bg-zinc-600 p-2 rounded-md" title="Ver comentários">
                            <ChatCircle size={20} className="text-indigo-300" />
                        </Link>

                    </div>

                </div>
            </div>


        </div>
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
                    <EditarSolucao />

                    <button className='hover:bg-indigo-100/10 p-1'>
                        <p className='font-normal text-sm'>Apagar Solução</p>
                    </button>
                </div>
            </Popover>
        </ThemeProvider>

    )
}

const EditarSolucao: FC = () => {
    const [openAlert, setOpenAlert] = useState({
        isOpen: false,
        type: 'success',
        msg: 'Solução adicionada com sucesso!'
    });

    const formik = useFormik({
        initialValues: initValuesSolucao,
        onSubmit: (values) => {
            try {
                // axios.post(`http://localhost:3333/api/solucao`, {
                //     linkCode: values.linkCode,
                //     descricao: values.descricao,
                //     challenge_id: challenge_id,
                //     member_id: Number(localStorage.getItem('id'))
                // })

                const alertPopup = {
                    isOpen: true,
                    type: 'success',
                    msg: 'Usuário cadastrado com sucesso!'
                }
                setOpenAlert(alertPopup);

            } catch (error: any) {
                const alertPopup = { isOpen: true, type: 'error', msg: 'Um erro inesperado ocorreu, tente novamente mais tarde.' }
                if (error.response.status === 406) {
                    alertPopup.isOpen = true,
                        alertPopup.type = 'error',
                        alertPopup.msg = 'Dados inválidos!'
                    setOpenAlert(alertPopup);
                } else {
                    setOpenAlert(alertPopup),
                        console.error(error.response.status, error.response.data);
                }

            }
        }
    })


    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        setOpenAlert({ ...openAlert, isOpen: false });

    };

    return (
        <>
            <Dialog.Root>
                <Dialog.Trigger className='hover:bg-indigo-100/10 p-1 px-2'>
                    <p className='font-normal text-sm'>Editar Solução</p>
                </Dialog.Trigger>

                <Dialog.Portal>
                    <Dialog.Overlay className="bg-black/70 inset-0 fixed " />

                    <Dialog.Content className="fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/25">
                        <Dialog.Title className="relative text-2xl font-black text-center">
                            Editar solução
                            <Dialog.Close className='absolute -top-4 -right-7 hover:bg-zinc-700 hover:rounded-full  p-2 '>
                                <X size={20} />
                            </Dialog.Close>
                        </Dialog.Title>

                        <Dialog.Description className="py-4 text-sm font-light text-justify">
                            Preencha os campos abaixo para alterar sua solução.
                        </Dialog.Description>


                        <form onSubmit={formik.handleSubmit} className="mt-2 flex flex-col">
                            <div className="flex flex-col gap-1">
                                <label htmlFor="titulo">Comentário</label>
                                <textarea
                                    id="descricao"
                                    name='descricao'
                                    placeholder="Pequeno comentário sobre a solução..."
                                    onChange={formik.handleChange}
                                    className="bg-zinc-900 py-4 px-4 rounded text-sm placeholder:text-zinc-500 "
                                    value={formik.values.descricao} />


                                <label htmlFor="url" aria-required className='pt-3 flex gap-1'>Link do Repositorio do GitHub <p className="text-red-500">*</p> </label>
                                <input
                                    id="linkCode"
                                    name="linkCode"
                                    type="text"
                                    placeholder="https://github.com/membro/repositorio"
                                    onChange={formik.handleChange}
                                    value={formik.values.linkCode}
                                    required
                                    className="bg-zinc-900 py-4 px-4 rounded text-sm placeholder:text-zinc-500" />
                            </div>

                            <footer className="mt-4 flex gap-4 justify-between ">
                                <Dialog.Close className="bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600 items-center flex">
                                    Cancelar
                                </Dialog.Close>

                                <button
                                    type="submit"
                                    className="bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600"
                                >
                                    Salvar

                                </button>

                            </footer>
                        </form>
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root>

            <Snackbar open={openAlert.isOpen} autoHideDuration={4000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
                <Alert onClose={handleClose} severity={openAlert.type as AlertColor} sx={{ width: '100%' }}>
                    {openAlert.msg}
                </Alert>
            </Snackbar>
        </>
    )
}

const ApagarSolucao: FC = () => {
    return (
        <>
            <Dialog.Root>
                <Dialog.Trigger className='hover:bg-indigo-100/10 p-1 px-2'>
                    <p className='font-normal text-sm'>Editar Solução</p>
                </Dialog.Trigger>

                <Dialog.Portal>
                    <Dialog.Overlay className="bg-black/70 inset-0 fixed " />

                    <Dialog.Content className="fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/25">
                        <Dialog.Title className="relative text-2xl font-black text-center">
                            Editar solução
                            <Dialog.Close className='absolute -top-4 -right-7 hover:bg-zinc-700 hover:rounded-full  p-2 '>
                                <X size={20} />
                            </Dialog.Close>
                        </Dialog.Title>

                        <Dialog.Description className="py-4 text-sm font-light text-justify">
                            Preencha os campos abaixo para alterar sua solução.
                        </Dialog.Description>




                        <footer className="mt-4 flex gap-4 justify-between ">
                            <Dialog.Close className="bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600 items-center flex">
                                Cancelar
                            </Dialog.Close>

                            <button
                                type="submit"
                                className="bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600"
                            >
                                Salvar

                            </button>

                        </footer>
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root>
        </>
    )
}