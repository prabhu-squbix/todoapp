import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTasks, markTaskAsCompleted, deleteTask } from '../utils/taskUtils';
import DeleteBtn from '../assets/icons/bin.png';
import EditBtn from '../assets/icons/edit.png';
import low from '../assets/icons/low.png';
import medium from '../assets/icons/medium.png';
import high from '../assets/icons/high.png';
import sort from '../assets/icons/sort.png';
import dropDown from '../assets/icons/down-arrow.png';
const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [sortedTasks, setSortedTasks] = useState([]);
  const [sortOption, setSortOption] = useState('Tasks Added');
  const [expandedTaskId, setExpandedTaskId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setTasks(getTasks());
  }, []);

  useEffect(() => {
    sortTasks();
  }, [tasks, sortOption]);

  const handleTaskCompletion = (taskId) => {
    markTaskAsCompleted(taskId);
    setTasks(getTasks());
  };

  const handleDeleteTask = (taskId) => {
    deleteTask(taskId);
    setTasks(getTasks());
  };

  const handleEditTask = (taskId) => {
    navigate(`/edit-task/${taskId}`);
  };

  const handleSortChange = (option) => {
    setSortOption(option);
  };

  const sortTasks = () => {
    let sorted = [...tasks];

    switch (sortOption) {
      case 'Tasks Added':
        break;
      case 'Priority':
        sorted.sort((b, a) => priorityOrder[a.priority] - priorityOrder[b.priority]);
        break;
      case 'Due Date':
        sorted.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
        break;
      case 'Completed':
        sorted.sort((b, a) => a.completed === b.completed ? 0 : a.completed ? 1 : -1);
        break;
      default:
        break;
    }

    setSortedTasks(sorted);
  };

  const priorityOrder = { low: 0, medium: 1, high: 2 };

  return (
    <div>
      <h1>Task List</h1>


      {sortedTasks.length === 0 ? (
        <p style={{ opacity: '0.4' }}>Add some tasks to show them in the task list...</p>
      ) : (
        <>
          <div>
            <div className='TopBar'>

              <div>
                <div className='TaskHeading' style={{ fontSize: '17px' }}>Task Name</div>
                <div className='TaskDecription' style={{ fontSize: '14px' }}>Task Description</div>
              </div>
              <div className='DueIndex'>Due Date</div>
              <div className='PriorityIndex'>Priority</div>
              <div className='PriorityIndex'>Actions</div>
              <label className='SortBox'>
                <div><img className='SortIcon' src={sort}></img></div>
                <select className='SortSelect' value={sortOption} onChange={(e) => handleSortChange(e.target.value)}>
                  <option value="Tasks Added">Tasks Added</option>
                  <option value="Priority">Priority</option>
                  <option value="Due Date">Due Date</option>
                  <option value="Completed">Completed</option>
                </select>
              </label>
            </div>
            <ul>
              {sortedTasks.map((task) => (
                <li key={task.id} className='EachTask'>
                  <div className='TaskHeading' style={task.completed ? { opacity: '0.3' } : {}}>
                    <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                      {task.name}
                    </span>
                    <div className='TaskDecription'>
                      {task.description}
                    </div>
                  </div>

                  <div className='DueDate'>{task.dueDate}</div>
                  <div>
                    <img className='speedometer' src={task.priority === "low" ? low : task.priority === "medium" ? medium : high} alt="Priority" />
                    <div className='priorityLevel' style={task.priority === "low" ? { color: '#ACB334' } : task.priority === "medium" ? { color: '#FF8E15' } : { color: '#FF0D0D' }}>{task.priority}</div>
                  </div>
                  <div className='ActionBtns'>
                    <div class="checkbox-wrapper-12 EachActionBtn">
                      <div class="cbx">
                        <input id="cbx-12" type="checkbox" checked={task.completed} onChange={() => handleTaskCompletion(task.id)} />
                        <label for="cbx-12"></label>
                        <svg width="15" height="14" viewbox="0 0 15 14" fill="none">
                          <path d="M2 8.36364L6.23077 12L13 2"></path>
                        </svg>
                      </div>
                      <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
                        <defs>
                          <filter id="goo-12">
                            <fegaussianblur in="SourceGraphic" stddeviation="4" result="blur"></fegaussianblur>
                            <fecolormatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -7" result="goo-12"></fecolormatrix>
                            <feblend in="SourceGraphic" in2="goo-12"></feblend>
                          </filter>
                        </defs>
                      </svg>
                    </div>
                    <div onClick={() => handleEditTask(task.id)}>
                      <img className='EachActionBtn' src={EditBtn} alt="Edit Button" />
                    </div>
                    <div onClick={() => handleDeleteTask(task.id)}><img className='EachActionBtn' src={DeleteBtn} alt="Delete Button" /></div>
                  </div>
                </li>
              ))}
            </ul>

          </div></>
      )}
    </div>
  );
};

export default TaskList;
