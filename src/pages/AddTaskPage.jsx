// pages/AddTaskPage.js
import React from 'react';
import { Link } from 'react-router-dom';
import AddTaskForm from '../components/AddTaskForm';
import '../styling/AddTaskPage.css';
import goBack from '../assets/icons/goBackBtn.png';
const AddTaskPage = () => {
    return (
        <div>
            <AddTaskForm />
            <Link to="/"><button style={{color:'#303030'}}>Back to Task List</button></Link>
        </div>
    );
};

export default AddTaskPage;
