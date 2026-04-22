import './App.css';
import { Routes, Route } from "react-router-dom";
import NavigationBar from "./components/NavigationBar/NavigationBar";
import Login from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import UserGoalsPage from './pages/UserGoalsPage';
import ProfilePage from "./pages/ProfilePage";
import { UserGoalsProvider } from './contexts/UserGoalsContext';
import { ProfileProvider } from "./contexts/ProfileContext";
import { UserContext } from './contexts/UserContext';
import { useContext } from "react";

const App = () => {
  const context = useContext(UserContext);

  if (!context) {
    return null;
  }

  const { username } = context;

  if (!username) {
    return (
      <>
        <h1>Welcome to Tren Zone</h1>
        <Login />
      </>
    )
  }

  return (
    <>
      <UserGoalsProvider>
        <ProfileProvider>
          <NavigationBar />
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/goals" element={<UserGoalsPage/>}/>
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </ProfileProvider>
      </UserGoalsProvider>
    </>
  );
};

export default App;