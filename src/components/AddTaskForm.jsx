// components/AddTaskForm.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addTask } from '../utils/taskUtils';

const AddTaskForm = () => {
    const [taskName, setTaskName] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [priority, setPriority] = useState('low');
    const [dueDate, setDueDate] = useState('');
    const navigate = useNavigate();

    const handleAddTask = () => {
        if (!taskName) {
            alert('Task name is required!');
            return;
        }

        if (dueDate && new Date(dueDate) < new Date()) {
            alert('Invalid due date!');
            return;
        }

        const newTask = {
            id: Date.now(),
            name: taskName,
            desc: taskDescription,
            priority,
            dueDate,
            completed: false,
        };

        addTask(newTask);
        navigate('/');
    };

    return (
        <div>
            <h1>Add Task</h1>
            <div className='addTaskForm'>
            <form>
                <label>
                <div className='InpLabel'>Task Name</div>
                    <input className='InpTextField' type="text" value={taskName} onChange={(e) => setTaskName(e.target.value)} />
                </label>
                <label>
                <div className='InpLabel'>Due Date</div>
                    <input className='InpTextField' type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
                </label>

                <label>
                <div className='InpLabel'>Task Description</div>
                    <textarea className='InpTextField InpArea'
                        value={taskDescription}
                        onChange={(e) => setTaskDescription(e.target.value)}
                    />
                </label>
                <label>
                    <div className='InpLabel'>Priority</div>
                    <select className='InpTextField' value={priority} onChange={(e) => setPriority(e.target.value)}>
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                </label>
                <button className='AddTaskBtn' type="button" onClick={handleAddTask}>
                    Add Task
                </button>
            </form>
            </div>
        </div>
    );
};

export default AddTaskForm;
