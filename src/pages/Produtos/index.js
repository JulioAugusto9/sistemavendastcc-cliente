import React, {useState, useEffect} from 'react'
import { Link, useHistory } from 'react-router-dom'
//import { FiPower, FiTrash2 } from 'react-icons/fi'

import api from '../../services/api'
import './styles.css'

//import logoImg from '../../assets/logo.svg'

export default function Produtos() {
    const [produtos, setProdutos] = useState([])

    // const ongId = localStorage.getItem('ongId')
    // const ongName = localStorage.getItem('ongName')

    const history = useHistory()

    useEffect(() => {
        api.get('produtos')
        .then(response => {
            setProdutos(response.data)
        })
    }, [])

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

    function handleLogout() {
        // localStorage.clear()

        // history.push('/')
    }

    return (
        <div className="profile-container">
            <header>
                <img alt="Be The Hero"/>
                <span>Bem vinda, </span>
                <Link className="button" to="/produtos/novo">Cadastrar novo caso</Link>
                <button onClick={handleLogout} type="button">
                  {/*}  <FiPower size={18} color="E02041"></FiPower>*/} Sair
                </button>
            </header>

            <h1>Produtos cadastrados</h1>

            <ul>
                {produtos.map(produto => (
                    <li key={produto.id}>
                        <strong>CASO:</strong>
                        <p>{produto.descricao}</p>

                        <strong>DESCRIÇÂO:</strong>
                        <p>{produto.tipoUnidade}</p>

                        <strong>VALOR:</strong>
                        <p>{ Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(produto.preco) }</p>

                        <button onClick={() => handleDeleteIncident(produto.id)} type="button">
                            {/*<FiTrash2 size={20} color="a8a8b3" />*/} deletar
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}