import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const ViewEmployee = () => {
    
    const {id} = useParams();

    const navigate = useNavigate();

    const [profile, setProfile] = useState({});
    
    const[dob, setDob] = useState();

    const[doj, setDoj] = useState();
    
    useEffect(() => {
        console.log(id);
        fetchEmployeeById();
    }, []);

    const fetchEmployeeById = async () => {
        try {
            const response = await axios.get(`https://localhost:7138/Employee/${id}`);
            setProfile(response.data);
        } catch (error) {
            console.error('Error fetching employee:', error);
        }
    };

    useEffect(() => {
        if (profile && profile.dob && profile.dateOfJoining) {
            const dobDate = new Date(profile.dob + 'Z').toISOString().split('T')[0];
            const dojDate = new Date(profile.dateOfJoining + 'Z').toISOString().split('T')[0];
            setDob(dobDate);
            setDoj(dojDate);
        }
    }, [profile]);

    const goBack = ()=>{
        navigate('../all_employees')
    }

    return (
        <div>
            <button className='fs-3 text-danger' onClick={goBack} style={{position:'absolute', right:'20px', top:'3px', border:'none', background:'transparent'}}>X</button> 
            <div className="p-2 d-flex justify-content-center shadow">
                <h3>{profile.firstName}'s Profile</h3>
            </div>
            <div className='d-flex flex-wrap justify-content-around mt-3'>
                <div style={{width:'40%', border:'1px solid black', borderRadius:'20px'}}>
                    <div>
                        <img src='https://png.pngtree.com/png-vector/20191110/ourmid/pngtree-avatar-icon-profile-icon-member-login-vector-isolated-png-image_1978396.jpg' height={'200px'}/>
                    </div>
                    <table className='table table-striped'>
                        <tbody>
                            <tr>
                                <th scope='row'>Employee Id :</th>
                                <td>{profile.employeeId}</td>
                            </tr>
                            <tr>
                                <th scope='row'>Full Name :</th>
                                <td>{profile.firstName} {profile.lastName}</td>
                            </tr>
                            <tr>
                                <th scope='row'>Email :</th>
                                <td>{profile.emailId}</td>
                            </tr>
                            <tr>
                                <th scope='row'>Contact :</th>
                                <td>{profile.contactNumber}</td>
                            </tr>
                            <tr>
                                <th scope='row'>Designation :</th>
                                <td>{profile.designation}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div style={{width:'40%', border:'1px solid black', borderRadius:'20px'}}>
                    <h4 className='m-3'>Educational Details</h4>
                    <table className='table table-striped'>
                        <tbody>
                            <tr>
                                <th scope='row'>Bachelor's Degree :</th>
                                <td>{profile.bachelorDegree}</td>
                            </tr>
                            <tr>
                                <th scope='row'>Bachelor's Specialization :</th>
                                <td>{profile.bachelorSpecialization}</td>
                            </tr>
                            <tr>
                                <th scope='row'>Master's Degree :</th>
                                <td>{profile.masterDegree}</td>
                            </tr>
                            <tr>
                                <th scope='row'>Master's Specialization :</th>
                                <td>{profile.masterSpecialization}</td>
                            </tr>  
                            <tr>
                                <th scope='row'>Certification :</th>
                                <td>{profile.certification}</td>    
                            </tr>                          
                        </tbody>
                    </table>
                </div>
            </div>
            <div className='d-flex m-5 align-items-center justify-content-around' style={{border:'1px solid black', borderRadius:'20px'}}>
                <h4>Other Details</h4>
                <div style={{width:'50%'}}>
                    <table className='table table-striped m-2'>
                        <tbody>
                            <tr>
                                <th scope='row'>Gender :</th>
                                <td>{profile.gender}</td>
                            </tr>                            
                            <tr>
                                <th scope='row'>Date Of Joining</th>
                                <td>{doj}</td>
                            </tr>
                            <tr>
                                <th scope='row'>Total Experience :</th>
                                <td>{profile.totalExperience} yrs</td>
                            </tr>
                            <tr>
                                <th scope='row'>Reporting Manger Id :</th>
                                <td>{profile.reportingManagerId}</td>
                            </tr>
                            <tr>
                                <th scope='row'>Date Of Birth :</th>
                                <td>{dob}</td>
                            </tr>
                            <tr>
                                <th scope='row'>Address :</th>
                                <td>{profile.address}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default ViewEmployee;
