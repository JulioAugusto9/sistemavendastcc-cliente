import React, {useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
//import { FiArrowLeft } from 'react-icons/fi'

import NavBar from '../../components/NavBar';

import api from '../../services/api'
import formatReal from '../../services/formatReal';
import msgCamposInvalidos from '../../services/msgCamposInvalidos';

import './styles.css'

function LinkPrecos({ userRole, id }) {
    if (userRole !== 'ROLE_GERENTE') return (<></>)
    return (
        <Link to={`/produtos/${id}/precos`} >
            <button className="acao">Ver Preços</button>
        </Link>
    )
}

export default function NovoProduto(props){
    const { id } = props.match.params
    const [descricao, setDescricao] = useState('');
    const [tipoUnidade, setTipoUnidade] = useState('');
    const [preco, setPreco] = useState('');

    const userLogin = localStorage.getItem('userLogin')
    const userSenha = localStorage.getItem('userSenha')
    const userRole = localStorage.getItem('userRole')

    const history = useHistory()

    useEffect(() => {
        api.get(`/produtos/${id}`, {
            auth: {
                username: userLogin,
                password: userSenha
            }
        })
        .then((res) => {
            const prod = res.data
            setDescricao(prod.descricao)
            setTipoUnidade(prod.tipoUnidade)
            setPreco(prod.preco)
        })
        .catch(err => {
            alert('Erro ao buscar dados, tente novamente.')
            console.log(err)
        }) 
    }, [id])

    function alterar() {
        const data = { id, descricao, tipoUnidade, preco }
        api.put(`/produtos/${id}`, data, {
            auth: {
                username: userLogin,
                password: userSenha
            }
        })
        .then((res) => {
            const prod = res.data
            setDescricao(prod.descricao)
            setTipoUnidade(prod.tipoUnidade)
            setPreco(prod.preco)
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

        api.delete(`/produtos/${id}`, {
            auth: {
                username: userLogin,
                password: userSenha
            }
        })
        .then(() => {
            alert('Produto excluído com sucesso')
            history.push('/produtos')
        })
        .catch((err) => {
            alert('Erro ao cadastrar caso, tente novamente.')
            console.log(err);
        })
    }

    return (
        <div className="cadastro-container">

            <NavBar></NavBar>

            <div className="content">
               
                <h1>Detalhes do Produto</h1>

                <form >
                    <strong>ID:</strong>
                    <input 
                        placeholder="Código do Produto"
                        defaultValue={id}
                        readOnly
                    />
                    <strong>DESCRIÇÃO DO PRODUTO:</strong>
                    <input 
                        placeholder="Descrição do Produto"
                        value={descricao}
                        onChange={e => setDescricao(e.target.value)}
                    />
                    <strong>TIPO DA UNIDADE:</strong>
                    <textarea 
                        placeholder="Tipo da Unidade"
                        value={tipoUnidade}
                        onChange={e => setTipoUnidade(e.target.value)}
                    />
                    <strong>PREÇO:</strong>
                    <input 
                        placeholder="Preço em reais"             
                        value={ formatReal(preco) }
                        readOnly
                    />

                    <div className="botoes" >
                        <button className="acao" onClick={alterar}>Alterar</button>
                        <button className="acao" onClick={excluir}>Excluir</button>
                        <LinkPrecos userRole={userRole} id={id} ></LinkPrecos>
                    </div>
                </form>
            </div>
        </div>
    )
}