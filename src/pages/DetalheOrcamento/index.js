import React, {useState, useEffect } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'
//import { FiArrowLeft } from 'react-icons/fi'

import NavBar from '../../components/NavBar';

import api from '../../services/api'
import formatDate from '../../services/formatDate';
import formatReal from '../../services/formatReal';
import msgCamposInvalidos from '../../services/msgCamposInvalidos';
import parseReal from '../../services/parseReal';

import './styles.css'

export default function DetalheOrcamento(props){
    const { id } = props.match.params
    const [pedido, setPedido] = useState({
        cliente: {},
        usuario: {},
        itensPedido: []
    });

    const [produtos, setProdutos] = useState([])
    const [produtoDescr, setProdutoDescr] = useState('')
    const [qtde, setQtde] = useState('')

    const userLogin = localStorage.getItem('userLogin')
    const userSenha = localStorage.getItem('userSenha')
    const userRole = localStorage.getItem('userRole')

    const history = useHistory()
    const location = useLocation()

    function getProdutos() {
        api.get('produtos', 
            {
                params: {
                    page: 1,
                    itemsPerPage: 200
                },
                auth: {
                    username: userLogin,
                    password: userSenha
                }
            }
        )
        .then(response => {
            setProdutos(response.data.produtos)
        })
        .catch(err => {
            console.log(err)
            alert('Erro ao buscar produtos, tente novamente.')
        }) 
    }

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
        getProdutos()
    }, [id])

    function addProduto(e) {
        e.preventDefault()
        if (qtde === '' || qtde <= 0) {
            alert('Quantidade deve ser maior que zero')
            return
        }
        
        api.get(`produtos`,{
            params: {
                descricao: produtoDescr.slice(0, produtoDescr.indexOf(' R$'))
            },
            auth: {
                username: userLogin,
                password: userSenha
            }
        })
        .then(response => {
            const produto = response.data.produtos[0]
            const data = {
                qtde: qtde,
                produtoId: produto.id
            }
            api.post(`pedidos/${id}/itempedido`, data, {
                auth: {
                    username: userLogin,
                    password: userSenha
                }
            })
            .then(res => {
                setPedido(res.data)
                setProdutoDescr('')
                setQtde('')
            })
            .catch((err) => {
                alert('Erro ao adicionar item, tente novamente.')
                console.log(err)
            })
        })
        .catch((err) => {
            alert('Erro ao buscar dados, tente novamente.')
            console.log(err)
        })
    }

    function removeProduto(itemPedId) {
        if (!window.confirm('Tem certeza que deseja excluir este item? Esta ação não pode ser revertida'))
            return;

        api.delete(`pedidos/${id}/itempedido/${itemPedId}`, {
            auth: {
                username: userLogin,
                password: userSenha
            }
        })
        .then(res => {
            setPedido(res.data)
        })
        .catch((err) => {
            alert('Erro ao excluir item, tente novamente.')
            console.log(err)
        })
    }

    function alterar() {
        const data = pedido
        api.put(`pedidos/${id}`, data, {
            auth: {
                username: userLogin,
                password: userSenha
            }
        })
        .then((res) => {
            setPedido(res.data)
        })
        .catch(err => {
            alert(msgCamposInvalidos(err))
            console.log(err)
        }) 
    }

    function excluir(event) {
        event.preventDefault()

        if (!window.confirm('Tem certeza que deseja excluir este orçamento? Esta ação não pode ser revertida'))
            return;

        api.delete(`pedidos/${id}`, {
            auth: {
                username: userLogin,
                password: userSenha
            }
        })
        .then(() => {
            alert('Pedido excluído com sucesso')
            history.push('/pedidos')
        })
        .catch((err) => {
            alert('Erro ao excluir orçamento, tente novamente.')
            console.log(err);
        })
    }

    function transformarEmPedido(e) {
        e.preventDefault()

        api.post(`pedidos/${id}/abertura`, {}, {
            auth: {
                username: userLogin,
                password: userSenha
            }
        })
        .then(() => {
            alert('Orçamento transformado em pedido com sucesso')
            history.replace(`../pedidos/${id}`)
        })
        .catch((err) => {
            console.log(err);
            alert('Erro ao transformar em pedido, tente novamente.')
        })
    }

    return (
        <div className="cadastro-container">

            <NavBar></NavBar>

            <div className="content">
               
                <h1>Detalhes do Orçamento</h1>

                <form >
                    <strong>ID:</strong>
                    <input 
                        value={pedido.id}
                        readOnly
                    />
                    <strong>DATA DO ORÇAMENTO:</strong>
                    <input 
                        value={formatDate(pedido.dataCriacao)}
                        readOnly
                    />
                    <strong>PREÇO TOTAL:</strong>
                    <input            
                        value={ formatReal(pedido.precoTotal) }
                        readOnly
                    />
                    <strong>DESCONTO:</strong>
                    <input            
                        value={ formatReal(pedido.desconto) }
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

                    <div className="addProduto" >
                        <input 
                            placeholder="Descrição do Produto"
                            list="produtos" autoComplete="on"
                            value={produtoDescr}
                            onChange={e => setProdutoDescr(e.target.value)}
                        />
                        <datalist id="produtos" >
                            {produtos.map(produto => (
                                <option key={produto.id} value={produto.descricao+ ' ' + formatReal(produto.preco)} />
                            ))}
                        </datalist>
                        <input 
                            placeholder="Quantidade"
                            value={qtde}
                            onChange={e => setQtde(e.target.value)}
                            type="number"
                        />
                        <button onClick={addProduto}>Adicionar Produto</button>
                    </div>

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

                                <button type="button" onClick={() => removeProduto(itemPedido.id)}>
                                    Excluir 
                                </button>
                            </li>
                        ))}
                    </ul>

                    <div className="botoes" >
                        {/* <button className="acao" onClick={alterar}>Alterar</button> */}
                        <button className="acao" onClick={excluir}>Excluir</button>
                        <Link to={`${location.pathname}/imprimir`}>
                            <button className="acao" >Imprimir</button>
                        </Link>
                        <button className="acao" onClick={transformarEmPedido}>Transformar em Pedido</button>
                    </div>
                </form>
            </div>
        </div>
    )
}