import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { trpc } from "../utils/trpc";


function Navbar(props: any) {
    const [task, setTask] = useState("")
    const [completedby, setCompleteby] = useState("")

    const postTodo = trpc.postTask.useMutation()


    let navigate = useNavigate()

    //creates a task
    function createTodo() {
        if (task.length > 0 && completedby.length === 10) {
            postTodo.mutate({
                task: task,
                completed_by: completedby,
                completed: false
            })
            setTask("")
            setCompleteby("")
            setTimeout(() => {
                window.location.reload()
            }, 1000)

        } else {
            alert('texbox not filled in')
        }
    }

    return (
        <>
            <button
                style={{ margin: "20px" }}
                onClick={() => { navigate(`/todo/complete`) }}
                type="button"
                className="btn btn-dark">
                Completed Tasks
            </button>
            <div style={{ textAlign: "center" }}>
                <h1>Todo List</h1>
            </div>
            <form >
                <div className="row">
                    <div className="col">
                        <input
                            value={task}
                            onChange={(e) => setTask(e.target.value)}
                            type="text"
                            className="form-control"
                            placeholder="Task"
                            required />
                    </div>
                    <div className="col">
                        <input
                            value={completedby}
                            onChange={(e) => setCompleteby(e.target.value)}
                            type="date"
                            className="form-control"
                            placeholder="complete by"
                            required />
                    </div>
                    <div className="col">
                        <button onClick={createTodo} type="button" className="btn btn-primary btn-sm form-control">
                            submit
                        </button>
                    </div>
                </div>
            </form>
            <hr />
        </>


    )
}

export default Navbar