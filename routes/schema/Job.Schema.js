const Schema = require('mongoose').Schema;

exports.JobSchema=new Schema({
    jobId:String,
    jobTitle: String,
    company : String,
    location: String,
    description: String,
    employerEmail:String,
    link:String,
    postDate: {
        type: Date,
        default: Date.now
    },
    owner:String,
// this explicitly declares what collection we're using
}, { collection : 'jobs' });