import Datastore from 'nedb-promises'

export class TaskManager {
    constructor(title, content, priority, duedate, state) {
        this.title = title;
        this.content = content;
        this.priority = priority;
        this.duedate = new Date(duedate);
        this.addDate = new Date();
        this.state = "OK";
    }
}

export class TaskStore {
    constructor(db) {
        const options = process.env.DB_TYPE === "FILE" ? { filename: './data/task.db', autoload: true } : {}
        this.db = db || new Datastore(options);
    }

    async add(title, content, priority, duedate, state) {
        console.log(this.duedate)
        console.log(duedate)

        let task = new TaskManager(title, content, priority, duedate, state);
        return this.db.insert(task);
    }

    async delete(id) {
        await this.db.update({ _id: id }, { $set: { state: "DELETED" } });
        return this.get(id);
    }

    async get(id) {
        return this.db.findOne({ _id: id }).exec();
    };

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

    async all(query, sortBy, sortOrder) {
        let dbQuery = {
            $and: [{ state: { $ne: "DELETED" } }],
        };

        if (query === "sortByDate") {
            return this.db.find(dbQuery).sort({ duedate: sortBy }).exec();
        }
        else if (query === "sortByTask") {
            return this.db.find(dbQuery).sort({ title: sortBy }).exec();
        }
        else {
            return this.db.find(dbQuery).sort({ duedate: sortBy }).exec();
        }
    }
}

export const taskStore = new TaskStore();

