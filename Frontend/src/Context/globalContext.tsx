import { createContext, useState, useContext, ReactNode } from 'react';

type GlobalData = {
    isAdmin: boolean;
    setIsAdmin: Function;
    isMembro: boolean;
    setIsMembro: Function;
}

export const GlobalContext = createContext({} as GlobalData);

type GlobalContextProviderProps = {
    children: ReactNode;
}

export default function GlobalContextProvider({ children }: GlobalContextProviderProps) {
    const [isAdmin, setIsAdmin] = useState(false)
    const [isMembro, setIsMembro] = useState(false)

    return (
        <GlobalContext.Provider value={{
            isAdmin,
            setIsAdmin,
            isMembro,
            setIsMembro,
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobal = () => { return useContext(GlobalContext); }