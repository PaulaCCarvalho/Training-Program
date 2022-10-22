import { Alert, Snackbar } from '@mui/material';
import { AlertDialog, AlertDialogAction } from '@radix-ui/react-alert-dialog';
import * as Dialog from '@radix-ui/react-dialog';
import { useFormik, validateYupSchema } from 'formik';
import { Link, X } from "phosphor-react";
import { ElementType, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Input } from './Form/Input';


export default function DialogEditLink({ stateLink, setStateLink, links, setLinks }: { stateLink: any, setStateLink: Function, links: any, setLinks: Function }) {
    const [open, setOpen] = useState(false);

    const formik = useFormik({
        initialValues: {
            id: stateLink.link.id,
            titulo: stateLink.link.titulo,
            link: stateLink.link.link,
        },
        onSubmit: values => {
            const index = links.findIndex((link: any) => values.id === link.id)
            links[index] = {
                id: values.id,
                titulo: values.titulo,
                link: values.link,
            }
   
            console.log(links)
            
            
        }
    })

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
        <div className="absolute top-0 left-0 w-[880px] h-full bg-black bg-opacity-60 rounded-lg">
            <div className="fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/25 ">
                <div className="relative text-2xl font-black text-center">
                    Adicionar Links no seu perfil
                </div>

                <span className="py-4 text-sm font-light text-justify">
                    Preencha os campos abaixo para modificá-los um link no seu perfil.
                </span>

                <form onSubmit={formik.handleSubmit} className="mt-2 flex flex-col">
                    <div className="flex flex-col gap-1">
                        <label htmlFor="titulo">Título do link</label>
                        <input
                            id="titulo"
                            name='titulo'
                            type="text"
                            placeholder="nome do link"
                            onChange={formik.handleChange}
                            defaultValue={formik.values.titulo}
                            className="bg-zinc-900 py-4 px-4 rounded text-sm placeholder:text-zinc-500 "
                        />

                        <label htmlFor="link" aria-required className='pt-3'>Url do link</label>
                        <input
                            id="link"
                            name="link"
                            type="text"
                            placeholder="https://google.com"
                            onChange={formik.handleChange}
                            defaultValue={formik.values.link}
                            required
                            className="bg-zinc-900 py-4 px-4 rounded text-sm placeholder:text-zinc-500"
                        />
                    </div>

                    <footer className="mt-4 flex gap-4 justify-between ">
                        <button type="button" onClick={() => setStateLink(stateLink.isSelected = false)} className="bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600 items-center flex">
                            Cancelar
                        </button>

                        <button
                            type="submit"
                            onClick={handleClick}
                            className="bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600"
                        >
                            Salvar

                        </button>

                    </footer>

                </form>

                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
                    <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                        Link criado com sucesso!
                    </Alert>
                </Snackbar>
            </div>
        </div>
    )
}