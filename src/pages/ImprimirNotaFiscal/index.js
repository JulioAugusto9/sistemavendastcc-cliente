import React, {useState, useEffect } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'

import api from '../../services/api'
import formatDate from '../../services/formatDate';
import formatPercent from '../../services/formatPercent';
import formatReal from '../../services/formatReal';

import './styles.css'

function CamposDeTipo({ pedido }) {
    if (pedido.cliente.tipo === 'pessoafisica') return (<>
        <strong>CPF:</strong>
        <input 
            placeholder="CPF"
            value={pedido.cliente.cpf}
            readOnly
        />
        <strong>RG:</strong>
        <input 
            placeholder="RG"
            value={pedido.cliente.rg}
            readOnly
        />
        <strong>DATA DE NASCIMENTO:</strong>
        <input 
            placeholder="Data de Nascimento"
            value={pedido.cliente.dataNascimento}
            readOnly
        />
    </>)
    else return (<>
        <strong>CNPJ:</strong>
        <input 
            placeholder="CNPJ"
            value={pedido.cliente.cnpj}
            readOnly
        />
        <strong>INSCRIÇÃO ESTADUAL:</strong>
        <input 
            placeholder="Inscrição Estadual"
            value={pedido.cliente.inscricaoEstadual}
            readOnly
        />
        <strong>DATA DE FUNDAÇÃo:</strong>
        <input 
            placeholder="Data de Fundação"
            value={pedido.cliente.dataFundacao}
            readOnly
        />
    </>)
}

export default function ImprimirNotaFiscal(props){
    const { id } = props.match.params
    const [pedido, setPedido] = useState({
        cliente: {},
        usuario: {},
        itensPedido: []
    });

    const [notaFiscal, setNotaFiscal] = useState({})
    const [empresa, setEmpresa] = useState({})

    const userLogin = localStorage.getItem('userLogin')
    const userSenha = localStorage.getItem('userSenha')
    const userRole = localStorage.getItem('userRole')

    const history = useHistory()

    useEffect(() => {
        const promises = []
        promises.push(api.get(`pedidos/${id}`, {
            auth: {
                username: userLogin,
                password: userSenha
            }
        })
        .then((res) => {
            setPedido(res.data)
        })) 

        promises.push(api.get(`pedidos/${id}/notafiscal`, {
            auth: {
                username: userLogin,
                password: userSenha
            }
        })
        .then((res) => {
            setNotaFiscal(res.data)
        }))

        promises.push(api.get('pedidos/empresa', {
            auth: {
                username: userLogin,
                password: userSenha
            }
        })
        .then((res) => {
            setEmpresa(res.data)
        }))

        Promise.all(promises)
        .then(values => {
            window.print()
        })
        .catch(err => {
            alert('Erro ao buscar dados, tente novamente.')
            console.log(err)
        })

    }, [id])

    // useEffect(() => {
    //     if (pedido.id !== undefined)
    //         window.print()
    // }, [pedido])

    return (
        <div className="cadastro-container">

            <div className="content">
               
                <h1>Nota Fiscal</h1>

                <form >
                    <strong>EMPRESA: {empresa.nome}</strong>   
                    <strong>{empresa.endereco1}</strong>   
                    <strong>{empresa.endereco2}</strong>   
                    <strong>{empresa.telefone}</strong>   
                    <strong>CNPJ: {empresa.cnpj}</strong>   
                    
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
                    <strong>DATA DE EMISSÂO DA NOTA FISCAL:</strong>
                    <input 
                        value={formatDate(notaFiscal.dataInclusao)}
                        readOnly
                    />
                    <strong>CFOP:</strong>
                    <input 
                        value={notaFiscal.cfop}
                        readOnly
                    />
                    <strong>NATUREZA DA OPERAÇÃO</strong>
                    <input 
                        value={notaFiscal.natOp}
                        readOnly
                    />
                    <strong>NOME DO CLIENTE:</strong>
                    <input            
                        value={ pedido.cliente.nome }
                        readOnly
                    />
                    <CamposDeTipo
                        pedido={pedido}
                    ></CamposDeTipo>
                    <strong>TELEFONE:</strong>
                    <input 
                        placeholder="Telefone"             
                        value={pedido.cliente.telefone}
                        readOnly
                        type="number"
                    />
                    <strong>CEP:</strong>
                    <input 
                        placeholder="CEP"             
                        value={pedido.cliente.cep}
                        readOnly
                        type="number"
                    />
                    <strong>ENDEREÇO:</strong>
                    <input 
                        placeholder="Endereço"             
                        value={pedido.cliente.endereco}
                        readOnly
                    />
                    <strong>NÚMERO:</strong>
                    <input 
                        placeholder="Número"             
                        value={pedido.cliente.numero_residencia}
                        readOnly
                        type="number"
                    />
                    <strong>COMPLEMENTO:</strong>
                    <input 
                        placeholder="Complemento"             
                        value={pedido.cliente.complemento}
                        readOnly
                    />
                    <strong>CIDADE:</strong>
                    <input 
                        placeholder="Cidade"             
                        value={pedido.cliente.cidade}
                        readOnly
                    />
                    <strong>BAIRRO:</strong>
                    <input 
                        placeholder="Bairro"             
                        value={pedido.cliente.bairro}
                        readOnly
                    />
                    <strong>UF:</strong>
                    <input 
                        placeholder="UF"             
                        value={pedido.cliente.uf}
                        readOnly
                    />

                    <strong>ITENS DA NOTA:</strong>

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

                    <strong>PREÇO TOTAL:</strong>
                    <input            
                        value={ formatReal(pedido.precoTotal) }
                        readOnly
                    />

                    <strong>União - IRPJ, IRPJ, CSLL, COFINS, Pis/Pasep, CPP (tributos federais incluídos no Simples):</strong>
                    <input             
                        value={formatPercent(notaFiscal.uniao)}
                        readOnly
                    />
                    <strong>Estado - ICMS (tributos estaduais incluídos no Simples):</strong>
                    <input             
                        value={formatPercent(notaFiscal.icms)}
                        readOnly
                    />
                    <strong>Estado - Substituição Tributária do ICMS:</strong>
                    <input             
                        value={formatPercent(notaFiscal.subTriIcms)}
                        readOnly
                    />
                    <strong>TOTAL TRUBUTOS:</strong>
                    <input             
                        value={formatPercent(notaFiscal.totalTributos)}
                        readOnly
                    />
                    <strong>VALOR A PAGAR:</strong>
                    <input             
                        value={formatReal(notaFiscal.valPagar)}
                        readOnly
                    />
                    
                </form>
            </div>
        </div>
    )
}