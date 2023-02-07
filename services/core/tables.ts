import { ColumnType } from 'kysely';

export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;


export interface Todo {
    todoID: string;
    task: string;
    complete_by: ColumnType<Date, string | undefined, never>
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