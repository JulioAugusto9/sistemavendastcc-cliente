import React, {useState} from 'react'
import { Link, useHistory } from 'react-router-dom'
//import { FiArrowLeft } from 'react-icons/fi'

import NavBar from '../../components/NavBar';

import api from '../../services/api'
import msgCamposInvalidos from '../../services/msgCamposInvalidos';
import parseReal from '../../services/parseReal';

import './styles.css'

export default function NovoProduto(){
    const [descricao, setDescricao] = useState('');
    const [tipoUnidade, setTipoUnidade] = useState('');
    const [preco, setPreco] = useState('');

    const userLogin = localStorage.getItem('userLogin')
    const userSenha = localStorage.getItem('userSenha')

    const history = useHistory()

    async function handleNovoProduto(e) {
        e.preventDefault()

        const data = {
            descricao,
            tipoUnidade,
            preco: parseReal(preco),
        }

        try{
            await api.post('produtos', data, {
                auth: {
                    username: userLogin,
                    password: userSenha
                }
            }) 
            alert('Produto cadastrado com sucesso')
            history.push('/produtos')
        } catch (err){
            alert(msgCamposInvalidos(err))
            console.log(err);
        }
    }

    return (
        <div className="cadastro-container">
            <NavBar></NavBar>
            <div className="content">
                
                <h1>Cadastrar novo Produto</h1>

                <form onSubmit={handleNovoProduto}>
                    <input 
                        placeholder="Descrição do Produto"
                        value={descricao}
                        onChange={e => setDescricao(e.target.value)}
                    />
                    <input
                        placeholder="Tipo da Unidade"
                        value={tipoUnidade}
                        onChange={e => setTipoUnidade(e.target.value)}
                    />
                    <input 
                        placeholder="Preço em reais"             
                        value={preco}
                        onChange={e => setPreco(e.target.value)}
                        type="number"
                    />

                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    )
}