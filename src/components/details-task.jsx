import axios from "axios";
import { useEffect } from "react";
import { useState } from "react"
import { Link, useParams } from "react-router-dom";


export function TaskDetails(){
    const [tasks, setTasks] = useState([{id:0, title:'', description:'',completed:false}]);
    const params = useParams();
    useEffect(()=>{
        axios({
            method: 'get',
            url: `http://127.0.0.1:5566/videos/${params.id}`
        }).then(response=>{
            setTasks(response.data);
        })
    },[params.id]);

    return(
        <div>
            <h2>Task Details</h2>
            <div className="card w-50">
                <div className="card-header">
                    <h3>{tasks[0].title}</h3>
                </div>
                <div className="card-body">
                    <h5>{tasks[0].url}</h5>
                </div>
                <div className="card-footer">

                </div>
            </div>
            <p>
                <Link to="/tasks">Back to Videos</Link>
            </p>
        </div>
    )
}