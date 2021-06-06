import React from 'react'
import { Link, useHistory } from 'react-router-dom'

import './styles.css'

function LinkUsuarios({ userRole }) {
    if (userRole !== 'ROLE_GERENTE') return (<></>)
    return (
        <Link to="/produtos" className="link" >
            <button type="button" >
                Usuários
            </button>
        </Link>
    )
}

export default function NavBar() {

    const userRole = localStorage.getItem('userRole')

    const history = useHistory()

    function handleLogout() {
        localStorage.clear()

        history.push('/login')
    }

    return (
        <div className="navigation-bar" >
            <ul>
                <Link to="/produtos" className="link" >
                    <button type="button" >
                        Clientes
                    </button>
                </Link>
                <Link to="/produtos" className="link" >
                    <button type="button" >
                        Pedidos
                    </button>
                </Link>
                <Link to="/produtos" className="link" >
                    <button type="button" >
                        Produtos
                    </button>
                </Link>
                <LinkUsuarios userRole={userRole} ></LinkUsuarios>
                <button onClick={handleLogout} type="button" >
                    Sair
                </button>
            </ul>
        </div>
    )
}