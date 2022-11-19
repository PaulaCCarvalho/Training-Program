import { InputHTMLAttributes } from "react";
import React from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement>{data: Function}
import React from 'react';

export function Input(props: InputProps){
    const {data,...filteredProps} = props
    return (
        <input 
        {...filteredProps} 
        onChange={(event) => props.data(props.id, event)}
        className="bg-zinc-900 py-4 px-4 rounded text-sm placeholder:text-zinc-500 "
        />
    )
}