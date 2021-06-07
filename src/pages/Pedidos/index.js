import React, {useState, useEffect} from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'
//import { FiPower, FiTrash2 } from 'react-icons/fi'

import api from '../../services/api'
import './styles.css'

import BarraPesquisa from '../../components/BarraPesquisa'
import PageIndex from '../../components/PageIndex'
import NavBar from '../../components/NavBar'
import formatReal from '../../services/formatReal'

//import logoImg from '../../assets/logo.svg'

export default function Pedidos() {
    const [pedidos, setPedidos] = useState([])
    const [descricao, setDescricao] = useState('')
    const [pagina, setPagina] = useState(1)
    const [totalPaginas, setTotalPaginas] = useState(1)

    const [ehOrcamento, setEhOrcamento] = useState(false)

    const userLogin = localStorage.getItem('userLogin')
    const userSenha = localStorage.getItem('userSenha')

    const history = useHistory()
    const location = useLocation()

    function getPedidos(descrFiltro, pageFiltro) {
        let reqParams = {}
        if (descrFiltro !== '') {
            reqParams['descricao'] = descrFiltro
        }
        if (pageFiltro !== '') {
            reqParams['page'] = pageFiltro
        }
        reqParams['itemsPerPage'] = 6

        if (location.pathname.indexOf('orcamento') !== -1) reqParams['estado'] = 'ORCAMENTO'

        api.get('pedidos', 
            {
                params: reqParams,
                auth: {
                    username: userLogin,
                    password: userSenha
                }
            }
        )
        .then(response => {
            setPedidos(response.data.pedidos)
            setTotalPaginas(response.data.totalPages)
        })
        .catch(err => {
            alert('Erro ao buscar dados, tente novamente.')
            console.log(err)
        }) 
    }

    useEffect(() => {
        //setEhOrcamento(location.pathname.indexOf('orcamento') === -1)
        getPedidos(descricao, pagina)
    }, [pagina, location])

    return (
        <>
        <div className="listagem-container">
            <NavBar></NavBar>
            <header>
                <h1>Pedidos cadastrados</h1>
                <Link className="button" to="/pedidos/novo">Cadastrar novo pedido</Link>
            </header>

            <BarraPesquisa 
                placeholder="Descrição do pedido"
                filtro={descricao} 
                setFiltro={setDescricao} 
                getEntidades={getPedidos}
                setPagina={setPagina}
            ></BarraPesquisa>

            <ul className="entidades" >
                {pedidos.map(pedido => (
                    <li key={pedido.id}>
                        <strong>ID:</strong>
                        <p>{pedido.id}</p>

                        <strong>DATA DO PEDIDO:</strong>
                        <p>{pedido.dataCriacao}</p>

                        <strong>PREÇO TOTAL:</strong>
                        <p>{ formatReal(pedido.precoTotal) }</p>

                        <strong>ESTADO:</strong>
                        <p>{pedido.estado}</p>

                        <strong>NOME DO CLIENTE:</strong>
                        <p>{pedido.cliente.nome}</p>

                        <strong>NOME DO VENDEDOR:</strong>
                        <p>{pedido.usuario.nome}</p>

                        <Link to={`pedidos/${pedido.id}`}>
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