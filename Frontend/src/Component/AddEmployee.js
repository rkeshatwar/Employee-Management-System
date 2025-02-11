import React, { useState , useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const AddEmployee = () => {

    const [managers, setManagers] = useState([]);

    const [employee, setEmployee] = useState({
        employeeId: 0,
        firstName: '',
        lastName: '',
        designation: '',
        reportingManagerId: null,
        gender: '',
        dob: '',
        contactNumber: '',
        emailId: '',
        address: '',
        dateOfJoining: '',
        totalExperience: 0,
        bachelorDegree: '',
        bachelorSpecialization: '',
        masterDegree: '',
        masterSpecialization: '',
        certification: '',
        role: '',
        photo:'',
        password:''
    });

    useEffect(() => {
        axios.get('https://localhost:7138/Employee/GetAllManagers')
        .then(response =>{
            console.log(response)
            setManagers(response.data)
        })
        .catch(error =>{
            console.log(error)        
        })        
    },[])

    const handleChange = (e) => {
        const { name, value } = e.target;
        let updatedValue = value;
        
        setEmployee(prevEmployee => ({
            ...prevEmployee,
            [name]: updatedValue
        }));
    };

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`https://localhost:7138/Employee/`, employee, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            alert('Employee Added successfully!');
            navigate('../all_employees')
        } catch (error) {
            console.error('Error updating employee:', error);
        }
    };

    return (
        <div>
            <div className="p-2 d-flex justify-content-center shadow">
                <h3>Create New Employee</h3>
            </div>
            <div className='d-flex justify-content-center'>
            <form onSubmit={handleSubmit} style={{width:'40%', border:'1px solid black', borderRadius:'20px', padding:'20px', margin:'10px', textAlign:'left'}}>
            
            <div className="mb-3">
                <label htmlFor="employeeId" className="form-label">Employee Id</label>
                <input type="text" className="form-control" id="employeeId" name="employeeId" onChange={handleChange} required />
            </div>

            <div className="mb-3">
                <label htmlFor="firstName" className="form-label">First Name</label>
                <input type="text" className="form-control" id="firstName" name="firstName" value={employee.firstName} onChange={handleChange} required />
            </div>

            <div className="mb-3">
                <label htmlFor="lastName" className="form-label">Last Name</label>
                <input type="text" className="form-control" id="lastName" name="lastName" value={employee.lastName} onChange={handleChange} required />
            </div>

            <div className="mb-3">
                <label htmlFor="dob" className="form-label">Date of Birth</label>
                <input type="date" className="form-control" id="dob" name="dob" onChange={handleChange}  />
            </div>

            <div className="mb-3">
                <label htmlFor="designation" className="form-label">Designation</label>
                <input type="text" className="form-control" id="designation" name="designation" value={employee.designation} onChange={handleChange} required />
            </div>

            <div className="mb-3">
                <label htmlFor="reportingManagerId" className="form-label">Reporting Manager ID</label>
                <select className="form-control" id="reportingManagerId" name="reportingManagerId" value={employee.reportingManagerId} onChange={handleChange}>
                    <option value="" selected>-- Select a Manager --</option>
                    {managers && managers.map((m)=>{
                        return(
                            <option value={m.employeeId}>{m.employeeId} {m.firstName} {m.lastName}</option>
                        )}
                    )}
                </select>
            </div>

            <div className="mb-3">
                <label htmlFor="gender" className="form-label">Gender</label>
                <select className="form-select" id="gender" name="gender" value={employee.gender} onChange={handleChange} required>
                    <option value="" selected></option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>
            </div>

            <div className="mb-3">
                <label htmlFor="emailId" className="form-label">Email Id</label>
                <input type="email" className="form-control" id="emailId" name="emailId" value={employee.emailId} onChange={handleChange} required />
            </div>

            <div className="mb-3">
                <label htmlFor="dateOfJoining" className="form-label">Date of Joining</label>
                <input type="date" className="form-control" id="dateOfJoining" name="dateOfJoining" onChange={handleChange} required />
            </div>

            <div className="mb-3">
                <label htmlFor="role" className="form-label">Role</label>
                <select className="form-select" id="role" name="role" value={employee.role} onChange={handleChange} required>
                    <option value="HR">HR</option>
                    <option value="Manager">Manager</option>
                    <option value="Employee">Employee</option>
                </select>
            </div>

            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" id="password" name="password" onChange={handleChange} />
            </div>
            
            
            <div style={{display:'none'}}>
                <div className="mb-3">
                    <label htmlFor="contactNumber" className="form-label">Contact Number</label>
                    <input type="text" className="form-control" id="contactNumber" name="contactNumber" value={employee.contactNumber} onChange={handleChange}  />
                </div>

                <div className="mb-3">
                    <label htmlFor="address" className="form-label">Address</label>
                    <input type="text" className="form-control" id="address" name="address" value={employee.address} onChange={handleChange}  />
                </div>

                <div className="mb-3">
                    <label htmlFor="totalExperience" className="form-label">Total Experience</label>
                    <input type="text" className="form-control" id="totalExperience" name="totalExperience" value={employee.totalExperience} onChange={handleChange} />
                </div>

                <div className="mb-3">
                    <label htmlFor="bachelorDegree" className="form-label">Bachelor's Degree</label>
                    <input type="text" className="form-control" id="bachelorDegree" name="bachelorDegree" value={employee.bachelorDegree} onChange={handleChange}  />
                </div>

                <div className="mb-3">
                    <label htmlFor="bachelorSpecialization" className="form-label">Bachelor's Specialization</label>
                    <input type="text" className="form-control" id="bachelorSpecialization" name="bachelorSpecialization" value={employee.bachelorSpecialization} onChange={handleChange}  />
                </div>

                <div className="mb-3">
                    <label htmlFor="masterDegree" className="form-label">Master's Degree</label>
                    <input type="text" className="form-control" id="masterDegree" name="masterDegree" value={employee.masterDegree} onChange={handleChange}  />
                </div>

                <div className="mb-3">
                    <label htmlFor="masterSpecialization" className="form-label">Master's Specialization</label>
                    <input type="text" className="form-control" id="masterSpecialization" name="masterSpecialization" value={employee.masterSpecialization} onChange={handleChange}  />
                </div>

                <div className="mb-3">
                    <label htmlFor="certification" className="form-label">Certification</label>
                    <input type="text" className="form-control" id="certification" name="certification" value={employee.certification} onChange={handleChange}  />
                </div>

            <div className="mb-3">
                <label htmlFor="profileFile" className="form-label">Profile Photo</label>
                <input type="text" className="form-control" id="profileFile" name="profileFile" onChange={handleChange} />
            </div>
        </div>
        
        <div style={{textAlign:'center'}}>
            <button type="submit" className="btn btn-primary">ADD Employee</button>
        </div>
        </form>
        </div>
    </div>
    );
}

export default AddEmployee;
