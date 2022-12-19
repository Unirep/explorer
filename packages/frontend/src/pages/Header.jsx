import React from "react";
import { Outlet, Link } from "react-router-dom";
import './header.css'

export default () => {
    return (
        <>
            <div className="header">
                <img src={require('../../public/logo.svg')} alt="UniRep logo"/>
                <div className="links">
                    <a className="link-item" href="https://developer.unirep.io/" target='blank'>Docs</a>
                    <a className="link-item" href="https://github.com/Unirep" target='blank'><img src={require('../../public/github.svg')} alt="GitHub logo"/></a>
                    <a className="link-item" href="https://discord.com/invite/VzMMDJmYc5" target='blank'><img src={require('../../public/discord.svg')} alt="Discord logo"/></a>
                    <div className="link-item" >
                     <img src={require('../../public/sun_icon.svg')} alt="sun icon"/>
                    </div>
                    <button className="link-item" style={{background: "white", borderRadius: "24px", padding: "6px 30px"}}>Build</button>
                </div>
            </div>

            <Outlet />
        </>
        
    )
}