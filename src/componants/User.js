import React, { useState, useEffect } from "react";
import App from '../Routes';

const User = (props) => {
  
const [userData,setUserData] = useState([]);
const [isLogedin, setIsLogedin] = useState(true);

useEffect(() => {
setUserData(props.userRecord);
<App/>
}, []);

console.log("userData",userData);

console.log("isLogedinsssssss",isLogedin);
props.onSubmit(isLogedin);
    
  
    
 return(
     <>
    
        <div className="componant">
            
            <div className="rowlane  gapBottom">
                
                     {userData && userData.length > 0 && 
                     <>
                        
                           <h3 className="maintitle">User Details</h3>
                           <div className="child1">
                                <div className="imgUser"><img src={userData[0].picture.large}/></div>
                                <ul className="userdetails">
                                    <li><span>Name: </span><span>{userData[0].name.title} {userData[0].name.first} {userData[0].name.last}</span></li>
                                </ul>
                            </div>
                           <div className="child2">
                                <ul className="userdetails">
                                    
                                    <li><span>Gender: </span><span>{userData[0].gender}</span></li>
                                    <li><span>Email: </span><span>{userData[0].email}</span></li>
                                    <li><span>DOB: </span><span>{userData[0].dob.date}</span></li>
                                    <li><span>Cell No.: </span><span>{userData[0].cell}</span></li>
                                    <li><span>Cell No.: </span><span>{userData[0].cell}</span></li>
                                    <li><span>Location.: </span>
                                        <span>{userData[0].location.street.number}, {userData[0].location.street.name},<br/>
                                            {userData[0].location.city} , {userData[0].location.state},  {userData[0].location.country}
                                        </span>
                                    </li>
                                </ul>
                            </div>
                     </>
                         
                     }
                    
                
            </div>
                
        </div>
         
     </>
 )

};
export default User;
