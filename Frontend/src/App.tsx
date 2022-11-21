import './styles/main.css'
import Cadastro from './screens/Cadastro';
import Login from './screens/Login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Ranking from './screens/Ranking';
import Home from './screens/Home';
import CadastrarDesafio from './screens/CadastrarDesafio';
import { Desafio } from './screens/Desafio';
import EditarDesafio from './screens/EditarDesafio';
import GlobalContextProvider from './Context/globalContext';
import LoadingScreen from './screens/LoadingScreen';
import Perfil from './screens/Perfil';
import ComentariosSolucao from './components/ComentariosSolucao';
import React from 'react'
import { AprovarSolucoes } from './screens/AprovarSolucoes';
import NotFound from './screens/NotFound';

function App() {
    return (
        <GlobalContextProvider>
            <Router>
                <Routes>
                    <Route index element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/cadastro" element={<Cadastro />} />
                    <Route path="/ranking" element={<Ranking />} />
                    <Route path="/cadastrar-desafio" element={<CadastrarDesafio />} />
                    <Route path="/desafio/:id" element={<Desafio />} />
                    <Route path="/editar-desafio/:id" element={<EditarDesafio />} />
                    <Route path='/perfil/:id' element={<Perfil />}/>  
                    <Route path="/loading" element={<LoadingScreen/>}/>
                    <Route path="/solucao/:id" element={<ComentariosSolucao/>}/>
                    <Route path="/aprovar-solucoes" element={<AprovarSolucoes/>}/>
                    <Route path='/*' element={<NotFound/>}/>                 
                </Routes>
            </Router>
        </GlobalContextProvider>
    )
}

export default App;