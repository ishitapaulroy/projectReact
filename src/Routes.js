import React, { useState, useEffect } from "react";

import { Route, Routes , Link, NavLink} from "react-router-dom";
import { useParams, useNavigate } from "react-router";
import './App.css';

import Header from './componants/Header';
import Dashboard from './componants/Dashboard';
import Login from './componants/Login';
import User from './componants/User';

function App() {
 

  return (
    <div className="app">
      <Header username="hoo"/>
      <div className="containerIn">
       <div className="container">
        <div className="rowlane">

            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/user" element={<User />} />
              <Route exact path="/" element={<Login />} />
              {/* <Route path="/create" element={<Create />} /> */}
            </Routes>

        </div>
      </div>
      </div>
        
    </div>
  );
}

export default App;
