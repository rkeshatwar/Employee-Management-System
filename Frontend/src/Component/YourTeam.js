import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const YourTeam = ({id}) => {
    console.log("ID:",id)
    const [employee, setEmployee] = useState({});
    const [teamMembers, setTeamMembers] = useState([]);
    const [managerDetails, setMangerDetails] = useState({});

    const fetchEmployeeById = async () => {
        try {
            const response = await axios.get(`https://localhost:7138/Employee/${id}`);
            setEmployee(response.data);
            console.log(employee)
        } catch (error) {
            console.error('Error fetching employee:', error);
        }
    };

    const fetchManagerDetails = async (mgId) => {
        try {
            const response = await axios.get(`https://localhost:7138/Employee/${mgId}`);
            setMangerDetails(response.data);
            console.log(managerDetails)
        } catch (error) {
            console.error('Error fetching manager:', error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                await fetchEmployeeById(id);
                console.log("MG ID", employee.reportingManagerId);
                const response = await axios.get(`https://localhost:7138/Manager/GetMyTeam?ManagerId=${employee.reportingManagerId}`);
                setTeamMembers(response.data);
                console.log("response", response);
            } catch (error) {
                console.error('Error fetching team members:', error);
            }
        };
        
        fetchData();
        fetchManagerDetails(employee.reportingManagerId);
    
    }, [id, employee.reportingManagerId]);
    

    return (
        <div>
            <div className="p-2 d-flex justify-content-center shadow">
                <h4>Manager : {managerDetails.firstName} {managerDetails.lastName}'s Team</h4>
            </div>
            <table className='table table-striped mt-3'>
                <thead>
                    <tr>
                        <th scope='col'>Emlpoyee Id</th>
                        <th scope='col'>Employee Name</th>
                        <th scope='col'>Designation</th>
                        <th scope='col'>Email Id</th>
                        <th scope='col'>Contact</th>
                    </tr>
                </thead>
                <tbody>
                    {teamMembers && teamMembers.map(e => (
                        <tr>
                            <td>{e.employeeId}</td>
                            <td>{e.firstName} {e.lastName}</td>
                            <td>{e.designation}</td>
                            <td>{e.emailId}</td>
                            <td>{e.contactNumber}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default YourTeam;
