import React, { useState, useEffect } from "react";
import Loader from "./Loader";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line  } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';


const Dashboard = (props) => {
const [record,setRecord] = useState([]);
const [userRecord,setUserRecord] = useState([]);
const [isLoader, setIsLoader] = useState(false);
const [isLogedin, setIsLogedin] = useState(true);


const fetchData = async () =>{
  try {
    setIsLoader(true);
    const response = await fetch(`https://api.publicapis.org/entries`);
    
    if(response){
      const res = await response.json();
      if(res) {
        console.log(res);
        setRecord(res)
      }
    }
    
    // console.log(record.entries);
  }catch (e) {
    console.log(e.message);
  } finally{
    setIsLoader(false);

  }
}

// const fetchDataUser = async () =>{
//   try {
//     const responseUser = await fetch(`https://randomuser.me/api/`);
    
//     if(responseUser){
//       const resUser = await responseUser.json();
//       if(resUser) {
//         console.log(resUser);
//         setUserRecord(resUser)
//       }
//     }
    
//     // console.log(record.entries);
//   }catch (e) {
//     console.log(e.message);
//   }
// }



 useEffect(() => {
  console.log("fetching");
   fetchData();
   //fetchDataUser();
}, []);


  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

 const options = {
    responsive: true,
    plugins: {
      legend: {
        //position: 'top' as const,
        position: 'top' ,
      },
      title: {
        display: true,
        text: 'Salary Graph of Employee',
      },
    },
  };

  const labels = ['100000', '80000', '60000', '40000', '20000', '2000'];
  // const labels = record.map((elem,key) => {
  //   return (elem.salary)
  // })

 const data1 = {
    labels,
    datasets: [
      {
        label: 'salary',
        data: labels.map(() => faker.datatype.number({ min: 0, max: 100000 })),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      }
    ],
  };

  var getTotalHTTPs = 0 ;
  for (let i = 0; i < record.entries.length; i++) {
      if(record.entries[i].HTTPS === true){
        getTotalHTTPs = getTotalHTTPs + 1;
        //console.log("i", getTotalHTTPs);
     }
  }
  //console.log("getTotalHTTPs",getTotalHTTPs);

  var getTotalCors = 0 ;
  for (let i = 0; i < record.entries.length; i++) {
      if(record.entries[i].Cors === "yes"){
        getTotalCors = getTotalCors + 1;
        //console.log("i", getTotalCors);
     }
  }

  var getAllCategories = 0; 
  var prevCat = "";
  for (let i = 0; i < record.entries.length; i++) {
    if (i === 0){
      getAllCategories = 1;
      prevCat = record.entries[i].Category;
    }else{
      if(prevCat !== record.entries[i].Category){
          prevCat = record.entries[i].Category;
          //console.log(prevCat );
          getAllCategories++;
      }
    }
  }
  console.log("getAllCategories",getAllCategories);

  console.log("isLogedinsssssss",isLogedin);
  props.onSubmit(isLogedin);
  




 return(
     <>
     {isLoader ? <Loader /> : ''}
    
        <div className="componant">
            <h3 className="maintitle">DashBoard</h3>
            <div className="rowlane  gapBottom">
              <div className="graphChild">
                <div>
                   <Line options={options} data={data1} />
                </div>
              </div>
              <div className="graphChild">
                <div className="statBoxes">
                  <div className="statbox one">
                      <span>Total Count</span>
                      <h3>{record.count}</h3>
                  </div>
                  <div className="statbox two">
                      <span>Total Cors</span>
                      <h3>{getTotalCors}</h3>
                  </div>
                  <div className="statbox three">
                      <span>Active Https</span>
                      <h3>{getTotalHTTPs}</h3>
                  </div>
                  <div className="statbox four">
                      <span>All Categories </span>
                      <h3>{getAllCategories}</h3>
                  </div>
                </div>
              </div>
            </div>
            <div className="rowlane  gapBottom">
              <div className="filter">
                <h3>Filter</h3>
                <h4>Type 1</h4>
                <ul>
                  <li>Option 1</li>
                  <li>Option 2</li>
                </ul>
                <h4>Type 2</h4>
                <ul>
                  <li>Option 1</li>
                  <li>Option 2</li>
                </ul>
              </div>
              <div className="tableHolder">
                <div>
                  <input type="search" placeholder="Search for API"/>
                </div>
                <table width="100%" className="table table-borderless" border="0" cellPadding="0" cellSpacing="0">
                  <thead>
                    <tr>
                      <th>API</th>
                      <th>Auth</th>
                      <th>Category</th>
                      <th>Cors</th>
                      <th>Description</th>
                      <th>HTTPS</th>
                      <th>Link</th>
                    </tr>
                  </thead>
                  <tbody>
                    {record && record.entries.length > 0 && record.entries.map((elem,key) => (
                      <tr key={key}>
                        <td>{elem.API}</td>
                        <td>{elem.Auth}</td>
                        <td>{elem.Category}</td>
                        <td><span className= {elem.Cors === "yes" ? "green" : "red"}>{elem.Cors}</span></td>
                        <td>{elem.Description}</td>
                        <td><span className= {JSON.stringify(elem.HTTPS) === "true" ? "green" : "red"}>{JSON.stringify(elem.HTTPS)}</span></td>
                        <td>{elem.Link}</td> 
                      </tr>
                    ))
                  }   
                  {console.log("result:::::",record && record.entries)}
                  </tbody>
                </table>
              </div>
            </div>
        </div>

     </>
 )

};
export default Dashboard;
