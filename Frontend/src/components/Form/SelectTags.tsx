import Autocomplete from '@mui/material/Autocomplete';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import { CheckSquare, Square } from 'phosphor-react';
import { ThemeProvider, createTheme } from '@mui/material/styles'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useGlobal } from '../../Context/globalContext';


interface TagsProp {
    id: number;
    nome: string;
}

export default function SelectTags({ datas, formData }: { datas: Function, formData: any }) {

    const [tag, setTag] = useState<TagsProp[]>([]);
    const [data, setData] = useState<TagsProp[]>(formData.tags);
    const {change} = useGlobal()
    

    useEffect(() => {

        async function getTags() {
            try {
                const response =  await axios.get('http://localhost:3333/api/tags')
                setTag(response.data)
                
            } catch (error) {
                console.error("ops! ocorreu um erro" + error);
            }
        }

        getTags();

    }, [change]);

    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
        },
    });

    return (
        <>

            <ThemeProvider theme={darkTheme}>
                <Autocomplete
                    onChange={(event, data) => {  datas("tags", data); setData(data); }}
                    multiple={true}
                    id="checkboxes-tags-demo"
                    options={tag}
                    disableCloseOnSelect
                    getOptionLabel={(option) => option.nome}
                    renderOption={(props, option, { selected }) => (
                        <li {...props} >
                            <Checkbox
                                key={option.id}
                                icon={<Square size={20} className="text-white" />}
                                checkedIcon={<CheckSquare size={20} className="text-white" />}
                                checked={selected}
                            />
                            {option.nome}
                        </li>
                    )}

                    renderInput={(params) => (
                        <TextField {...params} label="Tags" placeholder="Tags" className='border-white' />
                    )}
                    value={formData.tags}

                    className="bg-zinc-900"

                />

            </ThemeProvider>
        </>


    );
}