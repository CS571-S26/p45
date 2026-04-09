import { Card, CardHeader, CardBody } from "react-bootstrap";
import { useContext } from "react";
import { UserGoalsContext } from "../../contexts/UserGoalsContext";
import "./Dashboard.css";

const UserGoalsCard = () => {
    const context = useContext(UserGoalsContext);
    
    if (!context) {
        throw new Error("UserGoalsCard must be used within UserGoalsProvider");
    }
    
    const { userGoals } = context;

    return (
        <>
            <Card className="user-goals-card">
                <CardHeader className="goals-card-header">
                    <p className="goals-title">Your Progress</p>
                </CardHeader>
                <CardBody className="goals-card-body">
                    {userGoals.length === 0 ? (
                        <p className="no-goals-message">No goals yet. Add one to get started!</p>
                    ) : (
                        userGoals.map((goal, index) => {
                            const progress = (goal.current / goal.goal) * 100;
                            return (
                                <div key={index} className="goal-item">
                                    <div className="goal-label-row">
                                        <span className="goal-label">{goal.label}</span>
                                        <span className="goal-numbers">
                                            {goal.current} / {goal.goal}
                                        </span>
                                    </div>
                                    <div className="progress-bar-container">
                                        <div
                                            className="progress-bar-fill"
                                            style={{ width: `${progress}%` }}
                                        ></div>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </CardBody>
            </Card>
        </>
    );
}

export default UserGoalsCard;