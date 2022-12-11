import { initialValueMember, MembroProps } from "./Membro";

export interface RankingProps extends MembroProps {
    ranking: number;
    solucoes: number;
    pontuacao: number;   
}

export const initialvalueMyRanking = {
    ...initialValueMember,
    ranking: 0,
    solucoes: 0,
    pontuacao: 0
}