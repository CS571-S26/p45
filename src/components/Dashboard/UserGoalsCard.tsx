import { Card, CardHeader, CardBody, Button } from "react-bootstrap";
import { useUserGoals } from "../../contexts/UserGoalsContext";
import "./Dashboard.css";

const UserGoalsCard = () => {
    const { userGoals, deleteGoal } = useUserGoals();

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
                                            style={{ width: `${Math.min(progress, 100)}%` }}
                                        ></div>
                                    </div>
                                    <Button className="btn-remove" onClick={() => deleteGoal(index)}>Remove Goal</Button>
                                </div>
                            );
                        })
                    )}
                </CardBody>
            </Card>
        </>
    );
};

export default UserGoalsCard;