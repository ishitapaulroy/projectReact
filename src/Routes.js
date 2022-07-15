import React, { useState, useEffect } from "react";

import { Route, Routes , Link, NavLink} from "react-router-dom";
import { useParams, useNavigate } from "react-router";
import './App.css';

import Header from './componants/Header';
import Header2 from './componants/Header2';
import Dashboard from './componants/Dashboard';
import Login from './componants/Login';
import User from './componants/User';
import Loader from "./componants/Loader";

function App(props) {
  const [isLogged, setIsLogged] = useState(false);

  const [isLoader, setIsLoader] = useState(false);
  
  const [userRecord,setUserRecord] = useState([]);
  
  const fetchData = async () =>{
    try {
      setIsLoader(true);

      const response = await fetch(`https://randomuser.me/api/`);
      
      if(response){
        const res = await response.json();
        if(res) {
          console.log("User details",res);
          setUserRecord(res.results);
          return;
        }
      }
      
      // console.log(record.entries);
    }catch (e) {
      console.log(e.message);
    }finally{
      setIsLoader(false);
  
    }
  }
  let getDataObj = [];
  useEffect(() => {
    fetchData();
    userRecord.length > 0 && 
    localStorage.setItem("keyUserData", JSON.stringify(userRecord));
    const getData = localStorage.getItem("keyUserData");
     getDataObj = JSON.parse(getData);
   }, []);

   


const onSubmit = (isLogedin) => {    
    setIsLogged(isLogedin);
}
console.log("onSubmit", isLogged);
console.log("getDataObj", getDataObj);  
  return (
    <div className="app">
    {isLoader ? <Loader /> : ''}
     {!isLogged ? 
        <Header2/> :
        getDataObj && getDataObj.length > 0 && <Header userRecord={getDataObj} onSubmit={onSubmit}/>
        
     }
     
      <div className="containerIn">
       <div className="container">
        <div className="rowlane">
        
            <Routes>
              <Route path="/dashboard" element={<Dashboard  onSubmit={onSubmit}/>} />
              {getDataObj && getDataObj.length > 0 && 
              <Route path="/user" element={<User userRecord={getDataObj}  onSubmit={onSubmit} />} />
              }
              <Route exact path="/" element={<Login onSubmit={onSubmit} />} />
              {/* <Route path="/create" element={<Create />} /> */}
            </Routes>
        
        </div>
      </div>
      </div>
        
    </div>
  );
}

export default App;
