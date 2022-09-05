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

const [q, setQ] = useState("");
const [searchParam] = useState(["API","Auth","Category","Cors","HTTPS"]);
const [filterParam, setFilterParam] = useState(["All"]);
const [filterParam1, setFilterParam1] = useState("");
const [filterParam2, setFilterParam2] = useState("");
const [filterParam3, setFilterParam3] = useState("");

const [pageCount, setPageCount] = useState(0);

const [nodDataFound, setNodDataFound] = useState(false);

const fetchData = async () =>{
  try {
    setIsLoader(true);
    const response = await fetch(`https://api.publicapis.org/entries`);
    
    if(response){
      const res = await response.json();
      if(res) {
       // console.log(res);
        setRecord(res)
      }
    }
    
    // console.log(record.entries);
  }catch (e) {
    //console.log(e.message);
  } finally{
    setIsLoader(false);

  }
}

 useEffect(() => {
  //console.log("fetching");
   fetchData();
   //fetchDataUser();
}, []);



var catName = "";
var catNumber = [];
var catNameALL = [];
var catNumberALL = [];
for (let i = 0; i < record.entries.length; i++) {
   catName = record.entries[i].Category;
   catNumber.push(catName);
}
catNumber.sort();
//console.log("catNumber",catNumber);

 const counts = catNumber.reduce((acc, value) => ({
   ...acc,
   [value]: (acc[value] || 0) + 1
 }), {});
//console.log("counts",counts);

 // catNumberALL.push(counts);
 catNameALL = Object.keys(counts);

 catNumberALL = Object.values(counts)
//console.log("name",catNameALL, "count", catNumberALL);

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
        text: 'Showing total Categories we cover',
      },
    },
  };

  const labels = catNameALL;
  
  //  const labels = counts.map((elem,key) => {
  //    return (elem.salary)
  //  })

 const data1 = {
    labels,
    datasets: [
      {
        label: 'Category',
        //data: labels.map(() => faker.datatype.number({ min: 0, max: 100000 })),
        data: catNumberALL,
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
          getAllCategories++;
      }
    }
  }



  //console.log("isLogedinsssssss",isLogedin);
  props.onSubmit(isLogedin);


const flterType1Handler  = (e) =>{
  setFilterParam1(e.target.value);
}
const flterType2Handler  = (e) =>{
  setFilterParam2(e.target.value);
}
const flterType3Handler  = (e) =>{
  setFilterParam3(e.target.value);
}



 function filtering(items) {
 
   return items.filter((item) => {

             if (filterParam1 === item.Auth && filterParam2 === item.Cors && filterParam3 === JSON.stringify(item.HTTPS)) {
              //console.log("1st");
              return searchParam.some((newItem) => {
           
                return (
                  item[newItem]
                      .toString()
                      .toLowerCase()
                      .indexOf(q.toLowerCase()) > -1
                );
                     
             });
              
            } else if (
                          (filterParam1 === item.Auth && filterParam2 === "" && filterParam3 === "") ||  
                          (filterParam1 === "" && filterParam2 === item.Cors && filterParam3 === "") ||
                          (filterParam1 === "" && filterParam2 === "" && filterParam3 === JSON.stringify(item.HTTPS)) ||
                          (filterParam1 === item.Auth && filterParam2 ===  item.Cors && filterParam3 === "") || 
                          (filterParam1 === "" && filterParam2 === item.Cors && filterParam3 === JSON.stringify(item.HTTPS)) ||
                          (filterParam1 === item.Auth && filterParam2 === "" && filterParam3 === JSON.stringify(item.HTTPS))   
                        ) {
              //console.log("2rd");

                          return searchParam.some((newItem) => {          
                              return (
                                  item[newItem]
                                      .toString()
                                      .toLowerCase()
                                      .indexOf(q.toLowerCase()) > -1
                              );
                          });
                                   
            
            } else if (filterParam1 === "" && filterParam2 === "" && filterParam3 === "") {
             // console.log("3th");
                return searchParam.some((newItem) => {
                    return (
                        item[newItem]
                            .toString()
                            .toLowerCase()
                            .indexOf(q.toLowerCase()) > -1 
                            
                    );
                    
                });
            }
              
        });
           
    }  


const dataPerPage = 100;
const totalPage = Math.ceil(record.entries.length / 100) ;
const pageArray = [];
for (let index = 1; index <= totalPage; index++) {
   var noom = index;
   pageArray.push(index); 
}
console.log("dataPerPage",dataPerPage,"pageArray",pageArray);

