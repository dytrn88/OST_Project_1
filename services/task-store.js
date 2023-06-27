import Datastore from 'nedb-promises'

export class TaskManager {
    constructor(title, content, priority, duedate, state) {
        this.title = title;
        this.content = content;
        this.priority = priority;
        this.duedate = new Date(duedate);
        this.addDate = new Date();
        this.state = "false";
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

    async update(id, title, content, priority, duedate, state) {
        console.log(state)
        await this.db.update({ _id: id }, {
            $set: {
                "title": title,
                "content": content,
                "priority": priority,
                "duedate": duedate,
                "state": state
            }
        });
        return this.get(id);
    }

    async all(query, sortBy, sortOrder, filterCompleted) {
        let dbQuery = {
            $and: [{ state: { $ne: "DELETED" } }],
        };

        if (filterCompleted) {
            dbQuery.$and.push({ $or: [{ state: false }] });
        }

        if (sortBy === "sortByDate") {
            return this.db.find(dbQuery).sort({ duedate: sortOrder }).exec();
        }
        else if (sortBy === "sortByTask") {
            return this.db.find(dbQuery).sort({ title: sortOrder }).exec();
        }
        else if (sortBy === "sortByPriority") {
            return this.db.find(dbQuery).sort({ priority: sortOrder }).exec();
        }
        else {
            return this.db.find(dbQuery).sort({ duedate: sortOrder }).exec();
        }
    }
}

export const taskStore = new TaskStore();

