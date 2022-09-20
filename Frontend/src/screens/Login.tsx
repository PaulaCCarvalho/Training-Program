import { Dispatch, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { Input } from '../components/Form/Input';

export function Login() {

    const onSubmit = (e: FormEvent) => {
        e.preventDefault();
    }

    return (
        <div className="fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/25">
            <p className="text-3xl font-black text-center">Training Program</p>

            <form action='' onSubmit={(e) => onSubmit(e)} className="mt-8 flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                    <label htmlFor="">Email</label>
                    <Input id="email" type="email" placeholder="exemplo@gmail.com" />
                </div>

                <div className="flex flex-col gap-1">
                    <label htmlFor="">Senha</label>
                    <Input id="senha" type="password"/>
                </div>

                <footer className="mt-4 flex justify-between gap-4 items-center">
                    <Link to="/" className="flex bg-zinc-500 px-6 h-11 rounded-md font-semibold text-1xl hover:bg-zinc-600 items-center">
                        Cancelar
                    </Link>

                    <button
                        type="submit"
                        className="bg-violet-500 px-10 h-11 text-1xl rounded-md font-semibold flex items-center  hover:bg-violet-600"
                    >
                        Logar
                    </button>
                </footer>
            </form>
        </div>
    )
}