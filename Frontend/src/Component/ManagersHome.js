import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ManagersHome = ({id}) => {

    const [pendingAssessmentMembers, setPendingAssessmentMembers] = useState([]);
    useEffect(() => {
        console.log("MG ID", id)
        axios.get(`https://localhost:7138/Manager/GetMyTeamWithPendingSkillAssessment?ManagerId=${id}`)
            .then(response => {setPendingAssessmentMembers(response.data)
                console.log("response",response)
            })
            .catch(error => console.error('Error fetching team members:', error));
    }, [id]);

    const handleApprove = (employeeId) => {
        axios.put(`https://localhost:7138/Manager/UpdateStatus?employeeId=${employeeId}&status=Approved`)
            .then(response => {
                console.log("Status updated successfully:", response);
                window.location.reload();
            })
            .catch(error => console.error('Error updating status:', error));
    };
    
    const handleReject = (employeeId) => {
        axios.put(`https://localhost:7138/Manager/UpdateStatus?employeeId=${employeeId}&status=Rejected`)
            .then(response => {
                console.log("Status updated successfully:", response);
                window.location.reload();
            })
            .catch(error => console.error('Error updating status:', error));
    };

    return (
        <div>
            <div className="p-2 d-flex justify-content-center shadow">
                <h3>Pending Approvals</h3>
            </div>
            <table className='table table-striped'>
                <thead>
                    <tr>
                        <th scope='col'>Emlpoyee Id</th>
                        <th scope='col'>Employee Name</th>
                        <th scope='col'>Designation</th>
                        <th scope='col'>Role</th>
                        <th scope='col'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {pendingAssessmentMembers && pendingAssessmentMembers.map(e => (
                        <tr>
                            <td>{e.employeeId}</td>
                            <td>{e.firstName} {e.lastName}</td>
                            <td>{e.designation}</td>
                            <td>{e.role}</td>
                            <td>
                            <button className='btn btn-outline-success' onClick={() => handleApprove(e.employeeId)}>Approve</button>
                            <button className='btn btn-outline-danger' onClick={() => handleReject(e.employeeId)}>Reject</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ManagersHome;
