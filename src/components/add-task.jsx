import axios from "axios";
import { useFormik } from "formik"
import { useNavigate } from "react-router-dom";

export function AddTask() {
    var navigator = useNavigate();
    const formik = useFormik({
        initialValues: {
            id: 0,
            title: '',
            description: '',
            completed: false
        },
        onSubmit: (values) => {
            axios({
                method: "post",
                url: "http://127.0.0.1:5000/addtask",
                data: values
            })
            alert(`Task Added Successfully..`);
            navigator("/tasks");
        }
    });

    return (
        <div className="container-fluid">
            <div className="form-content" style={{ height: '600px' , width:'400px' }}>
                <h2>Add New Task</h2>
                <form onSubmit={formik.handleSubmit}>
                    <dl>
                        <dt>Task Id</dt>
                        <dd><input type="number" className="form-control mt-2" name="id" onChange={formik.handleChange} /></dd>
                        <dt>Title</dt>
                        <dd><input type="text" className="form-control mt-2" name="title" onChange={formik.handleChange} /></dd>
                        <dt>Description</dt>
                        <dd><input type="text" className="form-control mt-2" name="description" onChange={formik.handleChange} /></dd>
                        <dt>Completed</dt>
                        <dd className="form-switch">
                            <input className="form-check-input " type="checkbox" checked={formik.values.completed} name="completed" onChange={formik.handleChange} />
                        </dd>
                    </dl>
                    <button className="btn btn-primary">Add Task</button>
                </form>
            </div>
        </div>
    )
}