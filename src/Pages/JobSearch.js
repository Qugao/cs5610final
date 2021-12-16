import React, { useEffect, useState } from 'react';
import axios, { Axios } from 'axios';
import './JobSearch.css'
import { Link } from 'react-router-dom';

function App() {
    const [formInput, setFormInput] = useState('');
    // const [pokemon, setPokemon] = useState({
    //   name: 'No pokemon selected', health: -1,
    // })
    const [jobs,setJobs]=useState([]);  //default with an empty array
    const [errorMsg, setError] = useState(null);

    
  
    function onSearchButtonClick() {
      // const pokemon = axios.get('...')
      // console.log(pokemon);
      
      // if (!formInput) {
      //   setError("You must type something to search.");
      //   return;
      // }
  
  
      axios.get('http://localhost:8000/api/job/find/' + formInput)
        .then(response => setJobs(response.data))
        .catch(error => console.error(error));
  
      // doSomething();
    }

    useEffect(onSearchButtonClick,[]);

    const jobList=jobs.map(job => {

        return (
            <>
            <div className="result-card">
            <a class="list-group-item list-group-item-action flex-column align-items-start" href={"/job/" + job.jobId}>
                <div className="d-flex w-100 justify-content-between">
                <h5 class="mb-1" style={{ color: '#0d6efd' }}>{job.jobTitle}</h5>
                <small class="text-muted">{job.location}</small>
                </div>
                <p class="mb-1">{job.company}</p>
            </a>
            </div>
                </>)
    })
  
    return (
      <div>
        {errorMsg}

          {/*<div className="form-group">*/}
          {/*    <label>User name</label>*/}
          {/*    <input type="text" className="form-control" placeholder="Last name" />*/}
          {/*</div>*/}

          <div className={"search-group"}>
        <input type='text' className="form-control input-sm" placeholder="Search Job..."  value={formInput}
        onChange={(e) => {
          setError(null);
          setFormInput(e.target.value)
        
        }} />

        <button type="primary" className="btn btn-primary btn-block" onClick={onSearchButtonClick}>
          Search
        </button>
          </div>

        <div className={"result-group"}>
            {jobList}
        </div>


  
      </div>
   
    );
  }
  
  export default App;

