import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import JobSearch from './Pages/JobSearch'
import JobDetail from './Pages/JobDetail';
import JobMain from './Pages/JobMain'
import MyNavBar from "./MyNavBar";
import Login from "./UserLogInSignUp/Login";
import Signup from './UserLogInSignUp/Signup'
import FavJob from './Pages/FavJob'
import JobAdd from './JobAdd';
import JobEdit from './JobEdit';

ReactDOM.render(
  <Router>
      <MyNavBar />
    <Routes>
        <Route path="/"  element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/main" element={<JobMain />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/favJob" element={<FavJob />} />
      <Route path="/jobSearch" element={<JobSearch />} />
      <Route path="/jobSearch/job/:jobId" element={<JobDetail />} />
      <Route path="/job/:jobId" element={<JobDetail />} />
      <Route path="/addJob" element={<JobAdd />} />
      <Route path="/editJob/:jobId" element={<JobEdit />} />

    </Routes>
  </Router>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
