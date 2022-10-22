import { Alert, Snackbar } from '@mui/material';
import axios from 'axios';
import { ChangeEvent, FormEvent, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from '../components/Form/Input';


type UserSubmitForm = {
    nome: string;
    email: string;
    senha: string;
    confirmarSenha: string;

}

export default function Cadastro() {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate()

    const [formData, setFormData] = useState<UserSubmitForm>({
        nome: '',
        email: '',
        senha: '',
        confirmarSenha: '',
    });

    const onSubmit = (e: FormEvent) => {
        e.preventDefault();
    }

    const handleAttribute = (attribute: string, event: ChangeEvent<{ value: any }>) => {
        const newFormData = formData;
        if (attribute === "nome" ||
            attribute === "email" ||
            attribute === "senha" ||
            attribute === "confirmarSenha") {
            newFormData[attribute] = event.target.value;
            setFormData(newFormData)
        }
    }



    async function handleSubmit() {
        if (formData.senha !== formData.confirmarSenha) {
            const element = document.getElementById("alert");
            createRoot(element as HTMLElement).render(
                <Alert severity="error">Erro: senhas diferentes. Digite a mesma senha em ambos os campos de senha!</Alert>
            );
        }

        try {
            const {data: {token, isAdmin}} = await axios.post('http://localhost:3333/api/usuario', {
                nome: formData.nome,
                email: formData.email,
                senha: formData.senha,
            })

            setOpen(true);
            localStorage.setItem('token', token);

        } catch (err) {
            console.error("ops! ocorreu um erro" + err);
        }
    }

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {    
        setOpen(false);
        navigate('/');
        
    };

    return (
        <>
            <div className="fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/25">
                <p className="text-3xl font-black text-center">Training Program</p>

                <form onSubmit={(e) => onSubmit(e)} className="mt-8 flex flex-col gap-4">
                    <div className="flex flex-col gap-1">
                        <label htmlFor="nome">Nome</label>
                        <Input id="nome" placeholder="Insira seu nome" data={handleAttribute} required />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="email">Email</label>
                        <Input id="email" type="email" placeholder="exemplo@gmail.com" data={handleAttribute} required />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="senha">Senha</label>
                        <Input id="senha" type="password" data={handleAttribute} required />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="confirmarSenha">Confirmar senha</label>
                        <Input id="confirmarSenha" type="password" data={handleAttribute} required />
                    </div>

                    <div id='alert'>

                    </div>

                    <footer className="mt-4 flex justify-between gap-4">
                        <Link to="/"
                            className="flex bg-zinc-500 px-7 h-11 rounded-md font-semibold text-1xl hover:bg-zinc-600 items-center"

                        >
                            Cancelar
                        </Link>

                        <button
                            onClick={handleSubmit}
                            className="bg-violet-500 px-7 h-11 text-1xl rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600"
                        >
                            Cadastrar
                        </button>
                    </footer>
                </form>


            </div>
            <Snackbar open={open} autoHideDuration={4000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Usuário cadastrado com sucesso!
                </Alert>
            </Snackbar>
        </>
    )
}