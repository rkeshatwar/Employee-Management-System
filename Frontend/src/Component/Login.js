import React, { useEffect, useState } from 'react'
import './Login.css'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'

const Login = ({getUser}) => {

    const [values, setValues] = useState({
        employeeId: '',
        password: ''
        // ipAddress: ''
    });
    
    const [error, setError] = useState(null)
    
    useEffect(()=> {
        setValues({
            employeeId: '',
            password: ''
            // ipAddress: ''
        });
    },[error]);

    useEffect(() => {
        // fetch('https://api.ipify.org?format=json')
        // .then(response => response.json())
        // .then(data => {
        //     console.log(data.ip);
        // //    values.ipAddress = data.ip;
        // })
        // .catch(error => {
        //     console.log('Error:', error);
        // });  
    },[]);

    
    
    const navigate = useNavigate()
    
    axios.defaults.withCredentials = true;
    
    const handleSubmit = (event) => {
        event.preventDefault()
        axios.post('https://localhost:7138/Login', values)
        .then(response => {
            console.log(response)
            if(response.status==200) {
                console.log(values.employeeId)
                console.log("Success")
                getUser(values.employeeId)
                localStorage.setItem("valid", true)
                navigate('/dashboard/home')
            } else {
                setError(response.error)
            }
        })
        .catch(err =>
            {console.log(err)
            setError(err)}
        )
    }


    return (
        <div className='d-flex justify-content-center align-items-center vh-100 loginPage'>
        <div className='p-3 rounded w-25 border loginForm'>
            <div className='text-danger fw-semibold'>
                {error && (
                    <p>!!! Invalid Employee Id or Password !!!</p>
                )}
            </div>
            <h2>Login Page</h2>
            <form onSubmit={handleSubmit}>
                <div className='mb-3'>
                    <label htmlFor="employeeId"><strong>Employee ID:</strong></label>
                    <input type="text" name='employeeId' autoComplete='off' placeholder='Enter Employee ID' value={values.employeeId}
                     onChange={(e) => setValues({...values, employeeId : e.target.value})} className='form-control rounded-0'/>
                </div>
                <div className=''> 
                    <label htmlFor="password"><strong>Password:</strong></label>
                    <input type="password" name='password' placeholder='Enter Password' value={values.password}
                     onChange={(e) => setValues({...values, password : e.target.value})} className='form-control rounded-0'/>
                </div>
                <div class="float-end mb-3">
                    <Link to="/forgotPassword" style={{color:'#888'}}>Forgot Password?</Link>
                </div>
                <button className='btn btn-success w-100 rounded-0 mb-2'>Log in</button>
            </form>
        </div>
    </div>
    );
}

export default Login;
