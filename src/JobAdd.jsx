import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import 'bootstrap/dist/css/bootstrap-utilities.rtl.min.css.map';


export default function JobAdd(props){
    const navigate = useNavigate();
    const[jobForm,setJobForm]=useState({
        jobId: '',
        jobTitle: '',
        company: '',
        location: '',
        description: '',
        employerEmail: '',
        link: '',
    });

    function checkLogin() {
        axios.get('/api/users/whoIsLoggedIn')
            .then(() => console.log("Success"))
            .catch(() => navigate('/'))
    }

    useEffect(checkLogin, []);

    return (
        <div class="auth-wrapper2">
            <div className={"box"}>
            <label for="jobId" class="form-label">Job Id:</label>
            <input class="form-control" value={jobForm.jobId} 
            onChange={e => setJobForm({
                ...jobForm,
                jobId: e.target.value
            })} ></input>
            </div>

            <div className={"box"}>
            <label for="jobTitle" class="form-label">Job Title:</label>
            <input class="form-control" value={jobForm.jobTitle} 
            onChange={e => setJobForm({
                ...jobForm,
                jobTitle: e.target.value
            })} ></input>
            </div>

            <div className={"box"}>
            <label for="company" class="form-label">Company:</label>
            <input class="form-control" value={jobForm.company} 
            onChange={e => setJobForm({
                ...jobForm,
                company: e.target.value
            })} ></input>
            </div>

            <div className={"box"}>
            <label for="location" class="form-label">Location:</label>
            <input class="form-control" value={jobForm.location} 
            onChange={e => setJobForm({
                ...jobForm,
                location: e.target.value
            })} ></input>
            </div>

            <div className={"box"}>
            <label for="description" class="form-label">Description:</label>
            <textarea class="form-control" value={jobForm.description} 
            onChange={e => setJobForm({
                ...jobForm,
                description: e.target.value
            })} ></textarea>
            </div>

            <div className={"box"}>
            <label for="email" class="form-label">Employer Email:</label>
            <input class="form-control" value={jobForm.employerEmail} 
            onChange={e => setJobForm({
                ...jobForm,
                employerEmail: e.target.value
            })} ></input>
            </div>

            <div className={"box"}>
            <label for="link" class="form-label">Company Link:</label>
            <input class="form-control" value={jobForm.link} 
            onChange={e => setJobForm({
                ...jobForm,
                link: e.target.value
            })} ></input>
            </div>

            <div className={"box"}>
            <button class="btn btn-primary" onClick={
                () => axios.post('/api/job/create', jobForm)
                    .then(response => {
                        
                        console.log(response)
                        navigate('/main')
                    })
                    .catch(error => console.error(error))
            }>
                Submit
            </button>
            </div>

        </div>

    )

}