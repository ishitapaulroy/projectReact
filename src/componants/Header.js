import React, { useState, useEffect } from "react";
import { Route, Routes , Link, NavLink} from "react-router-dom";


const Header = (props) => {
   const [username,setUsername] = useState(props.username);

   // const [userRecord,setUserRecord] = useState([]);
   
    // const fetchData = async () =>{
    //   try {
    //     const response = await fetch(`https://randomuser.me/api/`);
        
    //     if(response){
    //       const res = await response.json();
    //       if(res) {
    //         console.log("User details",res);
    //         setUserRecord(res.results)
    //       }
    //     }
        
    //     // console.log(record.entries);
    //   }catch (e) {
    //     console.log(e.message);
    //   }
    // }
    
    //  useEffect(() => {
    //   console.log("fetching");
    //    fetchData();
    // }, []);
 return(
     <>
       <div className="header">
            <div className="container">
                <div className="rowlane">
                <div className="logo"><img src="https://upload.wikimedia.org/wikipedia/commons/9/91/Pylons_Project_logo_on_transparent_background.png"/></div>
                <div className="nav">
                {/* {userRecord && userRecord.length > 0 && 
                    <div className="username">Hi, {userRecord[0].name.first} </div>

                }  */}
                 <div className="username">Hi, {username} {console.log("username", username)}</div>    
                    
                <ul>
                    <li>
                        <Link to="/dashboard">Dashboard</Link>
                    </li>
                    <li>
                        <Link to="/user">User Details</Link>
                    </li>
                    <li>
                        <Link to="/">Login</Link>
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
