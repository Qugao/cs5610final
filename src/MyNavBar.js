import React, {useEffect, useReducer, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal, Button} from 'react-bootstrap';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import axios from "axios";
import {useNavigate} from "react-router";
import {get} from "mongoose";
import './MyNavBar.css'

export default function MyNavBar() {

    function getUserName() {
        axios.get('/api/users/whoIsLoggedIn')
            .then(response => {
                if(response.data!==''){
                    setUser({
                        ...user,
                        user: response.data,
                        isLog:true
                    })
                }
            });
    }

    const navigate = useNavigate();
    const loggedIn = localStorage.getItem("user") ? true : false;


    const [user, setUser] = useState({
        user: '',
        isLog: loggedIn
    });

    useEffect(() => {
        getUserName()
    }, []);

    if (loggedIn === false) {
        return (
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="/">Job Finder</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            <Nav.Link href="/login">Log In</Nav.Link>
                            <Nav.Link href="/signup">Sign Up</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        )
    }
    if (loggedIn === true) {
        getUserName()
        return (
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="/">Job Finder</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/main">Home</Nav.Link>
                            <Nav.Link href="/favJob">Favourite</Nav.Link>
                            <Nav.Link href="/addJob">Add Job</Nav.Link>
                        </Nav>

                        <Nav className="ms-auto">
                            <Nav.Link href="/main">{'Hello, ' + user.user}</Nav.Link>
                            <button class = "btn btn-outline-primary"  type="button" onClick={ () => {
                                setUser({user : '', isLog: false})
                                axios.post('/api/users/logout')
                                    .then(() => {
                                        localStorage.clear();
                                        navigate('/login')
                                    })
                                    .catch(console.error)
                            }}>
                                Log Out
                                </button>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        )
    }
}