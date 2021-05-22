import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

//import Logon from './pages/Logon'
//import Register from './pages/Register'
import Produtos from './pages/Produtos'
import NovoProduto from './pages/NovoProduto'

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                {/* <Route path="/" exact component={Logon} />
                <Route path="/register" component={Register}/> */}
                <Route path="/produtos" exact component={Produtos}/>
                <Route path="/produtos/novo" exact component={NovoProduto}/>
            </Switch>
        </BrowserRouter>
    )
}