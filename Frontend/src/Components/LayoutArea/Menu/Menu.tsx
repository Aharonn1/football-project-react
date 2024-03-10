import { NavLink } from "react-router-dom";
import "./Menu.css";

function Menu(): JSX.Element {
    return (
        <div className="Menu">			
            <NavLink to="/list">List</NavLink>
            <NavLink to="/table">Table</NavLink>
            <NavLink to="/statistics">Statistics</NavLink>
            <NavLink to="/scoreboard">Scoreboard</NavLink>
        </div>
    );
}

export default Menu;
