
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

export function CardDesafio({data}: {data: CardDesafioProps}) {

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

    const padrao = ['', null, undefined]

    return (
        <div className="m-6 bg-zinc-700 w-72  text-white rounded-[14px] shadow-lg shadow-black/30">
            <div className="relative">
                <img className="rounded-t-[14px]  " src={padrao.includes(data.capa)? '../../imgDesafio.jpg': data.capa } alt="" />
                <img 
                    className="absolute bottom-3 right-3" 
                    src={data.nivel ? iconLevel() : '../../default-icon.svg' } 
                    alt="" />

            </div>
            <div className="flex flex-col py-6 px-6 gap-4 items-start ">
                <span className="text-lg">{data.nome}</span>
                <span className="text-sm">{data.descricao}</span>

                <div className="px-6 py-1 border border-yellow-300 rounded-3xl ">
                   <p className="text-yellow-300">{data.tema}</p> 
                </div>
            </div>
        </div>
    )
}