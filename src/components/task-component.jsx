import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export function Task() {
    const [tasks, setTasks] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios({
            method: "get",
            url: "http://127.0.0.1:5000/tasks"
        })
            .then((response) => {
                setTasks(response.data);
            })
    }, []);


    function handleSignout() {
        navigate("/login");
    }


    return (
        <div className="container-fluid">
            <h3> Manage Tasks<span><button onClick={handleSignout} className="btn btn-link">Signout</button></span> </h3>
            <div className="mb-2">
                <Link className="btn btn-info" to="/addtask">Add New Task</Link>
            </div>
            <table className="table table-hover" style={{ height: '600px' , width:'700px' }}>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        tasks.map(task =>
                            <tr key={task.id}>
                                <td>{task.title}</td>
                                <td>
                                    {task.description}
                                </td>
                                <td>
                                    <Link to={`/edit/${task.id}`} className="btn btn-warning ms-2">
                                        <span className="bi bi-pen"></span> Edit
                                    </Link>
                                    <Link to={`/delete/${task.id}`} className="btn btn-danger ms-2">
                                        <span className="bi bi-trash"></span> Delete
                                    </Link>
                                    <Link className="btn btn-success ms-2">
                                        <span className="bi bi-check-lg"></span>
                                    </Link>

                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}