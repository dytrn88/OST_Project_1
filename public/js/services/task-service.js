import { httpService } from './http-service.js'

class TaskService {
    async getAllTask(sortBy, sortOrder, filterCompleted) {
        let url = `/task/?sortBy=${sortBy}&sortOrder=${sortOrder}`;
        if (filterCompleted) {
            url += `&filterCompleted=true`;
        }
        return httpService.ajax("GET", url);
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
        console.log(task)
        return httpService.ajax("POST", `/task/${_id}`, {
            title: task.title,
            content: task.content,
            priority: task.priority,
            duedate: task.duedate,
            state: task.state,
        });
    }

    async deleteTask(id) {
        return httpService.ajax("DELETE", `/task/${id}`, undefined);
    }
}

export const taskService = new TaskService();


