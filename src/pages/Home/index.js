import React from 'react'

import './styles.css'

import NavBar from '../../components/NavBar'

export default function Home() {
    return (
        <div className="home-container" >
            <NavBar></NavBar>
            <div className="appname" >
                <h1>Mercurium</h1>
            </div>
        </div>
    )
}