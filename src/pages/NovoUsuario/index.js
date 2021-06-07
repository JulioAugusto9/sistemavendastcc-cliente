import React, {useState} from 'react'
import { Link, useHistory } from 'react-router-dom'
//import { FiArrowLeft } from 'react-icons/fi'

import NavBar from '../../components/NavBar';

import api from '../../services/api'
import msgCamposInvalidos from '../../services/msgCamposInvalidos';
import parseReal from '../../services/parseReal';

import './styles.css'

export default function NovoUsuario(){
    const [usuario, setUsuario] = useState({})
    const [senhaConfirm, setSenhaConfirm] = useState('')

    const userLogin = localStorage.getItem('userLogin')
    const userSenha = localStorage.getItem('userSenha')

    const history = useHistory()

    async function handleNovoUsuario(e) {
        e.preventDefault()
        if (usuario.senha !== senhaConfirm) {
            alert('As duas senhas digitadas devem ser iguais')
            return
        }

        const data = {...usuario, nomeRole: 'ROLE_VENDEDOR'}

        try{
            await api.post('usuarios', data, {
                auth: {
                    username: userLogin,
                    password: userSenha
                }
            }) 
            alert('Usuário cadastrado com sucesso')
            history.push('/usuarios')
        } catch (err){
            alert(msgCamposInvalidos(err))
            console.log(err);
        }
    }

    return (
        <div className="cadastro-container">
            <NavBar></NavBar>
            <div className="content">
                
                <h1>Cadastrar novo Usuário</h1>

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