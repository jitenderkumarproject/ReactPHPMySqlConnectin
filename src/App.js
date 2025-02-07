import logo from "./logo.svg";
import "./App.css";
import React, { useEffect, useState } from "react";
import * as Common from "./Common";

function App() {
  const [empData, setEmpData] = useState([]);
  const [ename, setName] = useState("");
  const [designation, setDesignation] = useState("");
  const [address, setAddress] = useState("");
  const [eid, setEid] = useState("");
  const [buttonstatus, setButtonStatus] = useState(false);

  useEffect(() => {
    Common.callApi("/api/server.php", ["fetch"], (result) => {
      const resp = JSON.parse(result); //Data Goes to server in the form of String
      //so Parsing it in the form of JSON
      setEmpData(resp); // setting the state
      console.log(result);
    });
  }, []);

  function InsertData() {
    Common.callApi(
      "/api/server.php",
      ["insert", ename, designation, address],
      (result) => {
        const resp = JSON.parse(result); //Data Goes to server in the form of String
        console.log(result);
        //so Parsing it in the form of JSON
        setEmpData(resp);
      }
    );
  }

  function updateData(eid, ename, designation, address) {
    setButtonStatus(true);
    setEid(eid);
    setName(ename);
    setDesignation(designation);
    setAddress(address);
  }

  function deleteData(Eid) {
    setEid(Eid);
    Common.callApi("/api/server.php", ["delete", Eid], (result) => {
      setEmpData(JSON.parse(result));
    });
    //console.log("ID = " ,Eid);
  }

  function changeData() {
    const obj = {
      eid: eid,
      ename: ename,
      designation: designation,
      address: address,
    };
    Common.callApi(
      "/api/server.php",
      ["update", JSON.stringify(obj)],
      (result) => {
        setEmpData(JSON.parse(result));
        setButtonStatus(false);
      }
    );
  }

  return (
    <div className="App">
      <table align="center" border={1}>
        <th>Enter Employee Records</th>
        <tr>
          <td>Enter Name</td>
          <td>
            <input
              placeholder="Enter Your Name"
              value={ename}
              onChange={(e) => setName(e.target.value)}
            ></input>
          </td>
        </tr>
        <tr>
          <td>Enter Designation</td>
          <td>
            <input
              placeholder="Enter Your Designation"
              value={designation}
              onChange={(e) => setDesignation(e.target.value)}
            ></input>
          </td>
        </tr>
        <tr>
          <td>Enter Address</td>
          <td>
            <input
              placeholder="Enter Your Designation"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            ></input>
          </td>
        </tr>
        <tr>
          {buttonstatus ? (
            <button onClick={changeData}> Update</button>
          ) : (
            <button onClick={() => InsertData()}>Submit</button>
          )}
        </tr>
      </table>

      <table align="center" border={1}>
        <tr>
          <td>ID</td>

          <td>Employee Name</td>

          <td>Employee Designation</td>

          <td>Employee Address</td>
        </tr>

        {empData.map((item, i) => (
          <tr>
            <td>{item.Eid}</td>
            <td>{item.EName}</td>
            <td>{item.EDesignation}</td>
            <td>{item.EAddress}</td>
            <td>
              <button
                onClick={() =>
                  updateData(
                    item.Eid,
                    item.EName,
                    item.EDesignation,
                    item.EAddress
                  )
                }
              >
                Update
              </button>
            </td>
            <td>
              <button onClick={() => deleteData(item.Eid)}>Delete</button>
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
}

export default App;
