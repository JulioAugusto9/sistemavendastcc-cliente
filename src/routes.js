import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

//import Logon from './pages/Logon'
//import Register from './pages/Register'
import Login from './pages/Login'
import Home from './pages/Home'
import AlterarSenha from './pages/AlterarSenha'

import Produtos from './pages/Produtos'
import NovoProduto from './pages/NovoProduto'
import DetalheProduto from './pages/DetalheProduto'
import PrecosProduto from './pages/PrecosProduto'

import Pedidos from './pages/Pedidos'
import NovoPedido from './pages/NovoPedido'
import DetalhePedido from './pages/DetalhePedido'
import ImprimirPedido from './pages/ImprimirPedido'
import ImprimirNotaFiscal from './pages/ImprimirNotaFiscal'

import Clientes from './pages/Clientes'
import NovoCliente from './pages/NovoCliente'
import DetalheCliente from './pages/DetalheCliente'

import Usuarios from './pages/Usuarios'
import NovoUsuario from './pages/NovoUsuario'
import DetalheUsuario from './pages/DetalheUsuario'

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                {/* <Route path="/" exact component={Logon} />
                <Route path="/register" component={Register}/> */}
                <Route path="/" exact component={Home}/>
                <Route path="/login" exact component={Login}/>
                <Route path="/alterarsenha" exact component={AlterarSenha}/>

                <Route path="/produtos" exact component={Produtos}/>
                <Route path="/produtos/novo" exact component={NovoProduto}/>
                <Route path="/produtos/:id" exact component={DetalheProduto}/>
                <Route path="/produtos/:id/precos" exact component={PrecosProduto}/>

                <Route path="/pedidos" exact component={Pedidos}/>
                <Route path="/pedidos/novo" exact component={NovoPedido}/>
                <Route path="/pedidos/:id" exact component={DetalhePedido}/>
                <Route path="/pedidos/:id/imprimir" exact component={ImprimirPedido}/>
                <Route path="/pedidos/:id/imprimirnotafiscal" exact component={ImprimirNotaFiscal}/>

                <Route path="/orcamentos" exact component={Pedidos}/>
                <Route path="/orcamentos/novo" exact component={NovoPedido}/>
                <Route path="/orcamentos/:id" exact component={DetalhePedido}/>
                <Route path="/orcamentos/:id/imprimir" exact component={ImprimirPedido}/>

                <Route path="/clientes" exact component={Clientes}/>
                <Route path="/clientes/novo" exact component={NovoCliente}/>
                <Route path="/clientes/:id" exact component={DetalheCliente}/>

                <Route path="/usuarios" exact component={Usuarios}/>
                <Route path="/usuarios/novo" exact component={NovoUsuario}/>
                <Route path="/usuarios/:id" exact component={DetalheUsuario}/>
            </Switch>
        </BrowserRouter>
    )
}