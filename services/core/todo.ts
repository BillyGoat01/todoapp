export * as Todo from "./todo"
import {ulid} from "ulid"
import { PG } from "./pg" 


// creates a task, ulid sets a unique key
export async function create(task: string, complete_by: string, completed:boolean) {
    const [result] = await  PG.DB.insertInto("todo")
    .values({todoid: ulid(), task, complete_by, completed})
    .returningAll()
    .execute()
    return result
}


export function getatask(todoid: string){
    return PG.DB.selectFrom('todo')
    .selectAll()
    .where("todoid", "=", todoid)
    .executeTakeFirst();
}

 // gets all the tasks in the database
 export function list() {
    return PG.DB.selectFrom("todo")
    .selectAll()
    .orderBy("todoid")
    .execute()
}


export function deletetask(todoid: string){
    return PG.DB.deleteFrom('todo')
    .where("todoid", "=", todoid)
    .executeTakeFirst()
}

// can set a task to true (completed) or false(not completed)
export function complete(todoid: string, completed: boolean){
    return PG.DB.updateTable('todo')
    .set({completed: completed})
    .where("todoid", "=", todoid)
    .executeTakeFirst()
}


  