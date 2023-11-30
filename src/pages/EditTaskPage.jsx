// pages/EditTaskPage.js
import React from 'react';
import { Link } from 'react-router-dom';
import EditTaskForm from '../components/EditTaskForm';

const EditTaskPage = () => {
    return (
        <div>
            <EditTaskForm />
            <Link to="/"><button style={{color:'#303030'}}>Back to Task List</button></Link>
        </div>
    );
};

export default EditTaskPage;
