import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Task } from "./task-component";
import { Home } from "./home-component";
import { Login } from "./login-component";
import { Register } from "./register-component";
import { Error } from "./error-component";
import { AddTask } from "./add-task";
import { DeleteTask } from "./delete-task";
import { EditTask } from "./edit-task";
import { TaskDetails } from "./details-task";
import './styling.css';

export function TaskIndex()
{
    return(
        <div className="container-fluid">
            <BrowserRouter>
            <header className="bg-dark text-white text-center p-1">
                <h1>Task Management System</h1>
            </header>
            <section className="mt-2 row">
                <nav className="col-3">
                    <div>
                        <Link className="text-dark" to="home">Home</Link>
                    </div>
                    <div>
                        <Link className="text-dark" to="register">Register</Link>
                    </div>
                    <div>
                        <Link className="text-dark" to="login">Login</Link>
                    </div>
                    <div>
                        <Link className="text-dark" to="tasks">Task</Link>
                    </div>
                </nav>
                <main className="col-9">
                    <Routes>
                        <Route path="/" element={<Home/>} />
                        <Route path="home" element={<Home />} />
                        <Route path="login" element={<Login />} />
                        <Route path="register" element={<Register />} />
                        <Route path="tasks" element={<Task />} />
                        <Route path="invalid" element={<Error />} />
                        <Route path="addtask" element={<AddTask />} />
                        <Route path="details/:id" element ={<TaskDetails />} />
                        <Route path="delete/:id" element={<DeleteTask />} />
                        <Route path="edit/:id" element={<EditTask />} />
                    </Routes>
                </main>
            </section>
           </BrowserRouter>
        </div>
    )
}