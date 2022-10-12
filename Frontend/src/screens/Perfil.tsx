import { Avatar } from "@mui/material";
import { Link } from "phosphor-react";
import { useState } from "react";
import Footer from "../components/Footer";
import { Menu } from "../components/Menu";
import { PaginationComponent } from "../components/PaginationComponent";



export default function Perfil() {

    const [page, setPage] = useState(3)

    const links = [
        { titulo: 'GitHub', url: 'https://github.com/' },
        { titulo: 'Linkedin', url: 'https://www.linkedin.com/' },

    ]
    return (
        <>
            <Menu />

            <div className=" w-[80%] h-full mx-auto flex flex-row text-white gap-5 m-8 justify-center">
                <div className="bg-zinc-700 w-[30%] h-full col-start-1 col-end-2 flex flex-col items-center justify-center py-12 rounded-md">
                    <Avatar alt="Amanda Souza" src="profile.jpg" sx={{ width: 200, height: 200 }} />

                    <p className="my-8 font-medium text-3xl ">Amanda Souza</p>

                    <p className="px-10 text-justify text-md">
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sunt cumque ipsum optio magnam, distinctio
                        voluptatum explicabo, consequuntur odio aliquid corrupti, quas non. Rerum quibusdam cumque, culpa voluptate
                        saepe mollitia. Molestiae.
                    </p>

                    <p className="px-10 my-6 font-medium text-justify text-lg">amandasouza@gmail.com</p>


                    {
                        links.map((link, index) => {
                            return (
                                <a
                                    key={index}
                                    href={link.url}
                                    target={"_blank"}
                                    className="flex flex-col px-10 py-2  font-medium text-justify text-xl hover:text-violet-400"
                                >{link.titulo}</a>
                            )
                        })
                    }

                    <button className="bg-violet-600 hover:bg-violet-700 py-3 px-6 flex items-center transition text-md gap-2 rounded-lg font-bold my-6 justify-center">
                        <Link size={24} />
                        Adicionar Link
                    </button>

                </div>

                <div className="flex flex-col w-[60%] gap-4">
                    <div className="bg-zinc-700 rounded-md flex flex-row gap-8 justify-center text-center font-black text-xl px-6 py-10">
                        <div className="w-[28%]">
                            <p>Desafios resolvidos</p>
                            <p>12</p>
                        </div>

                        <div className="w-[28%]">
                            <p>Posição no ranking</p>
                            <p>124°</p>
                        </div>

                        <div className="relative flex flex-col items-center w-[28%] ">
                            <p>Posição total</p>
                            <div className="absolute flex items-center bottom-0">
                                <p>1245</p>
                                <img
                                    src="duck.png"
                                    alt="logo pontuação"
                                    className="w-10" />
                            </div>
                        </div>
                    </div>

                    <div className=" bg-zinc-700 rounded-md h-full flex flex-col items-center">
                        <p className="text-3xl text-center font-black p-3">Desafios solucionados</p>

                        <div className="h-[85%] p-4">
                            Cards
                        </div>
                        <div className="">
                            <PaginationComponent page={page} setPage={setPage} count={page} />
                        </div>

                    </div>

                </div>

            </div>

            <div className="overflow-hidden">
                <Footer />
            </div>



        </>
    )
}