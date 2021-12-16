const mongoose=require("mongoose")
const JobSchema=require('../schema/Job.Schema').JobSchema


const JobModel=mongoose.model("Job",JobSchema);

function insertJob(job){
    return JobModel.create(job);
}

function getAllJob(){
    return JobModel.find().exec();
}

function findJobById(id){
    return JobModel.findById(id).exec();
    
}

function findJobByPartrial(jobTitle){
    let regex = new RegExp(jobTitle,'i');
    //return JobModel.find({"jobTitle":{$regax:jobTitle}});
    return JobModel.find(
        // { "jobTitle": { "$regex": jobTitle, "$options": "i" } },
        { jobTitle: { "$regex": jobTitle, "$options": "i" } },
    );
}

//delete function
function deleteById(id){
    return JobModel.deleteById(id).exec();
}

function findbyJobID(jobId){
    return JobModel.findOne({jobId:jobId}).exec();
}

function deleteByJobId(jobId){
    return JobModel.deleteOne({jobId:jobId});
}

function findJobByOwner(owner){
    return JobModel.find({
        owner:owner
    }).exec();
}

function updateByJobId(jobId,jobTitle,company,location, description,employerEmail,link){
    return JobModel.updateOne({
        jobId:jobId
    }, {
        $set:{
            jobTitle:jobTitle,
            company: company,
            location: location,
            description: description,
            employerEmail : employerEmail,
            link:link
        }
    })
}


module.exports={
    insertJob,
    getAllJob,
    findJobById,
    findJobByPartrial,
    deleteById,
    findbyJobID,
    deleteByJobId,
    updateByJobId,
    findJobByOwner

};
