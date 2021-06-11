import React from 'react'
import { Link, useHistory } from 'react-router-dom'

import './styles.css'

function LinkUsuarios({ userRole }) {
    if (userRole !== 'ROLE_GERENTE') return (<></>)
    return (
        <Link to="/usuarios" className="link" >
            <button type="button" >
                Usuários
            </button>
        </Link>
    )
}

export default function NavBar() {

    const userId = localStorage.getItem('userId')
    const userRole = localStorage.getItem('userRole')

    const history = useHistory()

    function handleLogout() {
        localStorage.clear()

        history.push('/login')
    }

    return (
        <div className="navigation-bar" >
            <ul>
                <Link to="/clientes" className="link" >
                    <button type="button" >
                        Clientes
                    </button>
                </Link>
                <Link to="/pedidos" className="link" >
                    <button type="button" >
                        Pedidos
                    </button>
                </Link>
                <Link to="/orcamentos" className="link" >
                    <button type="button" >
                        Orçamentos
                    </button>
                </Link>
                <Link to="/produtos" className="link" >
                    <button type="button" >
                        Produtos
                    </button>
                </Link>
                <LinkUsuarios userRole={userRole} ></LinkUsuarios>
                <Link to={`/usuarios/${userId}`} className="link totheleft" >
                    <button type="button" >
                        Conta
                    </button>
                </Link>
                <button onClick={handleLogout}  className="link" type="button" >
                    Sair
                </button>
            </ul>
        </div>
    )
}