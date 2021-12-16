import React, { useState } from "react";
import "./Login.css"
import axios from "axios";
import {Navigate, useNavigate} from 'react-router';

export default (props) => {

    const navigate = useNavigate();

    const [userData, setUserData] = useState({
        password: '',
        username: '',
    })

    const loggedIn = localStorage.getItem("user") ? true : false;

    if (loggedIn) {
        console.log("NAC")
        return <Navigate to="/main" />
    }

        return (
            <div className="auth-wrapper">
                <div className="auth-inner">
                    <form>
                        <h3>Sign Up</h3>

                        <div className="form-group">
                            <label>User name</label>
                            <input type="text" className="form-control" placeholder="Last name" onChange={(e) => {
                                const username = e.target.value;
                                setUserData({
                                    ...userData,
                                    username: username
                                })
                            }}/>
                        </div>

                        {/*<div className="form-group">*/}
                        {/*    <label>Email address</label>*/}
                        {/*    <input type="email" className="form-control" placeholder="Enter email" onChange={(e) => {*/}
                        {/*        const email = e.target.value;*/}
                        {/*        setUserData({*/}
                        {/*            ...userData,*/}
                        {/*            email: email*/}
                        {/*        })*/}
                        {/*    }}/>*/}
                        {/*</div>*/}

                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" className="form-control" placeholder="Enter password" onChange={(e) => {
                                const password = e.target.value;
                                setUserData({
                                    ...userData,
                                    password: password
                                })
                            }} />
                        </div>

                        <button type="submit" className="btn btn-primary btn-block" onClick={() => {
                            console.log("User Name: " + userData.username)
                            console.log("Password: " + userData.password)

                            axios.post('/api/users', userData)
                                .then(response => {
                                    navigate("/main")
                                    console.log(response)
                                })
                                .catch(error => console.log(error));

                        }}> Sign Up </button>
                        <p className="forgot-password text-right">
                            Already registered <a href="login">sign in?</a>
                        </p>
                    </form>
                </div>
            </div>
        );
}