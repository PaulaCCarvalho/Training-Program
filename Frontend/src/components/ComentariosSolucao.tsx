
import axios from 'axios'
import { DotsThreeVertical, Heart, PaperPlaneRight, PaperPlaneTilt, ThumbsDown, ThumbsUp, X } from 'phosphor-react'
import { FC, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Menu } from './Menu'
import React from 'react'
import { Alert, AlertColor, Avatar, createTheme, IconButton, Popover, Snackbar, ThemeProvider, Typography } from '@mui/material'
import { useFormik } from 'formik'
import Footer from './Footer'
import { initValueSolutionComment, initValuesSolucao, Solucao, SolutionComment } from '../api/modules/SolucaoDesafio'
import { Desafio, initValuesDesafio } from '../api/modules/Desafios'
import { useGlobal } from '../Context/globalContext'
import { MoreOptions } from './CardPerfil'
import * as Dialog from '@radix-ui/react-dialog';


export default function ComentariosSolucao() {
    const idParam = useParams()
    const navigate = useNavigate()
    const { change, update } = useGlobal()
    const [desafio, setDesafio] = useState<Desafio>(initValuesDesafio);
    const [card, setCard] = useState<Solucao>(initValuesSolucao);
    const [comments, setComments] = useState<SolutionComment[]>([])
    const formik = useFormik({
        initialValues: initValueSolutionComment,
        onSubmit: async (values) => {

            try {
                await axios.post(`http://localhost:3333/api/comentario`, {
                    id_solution: card.id,
                    id_member: localStorage.getItem('id'),
                    body: values.body,

                })

                update()

            } catch (error: any) {
                console.log(error.response)
            }

        }
    })

    useEffect(() => {

        async function getSolution() {
            try {
                const resSolucao = await axios.get(`http://localhost:3333/api/solucao/${idParam.id}`)
                setCard(resSolucao.data)

                try {
                    const resDesafio = await axios.get(`http://localhost:3333/api/desafio/${resSolucao.data.challenge_id}`)
                    setDesafio(resDesafio.data)
                } catch (error: any) {
                    if (error.response.status === 404) {
                        navigate('/not-found');
                    } else {
                        console.log(error);
                    }
                }

                try {
                    const resComments = await axios.get(`http://localhost:3333/api/comentario?id_solution=${idParam.id}&id=${localStorage.getItem('id')}`)
                    setComments(resComments.data.comments)
                } catch (error: any) {
                    if (error.response.status === 404) {
                        navigate('/not-found');
                    } else {
                        console.log(error);
                    }
                }

            } catch (error: any) {
                if (error.response.status === 404) {
                    navigate('/not-found');
                } else {
                    console.log(error)
                }
            }

        }


        getSolution()

    }, [change])

    const renderTags = () => {
        return (desafio.tags.map((tag: { id: number, nome: string }) => {
            return (
                <div key={tag.id}>
                    <p className="upercase text-[0.65rem] text-indigo-300 "><i>#{tag.nome}</i></p>
                </div>
            )
        }))
    }

    const handleNota = (nota: number) => {

        switch (nota) {

            case 0:
                return ['Solução errada', 'bg-red-500'];
            case 1:
                return ['Solução parcial', 'bg-orange-500'];
            case 2:
                return ['Solução correta', 'bg-lime-600'];
            default:
                return ['Não avaliado', 'bg-indigo-500'];
        }
    }

    const [nota, corNota] = handleNota(card.nota);

    const handleLikedSolucao = async (isLike: number, idSolution: number) => {
        try {
            await axios.post(`http://localhost:3333/api/like`, {
                member: localStorage.getItem('id'),
                ref: idSolution,
                positive: isLike,
            })


            update();

        } catch (error: any) {
            console.error(error.response.status, error.response.data);
        }
    }

    const isMyPerfil = (idMember: number) => {
        if (Number(localStorage.getItem('id')) === idMember) {
            return true;
        }
        return false;

    }
    return (

        <>
            <Menu />

            <div className="relative my-16 w-[50vw] m-auto bg-zinc-700/50 rounded-b-md h-full flex flex-col items-center">
                <div className=" flex flex-row w-auto bg-zinc-700 text-white rounded-t-md shadow-lg shadow-black/25 overflow-hidden">
                    <div className="flex w-full">
                        <div className="shrink-0 relative rounded-l-md">
                            <img className="w-full object-cover  xl:h-full xl:w-40" src={desafio.capa === '' ? '../../imgDesafio.jpg' : desafio.capa} alt="" />
                            <div className='w-full pt-24 pb-2 px-2 bg-desafio-gradient absolute bottom-0 left-0 right-0'>
                                <p className="uppercase text-orange-200/95 text-sm mt-2">{desafio.tema}</p>

                                <div className="flex flex-wrap gap-1.5">
                                    {renderTags()}
                                </div>

                            </div>
                        </div>

                        <div className="flex-col p-2 w-[38vw]">
                            <div className="flex justify-between ">
                                <Link to={`/perfil/${card.idMember}`} className="uppercase tracking-wide text-md text-white font-medium my-1">{card.nome}</Link>
                                <div className='flex gap-1'>
                                    <div className={`flex p-1 bg-indigo-500 rounded-md items-center ${corNota}`}>
                                        <p className="font-black text-[0.75rem] text-neutral-100 ">{nota}</p>
                                    </div>
                                    {isMyPerfil(card.idMember) && <MoreOptions solucao={card} update={update} challenge_id={desafio.id} />}
                                </div>

                            </div>

                            <div>
                                <p className="text-orange-200/95">Solução</p>
                                <p className="my-1 text-[0.75rem] font-light text-justify mr-2 border-b-2 border-zinc-500 py-2">{card.descricao}</p>
                            </div>

                            <div className="flex gap-2 items-center">
                                <a href={card.linkCode} target={'_blank'} className="flex gap-2 items-center hover:bg-zinc-600 p-2 rounded-md" title="Link da Solução">
                                    <img src="../../github.svg" alt="logo github" className="w-[1.5vw]" />
                                    <p className="font-black text-sm text-neutral-100">GitHub</p>
                                </a>

                                <button onClick={() => handleLikedSolucao(1, card.id)} className="hover:bg-zinc-600 p-2 rounded-md" title="Gostei">
                                    <ThumbsUp size={20} className="text-indigo-300" weight={card.hasLiked === 1 ? "fill" : 'regular'} />
                                </button>

                                <p className="font-black text-sm text-neutral-100">{card.likes}</p>

                                <button onClick={() => handleLikedSolucao(-1, card.id)} className="hover:bg-zinc-600 p-2 rounded-md" title="Não gostei">
                                    <ThumbsDown size={20} className="text-indigo-300" weight={card.hasLiked === -1 ? "fill" : 'regular'} />
                                </button>

                            </div>

                        </div>
                    </div>
                </div>

                {comments.map((comment: SolutionComment) => {
                    return (

                        <div key={comment.id} className='relative flex items-center gap-1 w-full border-y-[1px] px-3 py-2 border-zinc-800 justify-between'>
                            <div className="p-2 flex items-center  gap-2">
                                <Link to={`/perfil/${comment.idMember}`}>
                                    <Avatar alt={'Carla Martins'} src='' sx={{ width: '7vh', height: '7vh', bgcolor: '#C0C0C0' }} />
                                </Link>
                                <div className='p-2  flex flex-col'>
                                    <Link to={`/perfil/${comment.idMember}`} className="font-black text-[0.85em] text-indigo-300">{comment.nome}</Link>
                                    <p className="font-light text-[0.85em] text-justify text-neutral-200">{comment.body}</p>

                                </div>
                            </div>



                            <div className='flex flex-col p-2 items-center '>
                                <button className="p-[6px]" title="Curtir">
                                    <Heart size={35} className="text-indigo-300 bg-indigo-100/10 hover:bg-indigo-200/20 rounded-full p-2 shadow-md shadow-black/25" weight={comment.hasLiked === 1 ? 'duotone' : 'regular'} />
                                </button>

                                <p className="font-black text-[0.6em] text-neutral-100">{comment.likes}</p>
                            </div>

                            <div className='absolute top-0 right-0 '>
                                {isMyPerfil(comment.idMember) && <MoreOptionsComment comment={comment} update={update} idSolution={card.id} />}
                            </div>
                        </div>


                    )
                })}


                <form onSubmit={formik.handleSubmit} className='bg-zinc-700 w-full rounded-b-md p-2 px-5 flex justify-between text-white '>
                    <input
                        id="body"
                        name="body"
                        type="text"
                        placeholder="Adicionar comentário"
                        onChange={formik.handleChange}
                        required
                        className="bg-zinc-900 py-2 px-4 rounded-3xl text-sm placeholder:text-zinc-400 w-[80%] placeholder:px"
                    />

                    <button className='p-1 px-4 bg-indigo-500 rounded-md items-center gap-2 flex' type='submit'>
                        <p className='pl-1 font-black text-sm'>Enviar</p>
                        <PaperPlaneTilt size={20} />
                    </button>
                </form>
            </div>
            <Footer />
        </>
    )
}

