import React from "react";
import {Switch,Route, Link } from "react-router-dom"
import { Layout,Typography,Space } from "antd";

import { Navbar, Homepage, Cryptocurrencies, CryptoDetails,News} from "./components"
import "./App.css"
const App = () =>{
    return (
        <div className="app">
            <div className="navbar">
                <Navbar/>
            </div>
            <div className="main">
                <Layout>
                    <div className="routes">
                        <Switch>
                            <Route exact path="/">
                                <Homepage/>
                            </Route>
                            <Route exact path="/cryptocurrencies">
                                <Cryptocurrencies/>
                            </Route>
                            <Route exact path="/crypto/:cryptoId">
                                <CryptoDetails/>
                            </Route>
                        </Switch>
                    </div>
                </Layout>
            
            <div className="footer" >
                <Typography.Title level={5} style={{color:"white",textAlign:"center"}}>
                    CryptoWorld <br/>
                    All rights reserved
                </Typography.Title>
            </div>
            </div>
        </div>
    )
}

export default App
