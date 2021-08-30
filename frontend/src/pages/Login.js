import React, { useContext} from "react"
import AuthApi from "../AuthApi"
import Cookies from "js-cookie"
import axios from "axios";
import { useAppContext } from "../AppContext";

// const flaskEndpoint = "https://pod1out.ie/backend";
const flaskEndpoint = "http://127.0.0.1:5000/";

const Login = () => {

    const { setAuth } = useContext(AuthApi);
    const { setUser } = useAppContext();

    const handleLogin = (event) => {
        event.preventDefault();
        const password = event.target.password.value;
        const username = event.target.username.value;

        let loginData = {
            username: username,
            password: password
        }

        let options = {
            method: 'POST',
            url: flaskEndpoint + "login",
            data: loginData,
            crossOrigin:'*',
            headers: {
                'Content-Type': 'application/json'
            },
            json: true
        }

        axios(options)
            .then(response => {
                let id = response.data.id;
                let name = response.data.name;
                let location = response.data.location;

                if (id > -1) {
                    setAuth(true);
                    Cookies.set("user", JSON.stringify({ id, name }));
                    setUser({
                        id,
                        name,
                        location
                    });
                }

                else {
                    alert("Invalid details, please try again")
                }
            })
            .catch(error => {
                console.log("Error in the axios call:" + error);
            })


    }


    return (
        <div className="login-container">
            <div className="loginBox">
                <form onSubmit={handleLogin}>
                    <label>
                        Username:
                        <input type="text" name="username"/>
                    </label>
                    <label>
                        Password:
                        <input type="text" name="password"/>
                    </label>
                    <input className="button" type="submit" value="Login"/>
                </form>
            </div>
        </div>
    )
}




export default Login;
