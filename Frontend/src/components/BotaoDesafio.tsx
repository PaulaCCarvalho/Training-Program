import * as React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import { DotsThreeOutline } from 'phosphor-react';
import { useEffect, useState } from 'react';
import { createTheme, IconButton, ThemeProvider } from '@mui/material';

import * as AlertDialog from '@radix-ui/react-alert-dialog';
import { positions } from '@mui/system';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

import { HiDotsHorizontal } from 'react-icons/hi'



export function BotaoDesafio({ idParam }: { idParam: any }) {
    const navigate = useNavigate();

    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    }

    const handleClose = () => {
        setAnchorEl(null);
    }

    const editarDesafio = () => {
        alert("Cliquei no botão editar")
    }

    const deletarDesafio = () => {
        axios.delete(`http://localhost:3333/api/desafio/${idParam}`);
        navigate('/')

    }


    const open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;

    const darkTheme = createTheme({
        palette: {
            background: {
                paper: '#333',
            },
            mode: 'dark'
        },
    });

    return (
        <div>
            <ThemeProvider theme={darkTheme} >
                <IconButton aria-describedby={id} onClick={handleClick} className="rounded-full hover:bg-zinc-600 p-2">
                    <HiDotsHorizontal size={32} />
                </IconButton>

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
                        <button className='hover:bg-zinc-600 ' onClick={() => navigate(`/editar-desafio/${idParam}`)}>
                        <Typography sx={{ p: 2 }}>Editar desafio</Typography>
                        </button>

                    </div>

                    <AlertDialog.Root>

                        <AlertDialog.Trigger className="hover:bg-zinc-600">
                        <Typography sx={{ p: 2 }}>Deletar desafio</Typography>
                        </AlertDialog.Trigger>

                        <AlertDialog.Portal>
                            <AlertDialog.Overlay className="bg-black/70 inset-0 fixed " />

                            <AlertDialog.Content className=" bg-zinc-700 text-white rounded-md shadow-lg shadow-black/25 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] p-7 focus:outline-none ">
                                <AlertDialog.Title className="uppercase text-lg font-semibold my-2">
                                    Você tem certeza que deseja deletar este desafio?
                                </AlertDialog.Title>
                                <AlertDialog.Description className="font-medium text-slate-200 my-4">
                                    Essa ação pode ser desfeita, restaurando da lixeira. Este desafio não aparecerá mais para os membros.
                                </AlertDialog.Description>

                                <footer className='mt-6 flex gap-4 justify-end '>
                                    <AlertDialog.Cancel>
                                        <button
                                            className="bg-zinc-500 px-4 h-12  rounded-md font-semibold hover:bg-zinc-600 items-center flex"

                                        >
                                            Cancelar
                                        </button>
                                    </AlertDialog.Cancel>

                                    <AlertDialog.Action>
                                        <button
                                            type="submit"
                                            onClick={() => deletarDesafio}
                                            className="bg-violet-500 px-5 h-12 w-24 justify-center rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600"
                                        >
                                            Salvar
                                        </button>

                                    </AlertDialog.Action>
                                </footer>
                            </AlertDialog.Content>
                        </AlertDialog.Portal>

                    </AlertDialog.Root >


                </Popover>
            </ThemeProvider>
        </div>
    )

}