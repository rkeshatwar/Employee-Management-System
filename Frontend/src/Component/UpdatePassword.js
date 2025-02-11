import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';

const Updatepassword = () => {

    const { id } = useParams();

    const [currentPassword, setCurrentPassword] = useState('');
    
    const [newPassword, setNewPassword] = useState('');
    
    const [confirmPassword, setConfirmPassword] = useState('');
    
    const [responseStatus, setResponseStatus] = useState(null);

    const navigate = useNavigate();

    const handleSubmit = async(e)=> {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            alert("New password and confirm password do not match.");
            return;
        }

        try {
            const response = await axios.post(`https://localhost:7138/Employee/UpdatePassword?id=${id}&currentPassword=${currentPassword}&newPassword=${newPassword}`);
            setResponseStatus(response.status);
            }catch (error) {
                setResponseStatus(error.response.status);
            }
    }


    return (
        <div>
            <div className="p-2 d-flex justify-content-center shadow">
                <h3>Change Password</h3>
            </div>
            <div className='d-flex justify-content-center'>
                <form onSubmit={handleSubmit} style={{width:'100%'}}>
                    <div className='fw-semibold'>
                        {responseStatus===200?(
                            <p className='text-success'>Password changed successfully.</p>
                        ):(responseStatus===401?(
                            <p className='text-danger'>Please Enter Correct Current Password.</p>
                        ):(<p></p>)
                        )}
                    </div>
                    <div style={{border:'1px solid black', borderRadius:'20px', padding:'20px', margin:'10px', textAlign:'left'}}>
                        <div className='d-flex justify-content-around' >
                            <div style={{width:'40%'}}>
                                <div className="mb-3">
                                    <label htmlFor="currentPassword" className="form-label">Current Password</label>
                                    <input type="text" className="form-control" id="currentPassword" name="currentPassword" onChange={(e)=>setCurrentPassword(e.target.value)}/>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="newPassword" className="form-label">New Password</label>
                                    <input type="password" className="form-control" id="newPassword" name="newPassword" onChange={(e) => setNewPassword(e.target.value)}/>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                                    <input type="password" className="form-control" id="confirmPassword" name="confirmPassword" onChange={(e) => setConfirmPassword(e.target.value)}/>
                                </div>
                            </div>
                        </div>
                        <div className='text-center'>
                            <button type='submit' className='btn btn-outline-primary m-2'>Change</button>
                            <Link to='../profile' className='btn btn-outline-danger m-2'>Back</Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Updatepassword;