const openThePage = (page, index) =>{
  setPageCount(index);
  console.log("page, index", page, index, pageCount);
}
const paginationPrev = () =>{
 console.log("pageCount", pageCount);
 setPageCount(pageCount - 1);
 console.log("pageCount", pageCount);

}
const paginationNext = () =>{
  console.log("pageCount", pageCount);
  setPageCount(pageCount + 1);
 console.log("pageCount", pageCount);

}
 return( 
     <>
     {isLoader ? <Loader /> : ''}
    
        <div className="componant">
            <h3 className="maintitle">DashBoard</h3>
            <div className="rowlane  gapBottom">
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
              <div className="graphChild">
                <div>
                   <Line options={options} data={data1} />
                </div>
              </div>
             
            </div>
            <div className="rowlane  gapBottom">
              <div className="filter">
                <h3>Filter</h3>
                <h4>Auth</h4>
                <ul>
                  <li><label><input type="radio" name="auth" defaultChecked  value="" onChange={(e) => flterType1Handler(e)}/> All</label></li>
                  <li><label><input type="radio" name="auth" value="apiKey" onChange={(e) => flterType1Handler(e)}/> apiKey</label></li>
                  <li><label><input type="radio" name="auth"  value="OAuth" onChange={(e) => flterType1Handler(e)}/> OAuth</label></li>
                </ul> 
                 <h4>Cors</h4>
                <ul>
                  <li><label><input type="radio" name="cors" defaultChecked value="" onChange={(e) => flterType2Handler(e)}/>All</label></li>
                  <li><label><input type="radio" name="cors" value="yes" onChange={(e) => flterType2Handler(e)}/>Yes</label></li>
                  <li><label><input type="radio" name="cors" value="no" onChange={(e) => flterType2Handler(e)}/> No</label></li>
                  <li><label><input type="radio" name="cors" value="unknown" onChange={(e) =>flterType2Handler(e)}/>Unknown</label></li>
                </ul>
                <h4>HTTPS</h4>
                <ul>
                  <li><label><input type="radio" name="https" defaultChecked value="" onChange={(e) => flterType3Handler(e)}/>All</label></li>
                  <li><label><input type="radio" name="https" value="true" onChange={(e) => flterType3Handler(e)}/>True</label></li>
                  <li><label><input type="radio" name="https" value="false" onChange={(e) => flterType3Handler(e)}/> False</label></li>
                </ul> 
                {/* <button className="btn blueBtn">Filter</button> */}
              </div>
              <div className="sideHolder">
                <div className="gapBottom">
                  
                  <input
                      type="search"
                      name="search-form"
                      id="search-form"
                      className="search"
                      placeholder="Search..."
                      value={q}
                      /*
                      // set the value of our useState q
                      //  anytime the user types in the search box
                      */
                      onChange={(e) => setQ(e.target.value)}
                  />
                </div>
                <div className="tableHolder">
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
                      {record && record.entries.length > 0 && ( 
                        filtering(record.entries).length > 0 ? filtering(record.entries).map((elem,key) => (
                        <>
                          <tr key={key}>
                            <td>{elem.API}</td>
                            <td>{elem.Auth}</td>
                            <td>{elem.Category}</td>
                            <td><span className= {elem.Cors === "yes" ? "green" : "red"}>{elem.Cors}</span></td>
                            <td>{elem.Description}</td>
                            <td><span className= {JSON.stringify(elem.HTTPS) === "true" ? "green" : "red"}>{JSON.stringify(elem.HTTPS)}</span></td>
                            <td>{elem.Link}</td> 
                          </tr>
                        </>            
                        )) : filtering(record.entries).length == 0 ? <tr><td colspan="7">No data found </td></tr>
                        
                        : <tr><td colspan="7">No data found </td></tr>
                        
                        )
                        
                     }
                         
                      {/* // debounce and throttle process in react */}
               
                   
                    </tbody>
                  </table>
                </div>
                <div className="paginationHolder">
                    <ul className="pagination">
                      <li className="page-item"><button className="page-link" onClick={paginationPrev}>Previous</button></li>
                      {
                        pageArray.map((elem, key)=>{
                          return(
                              <li className={pageCount === key ? "active page-item": "page-item"}>
                                <button className=" page-link" onClick={()=>openThePage(elem,key)} >{elem}</button>
                              </li>
                          )
                        })
                      }
                      <li className="page-item"><button className="page-link" onClick={paginationNext}>Next</button></li>
                    </ul>
                </div>
              </div>
            </div>
        </div>

     </>
 )

};
export default Dashboard;
