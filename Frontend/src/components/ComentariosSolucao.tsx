
import axios from 'axios'
import { ThumbsDown, ThumbsUp } from 'phosphor-react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { CardPerfil } from './CardPerfil'
import { Menu } from './Menu'

export default function ComentatiosSolucao() {
    const idParam = useParams()
    const [cards, setCards] = useState({
        id: 0,
        nome: '',
        descricao: '',
        nivel: '',
        tema: '',
        capa: '',
        availabel: 0,
        tags: [],
    });

    useEffect(() => {
        axios.get(`http://localhost:3333/api/desafio/3`)
            .then((response) => {
                setCards(response.data)
            })
            .catch(() => console.log('Ops deu ruim!'))

    }, [])

    const renderTags = () => {
        return (cards.tags.map((tag: { id: number, nome: string }) => {
            return (
                <p className="upercase text-[0.65rem] text-indigo-300 "><i>#{tag.nome}</i></p>
            )
        }))
    }

    return (

        <>
        <Menu />
        <div className="relative my-14 w-[50vw] m-auto bg-zinc-700/50 rounded-md h-full flex flex-col items-center">

            <div className="mb-4 flex flex-row w-auto bg-zinc-700 text-white rounded-md shadow-md shadow-black/25  overflow-hidden">
                <div className="flex">
                    <div className="shrink-0 relative rounded-l-sm">
                        <img className="w-full object-cover  xl:h-full xl:w-40" src={/* padrao.includes(desafio?.capa) ?  */'../../imgDesafio.jpg' /* : desafio?.capa */} alt="" />
                        <div className='w-full pt-24 pb-2 px-2 bg-desafio-gradient absolute bottom-0 left-0 right-0'>
                            <p className="uppercase text-orange-200/95 text-sm mt-2">{cards.tema}</p>

                            <div className="flex flex-wrap gap-1.5">
                                {renderTags()}
                            </div>

                        </div>
                    </div>
                    <div className="flex-col p-2 w-[40vw]">
                        <div className="flex justify-between">
                            <a href="https://google.com" className="uppercase tracking-wide text-md text-white font-medium my-1">{cards.nome}</a>
                            <div className="flex p-1 bg-indigo-500 rounded-md items-center">
                                <p className="font-black text-[0.75rem] text-neutral-100 ">Parcialmente Solucionado</p>
                            </div>
                        </div>

                        <div>
                            <p className="text-orange-200/95">Solução</p>
                            <p className="my-1 text-[0.75rem] font-light text-justify mr-2 border-b-2 border-zinc-500 py-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis ab hic obcaecati laborum assumenda rem magni
                                perferendis animi dolorum dolorem omnis nesciunt eligendi, id ex laboriosam inventore, accusantium corrupti eum.</p>
                        </div>

                        <div className="flex gap-2 items-center">
                            <button className="flex gap-2 items-center hover:bg-zinc-600 p-2 rounded-md" title="Link da Solução">
                                <img src="../../github.svg" alt="logo github" className="w-[1.5vw]" />
                                <p className="font-black text-sm text-neutral-100">GitHub</p>
                            </button>

                            <button className="hover:bg-zinc-600 p-2 rounded-md" title="Gostei">
                                <ThumbsUp size={20} className="text-indigo-300" />
                            </button>

                            <p className="font-black text-sm text-neutral-100">14</p>

                            <button className="hover:bg-zinc-600 p-2 rounded-md" title="Não gostei">
                                <ThumbsDown size={20} className="text-indigo-300" />
                            </button>

                        </div>

                    </div>
                </div>
            </div>


        </div></>
    )
}