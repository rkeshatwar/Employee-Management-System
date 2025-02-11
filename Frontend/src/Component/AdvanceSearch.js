import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const AdvanceSearch = () => {

    const[credentials, setCredentials] = useState({
        skill : '',
        rating : 0
    })

    const [searchResult, setSearchResult] = useState([]);

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSearch = async() => {
        await axios.get(`https://localhost:7138/Employee/AdvanceSearch?skill=${credentials.skill}&rating=${credentials.rating}`)
        .then( response => {
            console.log(response);
            setSearchResult(response.data);
         }
        )
        .catch( error => {
            console.error();
         }
        )
    }

    return (
        <div>
            <div className="p-2 d-flex justify-content-center shadow">
                <h3>Advance Search</h3>
            </div>

            <div>
                <div className='d-flex justify-content-center'>
                    <div className="d-flex justify-content-around m-3"  style={{width:'50%'}} >
                        <select className="form-select" style={{width:'35%'}} id="skill" name="skill" onChange={handleChange} required>
                            <option value="" selected>-- Select a skill --</option>
                            <option value="Database">Database</option>
                            <option value="Programming">Programming</option>
                            <option value="Java">Java</option>
                            <option value="CSharp">C#</option>
                            <option value="Python">Python</option>
                            <option value="WebDevelopment">Web-Development</option>
                        </select>

                        <select className="form-select" style={{width:'35%'}} id="rating" name="rating" onChange={handleChange} required>
                            <option value="" selected>-- Rating --</option>
                            {[...Array(11)].map((_, index) => (
                                    <option key={index} value={index}>{index}</option>
                            ))}
                        </select>
                        <button className='btn btn-outline-primary' onClick={handleSearch}><i className='bi bi-search'/></button>
                    </div>
                </div>
                <h3 className='mt-3'>Search Result</h3>
                <div className='mt-2 px-5 pt-3'>
                    <table className='table table-striped'>
                        <thead>
                            <tr>
                                <th scope='col'>Emlpoyee Id</th>
                                <th scope='col'>Employee Name</th>
                                <th scope='col'>Designation</th>
                                <th scope='col'>Email Id</th>
                                <th scope='col'>Contact</th>
                                <th scope='col'>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {searchResult.map(e => (
                                <tr key={e.employeeId}>
                                    <td>{e.employeeId}</td>
                                    <td>{e.firstName} {e.lastName}</td>
                                    <td>{e.designation}</td>
                                    <td>{e.emailId}</td>
                                    <td>{e.contactNumber}</td>
                                    <td>
                                        <Link to={`../viewSkillset/${e.employeeId}`} className='btn btn-outline-info'>View SkillSet</Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default AdvanceSearch;
