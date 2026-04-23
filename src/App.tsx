import './App.css';
import { Routes, Route } from "react-router-dom";
import NavigationBar from "./components/NavigationBar/NavigationBar";
import Login from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import UserGoalsPage from './pages/UserGoalsPage';
import ProfilePage from "./pages/ProfilePage";
import { UserGoalsProvider } from './contexts/UserGoalsContext';
import { ProfileProvider } from "./contexts/ProfileContext";
import { WorkoutsProvider } from "./contexts/WorkoutsContext";
import { UserContext } from './contexts/UserContext';
import { useContext } from "react";
import LogWorkoutPage from './pages/LogWorkoutPage';

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
          <WorkoutsProvider>
            <NavigationBar />
            <Routes>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/goals" element={<UserGoalsPage/>}/>
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/log-workout" element={<LogWorkoutPage />} />
            </Routes>
          </WorkoutsProvider>
        </ProfileProvider>
      </UserGoalsProvider>
    </>
  );
};

export default App;