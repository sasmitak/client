import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export function DeleteTask() {
    const params = useParams();
    const navigate = useNavigate();
    const baseurl = "https://mern-auth-app-2cxs.onrender.com";
    const [task, setTask] = useState({});

    useEffect(() => {
        axios.get(`${baseurl}/tasks/${params.id}`)
            .then(response => {
                setTask(response.data[0]);
            })
            .catch(error => {
                console.error("Error fetching task:", error);
            });
    }, [params.id]);

    const handleDelete = () => {
        axios.delete(`${baseurl}/deletetask/${params.id}`)
            .then(response => {
                console.log("Task deleted successfully");
                navigate("/tasks");
            })
            .catch(error => {
                console.error("Error deleting task:", error);
            });
    };

    return (
        <div>
            <h3>Delete Task? Are you sure</h3>
            <button className="btn btn-danger" onClick={handleDelete}>
                Yes
            </button>{" "}
            <button className="btn btn-warning" onClick={() => navigate("/tasks")}>
                No
            </button>
            <div className="card w-50">
                <div className="card-header">
                    <h3>{task.title}</h3>
                </div>
                <div className="card-body">
                    <h4>{task.description}</h4>
                </div>
            </div>
        </div>
    );
}
