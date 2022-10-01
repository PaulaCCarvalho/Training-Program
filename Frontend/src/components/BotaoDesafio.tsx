import * as React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { DotsThreeOutline } from 'phosphor-react';
import { useEffect, useRef, useState } from 'react';
import { createTheme, IconButton, ThemeProvider } from '@mui/material';

export function BotaoDesafio() {

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
        alert("Cliquei no botão deletar")
    }

    const open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;

    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
        },
    });

    return (
        <div>
            <ThemeProvider theme={darkTheme} >
                <IconButton aria-describedby={id} onClick={handleClick} className="rounded-full hover:bg-zinc-600 p-2">
                    <DotsThreeOutline size={32} />
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
                        <button className='hover:bg-zinc-600 ' onClick={editarDesafio}>
                            <Typography sx={{ p: 2 }}>Editar desafio</Typography>
                        </button>
                        <button className="hover:bg-zinc-600" onClick={deletarDesafio}>
                            <Typography sx={{ p: 2 }}>Deletar desafio</Typography>
                        </button>
                    </div>


                </Popover>
            </ThemeProvider>
        </div>
    )



    /*     const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
        
        const handleClick = () =>{
    
        }
    
        useEffect(() => {
    
    
    
        }, []);
    
        const popover = () => {
            return (
                <div className='bg-zinc-700 w-36 rounded-md flex flex-col  text-white text-md font-medium gap-1'>
                    <button className='rounded-t-md py-1 hover:bg-zinc-600 '>
                        Editar Desafio
                    </button>
    
                    <button className='rounded-b-md p-1 hover:bg-zinc-600 '>
                        Deletar Desafio
                    </button>
                </div>
            )
        }
    
        return (
            <div>
                <button className="rounded-full hover:bg-zinc-600 p-2" onClick={handleClick}>
                    <DotsThreeOutline size={32}/>
                </button>
            </div>
        ) */
}