import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

const Login = (props) => {

const [email, setEmail] = useState("");
const [password, setPassword] = useState("");

const [emailError, setEmailError] = useState("");
const [passwordError, setPasswordError] = useState("");

const [isLogedin, setIsLogedin] = useState(false);


const emailHandler = (e) =>{
    e.preventDefault();
    setEmail(e.target.value);    
    
}
const passwordHandler = (e) =>{
    e.preventDefault();
    setPassword(e.target.value);
}

const validateField = (type = null) => {
    var emailValid = email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
    var passwordValid = password.length >= 2;
    
    if (type === "email" && email.length) {
        setEmailError(
            !emailValid ? "Check what you did!!!!!!" : ""
        )
    } else if (type === "password" && password.length) {
        setPasswordError(
            !passwordValid ? "Not again !!!" : ""
        )
    }
  };
let navigate = useNavigate();
const formSubmit = (e) =>{
    
    e.preventDefault();
    if (!email) {
        setEmailError( "Please fillup the email");
    } else {
        setEmailError( "");
    }
    if (!password) {
        setPasswordError( "Please fillup the password");
    } else {
        setPasswordError( "");
    }
    if(email && password){  
         navigate('/dashboard'); 
       
    }
    
} 
//console.log("isLogedinsssssss",isLogedin);
props.onSubmit(isLogedin);





 return(
     <>
        <div className="componant">
            
            <div className="rowlane gapBottom justify-center">
                <div className="graphChild formDiv">
                     <h3 className="maintitle">Login</h3>
                     <div>
                       <label>Email</label>     
                       <input type="email" placeholder="Email" onChange={emailHandler} value={email} onBlur={() => validateField("email")}/>  
                       {emailError && <div className="error">{emailError}</div>}                   
                     </div>
                     <div>
                       <label>Password</label>     
                       <input type="password" placeholder="Password" onChange={passwordHandler} value={password} onBlur={() => validateField("password")}/>  
                       {passwordError && <div className="error">{passwordError}</div>}                
                     </div>
                     <div>
                     <button type="button" disabled={( !emailError && !passwordError) ? "" : "disabled"} className="btn submit" onClick={formSubmit}>Login</button>

                        
                     </div>
                </div>
            
            </div>
                
        </div>
         
     </>
 )

};
export default Login;
