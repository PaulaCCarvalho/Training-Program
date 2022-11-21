
export interface Solucao{
    challenge_id: number;
    idMember: number
    linkCode: string;
    nota: number;
    descricao: string;
    likes: number;
    foto: string;
    nome: string;
    hasLiked: number | boolean;
    id: number;
}

export interface SolutionComment {
    id: number;
    nome: string;
    foto: string;
    body: string;
    likes: string;
    hasLiked: number | boolean
    idMember: number

}

export const initValueSolutionComment = {
    id:0,
    nome: '',
    foto: '',
    body: '',
    likes: '',
    hasLiked: false,
    idMember: 0
}


export const initValuesSolucao = {
    challenge_id: 0,
    idMember: 0,
    linkCode: '',
    nota: -1,
    descricao: '',
    likes: 0,
    foto: '',
    nome:'',
    id: 0,
    hasLiked: false,
}