import { ColumnType } from 'kysely';

//sets how tables will look and set them to Database to be used by DB in pg
//also sets it in rds in stacks/Database

export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;


export interface Todo {
    todoid: string;
    task: string;
    complete_by: string,
    completed: boolean
  }
  
  export interface Comment {
    todoID: string;
    commentID: string;
    text: string;
  }
  
  export interface Database {
    todo: Todo;
    comment: Comment;
  }