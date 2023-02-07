export * as Todo from "./todo"
import {ulid} from "ulid"
import { PG } from "./pg" 


export async function create(task: string, complete_by: string, completed:boolean) {
    const [result] = await  PG.DB.insertInto("todo")
    .values({todoID: ulid(), task, complete_by, completed})
    .returningAll()
    .execute()
    return result
}


export function get(todoID: string){
    return PG.DB.selectFrom("todo")
    .selectAll()
    .where("todoID", "=", todoID)
    .executeTakeFirst();
}

export function list() {
    return PG.DB.selectFrom("todo")
    .selectAll()
    .orderBy("todoID")
    .execute()
}



  