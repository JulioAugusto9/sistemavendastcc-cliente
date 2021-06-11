import React, {useState, useEffect } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'
//import { FiArrowLeft } from 'react-icons/fi'

import NavBar from '../../components/NavBar';

import api from '../../services/api'
import formatReal from '../../services/formatReal';
import msgCamposInvalidos from '../../services/msgCamposInvalidos';
import parseReal from '../../services/parseReal';
import formatDate from '../../services/formatDate'

import './styles.css'

function ShowAddProduto({pedido, produtos, produtoDescr, setProdutoDescr, qtde, setQtde, addProduto}) {
    if (pedido.estado === 'FATURADO')
        return <></>
    
    return (
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
    )
}

function ShowExcluirProduto({pedido, itemPedido, removeProduto}) {
    if (pedido.estado === 'FATURADO') 
        return <></>

    return (
        <button type="button" onClick={() => removeProduto(itemPedido.id)}>
            Excluir 
        </button>
    )
}

function ShowExcluir({pedido, excluir}) {
    if (pedido.estado === 'FATURADO')
        return <></>
    
    return (
        <button className="acao" onClick={excluir}>Excluir</button>
    )
}

function BotoesEspecificos({pedido, faturar, location}) {
    if (pedido.estado === 'FATURADO')
        return (<Link to={`${location.pathname}/imprimirnotafiscal`}>
                    <button className="acao" >Imprimir Nota Fiscal</button>
                </Link>)
    if (pedido.estado === 'ABERTO')
        return <button className="acao" onClick={faturar}>Faturar</button>  
    
    return <></>
}

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
                alert('Erro ao adicionar item de pedido, tente novamente.')
                console.log(err)
            })
        })
        .catch((err) => {
            alert('Erro ao buscar dados, tente novamente.')
            console.log(err)
        })
    }

    function removeProduto(itemPedId) {
        if (!window.confirm('Tem certeza que deseja excluir este item de pedido? Esta ação não pode ser revertida'))
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
            alert('Erro ao excluir item de pedido, tente novamente.')
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

        if (!window.confirm('Tem certeza que deseja excluir este pedido? Esta ação não pode ser revertida'))
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
            alert('Erro ao cadastrar caso, tente novamente.')
            console.log(err);
        })
    }

    function faturar(e) {
        e.preventDefault()

        api.post(`pedidos/${id}/fatura`, {}, {
            auth: {
                username: userLogin,
                password: userSenha
            }
        })
        .then(res => {
            setPedido({...pedido, estado: 'FATURADO'})
            alert('Pedido faturado com sucesso!')
        })
        .catch(err => {
            alert('Erro ao faturar pedido, tente novamente.')
            console.log(err)
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

                    <ShowAddProduto
                        pedido={pedido}
                        produtos={produtos}
                        produtoDescr={produtoDescr}
                        setProdutoDescr={setProdutoDescr}
                        qtde={qtde}
                        setQtde={setQtde}
                        addProduto={addProduto}
                    ></ShowAddProduto>

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

                                <ShowExcluirProduto
                                    pedido={pedido}
                                    itemPedido={itemPedido}
                                    removeProduto={removeProduto}
                                ></ShowExcluirProduto>
                            </li>
                        ))}
                    </ul>

                    <div className="botoes" >
                        {/* <button className="acao" onClick={alterar}>Alterar</button> */}
                        <ShowExcluir
                            pedido={pedido}
                            excluir={excluir}
                        ></ShowExcluir>
                        <Link to={`${location.pathname}/imprimir`}>
                            <button className="acao" >Imprimir</button>
                        </Link>
                        {/* <button className="acao" >Transformar em Pedido</button> */}
                        <BotoesEspecificos
                            pedido={pedido}
                            faturar={faturar}
                            location={location}
                        ></BotoesEspecificos>
                    </div>
                </form>
            </div>
        </div>
    )
}