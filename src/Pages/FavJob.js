import React, { Component } from "react";
import { MDBCard, MDBCardImage, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardLink, MDBListGroup, MDBListGroupItem } from 'mdb-react-ui-kit';
import JobSearch from "./JobSearch"
import axios from "axios";
import {Button} from "react-bootstrap";

const locationIcon = "https://firebasestorage.googleapis.com/v0/b/keepfresh-b0c62.appspot.com/o/icons%2Flocation%2C%20pin%2C%20map%2C%20address%2C%20gps%403x.png?alt=media&token=9f3b400f-a9e9-428d-9865-fdbdd032b80e"
const clockIcon = "https://firebasestorage.googleapis.com/v0/b/keepfresh-b0c62.appspot.com/o/icons%2Fclock%2C%20time%2C%20wall%20clock%2C%20alarm%2C%20timer%403x.png?alt=media&token=0294c85b-6cea-413f-8b53-5acaab3c4415"
const comIcon = "https://firebasestorage.googleapis.com/v0/b/keepfresh-b0c62.appspot.com/o/icons%2Fbuilding%2C%20apartment%2C%20tower%2C%20office%2C%20city%403x.png?alt=media&token=d111438f-65c8-45e3-afe3-46af17f65717"
const mailIcon = "https://firebasestorage.googleapis.com/v0/b/keepfresh-b0c62.appspot.com/o/icons%2Fe-mail%2C%20letter%2C%20envelope%2C%20post%2C%20mail%403x.png?alt=media&token=8142abee-07f8-4b83-9394-fd04a527d1b0"


export default class JobMain extends Component {
    constructor(props) {
        super(props);

        this.state = {
            items: [],
            DataIsLoaded: false,
            userName: ''
        };


    }

    componentDidMount() {
        axios.get('/api/users/whoIsLoggedIn')
            .then(response => {
                if(response.data!==''){
                    this.setState({
                        userName:response.data
                    })

                    const link = '/api/users/getAllFavorites/' + this.state.userName

                    axios.get(link)
                        .then(json => {
                            const ids = json.data;
                            const jobs = []

                            for (let i = 0; i < ids.length; i++) {
                                const idLink = 'api/job/findbyJobID/' + ids[i]
                                axios.get(idLink)
                                    .then((job) => {
                                        if (job.data !== '') {
                                            jobs.push(job.data)
                                            this.setState({
                                                items: jobs,
                                                DataIsLoaded: true,
                                            })
                                        }
                                    })
                                    .catch(console.error)
                            }

                        });
                }
            });
    }

    render() {
        const { DataIsLoaded, items, userName } = this.state;

        if (DataIsLoaded) {
            console.log(items[0]);
            console.log("user name: " + userName);
        } else {
            console.log("NO RESULT")
        }

        return (
            <div>
                {items.map(function(d){
                    return (
                        <div className={"job-card"}>
                        <MDBCard className={"job-detail"} style={{ width: '40rem' }}>
                            <MDBCardBody>
                                <a href={"/job/" + d.jobId}>
                                    <MDBCardTitle style={{ color: '#0d6efd' }}>{
                                        wordProcess(d.jobTitle)
                                    }</MDBCardTitle>
                                    <MDBCardText>
                                        {d.description}
                                    </MDBCardText>
                                </a>
                            </MDBCardBody>
                        <MDBListGroup flush>
                            <MDBListGroupItem>
                                <div className={"icons"}>
                                    <img src={clockIcon} width={20} height={20}/>{"  " + d.postDate.substring(0,10)}
                                </div>
                            </MDBListGroupItem>
                            <MDBListGroupItem>
                                <div className={"icons"}>
                                    <img src={comIcon} width={20} height={20}/>{"  " + d.company}
                                </div>
                            </MDBListGroupItem>
                            <MDBListGroupItem>
                                <div className={"icons"}>
                                    <img src={locationIcon} width={20} height={20}/>{"  " + d.location}
                                </div>
                            </MDBListGroupItem>
                            <MDBListGroupItem>
                                <div className={"icons"}>
                                    <img src={mailIcon} width={20} height={15}/>{"  " + d.employerEmail}
                                </div>
                            </MDBListGroupItem>
                        </MDBListGroup>
                    </MDBCard>
                            </div>)
                })}
            </div>
        );
    }
}

function wordProcess(word) {
    const words = word.split(" ");

    for (let i = 0; i < words.length; i++) {
        words[i] = words[i][0].toUpperCase() + words[i].substr(1);
    }

    return words.join(" ");
}