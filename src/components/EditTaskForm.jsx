// components/EditTaskForm.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getTaskById, updateTask } from '../utils/taskUtils';
import '../styling/EditTaskPage.css';

const EditTaskForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [task, setTask] = useState({});

    useEffect(() => {
        // Fetch task by ID on component mount
        setTask(getTaskById(id));
    }, [id]);

    const handleUpdateTask = () => {
        // Update task and navigate back to the task list
        updateTask(id, task);
        navigate('/');
    };

    const handleInputChange = (field, value) => {
        setTask((prevTask) => ({
            ...prevTask,
            [field]: value,
        }));
    };

    return (
        <div>
            <h1>Edit Task</h1>
            <div className='addTaskForm'>
                <form>
                    <label>
                        <div className='InpLabel'>Task Name</div>
                        <input
                            className='InpTextField'
                            type="text"
                            value={task.name || ''}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                        />
                    </label>
                    <label>
                        <div className='InpLabel'>Task Description</div>
                        <textarea
                            className='InpTextField InpArea'
                            value={task.description || ''}
                            onChange={(e) => handleInputChange('description', e.target.value)}
                        />
                    </label>
                    <label>
                        <div className='InpLabel'>Priority </div>
                        <select
                            className='InpTextField'
                            value={task.priority || 'low'}
                            onChange={(e) => handleInputChange('priority', e.target.value)}
                        >
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                    </label>
                    <button className='AddTaskBtn' type="button" onClick={handleUpdateTask}>
                        Update Task
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditTaskForm;
