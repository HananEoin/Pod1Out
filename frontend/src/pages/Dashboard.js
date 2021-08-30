import React, {useState} from "react"
import AuthApi from "../AuthApi"
import Cookies from "js-cookie"
// import RecordPanel from "../components/RecordPanel";
// import EpisodesPanel from "../components/EpisodesPanel";
import Bell from "../imgs/Bell.png";
// import NoteBell from "../imgs/Bell2.png";
import Leonardo from '../imgs/Leonardo.png'
// import SidePanel from "../components/SidePanel";
import Donatello from "../imgs/Donatello.png";
import Panel from "../components/Panel";
import Michaelangelo from "../imgs/Michelangelo.png";
import Raphael from "../imgs/Raphael.png";
import {useAppContext} from "../AppContext";

const Dashboard = () => {
    const { user } = useAppContext();


    return (
        <div className="container">
            <nav className="navbar navbar-inverse">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <h1>Pod 1 Out</h1>
                    </div>

                    <div id="userBar" className="row">
                        <img className="profile_image userBarElement" src={getAvatar(user.location)}/>
                        <h4 className="userBarElement">{user.name}</h4>
                        <img className="profile_image userBarElement" src={Bell}/>
                        <LogoutButton className="userBarElement"/>
                    </div>
                </div>
            </nav>
            <div id="main-row" className="row">
                <div id="panel">
                    <Panel />
                </div>
            </div>
        </div>
    );
}

const Switcher = () => {
    return(
        <div>
            <Panel/>
        </div>
    )
}

const LogoutButton = () =>{
    const Auth = React.useContext(AuthApi)
    const handleOnClick = () =>{
        Auth.setAuth(false);
        Cookies.remove("user")
    }

    return(
        <div>
            <button className="button" onClick={handleOnClick}>Logout </button>
        </div>
    )
}

function getAvatar(location) {
    switch(location) {
        case "/Leonardo.png":
            return Leonardo;
        case "/Donatello.png":
            return Donatello;
        case "/Michelangelo.png":
            return Michaelangelo;
        default:
            return Raphael;
    }
}

export default Dashboard;
