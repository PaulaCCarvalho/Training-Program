import * as Select from '@radix-ui/react-select';
import { CaretDown, CaretUp, Check } from 'phosphor-react';
import { useState } from 'react';

export default function SelectDifficulty({data, formData = 'Dificuldades'}: {data: Function, formData: any} ) {
    const [ difficulty, setDifficulty] = useState(formData.nivel);

    const changeValue = () => { 
        if(formData.nivel === 'facil'){
            return 'Fácil';
        }

        if(formData.nivel === 'medio' ){
            return 'Médio';
        }

        if(formData.nivel === 'dificil'){
            return 'Difícil';
        }

        return 'Dificuldades'
    }
    return (
        <>
           <Select.Root onValueChange={(val) => { data("nivel", val); setDifficulty(val); }} >
                <Select.Trigger aria-label='nivel' className="inline-flex items-center w-[124px] rounded px-3 py-[14px] gap-2 bg-zinc-900 shadow-sm shadow-black/25  justify-center hover:bg-zinc-800">
                    <Select.Value>
                        {changeValue()}
                    </Select.Value>

                    <Select.Icon>
                        <CaretDown size={20} />
                    </Select.Icon>
                </Select.Trigger>

                <Select.Content className='overflow-hidden bg-zinc-900 rounded-md shadow-md shadow-black/25 items-center '>
                    <Select.ScrollUpButton className='flex items-center justify-center h-6 bg-zinc-900 cursor-default'>
                        <CaretUp size={20} />
                    </Select.ScrollUpButton>

                    <Select.Viewport className='w-28 mx-1'>
                        <Select.Group>

                            <Select.Item value="facil" className='rounded flex items-center h-8 p-2 select-none hover:bg-zinc-800'>
                                <Select.ItemText>Fácil</Select.ItemText>
                                <Select.ItemIndicator className='left-0 w-6 inline-flex items-center justify-center'>
                                    <Check />
                                </Select.ItemIndicator>
                            </Select.Item>

                            <Select.Item value="medio" className='rounded flex items-center h-8 p-2 select-none hover:bg-zinc-800'>
                                <Select.ItemText>Médio</Select.ItemText>
                                <Select.ItemIndicator className='left-0 w-6 inline-flex items-center justify-center'>
                                    <Check />
                                </Select.ItemIndicator>
                            </Select.Item>

                            <Select.Item value="dificil" className='rounded flex items-center h-8 p-2 select-none hover:bg-zinc-800'>
                                <Select.ItemText>Difícil</Select.ItemText>
                                <Select.ItemIndicator className='left-0 w-6 inline-flex items-center justify-center'>
                                    <Check />
                                </Select.ItemIndicator>
                            </Select.Item>


                        </Select.Group>
                    </Select.Viewport>
                    <Select.ScrollDownButton className='flex items-center justify-center h-6 bg-zinc-900 cursor-default'>
                        <CaretDown size={20} />
                    </Select.ScrollDownButton>

                </Select.Content>
            </Select.Root>

         

        </>
    )
}