import { Link, Navigate, useNavigate } from "react-router-dom";
import React, { useEffect, useState, } from "react";
import { useForm, SubmitHandler } from "react-hook-form"
import { trpc } from "../utils/trpc";
import Navbar from "./navbar";
import Completed from "./completed";


function Home() {
    // try using useForm from react-hook-form library
    const { isLoading, data, refetch } = trpc.Todos.useQuery()
    const { control, handleSubmit, reset } = useForm()


    const del = trpc.deleteTask.useMutation({
        onSuccess: () => {
            refetch();
        }
        })
    const com = trpc.completedTask.useMutation({
        onSuccess: () => {
            refetch();
        }
        })


    // deletes a task and refetches for some reason the refetch takes forever
    const delTask = async (id: string) => {
        del.mutate({
            todoid: id
        })
        refetch()
    };

    //completes a task and moves it to the completed page
    const completedTask = (id: string) => {
        com.mutate({
            todoid: id,
            completed: true
        })
    }

    if (isLoading) return <div>Loading...</div>;
    return (
        <>
            <Navbar refetch={refetch}/>
            <form>
                <div style={{ textAlign: "center" }}>
                    <table className="table">
                        <thead className="table-dark">
                            <tr>
                                <th scope="col">Task</th>
                                <th scope="col">Complete by</th>
                                <th scope="col">Complete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data?.map((todo: any) => {
                                if (!todo.completed) {
                                    return (
                                        <tr key={todo.todoid}>
                                            <td>
                                                <Link to={`/todo/${todo.todoid}`}
                                                    style={{ textDecoration: 'none' }}>
                                                    {todo.task}
                                                </Link>
                                                {/* {todo.task} */}
                                            </td>
                                            <td>{todo.complete_by}</td>
                                            <td>
                                                <button onClick={() => { completedTask(todo.todoid) }}
                                                    type="button"
                                                    className="btn btn-success">
                                                    Complete
                                                </button>
                                                <button onClick={() => { delTask(todo.todoid) }}
                                                    type="button"
                                                    className="btn btn-danger ">
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                }
                            })
                            }
                        </tbody>
                    </table>
                </div>
            </form>
        </>
    )
}


export default Home