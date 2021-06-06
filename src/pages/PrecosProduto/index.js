import React, {useState, useEffect} from 'react'
import { Link, useHistory } from 'react-router-dom'
//import { FiPower, FiTrash2 } from 'react-icons/fi'

import api from '../../services/api'
import './styles.css'

import PageIndex from '../../components/PageIndex'
import NavBar from '../../components/NavBar'

//import logoImg from '../../assets/logo.svg'

export default function PrecosProduto(props) {
    const { id } = props.match.params
    const [precos, setPrecos] = useState([])
    const [dataCriacao, setDataCriacao] = useState('')
    const [preco, setPreco] = useState('')
    const [descricao, setDescricao] = useState('')
    const [pagina, setPagina] = useState(1)
    const [totalPaginas, setTotalPaginas] = useState(1)

    const userLogin = localStorage.getItem('userLogin')
    const userSenha = localStorage.getItem('userSenha')

    // const ongId = localStorage.getItem('ongId')
    // const ongName = localStorage.getItem('ongName')

    const history = useHistory()

    function getPrecos(descrFiltro, pageFiltro) {
        let reqParams = {}
        if (descrFiltro !== '') {
            reqParams['descricao'] = descrFiltro
        }
        if (pageFiltro !== '') {
            reqParams['page'] = pageFiltro
        }
        reqParams['itemsPerPage'] = 6

        api.get(`produtos/${id}/precos`, 
            {
                //params: reqParams,
                auth: {
                    username: userLogin,
                    password: userSenha
                }
            }
        )
        .then(response => {
            setPrecos(response.data)
        })
        .catch(err => {
            alert('Erro ao buscar dados, tente novamente.')
            console.log(err)
        }) 
    }

    useEffect(() => {
        getPrecos(descricao, pagina)
    }, [pagina])

    function handleNovoPreco() {
        const data = {
            dataCriacao,
            preco
        }

        api.post(`produtos/${id}/precos`, data, {
            auth: {
                username: userLogin,
                password: userSenha
            }
        })
        .then((res) => {
            setPrecos((prevPrecos) => [...prevPrecos, res.data])
        })
        .catch((err) => {
            alert('Erro ao cadastrar caso, tente novamente.')
            console.log(err);
        })
    }

    function excluir(precoId) {
        if (!window.confirm('Tem certeza que deseja excluir este preço? Esta ação não pode ser revertida'))
            return;
        api.delete(`/produtos/${id}/precos/${precoId}`, {
            auth: {
                username: userLogin,
                password: userSenha
            }
        })
        .then(() => {
            getPrecos();
        })
        .catch((err) => {
            alert('Erro ao cadastrar caso, tente novamente.')
            console.log(err);
        })
    }

    return (
        <>
        <div className="listagem-container">
            <NavBar></NavBar>
            
            <header>
                    <input 
                        placeholder="Data de efetivação"
                        value={dataCriacao}
                        onChange={e => setDataCriacao(e.target.value)}
                    />
                    <input 
                        placeholder="Preço"
                        value={preco}
                        onChange={e => setPreco(e.target.value)}
                    />
                <Link className="button" onClick={handleNovoPreco}>Cadastrar novo preço</Link>
            </header>
            <h1>Preços do Produto de ID: {id}</h1>

            <ul className="entidades" >
                {precos.map(preco => (
                    <li key={preco.id}>
                        <strong>DATA DE EFETIVAÇÃO DO PREÇO:</strong>
                        <p>{preco.dataCriacao}</p>

                        <strong>PREÇO:</strong>
                        <p>{ Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(preco.preco) }</p>

                        <button onClick={() => excluir(preco.id)} type="button">
                            Excluir
                        </button>
                    </li>
                ))}
            </ul>

        </div>
        </>
    )
}