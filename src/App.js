import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import * as Common from "./Common";

function App() {
  const [empData, setEmpData] = useState([]);
  useEffect(() => {
    Common.callApi("/api/server.php", ["fetch"], (result) => {
      const resp = JSON.parse(result); //Data Goes to server in the form of String 
      //so Parsing it in the form of JSON
      setEmpData(resp); // setting the state
       console.log(result);

function InsertData(){
  Common.callApi("/api/server.php", ["insert", "Jitendra", "IT Engineer", "Rajendra Place"], (result) => {

  });
}

    });
  }, []);
  return (
    <div className="App">

    <table align="center" border={1}>
    <th>Enter Employee Records</th>
    <tr>
      <td>Enter Name</td>
      <td><input></input></td>
    </tr>
      <tr>
      <td>
        Enter Designation
        
      </td>
      <td><input></input></td>
      </tr>
      <tr>
        <td>
          Enter Address
        </td>
        <td><input></input></td>
      </tr>
      <tr><button>Submit</button></tr>
    </table>

      <table align="center" border={1}>
        
            <tr>
            
            <td>
             ID
            </td>
           
            
            <td>
            Employee Name
            </td>
           
           
            <td>
            Employee Designation
            </td>
            
            
            <td>
            Employee Address
            </td>
           
            </tr>
        
        {
           empData.map((item,i) =>
           <tr>
            <td>{item.Eid}</td>
            <td>{item.EName}</td>
            <td>{item.EDesignation}</td>
            <td>{item.EAddress}</td>
            <td>
              <button>Update</button>
             
            </td>
            <td>
            <button>Delete</button>
            </td>
           </tr>
           )
        }
      </table>
    </div>
  );
}

export default App;
