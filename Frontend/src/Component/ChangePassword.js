import React, { useState } from 'react';
import './Login.css'
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

const ChangePassword = () => {

    const { id } = useParams();
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [responseStatus, setResponseStatus] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'newPassword') {
            setNewPassword(value);
        } else if (name === 'confirmPassword') {
            setConfirmPassword(value);
        }
    };

    const handleSubmit = async(e) => {
        e.preventDefault();     
        if (newPassword !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }else { 
            try {
                const response = await axios.post(`https://localhost:7138/Employee/ChangePassword?id=${id}&newPassword=${newPassword}`);
                setResponseStatus(response.status);
            }catch (error) {
                setResponseStatus(error.response.status);
            }
        }
    }


    return (
        <div className='d-flex justify-content-center align-items-center vh-100 loginPage'>
        <div className='p-3 rounded w-25 border loginForm'>
            <div className='fw-semibold'>
                {responseStatus==200?(
                    <p className='text-success'>Password changed successfully <Link to='/'>Click Here</Link> to Login.</p>
                ):(responseStatus==404?(
                    <p className='text-danger'>!!! Something Went Wrong !!!</p>
                ):(<p></p>)
                )}
            </div>
            <h2>Change Password</h2>
            <form onSubmit={handleSubmit}>
                <div className='mb-3'>
                    <label htmlFor="newPassword"><strong>Enter New Password:</strong></label>
                    <input
                        type="password"
                        name='newPassword'
                        autoComplete='off'
                        placeholder='Enter New Password'
                        className='form-control rounded-0'
                        value={newPassword}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className='mb-3'>
                    <label htmlFor="confirmPassword"><strong>Confirm Password:</strong></label>
                    <input
                        type="password"
                        name='confirmPassword'
                        autoComplete='off'
                        placeholder='Confirm Password'
                        className='form-control rounded-0'
                        value={confirmPassword}
                        onChange={handleChange}
                        required
                    />
                </div>
                
                <button type="submit" className='btn btn-success w-100 rounded-0 mb-2'>Verify</button>
            </form>
        </div>
    </div>
    );
}

export default ChangePassword;
