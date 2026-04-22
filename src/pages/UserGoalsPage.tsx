import { useContext } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserGoalsContext } from "../contexts/UserGoalsContext";

const UserGoalsPage = () => {
    const [workout, setWorkout] = useState("");
    const [currentWeight, setCurrentWeight] = useState("0");
    const [goalWeight, setGoalWeight] = useState("0");
    const navigate = useNavigate();
    const context = useContext(UserGoalsContext);

    if (!context) {
        throw new Error("UserGoalsPage must be used within UserGoalsProvider");
    }

    const { addGoal } = context;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (workout && currentWeight !== "" && goalWeight !== "") {
            addGoal({
                label: workout,
                current: parseFloat(currentWeight),
                goal: parseFloat(goalWeight),
            });

            setWorkout("");
            setCurrentWeight("0");
            setGoalWeight("0");
            navigate("/");
        } else {
            alert("Enter valid weights");
        }
    };

    return (
        <div>
            <form className="card" onSubmit={handleSubmit}>
                <h2>Input Goals</h2>
                
                <h3>Exercise</h3>
                <input
                    type="text"
                    value={workout}
                    onChange={(e) => setWorkout(e.target.value)}
                />

                <h3>Current Weight</h3>
                <input
                    type="number"
                    min="0"
                    value={currentWeight}
                    onChange={(e) => setCurrentWeight(e.target.value)}
                />

                <h3>Goal Weight</h3>
                <input
                    type="number"
                    min="0"
                    value={goalWeight}
                    onChange={(e) => setGoalWeight(e.target.value)}
                />

                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default UserGoalsPage;
