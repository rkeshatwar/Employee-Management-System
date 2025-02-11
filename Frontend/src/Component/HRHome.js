import React, {useState, useEffect} from 'react';
import axios from 'axios';

const Home = () => {
    const [HrTotal, setHrTotal] = useState(0);
    const [employeeTotal, setEmployeeTotal] = useState(0);
    const [managerTotal, setManagerTotal] = useState(0);
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

      useEffect(() => {
        console.log(loginDateTime);

        let hrCount = 0;
        let managerCount = 0;
        let employeeCount = 0;
      
        employees.forEach(e => {
          employeeCount++;
          if (e.role === "HR") {
            hrCount++;
          } else if (e.role === "Manager") {
            managerCount++;
          }
          console.log(hrCount)
        });      
        setHrTotal(hrCount);
        setManagerTotal(managerCount);
        setEmployeeTotal(employeeCount);
      },[employees])

      const loginDateTime = new Date();

  return (
    <div>
      <div className="p-2 d-flex justify-content-center shadow">
          <h3>Dashboard</h3>
      </div>
      <div className='p-3 d-flex justify-content-around mt-3'>
        <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
          <div className='text-center pb-1'>
            <h4>HR</h4>
          </div>
          <hr />
          <div className='d-flex justify-content-between'>
            <h5>Total:</h5>
            <h5>{HrTotal}</h5>
          </div>
        </div>
        <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
          <div className='text-center pb-1'>
            <h4>Employee</h4>
          </div>
          <hr />
          <div className='d-flex justify-content-between'>
            <h5>Total:</h5>
            <h5>{employeeTotal}</h5>
          </div>
        </div>
        <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
          <div className='text-center pb-1'>
            <h4>Manager</h4>
          </div>
          <hr />
          <div className='d-flex justify-content-between'>
            <h5>Total:</h5>
            <h5>{managerTotal}</h5>
          </div>
        </div>
      </div>
      <div className='mt-4 px-5 pt-3'>
        <h3>List of Employees</h3>
        <table className='table table-striped'>
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
                    {employees && employees.map(e => (
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
    </div>
  )
}

export default Home;
