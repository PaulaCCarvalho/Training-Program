
import { Link, useNavigate } from "react-router-dom";
import { Input } from "../components/Form/Input";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import SelectDifficulty from "../components/Form/SelectDifficulty";
import SelectTags from "../components/Form/SelectTags";
import { Menu } from "../components/Menu";
import axios from "axios";
import { number } from "yup/lib/locale";

type UserSubmitForm = {
  nome: string;
  descricao: string;
  tema: string;
  imagens: string;
  nivel: string;
  tags: Tag[] | string[] | number[];

}

type Tag = {
  id: number;
  nome: string;
}

export default function CadastrarDesafio() {
  //const [selectFile, setSelectFile] = useState<File>({}: Blob);

  const navigate = useNavigate();

  const [formData, setFormData] = useState<UserSubmitForm>({
    nome: '',
    descricao: '',
    tema: '',
    imagens: '',
    nivel: '',
    tags: []
  });


  const handleAttribute = (attribute: string, event: ChangeEvent<{ value: any }>) => {
    const newFormData = formData;
    if (attribute === "descricao" ||
      attribute === "nome" ||
      attribute === "tema" ||
      attribute === "imagens" ||
      attribute === "nivel" ||
      attribute === "tags") {
      newFormData[attribute] = event.target.value;
      setFormData(newFormData)
    }
  }

  const handleAttributeValue = (attribute: string, value: any) => {
    const newFormData = formData;
    if (attribute === "nivel" ||
      attribute === "tags") {
      newFormData[attribute] = value;
      setFormData(newFormData)
    }
  }

  const handleClick = async () => {
    const tags = []
    for (let tag of formData.tags) {
      if (typeof tag !== 'string' && typeof tag !== 'number') {
        tags.push(tag.id)
      }
    }
    formData.tags = tags
    try {
      await axios.post('http://localhost:3333/api/desafio', formData)
    } catch (err) {
      console.error("ops! ocorreu um erro" + err);
    }

    navigate(-1);
  }

  /*  const onSubmit = (data: UserSubmitForm) => {
      console.log("Passei aqui!")
      console.log(JSON.stringify(data, null, 2))
  
      //onFileUpload();
    } */

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

          <form className="mt-8 flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label htmlFor="">Nome</label>
              <Input id="nome" type="text" placeholder="nome do desafio" data={handleAttribute} />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="">Descrição</label>
              <textarea
                className="bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500"
                rows={5}
                cols={5}
                placeholder="Descreva o desafio"
                onChange={(event) => handleAttribute("descricao", event)}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="">Tema</label>
              <Input id="tema" type="text" placeholder="insira o tema do desafio" data={handleAttribute} />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="">Imagens</label>
              <Input id="capa" type="file" placeholder="insira imagens do desafio" data={handleAttribute} />
            </div>

            <div className="flex items-center gap-3">

              <SelectDifficulty data={handleAttributeValue} formData={formData} />

              <div className="flex-1">
                <SelectTags datas={handleAttributeValue} formData={formData} />
              </div>
            </div>

            <footer className="mt-4 flex gap-4 justify-between ">
              <Link to="/"
                className="bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600 items-center flex"

              >
                Cancelar
              </Link>

              {/* <Link to="/"> */}
              <button
                type="button"
                onClick={handleClick}
                className="bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600"
              >
                Salvar
              </button>
              {/* </Link> */}
            </footer>
          </form>

        </div>
      </div>
    </>


  )
}