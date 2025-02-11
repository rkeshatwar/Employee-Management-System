import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from "axios";

const Dashboard = ({profileRole, handleLogout}) => {
  
 
  const role = profileRole;

  const [Link0, setLink0] = useState('');
  const [Link1, setLink1] = useState('');
  const [Link2, setLink2] = useState('');

  
  const [LinkData0, setLinkData0] = useState('');
  const [LinkData1, setLinkData1] = useState('');
  const [LinkData2, setLinkData2] = useState('');

  const[Link2Logo, setLink2Logo] = useState('');

  axios.defaults.withCredentials = true


  useEffect(() => {
    console.log(role)
    if (role === "HR") {
      setLink0("");
      setLinkData0("");

      setLink1("all_employees");
      setLinkData1("Manage Employees");

      setLink2("");
      setLinkData2("");
    }else if(role === "Employee") {
      setLink0("lms");
      setLinkData0("LMS Form");

      // setLink1("collegues");
      // setLinkData1("My Collegues");
      setLink1("");
      setLinkData1("");
      
      setLink2("report");
      setLinkData2("Skill Assessment");
      setLink2Logo("fs-5 bi-clipboard-data ms-2");
    }else if(role === "Manager") {
      setLink0("lms");
      setLinkData0("LMS Form");

      setLink1("my_team");
      setLinkData1("My Team");
      
      setLink2("advanceSearch");
      setLinkData2("Advance Search");
      setLink2Logo("fs-5 bi bi-search ms-2");
    }
  },[role,profileRole]);


    

  return (
    <div className="container-fluid">
      <div className="row flex-nowrap">
        <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
          <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
            <Link
              to="/dashboard/home"
              className="d-flex align-items-center pb-3 mb-md-1 mt-md-3 me-md-auto text-white text-decoration-none"
            >
              <span className="fs-5 fw-bolder d-none d-sm-inline">
                PRORIGO SOFTWARE
              </span>
            </Link>
            <ul
              className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
              id="menu"
            >
              <li className="w-100">
                <Link
                  to="/dashboard/home"
                  className="nav-link text-white px-0 align-middle"
                >
                  <i className="fs-4 bi-speedometer2 ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Dashboard</span>
                </Link>
              </li>

              {Link0 && (
                <li className="w-100">
                <Link
                  to={`/dashboard/${Link0}`}
                  className="nav-link text-white px-0 align-middle"
                >
                  {/* <i className="fs-4 bi-speedometer2 ms-2"></i> */}
                  <i class="fs-4 bi bi-ui-radios ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">{LinkData0}</span>
                </Link>
                </li>
              )}
              
              {Link1 && (
              <li className="w-100">
                <Link
                  to={`/dashboard/${Link1}`}
                  className="nav-link px-0 align-middle text-white"
                >
                  <i className="fs-4 bi-people ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">
                    {LinkData1}
                  </span>
                </Link>
              </li>
              )}
              
              {Link2 && (
                <li className="w-100">
                <Link
                  to={`/dashboard/${Link2}`}
                  className="nav-link px-0 align-middle text-white"
                >
                  <i className={Link2Logo}></i>
                  <span className="ms-2 d-none d-sm-inline">{LinkData2}</span>
                </Link>
              </li>
            )}
              <li className="w-100">
                <Link
                  to="/dashboard/profile"
                  className="nav-link px-0 align-middle text-white"
                >
                  <i className="fs-4 bi-person ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Profile</span>
                </Link>
              </li>
              <li className="w-100" onClick={handleLogout}>
              <Link
                  className="nav-link px-0 align-middle text-white"
                >
                  <i className="fs-4 bi-power ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Logout</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="col p-0 m-0">
            {/* <div className="p-2 d-flex justify-content-center shadow">
                <h3>{getCurrentComponentName()}</h3>
            </div> */}
            <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Dashboard;
