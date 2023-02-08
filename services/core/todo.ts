export * as Todo from "./todo"
import {ulid} from "ulid"
import { PG } from "./pg" 


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

export function complete(todoid: string, completed: boolean){
    return PG.DB.updateTable('todo')
    .set({completed: completed})
    .where("todoid", "=", todoid)
    .executeTakeFirst()
}


  