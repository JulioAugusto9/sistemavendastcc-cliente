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

    async function handleLogin(e) {
        e.preventDefault()

        const data = {
            login,
            senha
        }

        api.post('login', data)
        .then((res) => {
            const user = res.data

            localStorage.setItem('userId', user.id)
            localStorage.setItem('userLogin', user.login)
            localStorage.setItem('userSenha', user.senha)
            localStorage.setItem('userRole', user.nomeRole)

            history.push('/');
        })
        .catch((err) => {
            alert(err.response.data.titulo)
            console.log(err)
        })
    }

    return (
        <div className="cadastro-container">
            <div className="appname" >
                <h1>Mercurium</h1>
            </div>
            <div className="content">
                
                <h1>Faça seu login</h1>

                <form onSubmit={handleLogin}>
                    <input 
                        placeholder="Email"
                        value={login}
                        onChange={e => setLogin(e.target.value)}
                    />
                    <input 
                        placeholder="Senha"             
                        value={senha}
                        onChange={e => setSenha(e.target.value)}
                        type="password"
                    />

                    <button className="button" type="submit">Entrar</button>

                    <div className="botoes">
                        <Link to="/usuarios/novo" >
                            <button className="acao" >Não possuo conta</button>
                        </Link>
                        <Link to="/alterarsenha">
                            <button className="acao" >Esqueci minha senha</button>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}