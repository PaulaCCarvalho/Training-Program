import Autocomplete from '@mui/material/Autocomplete';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import { CheckSquare, Square } from 'phosphor-react';
import '../../styles/tags.css';
import { ThemeProvider, createTheme } from '@mui/material/styles'
import React, { useEffect, useState } from 'react';
import axios from 'axios';


interface TagsProp {
    id: number;
    nome: string;
}

export default function SelectTags({ datas, tags }: { datas: Function, tags: any }) {

    const [tag, setTag] = useState<TagsProp[]>([]);
    const [data, setData] = useState<TagsProp[]>(tag);

    useEffect(() => {
        axios.get('http://localhost:3333/api/tags')
            .then((response) => {
                setTag(response.data);
                //setData(tags.tags.slice(1, -1))
            })
            .catch((err) => {
                console.error("ops! ocorreu um erro" + err);
            });
    }, []);

    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
        },
    });

    return (
        <>

            <ThemeProvider theme={darkTheme}>
                <Autocomplete
                    onChange={(event, data) => { setData(data) }}
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
                    value={data}

                    className="bg-zinc-900"

                />

            </ThemeProvider>

            {datas("tags", data)}
        </>


    );
}