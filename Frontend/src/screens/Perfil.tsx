import { Avatar } from "@mui/material";
import * as Dialog from '@radix-ui/react-dialog';
import { useFormik } from "formik";
import { Link } from "phosphor-react";
import { useEffect, useState } from "react";
import DialogAddLink from "../components/DialogAddLink";
import DialogEditPerfil from "../components/DialogEditPerfil";
import Footer from "../components/Footer";
import { Menu } from "../components/Menu";
import { PaginationComponent } from "../components/PaginationComponent";



export default function Perfil() {

    const [page, setPage] = useState(3)

    const [links, setLinks] = useState([
        { id: 1, titulo: 'GitHub', link: 'https://github.com/' },
        { id: 2, titulo: 'Linkedin', link: 'https://www.linkedin.com/' },
    ])

    const [membro, setMembro] = useState(
        {
            nome: "Amanda Souza",
            bio: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sunt cumque ipsum optio magnam, distinctio voluptatum explicabo, consequuntur odio aliquid corrupti, quas non. Rerum quibusdam cumque, culpa voluptat saepe mollitia. Molestiae.`,
            urls: links,
            email: "amandasouza@gmail.com",
            desafiosResolvidos: 12,
            posRanking: 124,
            pontuação: 4521,
        }
    )

    const formikPerfil = useFormik({
        initialValues: {
            nome: membro.nome,
            bio: membro.bio,
            email: membro.email,
        },
        onSubmit: values => {

        }
    })

    const formikLink = useFormik({
        initialValues: {
            id: 0,
            titulo: "",
            link: "",
        },
        onSubmit: values => {
            const validLink = new RegExp('^https{0,1}:\/\/')

            formikLink.values.id = Math.floor(Math.random() * 1000)

            if (values.link !== '') {

                if (!validLink.test(values.link)) {
                    {values.titulo === '' && (values.titulo = values.link)}
                    values.link = 'https://' + values.link     
                }else{
                    {values.titulo === '' && (values.titulo = values.link.split('//')[1])}
                    
                }

                setLinks([...links, values]);


                const elements = document.querySelectorAll('input')

                elements.forEach(element => {
                    element.value = ""
                });
                formikLink.values.titulo = ''

                console.log("Formik", values);
                console.log("State", links)
            }

        },
    });

    return (
        <>
            <Menu />

            <div className=" w-[80%] h-full mx-auto flex flex-row text-white gap-5 m-8 justify-center">

                <section className="relative bg-zinc-700 w-[30%] h-full col-start-1 col-end-2 flex flex-col items-center justify-center py-12 rounded-md">

                    <DialogEditPerfil formik={formikPerfil} links={links} setLinks={setLinks} />

                    <Avatar alt="Amanda Souza" src="profile.jpg" sx={{ width: 200, height: 200 }} />

                    <p className="my-8 font-medium text-3xl ">{membro.nome}</p>

                    <p className="px-10 text-justify text-md">
                        {membro.bio}
                    </p>

                    <p className="px-10 my-6 font-medium text-justify text-lg">{membro.email}</p>


                    {
                        links.map((link) => {
                            return (
                                <a
                                    key={link.id}
                                    href={link.link}
                                    target={"_blank"}
                                    className="flex flex-col px-10 py-2  font-medium text-justify text-xl hover:text-violet-400"
                                >{link.titulo === '' ? link.link.split('//')[1] : link.titulo}</a>
                            )
                        })
                    }

                    <DialogAddLink formik={formikLink} />

                </section>

                <div className="flex flex-col w-[60%] gap-4">
                    <section className="bg-zinc-700 rounded-md flex flex-row gap-8 justify-center text-center font-black text-xl px-6 py-10">
                        <div className="w-[28%]">
                            <p>Desafios resolvidos</p>
                            <p>{membro.desafiosResolvidos}</p>
                        </div>

                        <div className="w-[28%]">
                            <p>Posição no ranking</p>
                            <p>{membro.posRanking}°</p>
                        </div>

                        <div className="relative flex flex-col items-center w-[28%] ">
                            <p>Pontuação total</p>
                            <div className="absolute flex items-center bottom-0">
                                <p>{membro.pontuação}</p>
                                <img
                                    src="duck.png"
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
                        <div className="">
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