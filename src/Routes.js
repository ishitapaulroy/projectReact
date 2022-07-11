import React from "react";
import { Route, Routes , Link, NavLink} from "react-router-dom";
import { useParams, useNavigate } from "react-router";
import './App.css';

import Dashboard from './componants/Dashboard';
import Login from './componants/Login';

function App() {
  return (
    <div className="app">
      <div className="header">
      <div className="container">
        <div className="rowlane">
          <div className="logo"><img src="https://upload.wikimedia.org/wikipedia/commons/9/91/Pylons_Project_logo_on_transparent_background.png"/></div>
          <div className="nav">
          <ul>
              <li>
                <Link to="/">Dashboard</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
              
            </ul>
          </div>
        </div>
      </div>
      </div>
      <div className="containerIn">
       <div className="container">
        <div className="rowlane">

            <Routes>
              <Route exact path="/" element={<Dashboard />} />
              <Route path="/login" element={<Login />} />
              {/* <Route path="/create" element={<Create />} /> */}
            </Routes>

        </div>
      </div>
      </div>
        
    </div>
  );
}

export default App;
