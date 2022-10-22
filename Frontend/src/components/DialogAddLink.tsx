import { Alert, Snackbar } from '@mui/material';
import { AlertDialog, AlertDialogAction } from '@radix-ui/react-alert-dialog';
import * as Dialog from '@radix-ui/react-dialog';
import { useFormik } from 'formik';
import { Link, X } from "phosphor-react";
import { ElementType, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Input } from './Form/Input';


export default function DialogAddLink({ formik }: { formik: any }) {
    const [open, setOpen] = useState(false);

    const handleClick = () => {
            
        setOpen(true);
    };

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    return (
        <Dialog.Root>

            <Dialog.Trigger title='Adicionar um novo link' className="bg-violet-600 hover:bg-violet-700 py-3 px-6 flex items-center transition text-md gap-2 rounded-lg font-bold my-6 justify-center">
                <Link size={24} />
                Adicionar Link
            </Dialog.Trigger>

            <Dialog.Portal >
                <Dialog.Overlay className="bg-black/70 inset-0 fixed " />


                <Dialog.Content className="fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/25">
                    <Dialog.Title className="relative text-2xl font-black text-center">
                        Adicionar Links no seu perfil
                        <Dialog.Close className='absolute -top-4 -right-7 hover:bg-zinc-700 hover:rounded-full  p-2 '>
                            <X size={20} />
                        </Dialog.Close>
                    </Dialog.Title>

                    <Dialog.Description className="py-4 text-sm font-light text-justify">
                        Preencha os campos abaixo para adicionar um link no seu perfil.
                    </Dialog.Description>

                    <form onSubmit={formik.handleSubmit} className="mt-2 flex flex-col">
                        <div className="flex flex-col gap-1">
                            <label htmlFor="titulo">Título do link</label>
                            <input
                                id="titulo"
                                name='titulo'
                                type="text"
                                placeholder="nome do link"
                                onChange={formik.handleChange}
                                className="bg-zinc-900 py-4 px-4 rounded text-sm placeholder:text-zinc-500 "
                            />

                            <label htmlFor="link" aria-required className='pt-3'>Url do link</label>
                            <input
                                id="link"
                                name="link"
                                type="text"
                                placeholder="https://google.com"
                                onChange={formik.handleChange}
                                required
                                className="bg-zinc-900 py-4 px-4 rounded text-sm placeholder:text-zinc-500"
                            />
                        </div>

                        <footer className="mt-4 flex gap-4 justify-between ">
                            <Dialog.Close className="bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600 items-center flex">
                                Cancelar
                            </Dialog.Close>

                            <button
                                type="submit"
                                onClick={handleClick}
                                className="bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600"
                            >
                                Salvar

                            </button>

                        </footer>

                    </form>

                </Dialog.Content>

                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
                    <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                        Link criado com sucesso!
                    </Alert>
                </Snackbar>
            </Dialog.Portal>
        </Dialog.Root >
    )
}