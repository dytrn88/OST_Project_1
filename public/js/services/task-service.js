import { httpService } from './http-service.js'

class TaskService {
    async getAllTask(sortBy, sortOrder) {
        return httpService.ajax("GET", `/task/?sortBy=${sortBy}&sortOrder=${sortOrder}`);
    }

    async addTask(task) {
        return httpService.ajax("POST", "/task/", {
            title: task.title,
            content: task.content,
            priority: task.priority,
            duedate: task.duedate,
            state: task.state
        });
    }

    async getTask(id) {
        return httpService.ajax("GET", `/task/${id}`, undefined);
    }

    async updateTask(_id, task) {
        return httpService.ajax("POST", `/task/${_id}`, {
            title: task.title,
            content: task.content,
            priority: task.priority,
            duedate: task.duedate
        });
    }

    async deleteTask(id) {
        return httpService.ajax("DELETE", `/task/${id}`, undefined);
    }
}

export const taskService = new TaskService();


