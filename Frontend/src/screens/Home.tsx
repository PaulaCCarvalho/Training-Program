import axios from "axios";
import { Hash, MagnifyingGlass, Plus, PlusCircle, Trash } from "phosphor-react";
import React, { ChangeEvent, FC, useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { CardDesafio, CardDesafioProps } from "../components/CardDesafio";
import { Menu } from "../components/Menu";
import Footer from "../components/Footer";
import FiltroPesquisa from "../components/FiltroPesquisa";
import TopRanking from "../components/TopRanking";
import { PaginationComponent } from "../components/PaginationComponent";
import { useGlobal } from "../Context/globalContext";
import { Alert, AlertColor, Snackbar } from "@mui/material";
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
    const [open, setOpen] = useState({
        isOpen: false,
        type: 'success',
        msg: 'Solução adicionada com sucesso!'
    });

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
                    setOpen({
                        isOpen: true,
                        type: 'error',
                        msg: 'Nenhum desafio encontrado'
                    })
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
        setOpen({
            isOpen: false,
            type: 'sucess',
            msg: ''
        });
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
                        <div className="min-h-[7rem]">
                            {isAdmin ?
                                <ButtomNavigation />
                                :
                                null
                            }
                        </div>




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

                    <Snackbar open={open.isOpen} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'left' }} >
                        <Alert onClose={handleClose} severity={open.type as AlertColor} sx={{ width: '100%' }}>
                            {open.msg}
                        </Alert>
                    </Snackbar>

                </div>
                <Footer />
            </div>

        </>
    )
}


const ButtomNavigation: FC = () => {
    const { change, update } = useGlobal()
    const navigate = useNavigate()
    const [tags, setTags] = useState(false)
    const [reqTags, setReqTags] = useState<Object[]>([])

    useEffect(() => {


        async function getTags() {
            try {
                const response = await axios.get('http://localhost:3333/api/tags')
                setReqTags(response.data)

            } catch (error) {
                console.error("ops! ocorreu um erro" + error);
            }
        }

        getTags();
    }, [change])


    const formik = useFormik({
        initialValues: {
            nome: ''
        },
        onSubmit: async (values) => {
            try {
                await axios.post('http://localhost:3333/api/tags', {
                    nome: values.nome
                })

            } catch (error) {
                console.error("ops! ocorreu um erro" + error);
                
            }
            
            const input = document.getElementById('nome') as HTMLInputElement;
            input.value = ''
            
            update()

        }
    })
    const handleDelete = async (idTag: number) => {
        try {
            await axios.delete('http://localhost:3333/api/tags/' + idTag)

            update()
        } catch (error) {
            console.error("ops! ocorreu um erro" + error);

        }
    }

    return (
        <div className="">

            <div className={`flex flex-row flex-auto w-auto bg-zinc-700 items-center  shadow-md shadow-black/30 ${tags ? 'rounded-t-md' : 'rounded-md'}`}>
                <button className='flex p-2 h-full w-full hover:bg-indigo-200/25 hover:rounded-l-md items-center ' onClick={() => navigate("/aprovar-solucoes")}>
                    <img src="../../solution-white.png" alt="log solução" className='w-[1.7rem]' />

                    <p className="font-black text-sm text-neutral-100 items-center ">Aprovar Soluções</p>
                </button>

                <button className='flex p-2 h-full w-full hover:bg-indigo-200/25 items-center ' onClick={() => navigate("/cadastrar-desafio")}>
                    <PlusCircle size={20} className="text-neutral-100 m-1" />

                    <p className="font-black text-sm text-neutral-100 items-center ">Adicionar Desafios</p>
                </button>

                <button className={`flex p-2 h-full w-full hover:bg-indigo-200/25  rounded-r-md items-center ${tags ? 'bg-indigo-200/25 rounded-r-md hover:bg-indigo-300/25' : 'hover:py-[0.88em]'}`} onClick={() => setTags(!tags)}>
                    <Hash size={20} className="text-neutral-100 m-1" />
                    <p className="font-black text-sm text-neutral-100 ">Adicionar Tags</p>
                </button>
            </div>

            {tags &&

                <div className="flex flex-col ">
                    <form onSubmit={formik.handleSubmit} className='bg-zinc-700 w-full  p-2 px-5 flex justify-between gap-4 text-white '>
                        <input
                            id="nome"
                            name="nome"
                            type="text"
                            placeholder="Adicionar tag"
                            onChange={formik.handleChange}
                            required
                            className="bg-zinc-900 py-2 px-4 rounded-3xl text-sm placeholder:text-zinc-400  placeholder:px"
                        />

                        <button type="submit" className='p-1 px-4 bg-indigo-500 hover:bg-indigo-600 rounded-md items-center gap-2 flex'>
                            <p className='pl-1 font-black text-sm'>Adicionar tag</p>
                        </button>
                    </form>

                    <div className="flex flex-wrap bg-zinc-700 w-[45vw]  p-2 px-5 justify-between gap-1 rounded-b-md ">
                        {reqTags.map((tag: any) => {
                            return (
                                <div key={tag.id} className="flex border-[1px] bg-zinc-800/25 border-zinc-500 rounded-full gap-1 py-1 px-2">
                                    <p className="text-white text-sm">{tag.nome}</p>
                                    <button onClick={() => handleDelete(tag.id)}>
                                        <Trash size={15} className='text-red-500' />
                                    </button>
                                </div>)

                        })}
                    </div>

                </div>
            }

        </div>
    )
}