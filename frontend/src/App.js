import './App.css';
import React from "react"
import Cookies from 'js-cookie';
import AuthApi from "./AuthApi"
import Dashboard from "./pages/Dashboard.js"
import Login from "./pages/Login.js"
import AppContextProvider from "./AppContext.js"
import{
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";

function App(){
    const[auth, setAuth] = React.useState(false);

    const readCookie = () =>{
        const cookie= Cookies.get("user");
        if (cookie){
            setAuth(true);
        }
    }

    React.useEffect(()=> {
        readCookie()
    }, [])
    return (
        <div>
            <AuthApi.Provider value={{auth,setAuth}}>
                <AppContextProvider>
                    <Router>
                        <Routes/>
                    </Router>
                </AppContextProvider>

            </AuthApi.Provider>
        </div>
    );
}



const Routes = () => {
    const Auth = React.useContext(AuthApi)
    return (
        // <Dashboard/>
        <Switch>
            <ProtectedLogin path="/login" component={Login} auth={Auth.auth}/>
            <ProtectedRoute path="/" auth={Auth.auth} component={Dashboard}/>
        </Switch>
    )
}

const ProtectedRoute = ({auth,component:Component,...rest}) =>{
    return(
        <Route
            {...rest}
            render ={()=>auth?(
                    <Component/>
                ):
                (
                    <Redirect to="/login"/>
                )
            }
        />
    )
}

const ProtectedLogin = ({auth,component:Component,...rest}) =>{
    return(
        <Route
            {...rest}
            render ={()=>!auth?(
                    <Component/>
                ):
                (
                    <Redirect to="/Dashboard"/>
                )
            }
        />
    )
}

export default App;
