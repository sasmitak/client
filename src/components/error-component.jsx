import { Link } from "react-router-dom";


export function Error()
{
    return(
        <div>
            <h3 className="text-danger">Invalid User ID / Password</h3>
            <Link to="/login">Try again</Link>
        </div>
    )
}