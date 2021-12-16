import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import 'bootstrap/dist/css/bootstrap-utilities.rtl.min.css.map';

export default function() {
    const jobId = useParams().jobId;
    

    function findJobDetail() {

        axios.get('/api/job/findbyJobID/' + jobId)
            .then(response => setJob(response.data))
            .then(error => console.log("Could not find jobs"));

    }
    const [job, setJob] = useState(null);

    useEffect(findJobDetail,[]);

    const jobDetails = job ? 
        (<>
            <div class="container d-grid gap-3" style={{padding:50}}>
            <p class="p-5 bg-light border">
            <ul class="list-group">
                <li class="list-group-item list-group-item-primary"><h5 className="mb-1">{job.jobTitle}</h5></li>
                <li class="list-group-item list-group-item-secondary"><p className="mb-1">{job.company + " | " + job.location}</p></li>
                <li class="list-group-item list-group-item-light">
                    <p className="mb-1">
                        {job.description}
                    </p>
                </li>
                <li class="list-group-item list-group-item-info">
                    {job.link && <p className="mb-1">{job.employerEmail + " | " + job.link}</p>}
                    {!job.link && <p className="mb-1">{job.employerEmail}</p>}
                </li>
            </ul>
            </p>
        </div>
     </>) :
        (<div> No Job found </div>);

    return (
        <div >
            {jobDetails}
        </div>
    )
}