import { Checkbox, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";
import { useState } from "react";
import SelectTags from "./Form/SelectTags";

type Tag = {
    id: number;
    nome: string;
}

export default function FiltroPesquisa() {
    const [tags, setTags] = useState<Tag>({
        id: -1,
        nome: ''

    });

    const handleAttributeValue = (attribute: string, value: number | string) => {
        const newFormData = tags;
        if (attribute === "id" || attribute === "nome") {
            // newFormData[attribute] = value;
            setTags(newFormData)
        }
    }

    const [value, setValue] = useState('facil');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log("aaaaaa")
        setValue(event.target.value);
    };

    const [checked, setChecked] = useState(true);

    const handleChangeCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
    }

    return (

        <div className="ml-[45px] my-6 w-64  border-zinc-400 border-solid border-2 rounded-lg">

            <div className="flex justify-center text-3xl font-semibold text-white h-12 py-2 my-1">
                Filtros
            </div>

            <div className="my-1 flex items-center justify-center text-white h-20 py-3 px-3 bg-zinc-700">
                <FormControl className="w-60 " >

                    <p className="flex justify-start text-md font-medium">Dificuldade:</p>
                    <RadioGroup
                        row
                        aria-labelledby="nivel-radio-button"
                        name="row-radio-buttons-group"
                        defaultValue='facil'
                        sx={{width: 300}}
                    >
                        <FormControlLabel
                            value="facil"
                            control={
                                <Radio
                                    checked={value === 'facil'}
                                    onChange={(event) => handleChange(event)}
                                    value="facil"
                                    sx={{
                                        color: '#f97316',
                                        '&.Mui-checked': {
                                            color: '#f97316',
                                        },
                                        ":hover": '#f97316',
                                        '& .MuiSvgIcon-root': {
                                            fontSize: 18,
                                          },
                                        marginRight: -0.5,

                                    }}
                                />}
                            label="Fácil"
                            />

                        <FormControlLabel
                            value="medio"
                            control={
                                <Radio
                                    checked={value === 'medio'}
                                    onChange={(event) => handleChange(event)}
                                    value="medio"
                                    size="small"
                                    sx={{
                                        color: '#f97316',
                                        '&.Mui-checked': {
                                            color: '#f97316',
                                        },
                                        '& .MuiSvgIcon-root': {
                                            fontSize: 18,
                                          },
                                        marginRight: -0.5,
                                    
                                    }}
                                />}
                            label="Médio" />
                        <FormControlLabel
                            value="dificil"
                            control={
                                <Radio
                                    checked={value === 'dificil'}
                                    onChange={(event) => handleChange(event)}
                                    value="dificil"
                                    size="small"
                                    sx={{
                                        color: '#f97316',
                                        '&.Mui-checked': {
                                            color: '#f97316',
                                        },
                                        '& .MuiSvgIcon-root': {
                                            fontSize: 18,
                                          },
                                        marginRight: -0.5,

                                    }}
                                />}
                            label="Difícil" />

                    </RadioGroup>
                </FormControl>
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
                    <SelectTags datas={handleAttributeValue} formData={tags} />
                </div>

            </div>
        </div>
    )
}
