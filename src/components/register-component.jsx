import { useFormik } from "formik";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export function Register()
{
    const [userError, setUserError] = useState('');
    const [users, setUsers] = useState([]);
    const [colorClass, setColorClass] = useState('');
    const navigate = useNavigate();
    const baseurl = "https://mern-auth-app-2cxs.onrender.com";

    const formik = useFormik({
        initialValues: {
            "UserId": "",
            "UserName":"",
            "Password":"",
            "Age": 0,
            "Email":"",
            "Mobile":""
        },
        onSubmit : (values) =>{
            axios({
                method: "post",
                url: `${baseurl}/registercustomer`,
                data: values
            })
            alert("Registered Successfully..");
            navigate("/login");
        }
    })

    function VerifyUserId(e){
        axios({
            method: "get",
            url: `${baseurl}/customers`
        })
        .then(response=> {
            setUsers(response.data);
            for(var user of users) {
                if(user.UserId===e.target.value) {
                    setUserError('User Id Taken - Try Another');
                    setColorClass('text-danger');
                    break;
                } else {
                    setUserError('User Id Available');
                    setColorClass('text-success');
                }
            }
        })
    }

    return(
        <div className="container-fluid">
            <h3>Register User</h3>
            <div className="form-content" style={{ height: '600px',width:'300px' }}>
            <form onSubmit={formik.handleSubmit}>
                <dl>
                    <dt>User Id</dt>
                    <dd><input type="text" className="form-control mt-2" onKeyUp={VerifyUserId} name="UserId" onChange={formik.handleChange} /></dd>
                    <dd className={colorClass}>{userError}</dd>
                    <dt>User Name</dt>
                    <dd><input type="text" className="form-control mt-2" name="UserName" onChange={formik.handleChange} /></dd>
                    <dt>Password</dt>
                    <dd><input type="password" className="form-control mt-2" name="Password" onChange={formik.handleChange} /></dd>
                    <dt>Age</dt>
                    <dd><input type="number" className="form-control mt-2" name="Age" onChange={formik.handleChange} /></dd>
                    <dt>Email</dt>
                    <dd><input type="email" className="form-control mt-2" name="Email" onChange={formik.handleChange} /></dd>
                    <dt>Mobile</dt>
                    <dd><input type="text" className="form-control mt-2" name="Mobile" onChange={formik.handleChange} /></dd>
                </dl>
                <button className="btn btn-dark">Register</button>
                <p>
                    <Link className="text-dark" to="/login">Existing User Login</Link>
                </p>
            </form>
            </div>
        </div>
    )
}