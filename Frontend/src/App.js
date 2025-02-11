import { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Component/Login';
import PrivateRoute from './Component/PrivateRoute';
import Dashboard from './Component/Dashboard';
import HRHome from './Component/HRHome';
import Profile from './Component/Profile';
import LMS from './Component/LMS.js';
import ManageEmployees from './Component/ManageEmployees.js';
import AddEmployee from './Component/AddEmployee';
import MyTeam from './Component/MyTeam.js';
import YourTeam from './Component/YourTeam';
import SkillAssessment from './Component/SkillAssessment';
import Report from './Component/Report';
import ManagersHome from './Component/ManagersHome';
import EmployeesHome from './Component/EmployeesHome';
import UpdateEmployee from './Component/UpdateEmployee.js';
import ViewEmployee from './Component/ViewEmployee.js';
import ViewEmployeeSkillSet from './Component/ViewEmployeeSkillSet.js';
import AdvanceSearch from './Component/AdvanceSearch.js';
import ForgotPassword from './Component/ForgotPassword.js';
import ChangePassword from './Component/ChangePassword.js';
import UpdatePassword from './Component/UpdatePassword.js';


function App() {

  const isloggedin = localStorage.getItem('valid');

  const [user, setUser] = useState({});


  const [profile, setProfile] = useState(() => {
    const storedProfile = localStorage.getItem('profile');
    return storedProfile ? JSON.parse(storedProfile) : null;
  });

  const handleLogout = () => { 
    console.log("Logout");      
    // localStorage.setItem("valid", JSON.stringify(false));
    localStorage.removeItem("valid");
    localStorage.removeItem("profile");
    window.location.replace('/');
}


  const getUser = async (id) => {
    await axios.get(`https://localhost:7138/Employee/${id}`)
      .then(response => {
        const data = response.data;
        setProfile(prevProfile => {
          return { ...prevProfile, ...data };
        });
        localStorage.setItem('profile', JSON.stringify({ ...profile, ...data }));

       
      })
      .catch(error => {
        console.error(error);
      });
  }

  useEffect(() => {
    console.log("isloggedin",isloggedin);
    if (profile) {
      setUser(profile);
      console.log("User",user)
    }
  }, [profile]);

  return (
    <div className="App">
    <Router>
      <Routes>
        <Route path='/' element={<Login getUser={getUser}/>}/>
        <Route path='/forgotPassword' element={<ForgotPassword/>}/>
        <Route path='/changePassword/:id' element={<ChangePassword/>}/>
        {user ? (
        <Route path='/dashboard' element={isloggedin && user?
          <PrivateRoute><Dashboard profileRole={user.role} handleLogout={handleLogout}/></PrivateRoute> : <Login getUser={getUser}/>
        }>
          
          <Route
            path='home'
            element={
              user.role === 'HR' ? <HRHome /> :
              user.role === 'Employee' ? <EmployeesHome/> :
              user.role === 'Manager' ? <ManagersHome id={user?.employeeId} /> :
              null
            }
          />
          <Route path='profile' element={<Profile id={user?.employeeId}/>}/>
          <Route path='updatePassword/:id' element={<UpdatePassword/>}/>
          <Route path='lms' element={<LMS id={user?.employeeId} getUser={getUser} />}/>
          <Route path='all_employees' element={<ManageEmployees/>}/>
          <Route path='add_employee' element={<AddEmployee/>}/>          
          <Route path='skill_assessment' element={<SkillAssessment id={user?.employeeId}/>}/>
          <Route path='report' element={<Report id={user?.employeeId}/>} />   
          <Route path='my_team' element={<MyTeam id={user?.employeeId} />}/>
          <Route path='collegues' element={<YourTeam id={user?.employeeId} />}/>
          <Route path='updateEmployee/:id' element={<UpdateEmployee getUser={getUser}/>}/>
          <Route path='viewEmployee/:id' element={<ViewEmployee/>}/>
          <Route path='viewSkillset/:id' element={<ViewEmployeeSkillSet/>}/>
          <Route path='advanceSearch' element={<AdvanceSearch/>}/>
        </Route>      
        ) : (
          <Navigate to='/'/>
        )}
      </Routes>
    </Router>
  </div>
  );
}

export default App;
