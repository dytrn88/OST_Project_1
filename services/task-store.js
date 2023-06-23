import Datastore from 'nedb-promises'


export class TaskManager {
    constructor(title, content, priority, duedate, state) {
        this.title = title;
        this.content = content;
        this.priority = priority;
        this.duedate = duedate;
        this.addDate = new Date();
        this.state = "OK";
    }
}

export class TaskStore {
    constructor(db) {
        const options = process.env.DB_TYPE === "FILE"
            ? { filename: './data/task.db', autoload: true }
            : {}
        this.db = db || new Datastore(options);
    }

    async add(title, content, priority, duedate) {
        let task = new TaskManager(title, content, priority, duedate);
        debugger;
        console.log(task);
        return this.db
            .insert(task);
    }

    async delete(id) {
        await this.db.update({ _id: id }, { $set: { state: 'DELETED' } })
        return this
            .get(id)
    }

    async get(id) {
        return this.db
            .findOne({ _id: id })
            .exec();
    }

    async update(id, title, content, priority, duedate) {
        await this.db.update({ _id: id }, {
            $set: {
                "title": title,
                "content": content,
                "priority": priority,
                "duedate": duedate
            }
        });
        return this.get(id);
    }

    async all() {
        return this.db
            .find({})
            .sort({ taskDate: -1 })
            .exec();
    }
}

export const taskStore = new TaskStore();

