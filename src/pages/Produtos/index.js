import React, {useState, useEffect} from 'react'
import { Link, useHistory } from 'react-router-dom'
//import { FiPower, FiTrash2 } from 'react-icons/fi'

import api from '../../services/api'
import './styles.css'

import BarraPesquisa from '../../components/BarraPesquisa'
import PageIndex from '../../components/PageIndex'
import NavBar from '../../components/NavBar'

//import logoImg from '../../assets/logo.svg'

export default function Produtos() {
    const [produtos, setProdutos] = useState([])
    const [descricao, setDescricao] = useState('')
    const [pagina, setPagina] = useState(1)
    //const [totalPaginas, setTotalPaginas] = useState(1)

    // const ongId = localStorage.getItem('ongId')
    // const ongName = localStorage.getItem('ongName')

    const history = useHistory()

    function getProdutos(descrFiltro, pageFiltro) {
        let reqParams = {}
        if (descrFiltro !== '') {
            reqParams['descricao'] = descrFiltro
        }
        if (pageFiltro !== '') {
            reqParams['page'] = pageFiltro
        }

        api.get('produtos', 
            {
                params: reqParams,
            }
        )
        .then(response => {
            setProdutos(response.data)
        })
        .catch(err => {
            alert('Erro ao buscar dados, tente novamente.')
            console.log(err)
        }) 
    }

    useEffect(() => {
        getProdutos(descricao, pagina)
    }, [pagina])

    // function handlePesquisa() {
    //     getProdutos(descricao, 1)
    //     setPagina(1)
    // }

    async function handleDeleteIncident(id){
        // try{
        //    await api.delete(`incidents/${id}`, {
        //        headers: {
        //            Authorization: ongId
        //        }
        //    }) 
           
        //    setIncidents(incidents.filter(incident => incident.id !== id))
        // } catch (err) {
        //     alert('Erro ao deletar o caso, tente novamente.')
        // }
    }

    return (
        <>
        <div className="profile-container">
            <NavBar></NavBar>
            <header>
                <img alt="Be The Hero"/>
                <span>Bem vinda, </span>
                <Link className="button" to="/produtos/novo">Cadastrar novo produto</Link>
                {/* <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="E02041"></FiPower> Sair
                </button> */}
            </header>

            <h1>Produtos cadastrados</h1>

            <BarraPesquisa 
                filtro={descricao} 
                setFiltro={setDescricao} 
                getEntidades={getProdutos}
                setPagina={setPagina}
            ></BarraPesquisa>

            <ul>
                {produtos.map(produto => (
                    <li key={produto.id}>
                        <strong>ID E DESCRIÇÃO DO PRODUTO:</strong>
                        <p>{produto.id} {produto.descricao}</p>

                        <strong>PREÇO:</strong>
                        <p>{ Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(produto.preco) }</p>

                        <strong>TIPO DA UNIDADE:</strong>
                        <p>{produto.tipoUnidade}</p>

                        <button onClick={() => handleDeleteIncident(produto.id)} type="button">
                            {/*<FiTrash2 size={20} color="a8a8b3" />*/} deletar
                        </button>
                    </li>
                ))}
            </ul>

            <PageIndex
                pagina={pagina}
                setPagina={setPagina}
                totalPaginas={5}
            ></PageIndex>
        </div>
        </>
    )
}