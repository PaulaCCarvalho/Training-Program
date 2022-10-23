import { Alert, Chip, createTheme, ListItem, Paper, Snackbar, Stack, styled, ThemeProvider } from '@mui/material';
import * as AlertDialog from '@radix-ui/react-alert-dialog';
import * as Dialog from '@radix-ui/react-dialog';
import { Pencil, Trash, X } from "phosphor-react";
import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import ChoiceAvatar from './avatars/ChoiceAvatar';
import DialogEditLink from './DialogEditLink';



export default function DialogEditPerfil({ formik, membro, setMembro }: { formik: any, membro: any, setMembro: Function }) {
    const [open, setOpen] = useState(false);
    const [links, setLinks] = useState(membro.links);
    const [avatar, setAvatar] = useState(false);

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
        const updatedMember = membro;
        updatedMember.links = membro.links.filter((link: any) => link.id !== linkDel);
        setMembro(updatedMember);
        setLinks(updatedMember.links)
    };

    const ListItem = styled('li')(({ theme }) => ({
        margin: theme.spacing(0.5),
    }));

    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
        },
    });

    useEffect(() => {
        console.log("dep")
    }, [membro])

    const handleContinueEditing = () => {
        setOpen(false)
    }

    return (
        <div >

            <Dialog.Root>

                <Dialog.Trigger onClick={() => setOpen(false)} title='Adicionar um novo link' className=" absolute top-2 right-2 hover:bg-violet-600 transition p-2 rounded-lg">
                    <Pencil size={28} />
                </Dialog.Trigger>

                <div id="dialog-edit-perfil">
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
                                Preencha os campos abaixo para adicionar/alterar as informações do seu Perfil.
                            </Dialog.Description>
                            <div className='overflow-y-auto'>
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
                                                    membro.links.map((link: any) => {
                                                        return (
                                                            <ListItem key={link.id} >

                                                                <Chip
                                                                    label={link.titulo}
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

                                        <button

                                            type="button"
                                            onClick={() => setAvatar(true)}
                                            className="my-2 bg-violet-500 px-5 h-12 justify-center rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600"
                                        >
                                            Alterar Avatar

                                        </button>

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

                                {editLink.isSelected && <DialogEditLink stateLink={editLink} setStateLink={setEditLink} membro={membro} />}
                                {open &&
                                    <div className="absolute top-0 left-0 w-[880px] h-full bg-black bg-opacity-60 rounded-lg">
                                        <div className="fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/25 ">
                                            <p className="relative text-2xl font-black text-center mb-4">
                                                Suas alterações estão sendo salvas!
                                            </p>

                                            <span className="py-6 text-lg font-light text-justify">
                                                Deseja realizar mais alguma mudança?
                                            </span>

                                            <footer className="mt-4 flex gap-4 justify-between ">
                                                <Dialog.Close className="bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600 items-center flex">
                                                    Não
                                                </Dialog.Close>

                                                <button

                                                    type="submit"
                                                    onClick={handleContinueEditing}
                                                    className="bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600"
                                                >
                                                    Sim

                                                </button>
                                            </footer>
                                        </div>

                                    </div>

                                }

                                {avatar && <ChoiceAvatar setAvatar={setAvatar} membro={membro} setMembro={setMembro}/>}

                            </div>

                        </Dialog.Content>



                    </Dialog.Portal>
                </div>
            </Dialog.Root >
        </div >
    )
}