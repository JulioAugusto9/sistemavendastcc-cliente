import React, {useState, useEffect } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'

import api from '../../services/api'
import formatDate from '../../services/formatDate';
import formatReal from '../../services/formatReal';

import './styles.css'

function getTitulo(estado) {
    if (estado === 'ORCAMENTO')
        return 'Orçamento'
    else 
        return 'Pedido de Venda'
}

function getOrcaOuPedido(estado) {
    if (estado === 'ORCAMENTO')
        return 'ORÇAMENTO'
    else 
        return 'PEDIDO'
}

export default function DetalheProduto(props){
    const { id } = props.match.params
    const [pedido, setPedido] = useState({
        cliente: {},
        usuario: {},
        itensPedido: []
    });

    const userLogin = localStorage.getItem('userLogin')
    const userSenha = localStorage.getItem('userSenha')
    const userRole = localStorage.getItem('userRole')

    const history = useHistory()

    useEffect(() => {
        api.get(`pedidos/${id}`, {
            auth: {
                username: userLogin,
                password: userSenha
            }
        })
        .then((res) => {
            setPedido(res.data)
        })
        .catch(err => {
            alert('Erro ao buscar dados, tente novamente.')
            console.log(err)
        }) 
    }, [id])

    useEffect(() => {
        if (pedido.id !== undefined)
            window.print()
    }, [pedido])

    return (
        <div className="cadastro-container">

            <div className="content">
               
                <h1 value={pedido.estado}>{getTitulo(pedido.estado)}</h1>

                <form >
                    <strong>ID:</strong>
                    <input 
                        value={pedido.id}
                        readOnly
                    />
                    <strong value={pedido.estado}>DATA DO {getOrcaOuPedido(pedido.estado)}:</strong>
                    <input 
                        value={formatDate(pedido.dataCriacao)}
                        readOnly
                    />
                    <strong>PREÇO TOTAL:</strong>
                    <input            
                        value={ formatReal(pedido.precoTotal) }
                        readOnly
                    />
                    <strong>ESTADO:</strong>
                    <input            
                        value={ pedido.estado }
                        readOnly
                    />
                    <strong>NOME DO CLIENTE:</strong>
                    <Link to={`../clientes/${pedido.cliente.id}`}>
                    <input            
                        value={ pedido.cliente.nome }
                        readOnly
                    />
                    </Link>
                    <strong>NOME DO VENDEDOR:</strong>
                    <input            
                        value={ pedido.usuario.nome }
                        readOnly
                    />
                    <strong>ITENS DE PEDIDO:</strong>

                    <ul className="entidades" >
                        {pedido.itensPedido.map(itemPedido => (
                            <li key={itemPedido.id}>
                                <strong>DESCRIÇÃO DO PRODUTO:</strong>
                                <p>{itemPedido.produto.descricao}</p>
        
                                <strong>PREÇO:</strong>
                                <p>{ formatReal(itemPedido.preco) }</p>
        
                                <strong>QUANTIDADE:</strong>
                                <p>{ itemPedido.qtde }</p>
                            </li>
                        ))}
                    </ul>
                </form>
            </div>
        </div>
    )
}