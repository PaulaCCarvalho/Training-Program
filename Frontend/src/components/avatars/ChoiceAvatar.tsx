import { Avatar } from "@mui/material"
import { useEffect, useState } from "react"

export default function ChoiceAvatar({setAvatar, membro,setMembro}: {setAvatar: Function, membro: any, setMembro: Function}) {
    const [choiceAvatar, setChoiceAvatar] = useState<string>()

    const handleClick = () => {
        const updatedMember = membro;
        updatedMember.foto = choiceAvatar;
        setMembro(updatedMember);
        console.log(membro)
        setAvatar(false)
    }

    return (
        <div className="absolute top-0 left-0 w-[880px] h-full bg-black bg-opacity-60 rounded-lg">
            <div className="fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[580px] shadow-lg shadow-black/25  ">
                <div className="relative text-2xl font-black text-center my-2">
                    Escolha seu choiceAvatar!
                </div>

                <span className="flex py-4 text-md font-light text-justify my-2">
                    Selecione abaixo qual choiceAvatar deseja adicionar ao seu perfil.
                </span>

                <div className="flex flex-wrap py-4 gap-4 items-center justify-center">
                    <button className="transition duration-200 hover:scale-110" onClick={() => setChoiceAvatar('/avatars/avatar001.png')}>
                        <Avatar alt="Amanda Souza" src="/avatars/avatar001.png" sx={{ width: '7vw', height: '7vw', bgcolor: '#C0C0C0', fontSize: '5vw' }} />
                    </button>
                    <button className="transition duration-200 hover:scale-110" onClick={() => setChoiceAvatar('/avatars/avatar002.png')}>
                        <Avatar alt="Amanda Souza" src="/avatars/avatar002.png" sx={{ width: '7vw', height: '7vw', bgcolor: '#C0C0C0', fontSize: '5vw' }} />
                    </button>
                    <button className="transition duration-200 hover:scale-110" onClick={() => setChoiceAvatar('/avatars/avatar003.png')}>
                        <Avatar alt="Amanda Souza" src="/avatars/avatar003.png" sx={{ width: '7vw', height: '7vw', bgcolor: '#C0C0C0', fontSize: '5vw' }} />
                    </button>
                    <button className="transition duration-200 hover:scale-110" onClick={() => setChoiceAvatar('/avatars/avatar004.png')}>
                        <Avatar alt="Amanda Souza" src="/avatars/avatar004.png" sx={{ width: '7vw', height: '7vw', bgcolor: '#C0C0C0', fontSize: '5vw' }} />
                    </button>
                    <button className="transition duration-200 hover:scale-110" onClick={() => setChoiceAvatar('/avatars/avatar005.png')}>
                        <Avatar alt="Amanda Souza" src="/avatars/avatar005.png" sx={{ width: '7vw', height: '7vw', bgcolor: '#C0C0C0', fontSize: '5vw' }} />
                    </button>
                    <button className="transition duration-200 hover:scale-110" onClick={() => setChoiceAvatar('/avatars/avatar006.png')}>
                        <Avatar alt="Amanda Souza" src="/avatars/avatar006.png" sx={{ width: '7vw', height: '7vw', bgcolor: '#C0C0C0', fontSize: '5vw' }} />
                    </button>
                    <button className="transition duration-200 hover:scale-110" onClick={() => setChoiceAvatar('/avatars/avatar007.png')}>
                        <Avatar alt="Amanda Souza" src="/avatars/avatar007.png" sx={{ width: '7vw', height: '7vw', bgcolor: '#C0C0C0', fontSize: '5vw' }} />
                    </button>
                    <button className="transition duration-200 hover:scale-110" onClick={() => setChoiceAvatar('/avatars/avatar008.png')}>
                        <Avatar alt="Amanda Souza" src="/avatars/avatar008.png" sx={{ width: '7vw', height: '7vw', bgcolor: '#C0C0C0', fontSize: '5vw' }} />
                    </button>
                    <button className="transition duration-200 hover:scale-110" onClick={() => setChoiceAvatar('/avatars/avatar009.png')}>
                        <Avatar alt="Amanda Souza" src="/avatars/avatar009.png" sx={{ width: '7vw', height: '7vw', bgcolor: '#C0C0C0', fontSize: '5vw' }} />
                    </button>
                    <button className="transition duration-200 hover:scale-110" onClick={() => setChoiceAvatar('/avatars/avatar010.png')}>
                        <Avatar alt="Amanda Souza" src="/avatars/avatar010.png" sx={{ width: '7vw', height: '7vw', bgcolor: '#C0C0C0', fontSize: '5vw' }} />
                    </button>
                    <button className="transition duration-200 hover:scale-110" onClick={() => setChoiceAvatar('/avatars/avatar011.png')}>
                        <Avatar alt="Amanda Souza" src="/avatars/avatar011.png" sx={{ width: '7vw', height: '7vw', bgcolor: '#C0C0C0', fontSize: '5vw' }} />
                    </button>
                    <button className="transition duration-200 hover:scale-110" onClick={() => setChoiceAvatar('/avatars/avatar012.png')}>
                        <Avatar alt="Amanda Souza" src="/avatars/avatar012.png" sx={{ width: '7vw', height: '8vw', bgcolor: '#C0C0C0', fontSize: '5vw' }} />
                    </button>
                </div>


                <footer className="mt-4 flex gap-4 justify-between ">
                    <button type="button" onClick={() => setAvatar(false)} className="bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600 items-center flex">
                        Cancelar
                    </button>

                    <button
                        type="button"
                        onClick={handleClick}
                        className="bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600"
                    >
                        Salvar

                    </button>

                </footer>

            </div>
        </div>
    )
}