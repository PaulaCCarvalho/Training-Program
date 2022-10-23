import { Avatar } from "@mui/material";
import * as Dialog from '@radix-ui/react-dialog';
import axios from "axios";
import { useFormik } from "formik";
import { Link } from "phosphor-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
}

export default function Perfil() {
    const { isMembro } = useGlobal()
    const [page, setPage] = useState(3)
    const [change, setChange] = useState(0)
    const [myPerfil, setMyPerfil] = useState(false)
    const id = localStorage.getItem('id');
    const idParam = useParams()

    const update = () => {
        setChange(change + 1);
    }

    const [membro, setMembro] = useState<member>(
        {
            id: 0,
            nome: "Carregando...",
            bio: `Carregando...`,
            links: [],
            email: "Carregando...",
        }
    )

    const formikPerfil = useFormik({
        initialValues: {
            nome: membro.nome,
            bio: membro.bio,
            email: membro.email,
        },
        onSubmit: async (valuesPerfil) => {
            
            
            const updatedMember = {...valuesPerfil, links: membro.links, id: membro.id};

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


            const elements = document.querySelectorAll('input')

            elements.forEach(element => {
                element.value = ""
            });

            formikLink.values.titulo = ''



        },
    });

    return (
        <>
            <Menu />

            <div className=" w-[80%] h-full mx-auto flex flex-row text-white gap-5 m-8 justify-center">

                <section className="relative bg-zinc-700 w-[30%] h-full col-start-1 col-end-2 flex flex-col items-center justify-center py-12 rounded-md">

                    {myPerfil && <DialogEditPerfil formik={formikPerfil} membro={membro} setMembro={setMembro} />}

                    <Avatar alt="Amanda Souza" src="/profile.jpg" sx={{ width: '15vw', height: '15vw', bgcolor: '#F68B1F', fontSize: '5vw' }} />

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
                            Cards
                        </div>
                        <div className="p-5">
                            <PaginationComponent page={page} setPage={setPage} count={page} />
                        </div>

                    </section>

                </div>

            </div>

            <div className="overflow-hidden">
                <Footer />
            </div>



        </>
    )
}