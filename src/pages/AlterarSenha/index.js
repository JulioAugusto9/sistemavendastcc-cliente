import React, {useState} from 'react'
import { Link, useHistory } from 'react-router-dom'
//import { FiArrowLeft } from 'react-icons/fi'

import NavBar from '../../components/NavBar';

import api from '../../services/api'

import './styles.css'

export default function NovoProduto(){
    const [login, setLogin] = useState('');
    const [senha, setSenha] = useState('');

    const history = useHistory()

    async function handleAlterarSenha(e) {
        e.preventDefault()

        const data = {
            login,
            senha
        }

    }

    return (
        <div className="cadastro-container">
            <div className="appname" >
                {/* <h1>Mercurium</h1> */}
            </div>
            <div className="content">
                
                <h1>Redefinir senha</h1>

                <form onSubmit={handleAlterarSenha}>
                    <input 
                        placeholder="Email"
                        value={login}
                        onChange={e => setLogin(e.target.value)}
                    />

                    <button className="button" type="submit">Receber email com nova senha temporária</button>
                </form>
            </div>
        </div>
    )
}