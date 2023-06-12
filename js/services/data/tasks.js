const tasks = [
    { id: 1, title: 'Render data', content: 'Done', date: '2023-06-10', priority: 3 },
    { id: 2, title: 'Work on layout', content: 'Style in CSS', date: '2023-06-23', priority: 0 },
    { id: 3, title: 'Clean up', content: 'Simplfy code via MVC concept', date: '2023-06-17', priority: 2 },
];

const getTaskId = (id) => {
    return tasks.find(x => x.id === id);
}

const addTask = (task) => {
    task.id = tasks.length + 1
    tasks.push(task);
    return task;
}

const getTasks = () => {
    return [...tasks];
}

export { getTaskId, addTask, getTasks }