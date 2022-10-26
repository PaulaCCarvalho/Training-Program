import { Avatar } from "@mui/material";
import * as Dialog from '@radix-ui/react-dialog';
import axios from "axios";
import { useFormik } from "formik";
import { Link, Trash } from "phosphor-react";
import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { CardPerfil } from "../components/CardPerfil";
import DialogAddLink from "../components/DialogAddLink";
import DialogEditPerfil from "../components/DialogEditPerfil";
import Footer from "../components/Footer";
import { Menu } from "../components/Menu";
import { PaginationComponent } from "../components/PaginationComponent";
import { useGlobal } from "../Context/globalContext";


type link = {
    id: number,
    titulo: string,
    url: string,
}

type member = {
    id: number,
    nome: string,
    bio: string,
    links: Array<link>,
    email: string,
    foto: string,
}

export default function Perfil() {
    const { isMembro, update, change, setIsMembro } = useGlobal()
    const [page, setPage] = useState(1)
    const [myPerfil, setMyPerfil] = useState(false)
    const id = localStorage.getItem('id');
    const idParam = useParams()
    const [open, setOpen] = useState(false)
    const navigate = useNavigate()
    const [cards, setCards] = useState({
        id: 0,
        nome: '',
        descricao: '',
        nivel: '',
        tema: '',
        capa: '',
        availabel: 0,
        tags: [],
        imagens: [],
    })


    const [membro, setMembro] = useState<member>(
        {
            id: 0,
            nome: "Carregando...",
            bio: `Carregando...`,
            links: [],
            email: "Carregando...",
            foto: ''
        }
    )

    const formikPerfil = useFormik({
        initialValues: {
            nome: membro.nome,
            bio: membro.bio,
            email: membro.email,
        },
        onSubmit: async (valuesPerfil) => {


            const updatedMember = { ...valuesPerfil, links: membro.links, id: membro.id, foto: membro.foto };

            setMembro(updatedMember)
            await handleRequest(updatedMember)
        },
        enableReinitialize: true,
    })


    useEffect(() => {

        if (idParam.id === id) {
            setMyPerfil(true);
        } else {
            setMyPerfil(false);
        }

        axios.get(`http://localhost:3333/api/usuario/${idParam.id}`)
            .then(({ data: membro }) => {
                setMembro(membro)
            })
            .catch(() => console.log('Ops deu ruim!'))

        axios.get(`http://localhost:3333/api/desafio/3`)
            .then((response) => {
                setCards(response.data)
            })
            .catch(() => console.log('Ops deu ruim!'))

    }, [isMembro, change])



    const handleRequest = async (updatedMember: member) => {
        const token = localStorage.getItem("token");
        try {
            const response = await axios.put(`http://localhost:3333/api/usuario`,
                updatedMember,
                {
                    headers: {
                        Authorization: 'Bearer ' + token
                    }
                },

            )

            update()
        } catch (err) {
            console.log("Ops ocorreu um erro!");

        }
    }

    const setLinks = (urls: link[]) => {
        console.log(urls)
        const newMember = membro
        newMember.links = urls;
        setMembro(newMember);
    }


    const formikLink = useFormik({
        initialValues: {
            id: 0,
            titulo: "",
            url: "",
        },
        onSubmit: async (values) => {
            const validLink = new RegExp('^https{0,1}:\/\/')

            formikLink.values.id = Math.floor(Math.random() * 1000)

            if (!validLink.test(values.url)) {
                values.url = 'https://' + values.url
            }

            if (values.titulo === '') {
                values.titulo = values.url.split('//')[1]
            }

            console.log(values)


            const newMember = membro
            newMember.links.push(values)
            setMembro(newMember);
            await handleRequest(newMember);


            // const elements = document.querySelectorAll('input')

            // elements.forEach(element => {
            //     element.value = ""
            // });

            //formikLink.values.titulo = ''
            formikLink.resetForm({
                values: {
                    id: 0,
                    titulo: "",
                    url: "",
                }
            })

        },
        enableReinitialize: true,
    });
    const handleRemove = async () => {
        try {
            await axios.delete('http://localhost:3333/api/usuario/' + id,
                {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('token')
                    }
                }
            )
        } catch (error: any) {
            console.log(error.response.data);
        }
        setOpen(false)
        localStorage.clear();
        setIsMembro(false);
        navigate('/');
    }

    return (
        <>
            <Menu />

            <div className=" w-[80%] h-full mx-auto flex flex-row text-white gap-5 m-8 justify-center">

                <section className="relative bg-zinc-700 w-[30%] h-full col-start-1 col-end-2 flex flex-col items-center justify-center py-12 rounded-md">

                    {myPerfil && <DialogEditPerfil formik={formikPerfil} membro={membro} setMembro={setMembro} />}

                    <Avatar alt={membro.nome} src={membro.foto} sx={{ width: '15vw', height: '15vw', bgcolor: '#C0C0C0', fontSize: '5vw' }} />

                    <p className="my-8 font-medium text-3xl px-4 text-center">{membro.nome}</p>

                    <p className="px-10 text-justify text-md">
                        {membro.bio}
                    </p>

                    <p className="px-10 my-6 font-medium text-justify text-lg">{membro.email}</p>


                    {
                        membro.links.map((link) => {
                            return (
                                <a
                                    key={link.id}
                                    href={link.url}
                                    target={"_blank"}
                                    className="flex flex-col px-10 py-2  font-medium text-justify text-xl hover:text-violet-400"
                                >{link.titulo}</a>
                            )
                        })
                    }

                    {myPerfil && <DialogAddLink formik={formikLink} />}
                    {myPerfil &&
                        (
                            <button onClick={() => setOpen(true)} title='Adicionar um novo link' className="bg-zinc-900 hover:bg-zinc-800 py-3 px-6 flex items-center transition text-md gap-2 rounded-lg font-bold my-1 justify-center text-red-400">
                                <Trash size={24} />
                                Excluir meu perfil
                            </button>
                        )
                    }

                </section>

                <div className="flex flex-col w-[60%] gap-4">
                    <section className="bg-zinc-700 rounded-md flex flex-row gap-8 justify-center text-center font-black text-xl px-6 py-10">
                        <div className="w-[28%]">
                            <p>Desafios resolvidos</p>
                            <p>12</p>
                        </div>

                        <div className="w-[28%]">
                            <p>Posição no ranking</p>
                            <p>1025°</p>
                        </div>

                        <div className=" flex flex-col items-center w-[28%] ">
                            <p>Pontuação total</p>
                            <div className="flex items-center bottom-0 ">
                                <p>5420</p>
                                <img
                                    src="/duck.png"
                                    alt="logo pontuação"
                                    className="w-10" />
                            </div>
                        </div>
                    </section>

                    <section className=" bg-zinc-700 rounded-md h-full flex flex-col items-center">
                        <p className="text-3xl text-center font-black p-3">Desafios solucionados</p>

                        <div className="h-[85%] p-4">
                            <CardPerfil data={cards} />
                        </div>
                        <div className="p-5">
                            <PaginationComponent page={page} setPage={setPage} count={page} />
                        </div>

                    </section>

                </div>

            </div>

            {open &&

                <div className="fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/25 ">
                    <p className="relative text-2xl font-black text-center mb-4">
                        Tem certeza que deseja excluir seu perfil?
                    </p>

                    <span className="my-4 text-lg font-light text-justify">
                        Esta alteração é permanente
                    </span>

                    <footer className="mt-4 flex gap-4 justify-between ">
                        <button onClick={() => setOpen(false)} className=" bg-violet-500  px-5 h-12 rounded-md font-semibold items-center flex hover:bg-violet-600">
                            Não
                        </button>

                        <button

                            type="submit"
                            onClick={handleRemove}
                            className="bg-zinc-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-zinc-600  "
                        >
                            Sim

                        </button>
                    </footer>
                </div>



            }

            <div className="overflow-hidden">
                <Footer />
            </div>



        </>
    )
}