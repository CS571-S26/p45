import Calendar from "./Calander";
import UserGoalsCard from "./UserGoalsCard";
import "./Dashboard.css";

const Dashboard = () => {
    return (
        <div className="dashboard">
            <Calendar />
            <UserGoalsCard />
        </div>
    );
}

export default Dashboard;