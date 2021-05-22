import React, {useState} from 'react'
import { Link, useHistory } from 'react-router-dom'
//import { FiArrowLeft } from 'react-icons/fi'

import api from '../../services/api'
import './styles.css'

//import logoImg from '../../assets/logo.svg'

export default function NovoProduto(){
    const [descricao, setDescricao] = useState('');
    const [tipoUnidade, setTipoUnidade] = useState('');
    const [preco, setPreco] = useState('');

    const history = useHistory()

    async function handleNovoProduto(e) {
        e.preventDefault()

        const data = {
            descricao,
            tipoUnidade,
            preco,
        }

        try{
            await api.post('produtos', data) 

            history.push('/produtos')
        } catch (err){
            alert('Erro ao cadastrar caso, tente novamente.')
            console.log(err);
        }
    }

    return (
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <img alt="Be The Hero"/>

                    <h1>Cadastrar novo Produto</h1>
                    <p>teste.</p>
                    <Link className="back-link" to="/produtos">
                    {/*<FiArrowLeft size={16} color="E02041"></FiArrowLeft>*/}
                        Voltar
                    </Link>
                </section>

                <form onSubmit={handleNovoProduto}>
                    <input 
                        placeholder="Descrição do Produto"
                        value={descricao}
                        onChange={e => setDescricao(e.target.value)}
                    />
                    <textarea 
                        placeholder="Tipo da Unidade"
                        value={tipoUnidade}
                        onChange={e => setTipoUnidade(e.target.value)}
                    />
                    <input 
                        placeholder="Preço em reais"             
                        value={preco}
                        onChange={e => setPreco(e.target.value)}
                    />

                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    )
}