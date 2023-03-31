const priorities = Object.freeze({
    HIGH: 'High',
    MEDIUM: 'Medium',
    LOW: 'Low',
    PERSONAL: 'Personal',
  } as const);


interface Priority extends Readonly<typeof priorities> {}

export interface TodoI {
    id:number,
    title:string,
    creationDate:Date,
    status:boolean,
    priority:Priority,
    assignee?:string,
    deadLineDate?:Date,
    description?:string,
}