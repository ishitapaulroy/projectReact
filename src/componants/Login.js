import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

const Login = () => {

const [email, setEmail] = useState("");
const [password, setPassword] = useState("");

const [emailError, setEmailError] = useState("");
const [passwordError, setPasswordError] = useState("");

const emailHandler = (e) =>{
    setEmail(e.target.value);    
}
const passwordHandler = (e) =>{
    setPassword(e.target.value);
}

const validateField = (type = null) => {
    var emailValid = email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
    var passwordValid = password.length >= 2;
    console.log("email",email,"emailValid",emailValid,"password",password,"passwordValid",passwordValid);
    
    if (type === "email" && email.length) {
        setEmailError(
            email === emailValid ? "" : "Check what you did!!!!!!"
        )
    } else if (type === "password" && password.length) {
        setPasswordError(
            password === passwordValid ? "": "Not again !!!"
        )
    }
  };
const formSubmit = (e) =>{
    e.preventDefault();
      
} 





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
                        <button type="button" className="btn submit" onClick={formSubmit}>Login</button>
                     </div>
                </div>
            
            </div>
                
        </div>
         
     </>
 )

};
export default Login;
