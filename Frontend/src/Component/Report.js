import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Chart from 'chart.js/auto';

const Report = ({ id }) => {
    const [formData, setFormData] = useState({});
    const [chartInstances, setChartInstances] = useState([]);
    const [color, setColor] = useState('');

    useEffect(() => {
        fetchData();
    }, [id]);
    
    useEffect(() => {
        if(formData.status === 'Pending'){
            setColor('warning')
        }else if(formData.status === 'Approved'){
            setColor('success')
        }else if(formData.status === 'Rejected'){
            setColor('danger')
        }

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

    return (
        <div>
            <button className={`fs-5 text-${color}`} style={{position:'absolute', right:'20px', top:'10px', border:'none', background:'transparent'}}>Status: {formData.status}</button>
            <div className="p-2 d-flex justify-content-center shadow">
                <h3>Skill Assessment Report</h3>
            </div>
            {formData ? (
                <div className='mt-3'>
                    <div>
                        <Link to='../skill_assessment' className='btn btn-outline-secondary'>Update Assessment</Link>
                    </div>
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
                <p className='fs-4'>OOPs! You havn't filled Skill Assessment.<Link to='../skill_assessment'>Click Here</Link> to fill it now.</p>
            )}
        </div>
    );
}

export default Report;