const MoreOptionsComment = ({ comment, update, idSolution }: { comment: SolutionComment, update?: Function, idSolution?: number }) => {
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
                    <EditarComentario comment={comment} update={update} idSolution={idSolution} />
                    <ApagarComentario comment={comment} update={update} />
                </div>
            </Popover>
        </ThemeProvider>

    )
}

export const EditarComentario = ({ comment, update, idSolution }: { comment: SolutionComment, update?: Function, idSolution?: number }) => {
    const [openAlert, setOpenAlert] = useState({
        isOpen: false,
        type: 'success',
        msg: 'Comentário alterado com sucesso!'
    });

    const [close, setClose] = useState(false);

    const formik = useFormik({
        initialValues: comment,
        onSubmit: async (values) => {
            try {
                await axios.put(`http://localhost:3333/api/comentario`, {
                    id: comment.id,
                    id_solution: idSolution,
                    id_member: values.idMember,
                    body: values.body
                })

                const alertPopup = {
                    isOpen: true,
                    type: 'success',
                    msg: 'Comentário alterado com sucesso!'
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

            if (update) {
                update()
            }
            setClose(true)
        }

    })


    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        setOpenAlert({ ...openAlert, isOpen: false });

    };

    return (
        <>
            <Dialog.Root>
                <Dialog.Trigger className='hover:bg-indigo-100/10 p-1 px-2'>
                    <p className='font-normal text-sm'>Editar comentário</p>
                </Dialog.Trigger>
                {!close &&
                    <Dialog.Portal>
                        <Dialog.Overlay className="bg-black/70 inset-0 fixed " />

                        <Dialog.Content className="fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/25">
                            <Dialog.Title className="relative text-2xl font-black text-center">
                                Editar comentário
                                <Dialog.Close className='absolute -top-4 -right-7 hover:bg-zinc-700 hover:rounded-full  p-2 '>
                                    <X size={20} />
                                </Dialog.Close>
                            </Dialog.Title>

                            <Dialog.Description className="py-4 text-sm font-light text-justify">
                                Preencha os campos abaixo para alterar seu comentário.
                            </Dialog.Description>


                            <form onSubmit={formik.handleSubmit} className="mt-2 flex flex-col">
                                <div className="flex flex-col gap-1">
                                    <label htmlFor="titulo">Comentário</label>
                                    <textarea
                                        id="body"
                                        name='body'
                                        placeholder="Comentário sobre a solução..."
                                        onChange={formik.handleChange}
                                        className="bg-zinc-900 py-4 px-4 rounded text-sm placeholder:text-zinc-500 "
                                        value={formik.values.body} />
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
                }
            </Dialog.Root>

            <Snackbar open={openAlert.isOpen} autoHideDuration={4000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
                <Alert onClose={handleClose} severity={openAlert.type as AlertColor} sx={{ width: '100%' }}>
                    {openAlert.msg}
                </Alert>
            </Snackbar>
        </>
    )
}

export const ApagarComentario = ({ comment, update }: { comment: any, update?: Function }) => {
    const [openAlert, setOpenAlert] = useState({
        isOpen: false,
        type: 'success',
        msg: 'Comentário deletado com sucesso!'
    });
    const [close, setClose] = useState(false);


    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        setOpenAlert({ ...openAlert, isOpen: false });

    };

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:3333/api/comentario/${comment.id}`)

        } catch (error: any) {
            if (error.response.status === 403) {
                setOpenAlert({
                    isOpen: true,
                    type: 'error',
                    msg: 'Erro de autorização'
                })
            } else {
                setOpenAlert({
                    isOpen: true,
                    type: 'error',
                    msg: 'Um erro inesperado aconteceu, tente novamente mais tarde.'
                })
                console.log(error);
            }
        }
        if (update) {
            update()
        }
        setClose(true)

    }

    return (
        <>

            <Dialog.Root>
                <Dialog.Trigger className='hover:bg-indigo-100/10 p-1'>
                    <p className='font-normal text-sm'>Apagar Comentário</p>
                </Dialog.Trigger>
                {!close &&
                    <Dialog.Portal>
                        <Dialog.Overlay className="bg-black/70 inset-0 fixed " />

                        <Dialog.Content className="fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/25">
                            <Dialog.Title className="relative text-2xl font-black text-center">
                                Apagar comentário
                                <Dialog.Close className='absolute -top-4 -right-7 hover:bg-zinc-700 hover:rounded-full  p-2 '>
                                    <X size={20} />
                                </Dialog.Close>
                            </Dialog.Title>

                            <Dialog.Description className="py-4 text-md font-normal text-justify">
                                Tem certeza que deseja apagar seu comentário? Cuidado! Esta ação será permanente.
                            </Dialog.Description>

                            <footer className="mt-4 flex gap-4 justify-between ">
                                <Dialog.Close className="bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600 items-center flex">
                                    Não
                                </Dialog.Close>

                                <button
                                    type="button"
                                    onClick={handleDelete}
                                    className="bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600"
                                >
                                    Sim

                                </button>

                            </footer>
                        </Dialog.Content>
                    </Dialog.Portal>
                }
                <Snackbar open={openAlert.isOpen} autoHideDuration={4000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
                    <Alert onClose={handleClose} severity={openAlert.type as AlertColor} sx={{ width: '100%' }}>
                        {openAlert.msg}
                    </Alert>
                </Snackbar>
            </Dialog.Root>

        </>
    )
}