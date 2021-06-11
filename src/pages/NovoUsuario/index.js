import React, {useState} from 'react'
import { Link, useHistory } from 'react-router-dom'
//import { FiArrowLeft } from 'react-icons/fi'

import NavBar from '../../components/NavBar';

import api from '../../services/api'
import msgCamposInvalidos from '../../services/msgCamposInvalidos';
import parseReal from '../../services/parseReal';

import './styles.css'

function ShowNavBar({userLogin}) {
    if (userLogin == null) return <></>

    return <NavBar></NavBar>
}

export default function NovoUsuario(){
    const [usuario, setUsuario] = useState({})
    const [senhaConfirm, setSenhaConfirm] = useState('')

    const userLogin = localStorage.getItem('userLogin')
    const userSenha = localStorage.getItem('userSenha')

    const history = useHistory()

    function handleNovoUsuario(e) {
        e.preventDefault()
        if (usuario.senha !== senhaConfirm) {
            alert('As duas senhas digitadas devem ser iguais')
            return
        }

        const data = {...usuario, nomeRole: 'ROLE_VENDEDOR'}

        // let auth = {};
        // if (userLogin !== null) {
        //     auth['username'] = userLogin
        //     auth['password'] = userSenha
        // }
        
        api.post('usuarios', data)
        .then(res => {
            const user = res.data
            alert('Usuário cadastrado com sucesso')
            localStorage.setItem('userId', user.id)
            localStorage.setItem('userLogin', user.login)
            localStorage.setItem('userSenha', user.senha)
            localStorage.setItem('userRole', user.nomeRole)
            history.push('/')
        }) 
        .catch ((err) => {
            alert(msgCamposInvalidos(err))
            console.log(err);
        })
            
    }

    return (
        <div className="cadastro-container">
            <ShowNavBar
                userLogin={userLogin}
            ></ShowNavBar>
            <div className="content">
                
                <h1>Cadastrar nova conta</h1>

                <form onSubmit={handleNovoUsuario}>
                    <input 
                        placeholder="Nome"
                        value={usuario.nome}
                        onChange={e => setUsuario({...usuario, nome: e.target.value})}
                    />
                    <input 
                        placeholder="Email"
                        value={usuario.login}
                        onChange={e => setUsuario({...usuario, login: e.target.value})}
                    />
                    <input 
                        placeholder="Senha"             
                        value={usuario.senha}
                        onChange={e => setUsuario({...usuario, senha: e.target.value})}
                        type="password"
                    />
                    <input 
                        placeholder="Confirmar senha"             
                        value={senhaConfirm}
                        onChange={e => setSenhaConfirm(e.target.value)}
                        type="password"
                    />

                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    )
}