
export interface MembroProps{
    id: number,
    nome: string,
    bio: string,
    links: Array<LinkProps>,
    email: string,
    isAdm: boolean
    foto: string,

}

export interface LinkProps{
    id: number,
    titulo: string,
    url: string,
}