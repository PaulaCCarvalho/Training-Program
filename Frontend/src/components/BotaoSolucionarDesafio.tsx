import { Alert, AlertColor, createTheme, Popover, Snackbar, ThemeProvider } from "@mui/material";
import React, { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { X } from "phosphor-react";
import { useFormik } from "formik";
import { initValuesSolucao } from "../api/modules/SolucaoDesafio";
import axios from "axios";



export default function BotaoSolucionarDesafio({ challenge_id, update }: { challenge_id: number, update: Function }) {
    const [openAlert, setOpenAlert] = useState({
        isOpen: false,
        type: 'success',
        msg: 'Solução adicionada com sucesso!'
    });

    const [open, setOpen] = useState(true)

    const formik = useFormik({
        initialValues: initValuesSolucao,
        onSubmit: async(values) => {
            values.challenge_id = challenge_id;
            values.idMember = Number(localStorage.getItem('id'))
            try {
                await axios.post(`http://localhost:3333/api/solucao`, {
                    linkCode: values.linkCode,
                    descricao: values.descricao,
                    challenge_id: values.challenge_id,
                    member_id: values.idMember
                })

                
                const alertPopup = {
                    isOpen: true,
                    type: 'success',
                    msg: 'Solução adicionada com sucesso!'
                }
                update();
                setOpenAlert(alertPopup);
                setOpen(false)

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


            <><Dialog.Root>
                <Dialog.Trigger  onClick={() => setOpen(true)} className="bg-indigo-500 flex rounded-md items-center gap-2 hover:bg-indigo-600 p-2">
                    <img src="../../solution-white.png" alt="log solução" className='w-[1.7rem]' />
                    <p className="font-black text-sm text-neutral-100">Solucionar Desafio</p>
                </Dialog.Trigger>

                {open &&

                    <Dialog.Portal>
                        <Dialog.Overlay className="bg-black/70 inset-0 fixed " />

                        <Dialog.Content className="fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/25">
                            <Dialog.Title className="relative text-2xl font-black text-center">
                                Adicionar solução
                                <Dialog.Close className='absolute -top-4 -right-7 hover:bg-zinc-700 hover:rounded-full  p-2 '>
                                    <X size={20} />
                                </Dialog.Close>
                            </Dialog.Title>

                            <Dialog.Description className="py-4 text-sm font-light text-justify">
                                Preencha os campos abaixo para adicionar uma solução.
                            </Dialog.Description>


                            <form onSubmit={formik.handleSubmit} className="mt-2 flex flex-col">
                                <div className="flex flex-col gap-1">
                                    <label htmlFor="titulo">Comentário</label>
                                    <textarea
                                        id="descricao"
                                        name='descricao'
                                        placeholder="Pequeno comentário sobre a solução..."
                                        onChange={formik.handleChange}
                                        className="bg-zinc-900 py-4 px-4 rounded text-sm placeholder:text-zinc-500 " />

                                    <label htmlFor="url" aria-required className='pt-3 flex gap-1'>Link do Repositorio do GitHub <p className="text-red-500">*</p> </label>
                                    <input
                                        id="linkCode"
                                        name="linkCode"
                                        type="text"
                                        placeholder="https://github.com/membro/repositorio"
                                        onChange={formik.handleChange}
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
                }
            </Dialog.Root>
                <Snackbar open={openAlert.isOpen} autoHideDuration={4000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
                    <Alert onClose={handleClose} severity={openAlert.type as AlertColor} sx={{ width: '100%' }}>
                        {openAlert.msg}
                    </Alert>
                </Snackbar></>

        </>


    )
}