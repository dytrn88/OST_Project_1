const tasks = [
    { id: 1, title: 'Project 1', content: 'Create to-do app', date: '2023-06-26', priority: '2 - High' },
    { id: 2, title: 'Render data', content: 'Done', date: '2023-06-10', priority: '1 - Mid' },
    { id: 3, title: 'Work on layout', content: 'Style in CSS', date: '2023-06-23', priority: '0 - Low' },
    { id: 4, title: 'Clean up code', content: 'Simplfy code via MVC concept', date: '2023-06-17', priority: '3 - Urgent' },
];

const getTasks = () => {
    return [...tasks];
}

const getTask = (id) => {
    return tasks.find(x => x.id === id);
}

const updateTask = (id, updatedTask) => {
    const index = tasks.findIndex((x) => x.id === id);
    if (index !== -1) {
        const updated = { ...tasks[index], ...updatedTask, id: tasks[index].id };
        tasks[index] = updated;
        return updated;
    }
    return null;
};

const addTask = (task) => {
    task.id = tasks.length + 1
    tasks.push(task);
    return task;
}

export { getTasks, getTask, addTask, updateTask }