import { Priority, priorities } from "./Priority.entity";

export interface TodoI {
    id:number,
    title:string,
    creationDate:Date,
    completed:boolean,
    priority:Priority,
    assignee?:string,
    deadLineDate?:Date,
    description?:string,
}

export class Todo implements TodoI{
    id;
    title;
    completed;
    creationDate;
    priority;
    assignee?;
    deadLineDate?;
    description?;

    constructor(obj?: Partial<TodoI>){
        this.id = obj?.id && 0;
        this.title = obj?.title ?? '';
        this.completed = obj?.completed ?? false;
        this.creationDate = new Date();
        this.priority = obj?.priority ?? priorities.PERSONAL;
        this.assignee = obj?.assignee;
        this.deadLineDate = obj?.deadLineDate ?? Date.now();;
        this.description = obj?.description;
    }
}