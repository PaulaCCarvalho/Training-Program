import './styles/main.css'
import  Cadastro  from './screens/Cadastro';
import Login  from './screens/Login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Ranking from './screens/Ranking';
import CardDesafio from './components/CardDesafio';
import Home from './screens/Home';
import CadastrarDesafio from './components/CadastrarDesafio';

function App(){
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/cadastro" element={<Cadastro/>}/>
                <Route path="/ranking" element={<Ranking/>}/>
                <Route path="/cadastro-desafio" element={<CadastrarDesafio/>}/>
            </Routes>
        </Router>
    )
}

export default App;