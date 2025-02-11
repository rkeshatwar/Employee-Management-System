import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ManageEmployees = () => {
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        axios.get('https://localhost:7138/Employee')
          .then(response => {
            setEmployees(response.data)
            console.log(response.data);
          })
          .catch(error => {
            console.error('Error fetching employees:', error);
          });
          console.log(employees)
      }, []);

      const handleDelete = (id) => {
        const url1 = `https://localhost:7138/Employee?id=${id}`;
        const url2 = `https://localhost:7138/SkillAssessment?empId=${id}`;
    
        Promise.all([
            axios.delete(url1),
            axios.delete(url2)
        ])
        .then(responses => {
            const response1 = responses[0];
            const response2 = responses[1];
    
            console.log('First DELETE API response:', response1.data);
            console.log('Second DELETE API response:', response2.data);
    
            console.log('Both DELETE requests completed successfully');
            if(response1.status==200 && response2.status==200) {
                alert("Employee Deleted Successfully");
                window.location.reload();
            } 
        })
        .catch(errors => {
            console.error('Error making one or both DELETE API requests:', errors);
        });
    };

    return (
        <div>
            <div className="p-2 d-flex justify-content-center shadow">
                <h3>Manage Employees</h3>
            </div>
            <div className='pt-3 pb-3'>
                <Link to='../add_employee' className='btn btn-secondary'>Add New Employee</Link>
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
                    {employees && employees.map(e => (
                        <tr>
                            <td>{e.employeeId}</td>
                            <td>{e.firstName} {e.lastName}</td>
                            <td>{e.designation}</td>
                            <td>{e.role}</td>
                            <td>
                                <div>
                                    <Link to={`../viewEmployee/${e.employeeId}`} className='btn btn-outline-info me-2'><i class="bi bi-eye"></i></Link>
                                    <Link to={`../updateEmployee/${e.employeeId}`} className='btn btn-outline-warning me-2'><i class="bi bi-pencil-square"></i></Link>
                                    <button onClick={() => handleDelete(e.employeeId)} className='btn btn-outline-danger'><i class="bi bi-trash"></i></button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ManageEmployees;
