import axios from "axios";
import { useEffect } from "react";
import { useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";

export function EditTask() {
    const [tasks, setTasks] = useState([{ id: 0, title: '', description: '', completed: false }]);
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios({
            method: 'get',
            url: `http://127.0.0.1:5000/tasks/${params.id}`
        }).then(response => {
            setTasks(response.data);
        })
    }, [params.id]);
    const formik = useFormik({
        initialValues: {
            id: tasks[0].id,
            title: tasks[0].title,
            task: tasks[0].description,
            completed: tasks[0].completed
        },
        onSubmit: (values) => {
            axios({
                method: 'put',
                url: `http://127.0.0.1:5000/updatetask/${values.id}`,
                data: values
               })
               alert("Task Updated");
               navigate("/tasks");
            },
            enableReinitialize: true
    });

    return (
        <div>
            <h2>Edit Task Details</h2>
            <form>
                <dl>
                    <dt>Task Id</dt>
                    <dd><input type="number" name="id" value={tasks[0].id} onChange={formik.handleChange} /></dd>
                    <dt>Title</dt>
                    <dd><input type="text" name="title" value={tasks[0].title} onChange={formik.handleChange} /></dd>
                    <dt>Description</dt>
                    <dd><input type="text" name="description" value={tasks[0].url} onChange={formik.handleChange} /></dd>
                    <dt>Completed</dt>
                    <dd className="form-switch">
                        <input className="form-check-input" type="checkbox" checked={tasks[0].completed} name="completed" onChange={formik.handleChange} />
                    </dd>
                </dl>
                <button className="btn btn-success me-2 ">Save</button>
                <Link to="/tasks" className="btn btn-warning">Cancel</Link>
            </form>
        </div>
    )
}