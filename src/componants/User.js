import React, { useState, useEffect } from "react";

const User = (props) => {
    const [userRecord,setUserRecord] = useState([]);

    const [storeUserName,setStoreUserName] = useState(props.storeUserName);

    const fetchData = async () =>{
      try {
        const response = await fetch(`https://randomuser.me/api/`);
        
        if(response){
          const res = await response.json();
          if(res) {
            console.log("User details",res);
            setUserRecord(res.results)
          }
        }
        
        // console.log(record.entries);
      }catch (e) {
        console.log(e.message);
      }
    }
    
     useEffect(() => {

      console.log("fetching");
       fetchData();
       {userRecord && userRecord.length > 0 && 
        setStoreUserName(userRecord[0].name.first)

       }
    }, []);
    
 return(
     <>
        <div className="componant">
            
            <div className="rowlane  gapBottom">
                
                     {userRecord && userRecord.length > 0 && 
                     <>
                        
                           <h3 className="maintitle">User Details</h3>
                           <div className="child1">
                                <div className="imgUser"><img src={userRecord[0].picture.large}/></div>
                                <ul className="userdetails">
                                    <li><span>Name: </span><span>{userRecord[0].name.title} {userRecord[0].name.first} {userRecord[0].name.last}</span></li>
                                </ul>
                            </div>
                           <div className="child2">
                                <ul className="userdetails">
                                    
                                    <li><span>Gender: </span><span>{userRecord[0].gender}</span></li>
                                    <li><span>Email: </span><span>{userRecord[0].email}</span></li>
                                    <li><span>DOB: </span><span>{userRecord[0].dob.date}</span></li>
                                    <li><span>Cell No.: </span><span>{userRecord[0].cell}</span></li>
                                    <li><span>Cell No.: </span><span>{userRecord[0].cell}</span></li>
                                    <li><span>Location.: </span>
                                        <span>{userRecord[0].location.street.number}, {userRecord[0].location.street.name},<br/>
                                            {userRecord[0].location.city} , {userRecord[0].location.state},  {userRecord[0].location.country}
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
