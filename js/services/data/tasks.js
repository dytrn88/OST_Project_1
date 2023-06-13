const tasks = [
    { id: 1, title: 'Render data', content: 'Done', date: '2023-06-10', priority: 3 },
    { id: 2, title: 'Work on layout', content: 'Style in CSS', date: '2023-06-23', priority: 0 },
    { id: 3, title: 'Clean up', content: 'Simplfy code via MVC concept', date: '2023-06-17', priority: 2 },
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