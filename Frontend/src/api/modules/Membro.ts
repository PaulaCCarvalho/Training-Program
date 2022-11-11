
export interface MembroProps{
    id: number,
    nome: string,
    bio: string,
    links: Array<LinkProps>,
    email: string,
    foto: string,

}

export interface LinkProps{
    id: number,
    titulo: string,
    url: string,
}