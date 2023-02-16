import React, { useEffect, useState } from "react";
import { trpc } from "../utils/trpc";
import { Link, useNavigate } from "react-router-dom";


function Completed() {
    const { isLoading, data, refetch } = trpc.Todos.useQuery()
    const com = trpc.completedTask.useMutation()
    const navigate = useNavigate()

    useEffect(()=> {
        refetch()
    }, [data])

    //completes a task and moves it to the completed page
    const uncompleteTask = (id: string) => {
        com.mutate({
            todoid: id,
            completed: false
        })
        nav()
    }
    const nav = () => {
        setTimeout(() => {
           navigate(`/todo`)
        }, 1000)
    }

    return (
        <>
            <h1 style={{ textAlign: "center" }}>
                <Link style={{ textDecoration: 'none', color: "black" }}
                    to={`/todo`}>
                    Todo List
                </Link>

            </h1>
            <h5
                style={{ textAlign: "center" }}>
                Completed Tasks
            </h5>
            <hr></hr>
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
                                if (todo.completed) {
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
                                                <button onClick={() => uncompleteTask(todo.todoid)}
                                                    type="button"
                                                    className="btn btn-danger">
                                                    Not Completed
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

export default Completed