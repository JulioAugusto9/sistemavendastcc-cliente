import React from 'react'

import './styles.css'

export default function BarraPesquisa({filtro, setFiltro, getEntidades, setPagina}) {

    function handlePesquisa() {
        getEntidades(filtro, 1)
        setPagina(1)
    }

    return (
        <div className="barra-pesquisa">
            <input 
                placeholder="Descrição do Produto"
                value={filtro}
                onChange={e => setFiltro(e.target.value)}
            />
            <button onClick={handlePesquisa} >Pesquisar</button>
        </div> 
    )
}