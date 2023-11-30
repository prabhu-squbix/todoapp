// utils/taskUtils.js
const TASKS_KEY = 'tasks';

export const getTasks = () => {
    const tasksString = localStorage.getItem(TASKS_KEY);
    return tasksString ? JSON.parse(tasksString) : [];
};

export const addTask = (task) => {
    const tasks = getTasks();
    tasks.push(task);
    localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
};

export const getTaskById = (taskId) => {
    const tasks = getTasks();
    return tasks.find((task) => task.id.toString() === taskId);
};

export const updateTask = (taskId, updatedTask) => {
    const tasks = getTasks();
    const updatedTasks = tasks.map((task) =>
        task.id.toString() === taskId ? { ...task, ...updatedTask } : task
    );
    localStorage.setItem(TASKS_KEY, JSON.stringify(updatedTasks));
};

export const markTaskAsCompleted = (taskId) => {
    const tasks = getTasks();
    const updatedTasks = tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
};


export const deleteTask = (taskId) => {
    const tasks = getTasks();
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
};

