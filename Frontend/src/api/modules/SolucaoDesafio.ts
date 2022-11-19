
export interface Solucao{
    challenge_id: number;
    member_id: number
    linkCode: string;
    nota: number;
    descricao: string;
    curtidas: number;
    foto: string;
    nome: string;
}


export const initValuesSolucao = {
    challenge_id: 0,
    member_id: 0,
    linkCode: '',
    nota: -1,
    descricao: '',
    curtidas: 0,
    foto: '',
    nome:''
}