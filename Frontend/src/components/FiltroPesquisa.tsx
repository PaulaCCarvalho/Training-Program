import { Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Radio, RadioGroup } from "@mui/material";
import { ChangeEvent, useState } from "react";
import SelectTags from "./Form/SelectTags";



export default function FiltroPesquisa({ search, setSearch, setPage, req }: { search: any, setSearch: Function, setPage: Function, req: Function }) {


    const handleAttributeValue = (attribute: string, value: number | string | any) => {
        const newFormData = search;
        if (attribute === "tags") {
            newFormData[attribute] = value;
            setSearch(newFormData)
        }
    }

    const [value, setValue] = useState({
        facil: false,
        medio: false,
        dificil: false,
    });

    const { facil, medio, dificil } = value

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue({
            ...value,
            [event.target.name]: event.target.checked,
        });
    };

    const [checked, setChecked] = useState(true);

    const handleChangeCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
    }

    function searchDificuldade() {
        const aux = [];

        if (facil === true) {
            aux.push('facil');
        }

        if (medio === true) {
            aux.push('medio')
        }

        if (dificil === true) {
            aux.push('dificil')
        }

        return aux

    }
    function handleChangeInput(event: ChangeEvent<{ value: any }>) {
        search.nome = event.target.value;
    }

    function handleClick() {
        setPage(1)
        req()
    }

    search.nivel = searchDificuldade();
    search.respondidas = checked;

    return (

        <div className="ml-[45px] my-6 w-64  border-zinc-400 border-solid border-2 rounded-lg">

            <div className="flex justify-center text-3xl font-semibold text-white h-12 py-2 my-1">
                Filtros
            </div>

            <div className="my-1 flex items-start text-white h-20 py-3 px-3 bg-zinc-700">
                <FormGroup className="w-60" >
                    <p className="text-md font-medium">Dificuldade:</p>

                    <div className="inline-flex">
                        <FormControlLabel
                            value="facil"
                            control={
                                <Checkbox
                                    checked={facil}
                                    onChange={(event) => handleChange(event)}
                                    name="facil"
                                    inputProps={{ 'aria-label': 'controlled' }}
                                    sx={{
                                        color: '#f97316',
                                        '&.Mui-checked': {
                                            color: '#f97316',
                                        },
                                        '& .MuiSvgIcon-root': { fontSize: 18 },
                                        marginRight: -0.5,

                                    }}
                                />
                            }
                            label="Fácil"
                        />

                        <FormControlLabel
                            value="medio"
                            control={
                                <Checkbox
                                    checked={medio}
                                    onChange={(event) => handleChange(event)}
                                    name="medio"

                                    inputProps={{ 'aria-label': 'controlled' }}
                                    sx={{
                                        color: '#f97316',
                                        '&.Mui-checked': {
                                            color: '#f97316',
                                        },
                                        '& .MuiSvgIcon-root': { fontSize: 18 },
                                        marginRight: -0.5,
                                    }}
                                />}
                            label="Médio" />

                        <FormControlLabel
                            value="dificil"
                            control={
                                <Checkbox
                                    checked={dificil}
                                    onChange={(event) => handleChange(event)}
                                    name="dificil"
                                    inputProps={{ 'aria-label': 'controlled' }}
                                    sx={{
                                        color: '#f97316',
                                        '&.Mui-checked': {
                                            color: '#f97316',
                                        },
                                        '& .MuiSvgIcon-root': { fontSize: 18 },
                                        marginRight: -0.5,
                                    }}
                                />}
                            label="Difícil"
                        />

                    </div>
                </FormGroup>
            </div>

            <div className="gap-4 my-1.5 flex items-center justify-between text-white h-14 py-3 px-3 bg-zinc-700">
                <p className="flex justify-start text-md font-medium"> Respondidas: </p>
                <Checkbox
                    checked={checked}
                    onChange={handleChangeCheckbox}
                    inputProps={{ 'aria-label': 'controlled' }}
                    sx={{
                        color: '#f97316',
                        '&.Mui-checked': {
                            color: '#f97316',
                        },
                    }}
                />
            </div>

            <div className="gap-4 mt-1.5 rounded-b-lg flex flex-col justify-start text-white py-3 px-3 bg-zinc-700">
                <p className="flex justify-start text-md font-medium " > Tags: </p>
                <div>
                    <SelectTags datas={handleAttributeValue} formData={search} />
                </div>

            </div>          

            <div className="gap-4 mt-1.5  flex flex-col justify-start text-white py-3 px-3 bg-zinc-700 ">
                <p className="flex justify-start text-md font-medium " > Pesquisa por nome: </p>
                <input onChange={(event) => { handleChangeInput(event) }} type="text" name="nome" className="bg-zinc-900 py-4 px-4 rounded text-sm placeholder:text-zinc-500 " placeholder="nome do desafio" />
            </div>

            <div className="gap-4 mt-1.5 flex flex-col justify-start text-white py-3 px-3  ">

                <button onClick={handleClick} className="bg-violet-500 px-7 h-11 text-1xl rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600 justify-center">
                    Pesquisar
                </button>

            </div>
        </div >
    )
}
