import React, {useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
//import { FiArrowLeft } from 'react-icons/fi'

import NavBar from '../../components/NavBar';

import api from '../../services/api'
import formatReal from '../../services/formatReal';
import msgCamposInvalidos from '../../services/msgCamposInvalidos';

import './styles.css'

function CamposDeTipo({ cliente, setCliente }) {
    if (cliente.tipo === 'pessoafisica') return (<>
        <strong>CPF:</strong>
        <input 
            placeholder="CPF"
            value={cliente.cpf}
            onChange={e => setCliente({ ...cliente, cpf: e.target.value})}
        />
        <strong>RG:</strong>
        <input 
            placeholder="RG"
            value={cliente.rg}
            onChange={e => setCliente({ ...cliente, rg: e.target.value})}
        />
        <strong>DATA DE NASCIMENTO:</strong>
        <input 
            placeholder="Data de Nascimento"
            value={cliente.dataNascimento}
            onChange={e => setCliente({ ...cliente, dataNascimento: e.target.value})}
        />
    </>)
    else return (<>
        <strong>CNPJ:</strong>
        <input 
            placeholder="CNPJ"
            value={cliente.cnpj}
            onChange={e => setCliente({ ...cliente, cnpj: e.target.value})}
        />
        <strong>INSCRIÇÃO ESTADUAL:</strong>
        <input 
            placeholder="Inscrição Estadual"
            value={cliente.inscricaoEstadual}
            onChange={e => setCliente({ ...cliente, inscricaoEstadual: e.target.value})}
        />
        <strong>DATA DE FUNDAÇÃo:</strong>
        <input 
            placeholder="Data de Fundação"
            value={cliente.dataFundacao}
            onChange={e => setCliente({ ...cliente, dataFundacao: e.target.value})}
        />
    </>)
}

export default function DetalheCliente(props){
    const { id } = props.match.params
    const [cliente, setCliente] = useState({})

    const userLogin = localStorage.getItem('userLogin')
    const userSenha = localStorage.getItem('userSenha')
    const userRole = localStorage.getItem('userRole')

    const history = useHistory()

    useEffect(() => {
        api.get(`clientes/${id}`, {
            auth: {
                username: userLogin,
                password: userSenha
            }
        })
        .then((res) => {
            setCliente(res.data)
        })
        .catch(err => {
            alert('Erro ao buscar dados, tente novamente.')
            console.log(err)
        }) 
    }, [id])

    function alterar() {
        const data = cliente
        api.put(`clientes/${cliente.tipo}/${id}`, data, {
            auth: {
                username: userLogin,
                password: userSenha
            }
        })
        .then((res) => {
            setCliente(res.data)
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

        api.delete(`clientes/${id}`, {
            auth: {
                username: userLogin,
                password: userSenha
            }
        })
        .then(() => {
            alert('Cliente excluído com sucesso')
            history.push('/clientes')
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
               
                <h1>Detalhes do Cliente</h1>

                <form >
                    <strong>ID:</strong>
                    <input 
                        value={cliente.id}
                        readOnly
                    />
                    <strong>NOME DO CLIENTE:</strong>
                    <input 
                        value={cliente.nome}
                        onChange={e => setCliente({...cliente, nome: e.target.value})}
                    />

                    <CamposDeTipo
                        tipoCliente={cliente.tipo}
                        cliente={cliente}
                        setCliente={setCliente}
                    ></CamposDeTipo>

                    <strong>EMAIL:</strong>
                    <input
                        value={cliente.email}
                        onChange={e => setCliente({...cliente, email: e.target.value})}
                    />
                    <strong>TELEFONE:</strong>
                    <input 
                        placeholder="Telefone"             
                        value={cliente.telefone}
                        onChange={e => setCliente({ ...cliente, telefone: e.target.value})}
                        type="number"
                    />
                    <strong>CEP:</strong>
                    <input 
                        placeholder="CEP"             
                        value={cliente.cep}
                        onChange={e => setCliente({ ...cliente, cep: e.target.value})}
                        type="number"
                    />
                    <strong>ENDEREÇO:</strong>
                    <input 
                        placeholder="Endereço"             
                        value={cliente.endereco}
                        onChange={e => setCliente({ ...cliente, endereco: e.target.value})}
                    />
                    <strong>NÚMERO:</strong>
                    <input 
                        placeholder="Número"             
                        value={cliente.numero_residencia}
                        onChange={e => setCliente({ ...cliente, numero_residencia: e.target.value})}
                        type="number"
                    />
                    <strong>COMPLEMENTO:</strong>
                    <input 
                        placeholder="Complemento"             
                        value={cliente.complemento}
                        onChange={e => setCliente({ ...cliente, complemento: e.target.value})}
                    />
                    <strong>CIDADE:</strong>
                    <input 
                        placeholder="Cidade"             
                        value={cliente.cidade}
                        onChange={e => setCliente({ ...cliente, cidade: e.target.value})}
                    />
                    <strong>BAIRRO:</strong>
                    <input 
                        placeholder="Bairro"             
                        value={cliente.bairro}
                        onChange={e => setCliente({ ...cliente, bairro: e.target.value})}
                    />
                    <strong>UF:</strong>
                    <input 
                        placeholder="UF"             
                        value={cliente.uf}
                        onChange={e => setCliente({ ...cliente, uf: e.target.value})}
                    />

                    <div className="botoes" >
                        <button className="acao" onClick={alterar}>Alterar</button>
                        <button className="acao" onClick={excluir}>Excluir</button>
                    </div>
                </form>
            </div>
        </div>
    )
}