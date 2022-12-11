import { initialValueMember, MembroProps } from "./Membro";

export interface RankingProps extends MembroProps {
    ranking: number;
    numSolutions: number;
    pontuacao: number;   
}

export const initialvalueMyRanking = {
    ...initialValueMember,
    ranking: 0,
    numSolutions: 0,
    pontuacao: 0
}