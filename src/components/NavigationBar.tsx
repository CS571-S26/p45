import { Link } from "react-router-dom";

const NavigationBar = () => {
  return (
    <nav className="navbar">
      <h2>TrenZone</h2>
      <div>
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/dashboard">Dashboard</Link>
      </div>
    </nav>
  );
};

export default NavigationBar;