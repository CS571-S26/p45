import { Link } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import { useContext } from "react";
import UserIcon from "../UserIcon/UserIcon";
import "./NavigationBar.css";

const NavigationBar = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("UserContext must be used within UserProvider");
  }

  const { username } = context;

  const initial = username ? username.substring(0, 1).toUpperCase() : "?";

  return (
    <nav className="navbar">
      <h2>TrenZone</h2>
      <div className="navbar-contents">
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/goals">Goals</Link>
        <UserIcon initial={initial}/>
      </div>
    </nav>
  );
};

export default NavigationBar;