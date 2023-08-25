import axios from "axios";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";



export function Login()
{
    const navigate = useNavigate();
    const baseurl = "https://mern-auth-app-2cxs.onrender.com";


    const formik = useFormik({
        initialValues: {
            "UserId": "",
            "Password": ""
        },
        onSubmit : customer => {
            axios({
                method: "get",
                url: `${baseurl}/customers`
            })
            .then(response=>{
                 for(var user of response.data){
                    if(user.UserId===customer.UserId && user.Password===customer.Password){
                        alert("login successfully");
                        navigate("/tasks");
                        break;
                    } else {
                        alert("wrong..");
                        navigate("/invalid");
                    }
                 }
            })
        }
    })
    return(
        <div className="container-fluid">
            <div className="form-content" style={{ height: '600px',width:'300px' }}>
            <h3>User Login</h3>
            <form onSubmit={formik.handleSubmit}>
                <dl>
                    <dt>User Id</dt>
                    <dd><input type="text" name="UserId" onChange={formik.handleChange} className="form-control mt-2" /></dd>
                    <dt>Password</dt>
                    <dd><input type="password" name="Password" onChange={formik.handleChange} className="form-control mt-2" /></dd>
                </dl>
                <button className="btn btn-light">Login</button>
                <p>
                    <Link className="text-dark" to="/register">New User Register</Link>
                </p>
            </form>
            </div>
        </div>
    )
}