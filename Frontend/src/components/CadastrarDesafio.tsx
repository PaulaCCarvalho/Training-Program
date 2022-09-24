import { Plus } from "phosphor-react";
import * as Dialog from '@radix-ui/react-dialog';

export default function CadastrarDesafio() {
    return (
        <>
            <Dialog.Root>
                <Dialog.Trigger className="bg-[#4F545C] text-white px-2 py-2 rounded-3xl hover:bg-slate-100 hover:text-[#4F545C] delay-200">
                    <Plus size={32} />
                </Dialog.Trigger>
                <Dialog.Portal>
                    <Dialog.Overlay className="bg-black/70 inset-0 fixed " />

                    <Dialog.Content className="fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/25">
                        <Dialog.Title  className="text-3xl font-black">
                            Cadastre um desafio
                        </Dialog.Title>

                        <footer className="mt-4 flex justify-end gap-4">
                <Dialog.Close
                  className="bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600" 

                >
                  Cancelar
                </Dialog.Close>

                <button 
                  type="submit" 
                  className="bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600"
                >
                  Salvar
                </button>
              </footer>

                    </Dialog.Content>

                    
                </Dialog.Portal>
            </Dialog.Root>
        </>


    )
}