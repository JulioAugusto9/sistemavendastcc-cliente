import React from 'react'

import './styles.css'

export default function BarraPesquisa({placeholder, filtro, setFiltro, getEntidades, setPagina}) {

    function handlePesquisa() {
        getEntidades(filtro, 1)
        setPagina(1)
    }

    return (
        <div className="barra-pesquisa">
            <input 
                placeholder={placeholder}
                value={filtro}
                onChange={e => setFiltro(e.target.value)}
            />
            <button onClick={handlePesquisa} >Pesquisar</button>
        </div> 
    )
}