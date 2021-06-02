import React from 'react'
import { Link } from 'react-router-dom'

import './styles.css'

export default function NavBar() {

    function handleLogout() {
        // localStorage.clear()

        // history.push('/')
    }

    return (
        <div className="navigation-bar" >
            <ul>
                <button type="button" >
                    Clientes
                    <Link to="/produtos" ></Link>
                </button>
                <button type="button" >
                    Pedidos
                    <Link to="/produtos"></Link>
                </button>
                <button type="button" >
                    Produtos
                    <Link to="/produtos"></Link>
                </button>
                <button type="button" >
                    Usuários
                    <Link to="/produtos"></Link>
                </button>
                <button onClick={handleLogout} type="button" >
                    Sair
                </button>
            </ul>
        </div>
    )
}