import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

//import Logon from './pages/Logon'
//import Register from './pages/Register'
import Login from './pages/Login'
import Home from './pages/Home'
import Produtos from './pages/Produtos'
import NovoProduto from './pages/NovoProduto'
import DetalheProduto from './pages/DetalheProduto'
import PrecosProduto from './pages/PrecosProduto'

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                {/* <Route path="/" exact component={Logon} />
                <Route path="/register" component={Register}/> */}
                <Route path="/" exact component={Home}/>
                <Route path="/login" exact component={Login}/>
                <Route path="/produtos" exact component={Produtos}/>
                <Route path="/produtos/novo" exact component={NovoProduto}/>
                <Route path="/produtos/:id" exact component={DetalheProduto}/>
                <Route path="/produtos/:id/precos" exact component={PrecosProduto}/>
            </Switch>
        </BrowserRouter>
    )
}