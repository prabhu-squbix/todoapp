// pages/TaskListPage.js
import React from 'react';
import { Link } from 'react-router-dom';
import TaskList from '../components/TaskList';
import '../styling/TaskListPage.css';
const TaskListPage = () => {
    return (
        <div>
            <TaskList />
            <Link to="/add-task"><button role="button">Add New Task</button></Link>
        </div>
    );
};

export default TaskListPage;
