import Autocomplete from '@mui/material/Autocomplete';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import { CheckSquare, Square } from 'phosphor-react';
import '../../styles/tags.css';
import { ThemeProvider, createTheme } from '@mui/material/styles'

export default function SelectTags() {
    const tags = [
        { id: 1, name: 'HTML' },
        { id: 2, name: 'JS' },
        { id: 3, name: 'CSS' },
        { id: 4, name: 'Java' },
        { id: 5, name: 'Python' },
        { id: 6, name: 'C++' },

    ]

    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
        },
    });

    return (

        <ThemeProvider theme={darkTheme}>
            <Autocomplete
                multiple
                id="checkboxes-tags-demo"
                options={tags}
                disableCloseOnSelect
                getOptionLabel={(option) => option.name}
                renderOption={(props, option, { selected }) => (
                    <li {...props} >
                        <Checkbox
                            icon={<Square size={20} className="text-white" />}
                            checkedIcon={<CheckSquare size={20} className="text-white" />}
                            checked={selected}
                        />
                        {option.name}
                    </li>
                )}
                renderInput={(params) => (
                    <TextField {...params} label="Tags" placeholder="Tags" className='border-white' />
                )}

                className="bg-zinc-900"

            />
        </ThemeProvider>

    );
}