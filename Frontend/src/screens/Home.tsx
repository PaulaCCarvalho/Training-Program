import axios from "axios";
import { Hash, MagnifyingGlass, Plus, PlusCircle } from "phosphor-react";
import React, { ChangeEvent, FC, useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { CardDesafio, CardDesafioProps } from "../components/CardDesafio";
import { Menu } from "../components/Menu";
import Footer from "../components/Footer";
import FiltroPesquisa from "../components/FiltroPesquisa";
import TopRanking from "../components/TopRanking";
import { PaginationComponent } from "../components/PaginationComponent";
import { useGlobal } from "../Context/globalContext";
import { Alert, Snackbar } from "@mui/material";
import { useFormik } from "formik";

interface Desafio extends CardDesafioProps { }

type Tag = {
    id: number;
    nome: string;
}

export type FilterSearch = {
    nome: string;
    nivel: string[];
    respondidas: boolean;
    tags: Tag[] | string[] | number[];

}

export default function Home() {
    const [search, setSearch] = useState<FilterSearch>({
        nome: '',
        nivel: [],
        respondidas: true,
        tags: []

    });

    const [cards, setCards] = useState<Desafio[]>([]);
    const navigate = useNavigate()
    const [page, setPage] = useState<number>(1)
    const [pageCount, setPageCount] = useState(1)
    const { isAdmin } = useGlobal()
    const [open, setOpen] = useState(false);

    function requisicao() {
        axios.get(`http://localhost:3333/api/desafio?page=${page}`, {
            params: {
                nome: search.nome,
                nivel: search.nivel.toString(),
                //respondidas: search.respondidas.toString(),
                tags: formatTags()
            }
        })
            .then((response) => {
                setCards(response.data.challenges);
                setPageCount(Math.ceil(response.data.count / 12));
            })
            .catch((err) => {
                if (err.response.status === 404) {
                    setOpen(true)
                } else {
                    console.error("ops! ocorreu um erro: " + err.response.data);
                }

            });
    }

    useEffect(() => {
        requisicao();

    }, [page]);

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    function formatTags() {
        const aux: string[] = []
        search.tags.map((tag: any) => {
            aux.push(String(tag.nome))
        })

        return aux.toString()
    }

    return (
        <>
            <Menu />

            <div className="overflow-y-scroll overflow-x-hidden flex w-auto h-[90.3vh] flex-col items-center">
                <div className="flex justify-between">
                    <div className=" w-[25vw] h-full bg-zinc-800/80  ">
                        <div className="flex justify-center">
                            <FiltroPesquisa search={search} setSearch={setSearch} setPage={setPage} req={requisicao} />
                        </div>

                        <div className="flex justify-center items-start">
                            <TopRanking />
                        </div>
                    </div>
                    <div className=" px-6 py-6 flex flex-col items-center w-[75vw]">


                        {isAdmin ?
                            <ButtomNavigation />
                            :
                            null
                        }



                        <div className="w-[75vw] flex flex-wrap items-center justify-center overflow-auto mb-14">
                            {
                                cards.map((card) => {
                                    return (
                                        <button onClick={() => navigate("/Desafio/" + card.id)} key={card.id} >
                                            <CardDesafio data={card} />
                                        </button>
                                    )
                                })
                            }

                        </div>
                        <PaginationComponent page={page} setPage={setPage} count={pageCount} />
                    </div>

                    <Snackbar open={open} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'left' }} >
                        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                            Nenhum desafio encontrado!
                        </Alert>
                    </Snackbar>

                </div>
                <Footer />
            </div>

        </>
    )
}


const ButtomNavigation: FC = () => {
    const navigate = useNavigate()
    const [tags, setTags] = useState(false)

    const formik = useFormik({
        initialValues: {
            tag: ''
        }, 
        onSubmit: () => {

        }
    })

    return (
        <>
            <div className="flex flex-row flex-auto w-[55%] h-[10vh] bg-zinc-700 items-center rounded-md shadow-md shadow-black/30">
                <button className='flex p-2 h-full w-full hover:bg-indigo-200/20 hover:rounded-l-md items-center ' onClick={() => navigate("/aprovar-solucoes")}>
                    <img src="../../solution-white.png" alt="log solução" className='w-[1.7rem]' />

                    <p className="font-black text-sm text-neutral-100 items-center ">Aprovar Soluções</p>
                </button>

                <button className='flex p-2 h-full w-full hover:bg-indigo-200/25 items-center ' onClick={() => navigate("/cadastrar-desafio")}>
                    <PlusCircle size={20} className="text-neutral-100 m-1"/>

                    <p className="font-black text-sm text-neutral-100 items-center ">Adicionar Desafios</p>
                </button>

                <button className='flex p-2 h-full w-full hover:bg-indigo-200/25 hover:rounded-r-md items-center ' onClick={() => navigate("/cadastrar-desafio")}>
                    <Hash size={20}  className="text-neutral-100 m-1"/>
                    <p className="font-black text-sm text-neutral-100 ">Adicionar Tags</p>
                </button>
            </div>

        </>
    )
}