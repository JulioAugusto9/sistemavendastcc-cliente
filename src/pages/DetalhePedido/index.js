import React, {useState, useEffect } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'
//import { FiArrowLeft } from 'react-icons/fi'

import NavBar from '../../components/NavBar';

import api from '../../services/api'
import formatReal from '../../services/formatReal';
import msgCamposInvalidos from '../../services/msgCamposInvalidos';

import './styles.css'

export default function DetalheProduto(props){
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

    function addProduto() {

    }

    function removeProduto() {

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
            
        })
        .catch(err => {
            alert(msgCamposInvalidos(err))
            console.log(err)
        }) 
    }

    function excluir(event) {
        event.preventDefault()

        if (!window.confirm('Tem certeza que deseja excluir este produto? Esta ação não pode ser revertida'))
            return;

        api.delete(`pedidos/${id}`, {
            auth: {
                username: userLogin,
                password: userSenha
            }
        })
        .then(() => {
            alert('Produto excluído com sucesso')
            history.push('/pedidos')
        })
        .catch((err) => {
            alert('Erro ao cadastrar caso, tente novamente.')
            console.log(err);
        })
    }

    return (
        <div className="cadastro-container">

            <NavBar></NavBar>

            <div className="content">
               
                <h1>Detalhes do Pedido</h1>

                <form >
                    <strong>ID:</strong>
                    <input 
                        value={pedido.id}
                        readOnly
                    />
                    <strong>DATA DO PEDIDO:</strong>
                    <input 
                        value={pedido.dataCriacao}
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

                                <button type="button" onClick={() => removeProduto(itemPedido.idLocal)}>
                                    Remover 
                                </button>
                            </li>
                        ))}
                    </ul>

                    <div className="botoes" >
                        <button className="acao" onClick={alterar}>Alterar</button>
                        <button className="acao" onClick={excluir}>Excluir</button>
                        <Link to={`${location.pathname}/imprimir`}>
                        <button className="acao" >Imprimir</button>
                        </Link>
                        <button className="acao" >Transformar em Pedido</button>
                        {/* <button className="acao" onClick={()=>1==1}>Faturar</button> */}
                        <Link to={`${location.pathname}/imprimirnotafiscal`}>
                        <button className="acao" >Imprimir Nota Fiscal</button>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}