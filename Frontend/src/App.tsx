import './styles/main.css'
import Cadastro from './screens/Cadastro';
import Login from './screens/Login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Ranking from './screens/Ranking';
import Home from './screens/Home';
import CadastrarDesafio from './screens/CadastrarDesafio';
import SelectTags from './components/Form/SelectTags';
import { Desafio } from './screens/Desafio';
import { BotaoDesafio } from './components/BotaoDesafio';
import FiltroPesquisa from './components/FiltroPesquisa';
import EditarDesafio from './screens/EditarDesafio';
import GlobalContextProvider from './Context/globalContext';
import LoadingScreen from './screens/LoadingScreen';

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
                    <Route path="/Desafio/:id" element={<Desafio />} />
                    <Route path="/editar-desafio/:id" element={<EditarDesafio />} />
                    <Route path="/aba" element={<FiltroPesquisa />} />
                    <Route path="/loading" element={<LoadingScreen/>}/>
                </Routes>
            </Router>
        </GlobalContextProvider>
    )
}

export default App;