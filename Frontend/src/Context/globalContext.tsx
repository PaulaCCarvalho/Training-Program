import { createContext, useState, useContext, ReactNode } from 'react';
import React from 'react';

type GlobalData = {
    isAdmin: boolean;
    setIsAdmin: Function;
    isMembro: boolean;
    setIsMembro: Function;
    change: number;
    update: Function;

}

export const GlobalContext = createContext({} as GlobalData);

type GlobalContextProviderProps = {
    children: ReactNode;
}

export default function GlobalContextProvider({ children }: GlobalContextProviderProps) {
    const [isAdmin, setIsAdmin] = useState(false)
    const [isMembro, setIsMembro] = useState(false)
    const [change, setChange] = useState(0)
    const update = () => {
        setChange(change + 1);
    }

    return (
        <GlobalContext.Provider value={{
            isAdmin,
            setIsAdmin,
            isMembro,
            setIsMembro,
            change,
            update,
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobal = () => { return useContext(GlobalContext); }