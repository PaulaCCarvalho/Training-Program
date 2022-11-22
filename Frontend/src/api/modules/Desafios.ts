
export interface Desafio{
    id: number;
    nome: string;
    descricao: string;
    nivel: string;
    tema: string;
    capa: string;
    available: number;
    tags: Tags[];
}

export interface Tags {
    id: number;
    nome: string;
}

export const initValuesDesafio = { 
    id: 0,
    nome: '',
    descricao:'',
    nivel: '',
    tema: '',
    capa: '',
    available: 0,
    tags: [],
}