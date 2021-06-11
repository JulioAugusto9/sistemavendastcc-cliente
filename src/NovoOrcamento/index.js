import React, {useEffect, useState} from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'
//import { FiArrowLeft } from 'react-icons/fi'

import NavBar from '../../components/NavBar';

import api from '../../services/api'
import formatReal from '../../services/formatReal'
import msgCamposInvalidos from '../../services/msgCamposInvalidos';
import parseReal from '../../services/parseReal';

import './styles.css'

function getOrcaOuPedido(location) {
    if (location.pathname.indexOf('orcamento') !== -1)
        return 'Orçamento'
    else 
        return 'Pedido'
}

function getRedirection(location) {
    if (location.pathname.indexOf('orcamento') !== -1)
        return 'orcamentos'
    else 
        return 'pedidos'
}

export default function NovoPedido(){
    const [pedido, setPedido] = useState({
        itensPedido: []
    })

    const [clientes, setClientes] = useState([])
    const [produtos, setProdutos] = useState([])
    const [produtoDescr, setProdutoDescr] = useState('')
    const [qtde, setQtde] = useState('')
    const [idLocal, setIdLocal] = useState(0)

    const userId = localStorage.getItem('userId')
    const userLogin = localStorage.getItem('userLogin')
    const userSenha = localStorage.getItem('userSenha')

    const history = useHistory()
    const location = useLocation()

    function setCliente(nome) {
        api.get(`clientes`,{
            params: {
                nome: nome
            },
            auth: {
                username: userLogin,
                password: userSenha
            }
        })
        .then(response => {
            const cliente = response.data.clientes[0]
            setPedido({ ...pedido, clienteId: cliente.id})
        })
        .catch((err) => {
            alert('Erro ao buscar dados, tente novamente.')
            console.log(err)
        })
    }

    function getClientes() {
        api.get('clientes', 
            {
                params: {
                    nome: '',
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
            setClientes(response.data.clientes)
        })
        .catch(err => {
            alert('Erro ao buscar clientes, tente novamente.')
            console.log(err)
        }) 
    }

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
            setPedido({ ...pedido, 
                itensPedido: [...pedido.itensPedido, {
                    qtde: qtde,
                    produtoId: produto.id,
                    descricao: produto.descricao,
                    preco: produto.preco,
                    idLocal: idLocal
                }]
            })
            setProdutoDescr('')
            setQtde('')
            setIdLocal(idLocal+1)
        })
        .catch((err) => {
            alert('Erro ao buscar dados, tente novamente.')
            console.log(err)
        })
    }

    function removeProduto(id) {
        setPedido({...pedido,
            itensPedido: pedido.itensPedido.filter(item => item.idLocal !== id)
        })
    }

    useEffect(() => {
        getClientes()
        getProdutos()
    }, [])

    async function handleNovoPedido(e) {
        e.preventDefault()

        const data = {...pedido, 
            desconto: parseReal(pedido.desconto),
            usuarioId: userId
        }

        let reqParams = {}
        if (location.pathname.indexOf('orcamento') !== -1) reqParams['orcamento'] = true

        try{
            await api.post(`pedidos`, data, {
                reqParams,
                auth: {
                    username: userLogin,
                    password: userSenha
                }
            }) 
            alert(`${getOrcaOuPedido(location)} cadastrado com sucesso`)

            history.push(`/${getRedirection(location)}`)
        } catch (err){
            alert(msgCamposInvalidos(err))
            console.log(err);
        }
    }

    return (
        <div className="cadastro-container">
            <NavBar></NavBar>
            <div className="content">
                
                <h1>Cadastrar novo {getOrcaOuPedido(location)}</h1>

                <form onSubmit={handleNovoPedido}>
                    <input 
                        placeholder="Nome do Cliente"
                        list="clientes" autoComplete="on"
                        onChange={e => setCliente(e.target.value)}
                    />
                    <datalist id="clientes" >
                        {clientes.map(cliente => (
                            <option key={cliente.id} value={cliente.nome} />
                        ))}
                    </datalist>

                    <input 
                        placeholder="Desconto em Reais"
                        value={pedido.desconto}
                        onChange={e => setPedido({ ...pedido, desconto: e.target.value})}
                        type="number"
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
                            <li key={itemPedido.idLocal}>
                                <strong>DESCRIÇÃO DO PRODUTO:</strong>
                                <p>{itemPedido.descricao}</p>
        
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

                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    )
}