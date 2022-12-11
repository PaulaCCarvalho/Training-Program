
export interface MembroProps{
    id: number,
    nome: string,
    bio: string,
    links: Array<LinkProps>,
    email: string,
    isAdm: number,
    foto: string,

}

export interface LinkProps{
    id: number,
    titulo: string,
    url: string,
}

export const initialValueMember = {
    id: 0,
    nome: '',
    bio: '',
    links: [],
    email: '',
    isAdm: 0,
    foto: '',
}