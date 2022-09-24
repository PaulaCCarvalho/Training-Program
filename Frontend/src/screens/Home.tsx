
import { MagnifyingGlass, Plus } from "phosphor-react";
import CadastrarDesafio from "../components/CadastrarDesafio";
import CardDesafio from "../components/CardDesafio";
import { Menu } from "../components/Menu";


export default function Home() {
    return (
        <>
            <div className="-z-10 fixed w-80 h-full bg-zinc-800 left-0 ">
                <div>
                </div>
            </div>

            <Menu />

            <div className="ml-80 flex" >
                <div className="px-6 py-6 flex flex-col items-center">
                    <div className="m-6 inline-flex items-center">
                        <input type="text" name="search" className="bg-[#4F545C] w-[800px] py-3 px-4 rounded-[14px] text-sm placeholder:text-zinc-400" placeholder="Pesquise um desafio" />
                        <MagnifyingGlass size={28} className="text-[#B9BBBE] right-3 -translate-x-11" />

                        <CadastrarDesafio/>

                    </div>
                    <div className="flex flex-wrap items-center justify-center overflow-auto">
                        <CardDesafio />
                        <CardDesafio />
                        <CardDesafio />
                        <CardDesafio />
                        <CardDesafio />
                        <CardDesafio />
                    </div>
                </div>
            </div>

        </>
    )
}