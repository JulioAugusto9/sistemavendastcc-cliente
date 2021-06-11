import React, {useState} from 'react'
import { Link, useHistory } from 'react-router-dom'
//import { FiArrowLeft } from 'react-icons/fi'

import NavBar from '../../components/NavBar';

import api from '../../services/api'
import msgCamposInvalidos from '../../services/msgCamposInvalidos';

import './styles.css'

function CamposDeTipo({ tipoCliente, cliente, setCliente }) {
    if (tipoCliente === 'pessoafisica') return (<>
        <input 
            placeholder="CPF"
            value={cliente.cpf}
            onChange={e => setCliente({ ...cliente, cpf: e.target.value})}
        />
        <input 
            placeholder="RG"
            value={cliente.rg}
            onChange={e => setCliente({ ...cliente, rg: e.target.value})}
        />
        <input 
            placeholder="Data de Nascimento"
            value={cliente.dataNascimento}
            onChange={e => setCliente({ ...cliente, dataNascimento: e.target.value})}
            onFocus={e => e.target.type='date'}
        />
    </>)
    else return (<>
        <input 
            placeholder="CNPJ"
            value={cliente.cnpj}
            onChange={e => setCliente({ ...cliente, cnpj: e.target.value})}
        />
        <input 
            placeholder="Inscrição Estadual"
            value={cliente.inscricaoEstadual}
            onChange={e => setCliente({ ...cliente, inscricaoEstadual: e.target.value})}
        />
        <input 
            placeholder="Data de Fundação"
            value={cliente.dataFundacao}
            onChange={e => setCliente({ ...cliente, dataFundacao: e.target.value})}
            onFocus={e => e.target.type='date'}
        />
    </>)
}

export default function NovoCliente(){
    const [cliente, setCliente] = useState({})
    // useState({
    //     nome: '',
    //     email: '',
    //     telefone: '',
    // })

    const [tipoCliente, setTipoCliente] = useState('pessoafisica')

    const userLogin = localStorage.getItem('userLogin')
    const userSenha = localStorage.getItem('userSenha')

    const history = useHistory()

    async function handleNovoCliente(e) {
        e.preventDefault()

        const data = {...cliente, tipo: tipoCliente}

        try{
            await api.post(`clientes/${tipoCliente}`, data, {
                auth: {
                    username: userLogin,
                    password: userSenha
                }
            }) 
            alert('Cliente cadastrado com sucesso')

            history.push('/clientes')
        } catch (err){
            alert(msgCamposInvalidos(err))
            console.log(err);
        }
    }

    return (
        <div className="cadastro-container">
            <NavBar></NavBar>
            <div className="content">
                
                <h1>Cadastrar novo Cliente</h1>

                <form onSubmit={handleNovoCliente}>
                    <input 
                        placeholder="Nome do Cliente"
                        value={cliente.nome}
                        onChange={e => setCliente({ ...cliente, nome: e.target.value})}
                    />
                    <select name="selecttipo" id="selecttipo" onChange={e => setTipoCliente(e.target.value)}>
                        <option value="pessoafisica">Pessoa Física</option>
                        <option value="pessoajuridica">Pessoa Jurídica</option>
                    </select>

                    <CamposDeTipo
                        tipoCliente={tipoCliente}
                        cliente={cliente}
                        setCliente={setCliente}
                    ></CamposDeTipo>

                    <input 
                        placeholder="Email"
                        value={cliente.email}
                        onChange={e => setCliente({ ...cliente, email: e.target.value})}
                        type="email"
                    />
                    <input 
                        placeholder="Telefone"             
                        value={cliente.telefone}
                        onChange={e => setCliente({ ...cliente, telefone: e.target.value})}
                        type="number"
                    />
                    <input 
                        placeholder="CEP"             
                        value={cliente.cep}
                        onChange={e => setCliente({ ...cliente, cep: e.target.value})}
                        type="number"
                    />
                    <input 
                        placeholder="Endereço"             
                        value={cliente.endereco}
                        onChange={e => setCliente({ ...cliente, endereco: e.target.value})}
                    />
                    <input 
                        placeholder="Número"             
                        value={cliente.numero_residencia}
                        onChange={e => setCliente({ ...cliente, numero_residencia: e.target.value})}
                        type="number"
                    />
                    <input 
                        placeholder="Complemento"             
                        value={cliente.complemento}
                        onChange={e => setCliente({ ...cliente, complemento: e.target.value})}
                    />
                    <input 
                        placeholder="Cidade"             
                        value={cliente.cidade}
                        onChange={e => setCliente({ ...cliente, cidade: e.target.value})}
                    />
                    <input 
                        placeholder="Bairro"             
                        value={cliente.bairro}
                        onChange={e => setCliente({ ...cliente, bairro: e.target.value})}
                    />
                    <input 
                        placeholder="UF"             
                        value={cliente.uf}
                        onChange={e => setCliente({ ...cliente, uf: e.target.value})}
                    />

                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    )
}