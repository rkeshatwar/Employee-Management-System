import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SkillAssessment = ({id}) => {
   
    const [formData, setFormData] = useState({
    employeeId: id,
    database: 0,
    programming: 0,
    java: 0,
    cSharp: 0,
    python: 0,
    webDevelopment: 0,
    otherSkills: '',
    verbalCommunication: 0,
    writtenCommunication: 0,
    teamwork: 0,
    problemSolving: 0,
    descisionMaking: 0,
    leadership: 0,
    foriegnLanguage: '',
    status: 'Pending',
  });

  useEffect(()=> {
    console.log(id)
    fetchData();
    console.log("Fetched",formData);
},[id])



const fetchData = async () => {
    try {
        const response = await axios.get(`https://localhost:7138/SkillAssessment/${id}`);
        console.log(response);
        if(response.status!=204) {
            setFormData(response.data);
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();
    formData.status='Pending';
    try{
        const response = await axios.post('https://localhost:7138/SkillAssessment/', formData, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log('Response:', response.data);
        alert('Skill-Assessment Added successfully!');
        navigate('../report');
    } catch (error) {
        console.error('Error:', error);
    }
 };

  return (
    <div>
        <div className="p-2 d-flex justify-content-center shadow">
            <h3>Skill Assessment Form</h3>
        </div>
        <form onSubmit={handleSubmit}>
        <div className='d-flex justify-content-around'>
            <div style={{width:'40%', border:'1px solid black', borderRadius:'20px', padding:'20px', margin:'10px'}}>
                <h3>Technical Skills</h3>
                <table className='table table-striped'>
                    <tbody>
                        <tr>
                            <th scope='row'><label htmlFor="database" className="form-label">Database</label></th>
                            <td>
                                <select className="form-select" id="database" name="database" value={formData.database} onChange={handleChange} required>
                                    {[...Array(11)].map((_, index) => (
                                    <option key={index} value={index}>{index}</option>
                                    ))}
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <th scope='row'><label htmlFor="programming" className="form-label">Programming</label></th>
                            <td>
                                <select className="form-select" id="programming" name="programming" value={formData.programming} onChange={handleChange} required>
                                    {[...Array(11)].map((_, index) => (
                                    <option key={index} value={index}>{index}</option>
                                    ))}
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <th scope='row'><label htmlFor="java" className="form-label">Java</label></th>
                            <td>
                                <select className="form-select" id="java" name="java" value={formData.java} onChange={handleChange} required>
                                    {[...Array(11)].map((_, index) => (
                                    <option key={index} value={index}>{index}</option>
                                    ))}
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <th scope='row'><label htmlFor="cSharp" className="form-label">C#</label></th>
                            <td>
                                <select className="form-select" id="cSharp" name="cSharp" value={formData.cSharp} onChange={handleChange} required>
                                    {[...Array(11)].map((_, index) => (
                                    <option key={index} value={index}>{index}</option>
                                    ))}
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <th scope='row'><label htmlFor="python" className="form-label">Python</label></th>
                            <td>
                                <select className="form-select" id="python" name="python" value={formData.python} onChange={handleChange} required>
                                    {[...Array(11)].map((_, index) => (
                                    <option key={index} value={index}>{index}</option>
                                    ))}
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <th scope='row'><label htmlFor="webDevelopment" className="form-label">Web Development</label></th>
                            <td>
                                <select className="form-select" id="webDevelopment" name="webDevelopment" value={formData.webDevelopment} onChange={handleChange} required>
                                    {[...Array(11)].map((_, index) => (
                                    <option key={index} value={index}>{index}</option>
                                    ))}
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <th scope='row'><label htmlFor="otherSkills" className="form-label">Other Skill</label></th>
                            <td><input type='text' className="form-control" id='otherSkills' name='otherSkills' value={formData.otherSkills} onChange={handleChange}></input></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div style={{width:'40%', border:'1px solid black', borderRadius:'20px', padding:'20px', margin:'10px'}}>
                <h3>Communication Skills</h3>
                <table className='table table-striped'>
                    <tbody>
                        <tr>
                            <th scope='row'><label htmlFor="verbalCommunication" className="form-label">Verbal Communication</label></th>
                            <td>
                                <select className="form-select" id="verbalCommunication" name="verbalCommunication" value={formData.verbalCommunication} onChange={handleChange} required>
                                    {[...Array(11)].map((_, index) => (
                                    <option key={index} value={index}>{index}</option>
                                    ))}
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <th scope='row'><label htmlFor="writtenCommunication" className="form-label">Written Communication</label></th>
                            <td>
                                <select className="form-select" id="writtenCommunication" name="writtenCommunication" value={formData.writtenCommunication} onChange={handleChange} required>
                                    {[...Array(11)].map((_, index) => (
                                    <option key={index} value={index}>{index}</option>
                                    ))}
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <th scope='row'><label htmlFor="teamwork" className="form-label">Teamwork</label></th>
                            <td>
                                <select className="form-select" id="teamwork" name="teamwork" value={formData.teamwork} onChange={handleChange} required>
                                    {[...Array(11)].map((_, index) => (
                                    <option key={index} value={index}>{index}</option>
                                    ))}
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <th scope='row'><label htmlFor="problemSolving" className="form-label">Problem Solving</label></th>
                            <td>
                                <select className="form-select" id="problemSolving" name="problemSolving" value={formData.problemSolving} onChange={handleChange} required>
                                    {[...Array(11)].map((_, index) => (
                                    <option key={index} value={index}>{index}</option>
                                    ))}
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <th scope='row'><label htmlFor="descisionMaking" className="form-label">Decision Making</label></th>
                            <td>
                                <select className="form-select" id="descisionMaking" name="descisionMaking" value={formData.descisionMaking} onChange={handleChange} required>
                                    {[...Array(11)].map((_, index) => (
                                    <option key={index} value={index}>{index}</option>
                                    ))}
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <th scope='row'><label htmlFor="leadership" className="form-label">Leadership</label></th>
                            <td>
                                <select className="form-select" id="leadership" name="leadership" value={formData.leadership} onChange={handleChange} required>
                                    {[...Array(11)].map((_, index) => (
                                    <option key={index} value={index}>{index}</option>
                                    ))}
                                </select>
                            </td>
                        </tr> 
                        <tr>
                            <th scope='row'><label htmlFor="foriegnLanguage" className="form-label">Foriegn Language</label></th>
                            <td><input type='text' className="form-control" id='foriegnLanguage' name='foriegnLanguage' value={formData.foriegnLanguage} onChange={handleChange}></input></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

      <button type="submit" className="btn btn-primary">Submit Skill Assessment</button>
    </form>
    </div>
  );
};

export default SkillAssessment;
