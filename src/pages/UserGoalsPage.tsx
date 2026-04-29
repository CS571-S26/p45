import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserGoals } from "../contexts/UserGoalsContext";
import "./Pages.css";

const UserGoalsPage = () => {
    const [workout, setWorkout] = useState("");
    const [currentWeight, setCurrentWeight] = useState("");
    const [goalWeight, setGoalWeight] = useState("");
    const navigate = useNavigate();
    const { addGoal } = useUserGoals();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const current = parseFloat(currentWeight);
        const goal = parseFloat(goalWeight);

        if (!workout) {
            alert("Enter a valid exercise name");
            return;
        }
        if (isNaN(current) || current <= 0 || isNaN(goal) || goal <= 0) {
            alert("Weights must be positive");
            return;
        }
        if (goal <= current) {
            alert("Goal weight must be greater than current weight");
            return;
        }

        addGoal({ label: workout, current, goal });
        setWorkout("");
        setCurrentWeight("");
        setGoalWeight("");
        navigate("/");
    };

    return (
        <div className="page-container">
            <form className="add-goal card" onSubmit={handleSubmit}>
                <h2>Input Goals</h2>

                <h3>Exercise</h3>
                <input
                    type="text"
                    placeholder="Ex/ Bench Press"
                    value={workout}
                    onChange={(e) => setWorkout(e.target.value)}
                />

                <h3>Current Weight</h3>
                <input
                    type="number"
                    min="0"
                    placeholder="0"
                    value={currentWeight}
                    onChange={(e) => setCurrentWeight(e.target.value)}
                />

                <h3>Goal Weight</h3>
                <input
                    type="number"
                    min="0"
                    placeholder="0"
                    value={goalWeight}
                    onChange={(e) => setGoalWeight(e.target.value)}
                />

                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default UserGoalsPage;