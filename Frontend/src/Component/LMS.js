import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LMS = ({ id, getUser }) => {
    const [employee, setEmployee] = useState({
        employeeId: {id},
        firstName: '',
        lastName: '',
        designation: '',
        reportingManagerId: '',
        gender: '',
        dob: '',
        contactNumber: '',
        emailId: '',
        address: '',
        bachelorDegree: '',
        bachelorSpecialization: '',
        masterDegree: '',
        masterSpecialization: '',
        certification: '',
        role: '',
        photo:''
    });

    useEffect(() => {
        console.log(id);
        fetchEmployeeById();
    }, [id]);

    const fetchEmployeeById = async () => {
        try {
            const response = await axios.get(`https://localhost:7138/Employee/${id}`);
            const fetchedEmployee = response.data;
            fetchedEmployee.dob = fetchedEmployee.dob.split('T')[0];
            fetchedEmployee.dateOfJoining = fetchedEmployee.dateOfJoining.split('T')[0];
            setEmployee(fetchedEmployee);
        } catch (error) {
            console.error('Error fetching employee:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

      

        setEmployee(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onloadend = ()=> {
            setEmployee(prevState => ({
                ...prevState,
                photo: reader.result
            }));
        };
        if(file) {
            reader.readAsDataURL(file);
        }        
    };

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const phoneNumberPattern = /^[789]\d{9}$/;
        if (!phoneNumberPattern.test(employee.contactNumber)) {
            alert('Phone number must start with 9, 8, or 7 and have 10 digits.');
            return; 
        }
            try {
                await axios.put(`https://localhost:7138/Employee/`, employee, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                alert('LMS Form Filled successfully!');
                getUser();
                navigate('../profile')
            } catch (error) {
                console.error('Error updating LMS Form:', error);
            }
    };

   

  return (
    <div>
        <div className="p-2 d-flex justify-content-center shadow">
            <h3>LMS Form</h3>
        </div>
            
        <div className='d-flex justify-content-center'>
        <form onSubmit={handleSubmit} style={{width:'100%'}}>
            <div style={{border:'1px solid black', borderRadius:'20px', padding:'20px', margin:'10px', textAlign:'left'}}>
                <div className='d-flex justify-content-around' >
                    <div style={{width:'40%'}}>
                        <div className="mb-3">
                        <label htmlFor="firstName" className="form-label">First Name</label>
                        <input type="text" className="form-control" id="firstName" name="firstName" value={employee.firstName} onChange={handleChange} readOnly />
                        </div>

                        <div className="mb-3">
                        <label htmlFor="lastName" className="form-label">Last Name</label>
                        <input type="text" className="form-control" id="lastName" name="lastName" value={employee.lastName} onChange={handleChange} readOnly />
                        </div>

                        <div className="mb-3">
                        <label htmlFor="dob" className="form-label">Date of Birth</label>
                        <input type="date" className="form-control" id="dob" name="dob" value={employee.dob} onChange={handleChange} readOnly />
                        </div>

                        <div className="mb-3">
                        <label htmlFor="designation" className="form-label">Designation</label>
                        <input type="text" className="form-control" id="designation" name="designation" value={employee.designation} onChange={handleChange} readOnly />
                        </div>

                        <div className="mb-3">
                        <label htmlFor="reportingManagerId" className="form-label">Reporting Manager ID</label>
                        <input type="text" className="form-control" id="reportingManagerId" name="reportingManagerId" value={employee.reportingManagerId} onChange={handleChange} readOnly />
                        </div>

                        <div className="mb-3">
                        <label htmlFor="gender" className="form-label">Gender</label>
                        <input type="text" className="form-control" id="gender" name="gender" value={employee.gender} onChange={handleChange} readOnly />
                        </div>

                        <div className="mb-3">
                        <label htmlFor="emailId" className="form-label">Email Id</label>
                        <input type="email" className="form-control" id="emailId" name="emailId" value={employee.emailId} onChange={handleChange} readOnly />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="dateOfJoining" className="form-label">Date of Joining</label>
                            <input type="date" className="form-control" id="dateOfJoining" name="dateOfJoining" value={employee.dateOfJoining} onChange={handleChange} readOnly />
                        </div>
                        
                        <div className="mb-3">
                        <label htmlFor="role" className="form-label">Role</label>
                        <input type='text' className='form-control' id='role' name='role' value={employee.role} onChange={handleChange} readOnly/>
                        {/* <select className="form-select" id="role" name="role" value={employee.role} onChange={handleChange} readOnly>
                            <option value="HR">HR</option>
                            <option value="Manager">Manager</option>
                            <option value="Employee">Employee</option>
                        </select> */}
                        </div>
                    </div>

                    
                    <div style={{width:'40%'}}>
                        <div className="mb-3">
                        <label htmlFor="contactNumber" className="form-label">Contact Number</label>
                        <input type="text" className="form-control" id="contactNumber" name="contactNumber" value={employee.contactNumber} onChange={handleChange} required />
                        </div>

                        <div className="mb-3">
                        <label htmlFor="address" className="form-label">Address</label>
                        <input type="text" className="form-control" id="address" name="address" value={employee.address} onChange={handleChange}  />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="bachelorDegree" className="form-label">Bachelor's Degree</label>
                            <select className="form-select" id="bachelorDegree" name="bachelorDegree" value={employee.bachelorDegree} onChange={handleChange}>    
                                <option value="" selected></option>
                                <option value="B.E">B.E</option>
                                <option value="B.Tech">B.Tech</option>
                                <option value="B.Ca">B.Ca</option>
                                <option value="B.Sc">B.Sc</option>
                                <option value="B.Com">B.Com</option>
                                <option value="Others">Others</option>
                            </select>
                        </div>

                        {employee.bachelorDegree === 'Others' && (
                            <div className="mb-3">
                                <label htmlFor="BachelorDegree" className="form-label">Custom Bachelor's Degree</label>
                                <input type="text" className="form-control" id="BachelorDegree" name="BachelorDegree" value={employee.BachelorDegree} onChange={handleChange} />
                            </div>
                        )}

                        <div className="mb-3">
                            <label htmlFor="bachelorSpecialization" className="form-label">Bachelor's Specialization</label>
                            {employee.bachelorDegree === 'Others' ? (
                            <input type="text" className="form-control" id="bachelorSpecialization" name="bachelorSpecialization" value={employee.bachelorSpecialization} onChange={handleChange} />
                            ) : (
                            <select className="form-select" id="bachelorSpecialization" name="bachelorSpecialization" value={employee.bachelorSpecialization} onChange={handleChange}>
                                {employee.bachelorDegree === 'B.E' || employee.bachelorDegree === 'B.Tech' ? (
                                    <>
                                        <option value="" selected></option>
                                        <option value="Mechanical Engineering">Mechanical Engineering</option>
                                        <option value=">Civil Engineering">Civil Engineering</option>
                                        <option value="Computer Engineering">Computer Engineering</option>
                                        <option value="Electrical Engineering">Electrical Engineering</option>
                                        <option value="Electronics & Telecommunication Engineering">Electronics & Telecommunication Engineering</option>
                                        <option value="Information Technology">Information Technology</option>
                                    </>
                                ) : (employee.bachelorDegree === 'B.Sc'? (
                                    <>
                                        <option value="" selected></option>
                                        <option value="Mathematics">Mathematics</option>
                                        <option value="Computer Science">Computer Science</option>
                                        <option value="Microbiology">Microbiology</option>
                                        <option value="Biochemistry">Biochemistry</option>
                                        <option value="Agriculture">Agriculture</option>
                                        <option value="Information Technology">Information Technology</option>
                                    </>
                                ) :(employee.bachelorDegree === 'B.Ca'? (
                                    <>
                                        <option value="" selected></option>
                                        <option value="Computer Programmer">Computer Programmer</option>
                                        <option value="Cyber security">Cyber security</option>
                                        <option value="System Analyst">System Analyst</option>
                                        <option value="Digital marketing">Digital marketing</option>
                                        <option value="Data analysis">Data analysis</option>
                                    </>
                                ):(
                                    <>
                                        <option value="" selected></option>
                                        <option value="Accounting ">Accounting </option>
                                        <option value="Taxation">Taxation</option>
                                        <option value="Human Resource Management">Human Resource Management</option>
                                        <option value="Marketing">Marketing</option>
                                        <option value="Economics">Economics</option>
                                    </>
                                )
                                )
                                )}
                                <option value="Others">Other</option>
                            </select>
                            )}
                        </div>

                        {/* <div className="mb-3">
                            <label htmlFor="masterDegree" className="form-label">Master's Degree</label>
                            <input type="text" className="form-control" id="masterDegree" name="masterDegree" value={employee.masterDegree} onChange={handleChange}  />
                        </div>

                        <div className="mb-3">
                        <label htmlFor="masterSpecialization" className="form-label">Master's Specialization</label>
                        <input type="text" className="form-control" id="masterSpecialization" name="masterSpecialization" value={employee.masterSpecialization} onChange={handleChange}  />
                        </div> */}

                        <div className="mb-3">
                            <label htmlFor="masterDegree" className="form-label">Master's Degree</label>
                            <select className="form-select" id="masterDegree" name="masterDegree" value={employee.masterDegree} onChange={handleChange}>    
                                <option value="" selected></option>
                                <option value="M.E">M.E</option>
                                <option value="M.Tech">M.Tech</option>
                                <option value="M.Ca">M.Ca</option>
                                <option value="M.Sc">M.Sc</option>
                                <option value="M.Com">M.Com</option>
                                <option value="Others">Others</option>
                            </select>
                        </div>

                        {employee.masterDegree === 'Others' && (
                            <div className="mb-3">
                                <label htmlFor="MasterDegree" className="form-label">Custom Master's Degree</label>
                                <input type="text" className="form-control" id="MasterDegree" name="MasterDegree" value={employee.MasterDegree} onChange={handleChange} />
                            </div>
                        )}

                        <div className="mb-3">
                            <label htmlFor="masterSpecialization" className="form-label">Master's Specialization</label>
                            {employee.masterDegree === 'Others' ? (
                            <input type="text" className="form-control" id="masterSpecialization" name="masterSpecialization" value={employee.masterSpecialization} onChange={handleChange} />
                            ) : (
                            <select className="form-select" id="masterSpecialization" name="masterSpecialization" value={employee.masterSpecialization} onChange={handleChange}>
                                {employee.masterDegree === 'M.E' || employee.masterDegree === 'M.Tech' ? (
                                    <>
                                        <option value="" selected></option>
                                        <option value="Mechanical Engineering">Mechanical Engineering</option>
                                        <option value=">Civil Engineering">Civil Engineering</option>
                                        <option value="Computer Engineering">Computer Engineering</option>
                                        <option value="Electrical Engineering">Electrical Engineering</option>
                                        <option value="Electronics & Telecommunication Engineering">Electronics & Telecommunication Engineering</option>
                                        <option value="Information Technology">Information Technology</option>
                                    </>
                                ) : (employee.masterDegree === 'M.Sc'? (
                                    <>
                                        <option value="" selected></option>
                                        <option value="Mathematics">Mathematics</option>
                                        <option value="Computer Science">Computer Science</option>
                                        <option value="Microbiology">Microbiology</option>
                                        <option value="Biochemistry">Biochemistry</option>
                                        <option value="Agriculture">Agriculture</option>
                                        <option value="Information Technology">Information Technology</option>
                                    </>
                                ) :(employee.masterDegree === 'M.Ca'? (
                                    <>
                                        <option value="" selected></option>
                                        <option value="Computer Programmer">Computer Programmer</option>
                                        <option value="Cyber security">Cyber security</option>
                                        <option value="System Analyst">System Analyst</option>
                                        <option value="Digital marketing">Digital marketing</option>
                                        <option value="Data analysis">Data analysis</option>
                                    </>
                                ):(
                                    <>
                                        <option value="" selected></option>
                                        <option value="Accounting ">Accounting </option>
                                        <option value="Taxation">Taxation</option>
                                        <option value="Human Resource Management">Human Resource Management</option>
                                        <option value="Marketing">Marketing</option>
                                        <option value="Economics">Economics</option>
                                    </>
                                )
                                )
                                )}
                                <option value="Others">Other</option>
                            </select>
                            )}
                        </div>

                        <div className="mb-3">
                        <label htmlFor="certification" className="form-label">Certification</label>
                        <input type="text" className="form-control" id="certification" name="certification" value={employee.certification} onChange={handleChange}  />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="profileFile" className="form-label">Profile Photo</label>
                            <input type="file" className="form-control" id="profileFile" name="profileFile" onChange={handleFileChange} />
                        </div>
                    </div>
                </div>
                <div className='mb-3 text-center'>
                    <button type="submit" className="btn btn-primary">Submit LMS Form</button>
                </div>
            </div>

            
        </form>
        </div>
    </div>
  );
}

export default LMS;
