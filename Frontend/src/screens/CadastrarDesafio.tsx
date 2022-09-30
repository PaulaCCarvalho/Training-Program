
import { Link, Navigate} from "react-router-dom";
import { Input } from "../components/Form/Input";
import { FormEvent, useState } from "react";
import SelectDifficulty from "../components/Form/SelectDifficulty";
import SelectTags from "../components/Form/SelectTags";
import { Menu } from "../components/Menu";
import { useForm } from "react-hook-form";

type UserSubmitForm = {
  nome: string;
  descricao: string;
  tema: string;
  imagens: string;
  nivel: string;
  tags: [];

}


export default function CadastrarDesafio() {
  //const [selectFile, setSelectFile] = useState<File>({}: Blob);

  const { register, handleSubmit } = useForm<UserSubmitForm>();

  const onSubmit = (data: UserSubmitForm) => {
    console.log("Passei aqui!")
    console.log(JSON.stringify(data, null, 2))

    //onFileUpload();
  }

  const onFileChange = (e: any) => {
    /*setSelectFile(e.target.files[0]);*/
  }

  const onFileUpload = () => {
    /*     const formData = new FormData();
    
        formData.append(
          "myFile",
          selectFile,
        )
    
        const url = URL.createObjectURL(selectFile)
        console.log(url); */

  }
  return (
    <>
      <Menu />

      <div className="w-full h-1/2 flex flex-col items-center">

        <div className="overflow-auto  bg-[#2A2634] py-9 px-9 text-white rounded-lg shadow-lg shadow-black/25 w-[800px] m-6">
          <div className="text-3xl font-black text-center">
            Cadastre um desafio
          </div>

          <form action='' onSubmit={(e) => handleSubmit(onSubmit)} className="mt-8 flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label htmlFor="">Nome</label>
              <Input id="nome" type="text" placeholder="nome do desafio"  {...register("nome")} />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="">Descrição</label>
              <textarea
                className="bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500"
                rows={5}
                cols={5}
                placeholder="Descreva o desafio"
                {...register("descricao")}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="">Tema</label>
              <Input id="tema" type="text" placeholder="insira o tema do desafio"  {...register("tema")} />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="">Imagens</label>
              <Input id="capa" type="file" placeholder="insira imagens do desafio" {...register("imagens")} />
            </div>

           {/*  <div className="flex items-center gap-3">

              <SelectDifficulty />
              <div className="flex-1">
                <SelectTags />
              </div>
            </div> */}

            <footer className="mt-4 flex gap-4 justify-between ">
              <Link to="/"
                className="bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600 items-center flex"

              >
                Cancelar
              </Link>

              <Link to="/"
                type="submit"
                className="bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600"
              >
                Salvar
              </Link>
            </footer>
          </form>

        </div>
      </div>
    </>


  )
}