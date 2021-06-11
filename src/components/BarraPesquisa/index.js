import React from 'react'

import './styles.css'

export default function BarraPesquisa({placeholder, filtro, setFiltro, getEntidades, setPagina, listdata}) {

    function handlePesquisa() {
        getEntidades(filtro, 1)
        setPagina(1)
    }

    return (
        <div className="barra-pesquisa">
            <input 
                placeholder={placeholder}
                value={filtro}
                list={listdata}
                onChange={e => setFiltro(e.target.value)}
            />
            <button onClick={handlePesquisa} >Pesquisar</button>
        </div> 
    )
}