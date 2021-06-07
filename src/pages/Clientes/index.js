import React, {useState, useEffect} from 'react'
import { Link, useHistory } from 'react-router-dom'
//import { FiPower, FiTrash2 } from 'react-icons/fi'

import api from '../../services/api'
import './styles.css'

import BarraPesquisa from '../../components/BarraPesquisa'
import PageIndex from '../../components/PageIndex'
import NavBar from '../../components/NavBar'
import stringarCampos from '../../services/stringarCampos'

export default function Clientes() {
    const [clientes, setClientes] = useState([])
    const [nome, setNome] = useState('')
    const [pagina, setPagina] = useState(1)
    const [totalPaginas, setTotalPaginas] = useState(1)

    const userLogin = localStorage.getItem('userLogin')
    const userSenha = localStorage.getItem('userSenha')

    const history = useHistory()

    function getClientes(descrFiltro, pageFiltro) {
        let reqParams = {}
        if (descrFiltro !== '') {
            reqParams['nome'] = descrFiltro
        }
        if (pageFiltro !== '') {
            reqParams['page'] = pageFiltro
        }
        reqParams['itemsPerPage'] = 6

        api.get('clientes', 
            {
                params: reqParams,
                auth: {
                    username: userLogin,
                    password: userSenha
                }
            }
        )
        .then(response => {
            setClientes(response.data.clientes)
            setTotalPaginas(response.data.totalPages)
        })
        .catch(err => {
            alert('Erro ao buscar dados, tente novamente.')
            console.log(err)
        }) 
    }

    useEffect(() => {
        getClientes(nome, pagina)
    }, [pagina])

    

    return (
        <>
        <div className="listagem-container">
            <NavBar></NavBar>
            <header>
                <h1>Clientes cadastrados</h1>
                <Link className="button" to="/clientes/novo">Cadastrar novo cliente</Link>
            </header>

            <BarraPesquisa 
                placeholder="Nome do cliente"
                filtro={nome} 
                setFiltro={setNome} 
                getEntidades={getClientes}
                setPagina={setPagina}
            ></BarraPesquisa>

            <ul className="entidades" >
                {clientes.map(cliente => (
                    <li key={cliente.id}>
                        <strong>ID:</strong>
                        <p>{cliente.id}</p>

                        <strong>NOME DO CLIENTE:</strong>
                        <p>{cliente.nome}</p>

                        <strong>EMAIL:</strong>
                        <p>{ cliente.email }</p>

                        <strong>TELEFONE:</strong>
                        <p>{cliente.telefone}</p>

                        <strong>ENDEREÇO:</strong>
                        <p>{stringarCampos([cliente.endereco, cliente.numero_residencia, cliente.complemento])}</p>
                        <p>{stringarCampos([cliente.cidade, cliente.bairro, cliente.uf])}</p>

                        <Link to={`clientes/${cliente.id}`}>
                            <button className="acao" type="button">
                                Detalhes  
                            </button>
                        </Link>
                    </li>
                ))}
            </ul>

            <PageIndex
                pagina={pagina}
                setPagina={setPagina}
                totalPaginas={totalPaginas}
            ></PageIndex>
        </div>
        </>
    )
}