import { Card, CardHeader, CardBody } from "react-bootstrap";
// import { useContext } from "react";
// import { UserGoalsContext } from "../../contexts/UserGoalsContext";

const UserGoalsCard = () => {
    // const context = useContext(UserGoalsContext);
    
    //   if (!context) {
    //     throw new Error("UserContext must be used within UserProvider");
    //   }
    
    //   const { userGoals } = context;

    const userGoals = [
        { label: "Bench Press", goal: 225, current: 205 },
        { label: "Squat", goal: 315, current: 280 },
        { label: "Deadlift", goal: 405, current: 385 },
    ];

    return (
        <>
            <Card className="user-goals-card">
                <CardHeader className="goals-card-header">
                    <p className="goals-title">Your Progress</p>
                </CardHeader>
                <CardBody className="goals-card-body">
                    {userGoals.map((goal, index) => {
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
                    })}
                </CardBody>
            </Card>
        </>
    );
}

export default UserGoalsCard;