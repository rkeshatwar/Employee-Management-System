import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const MyTeam = ({id}) => {
    const [teamMembers, setTeamMembers] = useState([]);


    const date = new Date().getDate
    useEffect(() => {
        console.log("MG ID", id)
        axios.get(`https://localhost:7138/Manager/GetMyTeam?ManagerId=${id}`)
            .then(response => {setTeamMembers(response.data)
                console.log("response",response)
            })
            .catch(error => console.error('Error fetching team members:', error));
    }, [id]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString(); 
    };

    const formatTime = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleTimeString();
    };


    return (
        <div>
            <div className="p-2 d-flex justify-content-center shadow">
                <h3>My Team</h3>
            </div>
            <table className='table table-striped'>
                <thead>
                    <tr>
                        <th scope='col'>Emlpoyee Id</th>
                        <th scope='col'>Employee Name</th>
                        <th scope='col'>Designation</th>
                        <th scope='col'>Email Id</th>
                        <th scope='col'>Contact</th>
                        <th scope='col'>Last Logged In</th>
                        <th scope='col'>IP Address</th>
                        <th scope='col'>Actions</th>
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
                            <td>{formatDate(e.lastLoggedIn)}, <br/>{formatTime(e.lastLoggedIn)}</td>                            
                            <td>{e.currentIpAdderss}</td>
                            <td>
                                {date}
                                <Link to={`../viewSkillset/${e.employeeId}`} className='btn btn-outline-info'>View SkillSet</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default MyTeam;
