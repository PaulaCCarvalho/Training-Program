import { createContext, useState, useContext, ReactNode } from 'react';

type GlobalData = {
    isAdmin: boolean;
    setIsAdmin: Function;
}

export const GlobalContext = createContext({} as GlobalData);

type GlobalContextProviderProps = {
    children: ReactNode;
}

export default function GlobalContextProvider({ children }: GlobalContextProviderProps) {
    const [isAdmin, setIsAdmin] = useState(true)

    return (
        <GlobalContext.Provider value={{
            isAdmin,
            setIsAdmin,

        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobal = () => { return useContext(GlobalContext); }