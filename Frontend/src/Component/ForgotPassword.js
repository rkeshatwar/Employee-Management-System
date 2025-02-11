import React, { useState } from 'react';
import './Login.css'
import axios from 'axios';

const ForgotPassword = () => {
    const [credentials, setCredentials] = useState({
        employeeId:'',
        emailId:''
    })

    const [responseStatus, setResponseStatus] = useState();

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        try {
            const response = await axios.post(`https://localhost:7138/Employee/ForgotPassword?id=${credentials.employeeId}&email=${credentials.emailId}`);
            setResponseStatus(response.status); 
        } catch (error) {
            setResponseStatus(error.response.status);
        }
    };
    
    return (
        <div className='d-flex justify-content-center align-items-center vh-100 loginPage'>
        <div className='p-3 rounded w-25 border loginForm'>
            <div className='fw-semibold'>
                {responseStatus==200?(
                    <p className='text-success'>Sent a link to change password on you're email</p>
                ):(responseStatus==404?(
                    <p className='text-danger'>!!! Emlpoyee with metioned Employee Id Not Found !!!</p>
                ):(responseStatus==401?(
                    <p className='text-danger'>!!! Mention correct EmailId !!!</p>
                ):(<p></p>)
                ))}
            </div>
            <h2>Forgot Password</h2>
            <form onSubmit={handleSubmit}>
                <div className='mb-3'>
                    <label htmlFor="employeeId"><strong>Enter Employee Id:</strong></label>
                    <input type="text" name='employeeId' autoComplete='off' placeholder='Enter Employee ID'
                     className='form-control rounded-0' onChange={handleChange} required/>
                </div>
                <div className='mb-3'>
                    <label htmlFor="emailId"><strong>Enter Email Id:</strong></label>
                    <input type="email" name='emailId' autoComplete='off' placeholder='Enter Email ID'
                     className='form-control rounded-0' onChange={handleChange} required/>
                </div>
                
                <button type="submit" className='btn btn-success w-100 rounded-0 mb-2'>Verify</button>
            </form>
        </div>
    </div>
    );
}

export default ForgotPassword;
