import './styles/main.css'
import { Cadastro } from './screens/Cadastro';
import { Login } from './screens/Login';
import { Desafios } from './screens/Desafios';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Ranking from './screens/Ranking';

function App(){
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Desafios/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/cadastro" element={<Cadastro/>}/>
                <Route path="/ranking" element={<Ranking/>}/>
            </Routes>
        </Router>
    )
}

export default App;