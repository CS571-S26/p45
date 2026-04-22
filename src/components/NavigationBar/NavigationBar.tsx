import { Link } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import { useContext } from "react";
import UserIcon from "../UserIcon/UserIcon";
import "./NavigationBar.css";
import { Button } from "react-bootstrap";

const NavigationBar = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("UserContext must be used within UserProvider");
  }

  const { username, setUsername } = context;

  const initial = username ? username.substring(0, 1).toUpperCase() : "?";

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("username");
      setUsername(null);
    }
  }

  return (
    <>
      <nav className="navbar">
        <h2>TrenZone</h2>
        <div className="navbar-contents">
          <Link to="/">Dashboard</Link>
          <Link to="/goals">Goals</Link>
          <Link to="/profile">Profile</Link>
          <Button className="btn-danger" onClick={handleLogout}>Logout</Button>
          <UserIcon initial={initial}/>
        </div>
      </nav>
    </>
  );
};

export default NavigationBar;
