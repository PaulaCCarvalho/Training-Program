import { Alert, Snackbar } from '@mui/material';
import axios from 'axios';
import { ChangeEvent, FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from '../components/Form/Input';
import { useGlobal } from '../Context/globalContext';

type UserSubmitForm = {
    email: string;
    senha: string;

}

export default function Login() {
    const { setIsAdmin, setIsMembro } = useGlobal();
    const navigate = useNavigate()
    const [open, setOpen] = useState(false)

    const onSubmit = (e: FormEvent) => {
        e.preventDefault();
    }
    const [formData, setFormData] = useState<UserSubmitForm>({
        email: '',
        senha: ''
    });


    const handleLogin = async () => {
        try {
            const { data: { token, isAdm, id } } = await axios.get(`http://localhost:3333/api/login`, {
                headers: {
                    Username: formData.email,
                    Password: formData.senha,
                }
            })
            if (isAdm) {
                setIsAdmin(true);
            } else {
                setIsMembro(true)
            }


            localStorage.setItem('token', token);
            localStorage.setItem('id', id);


            navigate('/');
        } catch (err: any) {
            if (err.response.status === 400) {
                setOpen(true);
            } else {
                console.error("ops! ocorreu um erro" + err);
            }
        }
    }

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const handleAttribute = (attribute: string, event: ChangeEvent<{ value: any }>) => {
        const newFormData = formData;
        if (attribute === "email" ||
            attribute === "senha") {
            newFormData[attribute] = event.target.value;
            setFormData(newFormData)
        }
    }

    return (
        <>
            <div className="fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/25">
                <p className="text-3xl font-black text-center">Training Program</p>

                <form action='' onSubmit={(e) => onSubmit(e)} className="mt-8 flex flex-col gap-4">
                    <div className="flex flex-col gap-1">
                        <label htmlFor="email">Email</label>
                        <Input id="email" type="email" placeholder="exemplo@gmail.com" data={handleAttribute} required />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="senha">Senha</label>
                        <Input id="senha" type="password" data={handleAttribute} required />
                    </div>

                    <footer className="mt-4 flex justify-between gap-4 items-center">
                        <Link to="/" className="flex bg-zinc-500 px-6 h-11 rounded-md font-semibold text-1xl hover:bg-zinc-600 items-center">
                            Cancelar
                        </Link>

                        <button
                            onClick={handleLogin}
                            className="bg-violet-500 px-10 h-11 text-1xl rounded-md font-semibold flex items-center  hover:bg-violet-600"
                        >
                            Logar
                        </button>
                    </footer>
                </form>


            </div>
            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} >
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    Email e/ou senha errados!
                </Alert>
            </Snackbar>
        </>
    )
}