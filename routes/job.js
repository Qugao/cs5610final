const express = require('express');
const auth_middleware = require('./auth_middleware');
const JobAccessor = require('./models/Job.Model');
const router = express.Router();


router.get('/about', function (req, res) {
    res.send('job is the best');
});

router.get('/', function (req, res) {
    res.send('job is the best');
});
//find all
router.get('/findAll', function (request, response) {
    return JobAccessor.getAllJob()
        .then(jobResponse => response.status(200).send(jobResponse))
        .catch(error => response.status(400).send(error))
})

//find pokemon by user:
router.get('/myJobs', auth_middleware,function (request, response) {
    return JobAccessor.findJobByOwner(request.username)
        .then(jobResponse => response.status(200).send(jobResponse))
        .catch(error => response.status(400).send(error))
})

//find by id
router.get('/findById/:id', function (request, response) {
    const id=request.params.id;
    console.log(id);

    return JobAccessor.findJobById(id)
        .then(jobResponse => response.status(200).send(jobResponse))
        .catch(error => response.status(400).send(error))
})

//find by partrial 
router.get('/find/:job', function (request, response) {
    const job=request.params.job;
    return JobAccessor.findJobByPartrial(job)
        .then(jobResponse => response.status(200).send(jobResponse))
        .catch(error => response.status(400).send(error))
})

//find job by jobID
router.get('/findbyJobID/:jobId', function (request, response) {
    const jobId=request.params.jobId;
    return JobAccessor.findbyJobID(jobId)
        .then(jobResponse => response.status(200).send(jobResponse))
        .catch(error => response.status(400).send(error))
})

//create the jobs
router.post('/create',auth_middleware, (request, response) => {
    //const { jobId,jobTitle, company,location,description,employerEmail,link } = request.body;
    const job=request.body;
    if (!job.jobId||!job.jobTitle || !job.company ||
         !job.location || !job.description ||!job.employerEmail) {
        return response.status(422).send("Missing data");
    }
    job.owner=request.username;

    
    return JobAccessor.insertJob(request.body)
    .then(jobResponse => response.status(200).send(jobResponse))
    .catch(error => response.status(400).send(error))
})

//update by jobId
router.post('/edit',auth_middleware, (request, response) => {
    //const { jobId,jobTitle, company,location,description,employerEmail,link } = request.body;
    const job=request.body;
    if (!job.jobId||!job.jobTitle || !job.company ||
         !job.location || !job.description ||!job.employerEmail || !job.link) {
        return response.status(422).send("Missing data");
    }
    
    return JobAccessor.updateByJobId(job.jobId,job.jobTitle,job.company,job.location,
        job.description,job.employerEmail,job.link)
    .then(jobResponse => response.status(200).send(jobResponse))
    .catch(error => response.status(400).send(error))
})

//update by jobId
router.post('/edit/:jobId',auth_middleware, (request, response) => {
    //const { jobId,jobTitle, company,location,description,employerEmail,link } = request.body;
    const jobId=request.params.jobId;
    const job=request.body;
    if (!job.jobTitle || !job.company ||
         !job.location || !job.description ||!job.employerEmail || !job.link) {
        return response.status(422).send("Missing data");
    }
    
    return JobAccessor.updateByJobId(jobId,job.jobTitle,job.company,job.location,
        job.description,job.employerEmail,job.link)
    .then(jobResponse => response.status(200).send(jobResponse))
    .catch(error => response.status(400).send(error))
})


//delete by id
router.delete('/delete/:id',function (request, response){
    const id=request.params.id;
    return JobAccessor.deleteByJobId(id)
        .then(jobResponse => response.status(200).send(jobResponse))
        .catch(error => response.status(400).send(error))
})

module.exports = router; 