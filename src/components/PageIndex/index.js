import React, { useCallback, useEffect, useState } from 'react'

import './styles.css'

export default function PageIndex({pagina, totalPaginas, setPagina}) {
    const [paginas, setPaginas] = useState([])
    const validPage = useCallback(
        p => (p >= 1 && p <= totalPaginas),
        [totalPaginas]
    )
    
    function activateButton(number) {
        const buttons = document.querySelector('.pagination')
        for (let i=0; i<buttons.children.length; i++) {
            const b = buttons.children[i]
            if (b.value == number)
                b.classList.add('active')
            else 
                b.classList.remove('active')
        }
    }

    useEffect(() => {
        let paginas = [];
        paginas.push( <button 
            onClick={() => {
                setPagina(pagAnt => {
                    if (validPage(pagAnt-1)) return pagAnt-1
                    else return pagAnt
                })
            }} 
        >&laquo;</button> )
        paginas.push(
            <button key={1} onClick={e => setPagina(e.target.value)} value={1} 
            className="active" >{1}</button>
        )
        for (let i = 2; i <= totalPaginas; i++) paginas.push(
            <button key={i} onClick={e => setPagina(e.target.value)} value={i} >{i}</button>
        )
        paginas.push( <button 
            onClick={() => {
                setPagina(pagAnt => {
                    if (validPage(Number(pagAnt)+1)) return Number(pagAnt)+1
                    else return pagAnt
                })
            }}
        >&raquo;</button> )
        setPaginas(paginas)
    }, [totalPaginas])

    useEffect(() => {
        activateButton(pagina)
    }, [pagina])

    return (
        <div className="pagination">
            {paginas}
        </div>
    )
}