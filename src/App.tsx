import './App.css';
import { Routes, Route } from "react-router-dom";
import NavigationBar from "./components/NavigationBar/NavigationBar";
import Login from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import UserGoalsPage from './pages/UserGoalsPage';
import { UserGoalsProvider } from './contexts/UserGoalsContext';

const App = () => {
  return (
    <>
      <UserGoalsProvider>
        <NavigationBar />
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/goals" element={<UserGoalsPage/>}/>
        </Routes>
      </UserGoalsProvider>
    </>
  );
};

export default App;