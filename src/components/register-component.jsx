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
                url: "http://127.0.0.1:5000/registercustomer",
                data: values
            })
            alert("Registered Successfully..");
            navigate("/login");
        }
    })

    function VerifyUserId(e){
        axios({
            method: "get",
            url: "http://127.0.0.1:5000/customers"
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
        <div>
            <h3>Register User</h3>
            <form onSubmit={formik.handleSubmit}>
                <dl>
                    <dt>User Id</dt>
                    <dd><input type="text" onKeyUp={VerifyUserId} name="UserId" onChange={formik.handleChange} /></dd>
                    <dd className={colorClass}>{userError}</dd>
                    <dt>User Name</dt>
                    <dd><input type="text" name="UserName" onChange={formik.handleChange} /></dd>
                    <dt>Password</dt>
                    <dd><input type="password" name="Password" onChange={formik.handleChange} /></dd>
                    <dt>Age</dt>
                    <dd><input type="number" name="Age" onChange={formik.handleChange} /></dd>
                    <dt>Email</dt>
                    <dd><input type="email" name="Email" onChange={formik.handleChange} /></dd>
                    <dt>Mobile</dt>
                    <dd><input type="text" name="Mobile" onChange={formik.handleChange} /></dd>
                </dl>
                <button>Register</button>
                <p>
                    <Link to="/login">Existing User Login</Link>
                </p>
            </form>
        </div>
    )
}