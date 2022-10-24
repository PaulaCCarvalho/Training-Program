
export interface CardDesafioProps {
    id: number;
    nome: string;
    descricao: string;
    nivel: string;
    tema: string;
    capa: string;
    availabel: number;
    tags: [];
    imagens: [];
}

export function CardPerfil({data}: {data: any}) {

    function iconLevel(){
        if(data.nivel === 'facil'){
            return '../../easy.png';
        }
        if(data.nivel === 'medio'){
            return '../../medium.png';
        }
        if(data.nivel === 'dificil'){
            return '../../hard.png';
        }

    }

    const renderTags = () => {
        return (data.tags.map((tag: {id: number, nome: string}) => {
            return (
                <div key={tag.id} className="px-6 py-1 border border-yellow-300 rounded-3xl">
                    <p className="text-yellow-300">{tag.nome}</p>
                </div>
            )
        }))
    }

    const padrao = ['', null, undefined]

    return (
        <div className="w-[200px] m-6 bg-zinc-700 text-white rounded-[14px] shadow-lg shadow-black/30">
            <div className="relative">
                <img className="rounded-t-[14px]  " src={/* padrao.includes(data.capa)? */ '../../imgDesafio.jpg'/* : data.capa  */} alt="" />
                <img 
                    className="absolute bottom-3 right-3 h-6" 
                    src={data.nivel ? iconLevel() : '../../default-icon.svg' } 
                    alt="" />

            </div>
            <div className="flex flex-col py-6 px-6 gap-4 items-start ">
                <span className="text-sm">{data.nome}</span>
                <span className="overflow-hidden  max-h-14 text-start overflow-ellipsis text-sm">{data.descricao}</span>

                 <div className="px-2 py-1 border border-orange-500 rounded-3xl ">
                   <p className="text-orange-500">{data.tema}</p> 
                </div>
                {/* <div className="flex flex-wrap w-[20%] gap-1.5">
                    {renderTags()}
                </div>  */}
                
            </div>
        </div>
    )
}