import axios from "axios";
import { useFormik } from "formik";
//import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
//import { useCookies } from "react-cookie";



export function Login()
{
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            "UserId": "",
            "Password": ""
        },
        onSubmit : customer => {
            axios({
                method: "get",
                url: "http://127.0.0.1:5000/customers"
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
        <div>
            <h3>User Login</h3>
            <form onSubmit={formik.handleSubmit}>
                <dl>
                    <dt>User Id</dt>
                    <dd><input type="text" name="UserId" onChange={formik.handleChange} /></dd>
                    <dt>Password</dt>
                    <dd><input type="password" name="Password" onChange={formik.handleChange} /></dd>
                </dl>
                <button>Login</button>
                <p>
                    <Link to="/register">New User Register</Link>
                </p>
            </form>
        </div>
    )
}