import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Chart from 'chart.js/auto';


const ViewEmployeeSkillSet = () => {

    const {id} = useParams();

    const navigate = useNavigate();

    const [formData, setFormData] = useState({});

    const [chartInstances, setChartInstances] = useState([]);

    useEffect(() => {
        fetchData();
    }, [id]);
    
    useEffect(() => {
        if (Object.keys(formData).length > 0) {
            const ctx1 = document.getElementById('chart1');
            const ctx2 = document.getElementById('chart2');

            chartInstances.forEach(chart => chart.destroy());

            const firstChartData = filterData(['cSharp', 'java', 'database', 'programming', 'python', 'webDevelopment']);
            const secondChartData = filterData(['teamwork', 'verbalCommunication', 'writtenCommunication', 'leadership', 'problemSolving', 'descisionMaking']);

            const firstChartInstance = new Chart(ctx1, {
                type: 'bar',
                data: {
                    labels: Object.keys(firstChartData),
                    datasets: [{
                        label: 'Skill Assessment',
                        data: Object.values(firstChartData), 
                        backgroundColor: 'rgba(54, 162, 235, 0.5)',
                        borderColor: 'rgba(54, 162, 235, 1)',
                        borderWidth: 1,
                    }],
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true,
                            max: 10,
                            endAtTen: true,
                            title: {
                                display: true,
                                text: 'Rating',
                            },
                        },
                        x: {
                            title: {
                                display: true,
                                text: 'Skills',
                            },
                        },
                    },
                },
            });

            const secondChartInstance = new Chart(ctx2, {
                type: 'bar',
                data: {
                    labels: Object.keys(secondChartData),
                    datasets: [{
                        label: 'Skill Assessment',
                        data: Object.values(secondChartData), 
                        backgroundColor: 'rgba(54, 162, 235, 0.5)',
                        borderColor: 'rgba(54, 162, 235, 1)',
                        borderWidth: 1,
                    }],
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true,
                            max: 10,
                            endAtTen: true,
                            title: {
                                display: true,
                                text: 'Rating',
                            },
                        },
                        x: {
                            title: {
                                display: true,
                                text: 'Skills',
                            },
                        },
                    },
                },
            });

            setChartInstances([firstChartInstance, secondChartInstance]);
        }
    }, [formData]); 
    

    const fetchData = async () => {
        try {
            const response = await axios.get(`https://localhost:7138/SkillAssessment/${id}`);
            setFormData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const filterData = (keys) => {
        return keys.reduce((obj, key) => {
            obj[key] = formData[key];
            return obj;
        }, {});
    };

    const goBack = ()=>{
        navigate(-1);
    }

    return (
        <div>
            <button className='fs-3 text-danger' onClick={goBack} style={{position:'absolute', right:'20px', top:'3px', border:'none', background:'transparent'}}>X</button> 
            <div className="p-2 d-flex justify-content-center shadow">
                <h3>{id}'s Skill Set</h3>
            </div>
            {formData ? (
                <div className='mt-3'>
                    <div className='d-flex justify-content-around mt-3'>
                        <div style={{ width: '400px', border:'1px solid black', borderRadius:'20px', padding:'0px 20px' }}>
                            <h3 className='text-decoration-underline'>Technical Skills</h3>
                            <canvas id="chart1" style={{ width: '400px', height: '400px' }}></canvas>
                        </div>
                        <div style={{ width: '400px', border:'1px solid black', borderRadius:'20px', padding:'0px 20px' }}>
                            <h3 className='text-decoration-underline'>Soft Skills</h3>
                            <canvas id="chart2" style={{ width: '400px', height: '400px' }}></canvas>
                        </div>
                    </div>
                </div>
            ):(
                <p className='fs-4'>No Skillset to Display.</p>
            )}
        </div>
    );
}

export default ViewEmployeeSkillSet;
