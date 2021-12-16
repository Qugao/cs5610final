import React, {Component, useState} from "react";
import "./Login.css"
import {Navigate, Redirect, useNavigate} from "react-router";
import axios from "axios";

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
            <>
            <div className="auth-wrapper">
                <div className="auth-inner">
                    <form>
                        <h3>Sign In</h3>
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

                        {/* TODO Need fix authenticate call, it keep sending back 404 NOT FOUND error even api received username*/}
                        <button type="button" className="btn btn-primary btn-block"
                                onClick={(e) => {
                                    e.preventDefault();

                                    axios.post('/api/users/authenticate', userData)
                                        .then(response => {
                                            localStorage.setItem('user', response.data)
                                            navigate("/main")
                                        })
                                        .catch(error => console.log("Auth error: " + error.body));
                                }}
                        >Log In</button>
                        <p className="forgot-password text-right">
                            Don't Have User Name? <a href="signup">SignUp</a>
                        </p>
            </form>
                </div>
            </div>
                </>
        );
}