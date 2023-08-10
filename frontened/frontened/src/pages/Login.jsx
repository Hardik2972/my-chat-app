import React from "react";
import LogInForm from "../components/LogInForm";
import axios from "axios";
import { useNavigate } from "react-router-dom";

var userIsRegistered = false;

function Login(){
    const navigate = useNavigate();

    var token = localStorage.getItem("token");
    
    if(token){
        axios.post("http://localhost:8080/auth",{userToken:token})
            .then((res)=>{
                if(res.data.user === true) {
                    userIsRegistered=true;
                    navigate("/chat")
                }
            });
    }

    
    return(
        <div className="login" >
            {userIsRegistered? navigate("/chat") : <LogInForm page="register" />}
        </div>
    )
}

export default Login;
