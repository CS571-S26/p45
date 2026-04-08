import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

const Login = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("UserContext must be used within UserProvider");
  }

  const { setUsername } = context;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (login && password) {
      setUsername(login);
      navigate("/dashboard");
    } else {
      alert("Enter valid credentials");
    }
  };

  return (
    <div className="center">
      <form className="card" onSubmit={handleSubmit}>
        <h3>Login</h3>

        <input
          type="text"
          placeholder="Username"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;