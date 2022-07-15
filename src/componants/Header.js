import React, { useState, useEffect } from "react";
import { Route, Routes , Link, NavLink} from "react-router-dom";
import { useNavigate } from "react-router-dom";


const Header = (props) => {
   const [userData,setUserData] = useState([]);
    const [isLogedin, setIsLogedin] = useState(true);
    
    let navigate = useNavigate();
    
    console.log("userData",userData);
    
    const logoutHandler = () =>{
        setIsLogedin(false);
        navigate('/'); 
    }
    useEffect(() => {
        setUserData(props.userRecord);
        props.onSubmit(isLogedin);
        }, []);
 return(
     <>
       <div className="header">
            <div className="container">
                <div className="rowlane">
                <div className="logo"><img src="https://upload.wikimedia.org/wikipedia/commons/9/91/Pylons_Project_logo_on_transparent_background.png"/></div>
                <div className="nav">
                {/* {userRecord && userRecord.length > 0 && 
                    <div className="username">Hi, {userData[0].name.first} </div>

                }  */}
                 {userData && userData.length > 0 && 
                 <div className="username">Hi, {userData[0].name.first} {console.log("userData", userData)}</div>    
                 }  
                <ul>
                    <li>
                        <Link to="/dashboard">Dashboard</Link>
                    </li>
                    <li>
                        <Link to="/user">User Details</Link>
                    </li>
                    <li>
                        <button className="btn link" onClick={logoutHandler}>Logout</button>
                    </li>
                    </ul>
                </div>
                </div>
            </div>
      </div>
         
     </>
 )

};
export default Header;
