import { Alert, Chip, createTheme, ListItem, Paper, Snackbar, Stack, styled, ThemeProvider } from '@mui/material';
import * as Dialog from '@radix-ui/react-dialog';
import { Pencil, Trash, X } from "phosphor-react";
import { useState } from 'react';
import { createRoot } from 'react-dom/client';
import DialogEditLink from './DialogEditLink';



export default function DialogEditPerfil({ formik, links, setLinks }: { formik: any, links: any, setLinks: Function }) {
    const [open, setOpen] = useState(false);

    const [editLink, setEditLink] = useState({
        isSelected: false,
        link: {}
    });

    const handleClick = (link: any) => {
        setEditLink({ isSelected: true, link: link });
    };

    function handleButtonClick() {
        setOpen(true);
    }

    const handleDelete = (linkDel: number) => {
        setLinks((links: any) => links.filter((link: any) => link.id !== linkDel));
    };

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const ListItem = styled('li')(({ theme }) => ({
        margin: theme.spacing(0.5),
    }));

    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
        },
    });
    return (
        <div id="dialog-edit-perfil">
            <Dialog.Root>

                <Dialog.Trigger title='Adicionar um novo link' className=" absolute top-2 right-2 hover:bg-violet-600 transition p-2 rounded-lg">
                    <Pencil size={28} />
                </Dialog.Trigger>

                <Dialog.Portal >
                    <Dialog.Overlay className="bg-black/70 inset-0 fixed " />


                    <Dialog.Content className="fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[880px] shadow-lg shadow-black/25">
                        <Dialog.Title className="relative text-2xl font-black text-center">
                            Configuração das informações do Perfil
                            <Dialog.Close className='absolute -top-4 -right-7 hover:bg-zinc-700 hover:rounded-full  p-2 '>
                                <X size={20} />
                            </Dialog.Close>
                        </Dialog.Title>

                        <Dialog.Description className="py-4 text-sm font-light text-justify">
                            Preencha os campos abaixo para adicionar/alterar informações do seu Perfil.
                        </Dialog.Description>

                        <form onSubmit={formik.handleSubmit} className="flex flex-col">
                            <div className="flex flex-col gap-1">
                                <label htmlFor="nome">Nome</label>
                                <input
                                    id="nome"
                                    name='nome'
                                    type="text"
                                    placeholder="Insira seu nome"
                                    value={formik.values.nome}
                                    onChange={formik.handleChange}
                                    className="bg-zinc-900 py-4 px-4 rounded text-sm placeholder:text-zinc-500 "
                                />

                                <label htmlFor="bio" aria-required className='pt-3'>Bio</label>
                                <textarea
                                    id="bio"
                                    name="bio"
                                    placeholder="Insira aqui informações sobre você"
                                    value={formik.values.bio}
                                    onChange={formik.handleChange}
                                    rows={4}
                                    required
                                    className="bg-zinc-900 py-2 px-4 text-justify rounded text-sm placeholder:text-zinc-500"
                                />

                                <label htmlFor="email" className="pt-3">Email</label>
                                <input
                                    id="email"
                                    name="email"
                                    placeholder="Insira aqui seu email"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    required
                                    className="bg-zinc-900 py-4 px-4 rounded text-sm placeholder:text-zinc-500"
                                />

                                <ThemeProvider theme={darkTheme}>

                                    <label className="pt-3">Links adicionados no Perfil</label>
                                    <Paper
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            flexWrap: 'wrap',
                                            listStyle: 'none',
                                            p: 0.5,
                                            marginTop: 0.8,
                                        }}
                                        component="ul"
                                    >
                                        {
                                            links.map((link: any, index: any) => {
                                                return (
                                                    <ListItem key={index} >

                                                        <Chip
                                                            label={link.titulo === ''? link.link : link.titulo}
                                                            onClick={() => handleClick(link)}
                                                            onDelete={() => handleDelete(link.id)}
                                                            deleteIcon={<Trash color='#ff8a7c' size={20} />}
                                                            variant="outlined"


                                                        />

                                                    </ListItem>

                                                )
                                            })
                                        }
                                    </Paper>
                                </ThemeProvider>

                            </div>

                            <footer className="mt-4 flex gap-4 justify-between ">
                                <Dialog.Close className="bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600 items-center flex">
                                    Cancelar
                                </Dialog.Close>

                                <button
                                    type="submit"
                                    onClick={handleButtonClick}
                                    className="bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600"
                                >
                                    Salvar

                                </button>
                            </footer>

                        </form>

                        {editLink.isSelected && <DialogEditLink stateLink={editLink} setStateLink={setEditLink} links={links} setLinks={setLinks} />}


                    </Dialog.Content>


                    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
                        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                            Alterações salvas com sucesso!
                        </Alert>
                    </Snackbar>
                </Dialog.Portal>
            </Dialog.Root >
        </div>
    )
}