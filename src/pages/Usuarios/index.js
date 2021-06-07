import React, {useState, useEffect} from 'react'
import { Link, useHistory } from 'react-router-dom'
//import { FiPower, FiTrash2 } from 'react-icons/fi'

import api from '../../services/api'
import formatRole from '../../services/formatRole'

import './styles.css'

import BarraPesquisa from '../../components/BarraPesquisa'
import PageIndex from '../../components/PageIndex'
import NavBar from '../../components/NavBar'

//import logoImg from '../../assets/logo.svg'

export default function Usuarios() {
    const [usuarios, setUsuarios] = useState([])
    const [nome, setNome] = useState('')
    const [pagina, setPagina] = useState(1)
    const [totalPaginas, setTotalPaginas] = useState(1)

    const userLogin = localStorage.getItem('userLogin')
    const userSenha = localStorage.getItem('userSenha')

    const history = useHistory()

    function getUsuarios(descrFiltro, pageFiltro) {
        let reqParams = {}
        if (descrFiltro !== '') {
            reqParams['nome'] = descrFiltro
        }
        if (pageFiltro !== '') {
            reqParams['page'] = pageFiltro
        }
        reqParams['itemsPerPage'] = 6

        api.get('usuarios', 
            {
                params: reqParams,
                auth: {
                    username: userLogin,
                    password: userSenha
                }
            }
        )
        .then(response => {
            setUsuarios(response.data.usuarios)
            setTotalPaginas(response.data.totalPages)
        })
        .catch(err => {
            alert('Erro ao buscar dados, tente novamente.')
            console.log(err)
        }) 
    }

    useEffect(() => {
        getUsuarios(nome, pagina)
    }, [pagina])

    

    return (
        <>
        <div className="listagem-container">
            <NavBar></NavBar>
            <header>
                <h1>Usuários cadastrados</h1>
                <Link className="button" to="/usuarios/novo">Cadastrar novo usuário</Link>
            </header>

            <BarraPesquisa 
                placeholder="Nome do Usuário"
                filtro={nome} 
                setFiltro={setNome} 
                getEntidades={getUsuarios}
                setPagina={setPagina}
            ></BarraPesquisa>

            <ul className="entidades" >
                {usuarios.map(usuario => (
                    <li key={usuario.id}>
                        <strong>ID:</strong>
                        <p>{usuario.id}</p>

                        <strong>NOME DO USUÁRIO:</strong>
                        <p>{usuario.nome}</p>

                        <strong>EMAIL:</strong>
                        <p>{usuario.login}</p>

                        <strong>PERMISSÕES:</strong>
                        <p>{formatRole(usuario.nomeRole)}</p>

                        <Link to={`usuarios/${usuario.id}`}>
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