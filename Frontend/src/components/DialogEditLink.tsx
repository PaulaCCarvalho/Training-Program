import { useFormik } from 'formik';
import { ElementType, useState } from 'react';
import React from 'react';


export default function DialogEditLink({ stateLink, setStateLink, membro,  }: { stateLink: any, setStateLink: Function, membro: any }) {

    const formik = useFormik({
        initialValues: {
            id: stateLink.link.id,
            titulo: stateLink.link.titulo,
            url: stateLink.link.url,
        },
        onSubmit: values => {
            const index = membro.links.findIndex((link: any) => values.id === link.id)
            const validLink = new RegExp('^https{0,1}:\/\/')

            if (!validLink.test(values.url)) {
                values.url = 'https://' + values.url
            }

            membro.links[index] = {
                id: values.id,
                titulo: values.titulo,
                url: values.url,
            }
            console.log(membro.links[index])

            setStateLink(stateLink.isSelected = false)
   
            
        }
    })

    return (
        <div className="absolute top-0 left-0 w-[880px] h-full bg-black bg-opacity-60 rounded-lg">
            <div className="fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/25 ">
                <div className="relative text-2xl font-black text-center">
                    Edite o link do seu perfil
                </div>

                <span className="py-4 text-sm font-light text-justify">
                    Preencha os campos abaixo para modificar o link abaixo no seu perfil.
                </span>

                <form onSubmit={formik.handleSubmit} className="mt-2 flex flex-col">
                    <div className="flex flex-col gap-1">
                        <label htmlFor="titulo">Título do link</label>
                        <input
                            id="titulo"
                            name='titulo'
                            type="text"
                            placeholder="nome do link"
                            onChange={formik.handleChange}
                            defaultValue={formik.values.titulo}
                            className="bg-zinc-900 py-4 px-4 rounded text-sm placeholder:text-zinc-500 "
                        />

                        <label htmlFor="url" aria-required className='pt-3'>Url do link</label>
                        <input
                            id="url"
                            name="url"
                            type="text"
                            placeholder="https://google.com"
                            onChange={formik.handleChange}
                            defaultValue={formik.values.url}
                            required
                            className="bg-zinc-900 py-4 px-4 rounded text-sm placeholder:text-zinc-500"
                        />
                    </div>

                    <footer className="mt-4 flex gap-4 justify-between ">
                        <button type="button" onClick={() => setStateLink(stateLink.isSelected = false)} className="bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600 items-center flex">
                            Cancelar
                        </button>

                        <button
                            type="submit"
                            className="bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600"
                        >
                            Salvar

                        </button>

                    </footer>

                </form>

            </div>
        </div>
    )
}