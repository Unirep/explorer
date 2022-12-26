import { Outlet, Link } from "react-router-dom";
import './header.css'

export default () => {
    return (
        <>
            <div className="header">
                <Link to='/'><img src={require('../../../../public/logo.svg')} alt="UniRep logo"/></Link>
                <div className="flex">
                    <a className="link" href="https://developer.unirep.io/" target='blank'>Docs</a>
                    <a className="link" href="https://github.com/Unirep" target='blank'><img src={require('../../../../public/github.svg')} alt="GitHub logo"/></a>
                    <a className="link" href="https://discord.com/invite/VzMMDJmYc5" target='blank'><img src={require('../../../../public/discord.svg')} alt="Discord logo"/></a>
                    <div className="link" >
                     <img src={require('../../../../public/sun_icon.svg')} alt="sun icon"/>
                    </div>
                    <a href="https://github.com/Unirep/create-unirep-app" target='blank'><button>Build</button></a>
                </div>
            </div>

            <Outlet />
        </>
        
    )
}