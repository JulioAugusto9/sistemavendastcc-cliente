import React, {useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
//import { FiArrowLeft } from 'react-icons/fi'

import NavBar from '../../components/NavBar';

import api from '../../services/api'
import msgCamposInvalidos from '../../services/msgCamposInvalidos';

import './styles.css'

function CampoGerenteVe({userRole, usuario, setUsuario}) {
    if (userRole === 'ROLE_GERENTE')
        return (
            <>
            <strong>PERMISSÕES:</strong>
            <select name="selecttipo" id="selecttipo" 
            value={usuario.nomeRole}
            onChange={e => setUsuario({...usuario, nomeRole: e.target.value})}>
                <option value="ROLE_VENDEDOR">VENDEDOR</option>
                <option value="ROLE_GERENTE">GERENTE</option>
            </select>
            </>
        )
    
    return <></>
}

function CampoDonoContaVe({userId, id, usuario, setUsuario}) {
    if (userId  == id)
        return (
            <>
            <strong>SENHA:</strong>
            <input
                value={usuario.senha}
                onChange={e => setUsuario({...usuario, login: e.target.value})}
                type="password"
            />
            </>
        )

    return <></>
}

export default function DetalheUsuario(props){
    const { id } = props.match.params
    const [usuario, setUsuario] = useState({
        id: '',
        nome: '',
        login: '',
        nomeRole: 'ROLE_VENDEDOR'
    })

    const userId = localStorage.getItem('userId')
    const userLogin = localStorage.getItem('userLogin')
    const userSenha = localStorage.getItem('userSenha')
    const userRole = localStorage.getItem('userRole')

    const history = useHistory()

    useEffect(() => {
        api.get(`usuarios/${id}`, {
            auth: {
                username: userLogin,
                password: userSenha
            }
        })
        .then((res) => {
            setUsuario(res.data)
        })
        .catch(err => {
            alert('Erro ao buscar dados, tente novamente.')
            console.log(err)
        }) 
    }, [id])

    function alterar() {
        const data = usuario
        api.put(`usuarios/${id}`, data, {
            auth: {
                username: userLogin,
                password: userSenha
            }
        })
        .then((res) => {
            setUsuario(res.data)
        })
        .catch(err => {
            console.log(err)
            alert(msgCamposInvalidos(err))
        }) 
    }

    function excluir(event) {
        event.preventDefault()

        if (!window.confirm('Tem certeza que deseja excluir este produto? Esta ação não pode ser revertida'))
            return;

        api.delete(`/usuarios/${id}`, {
            auth: {
                username: userLogin,
                password: userSenha
            }
        })
        .then(() => {
            alert('Usuário excluído com sucesso')
            history.push('/usuarios')
        })
        .catch((err) => {
            alert('Erro ao excluir, tente novamente.')
            console.log(err);
        })
    }

    return (
        <div className="cadastro-container">

            <NavBar></NavBar>

            <div className="content">
               
                <h1>Detalhes do Usuário</h1>

                <form >
                    <strong>ID:</strong>
                    <input 
                        value={usuario.id}
                        readOnly
                    />
                    <strong>NOME DO USUÁRIO:</strong>
                    <input 
                        value={usuario.nome}
                        onChange={e => setUsuario({...usuario, nome: e.target.value})}
                    />
                    <strong>EMAIL:</strong>
                    <input
                        value={usuario.login}
                        onChange={e => setUsuario({...usuario, login: e.target.value})}
                    />
                    {/* <strong>PERMISSÕES:</strong>
                    <input
                        value={usuario.nomeRole}
                        onChange={e => setUsuario({...usuario, nomeRole: e.target.value})}
                    /> */}
                    <CampoGerenteVe
                        userRole={userRole}
                        usuario={usuario}
                        setUsuario={setUsuario}
                    ></CampoGerenteVe>

                    <CampoDonoContaVe
                        userId={userId}
                        id={id}
                        usuario={usuario}
                        setUsuario={setUsuario}
                    ></CampoDonoContaVe>

                    <div className="botoes" >
                        <button className="acao" onClick={alterar}>Alterar</button>
                        <button className="acao" onClick={excluir}>Excluir</button>
                    </div>
                </form>
            </div>
        </div>
    )
}