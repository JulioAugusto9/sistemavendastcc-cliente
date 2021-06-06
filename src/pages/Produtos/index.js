import React, {useState, useEffect} from 'react'
import { Link, useHistory } from 'react-router-dom'
//import { FiPower, FiTrash2 } from 'react-icons/fi'

import api from '../../services/api'
import './styles.css'

import BarraPesquisa from '../../components/BarraPesquisa'
import PageIndex from '../../components/PageIndex'
import NavBar from '../../components/NavBar'
import formatReal from '../../services/formatReal'

//import logoImg from '../../assets/logo.svg'

export default function Produtos() {
    const [produtos, setProdutos] = useState([])
    const [descricao, setDescricao] = useState('')
    const [pagina, setPagina] = useState(1)
    const [totalPaginas, setTotalPaginas] = useState(1)

    const userLogin = localStorage.getItem('userLogin')
    const userSenha = localStorage.getItem('userSenha')

    const history = useHistory()

    function getProdutos(descrFiltro, pageFiltro) {
        let reqParams = {}
        if (descrFiltro !== '') {
            reqParams['descricao'] = descrFiltro
        }
        if (pageFiltro !== '') {
            reqParams['page'] = pageFiltro
        }
        reqParams['itemsPerPage'] = 6

        api.get('produtos', 
            {
                params: reqParams,
                auth: {
                    username: userLogin,
                    password: userSenha
                }
            }
        )
        .then(response => {
            setProdutos(response.data.produtos)
            setTotalPaginas(response.data.totalPages)
        })
        .catch(err => {
            alert('Erro ao buscar dados, tente novamente.')
            console.log(err)
        }) 
    }

    useEffect(() => {
        getProdutos(descricao, pagina)
    }, [pagina])

    

    return (
        <>
        <div className="listagem-container">
            <NavBar></NavBar>
            <header>
                <h1>Produtos cadastrados</h1>
                <Link className="button" to="/produtos/novo">Cadastrar novo produto</Link>
            </header>

            <BarraPesquisa 
                placeholder="Descrição do Produto"
                filtro={descricao} 
                setFiltro={setDescricao} 
                getEntidades={getProdutos}
                setPagina={setPagina}
            ></BarraPesquisa>

            <ul className="entidades" >
                {produtos.map(produto => (
                    <li key={produto.id}>
                        <strong>ID:</strong>
                        <p>{produto.id}</p>

                        <strong>DESCRIÇÃO DO PRODUTO:</strong>
                        <p>{produto.descricao}</p>

                        <strong>PREÇO:</strong>
                        <p>{ formatReal(produto.preco) }</p>

                        <strong>TIPO DA UNIDADE:</strong>
                        <p>{produto.tipoUnidade}</p>

                        <Link to={`produtos/${produto.id}`}>
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