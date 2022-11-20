import React from 'react';
import Footer from '../components/Footer';
import { Menu } from '../components/Menu';
export default function NotFound(){
    return (
        <><Menu /><div className='flex flex-col h-[77vh] justify-center'>
            <h1 className="text-5xl text-white mx-auto ">404</h1>
            <p className="text-3xl text-white mx-auto">Not Found</p>
        </div>
        <Footer/>
        </>
    )
}