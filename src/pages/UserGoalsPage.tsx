import { useContext } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserGoalsContext } from "../contexts/UserGoalsContext";
import "./Pages.css";

const UserGoalsPage = () => {
    const [workout, setWorkout] = useState("");
    const [currentWeight, setCurrentWeight] = useState("");
    const [goalWeight, setGoalWeight] = useState("");
    const navigate = useNavigate();
    const context = useContext(UserGoalsContext);

    if (!context) {
        throw new Error("UserGoalsPage must be used within UserGoalsProvider");
    }

    const { addGoal } = context;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (workout && currentWeight !== "" && goalWeight !== "" && goalWeight > currentWeight) {
            addGoal({
                label: workout,
                current: parseFloat(currentWeight),
                goal: parseFloat(goalWeight),
            });

            setWorkout("");
            setCurrentWeight("");
            setGoalWeight("");
            navigate("/");
        }
        else if(parseFloat(goalWeight) <= 0 || parseFloat(currentWeight) <= 0) {
            alert("Weights must be positive");
        }
        else if (goalWeight < currentWeight) {
            alert("Goal weight must be greater than current weight");
        } 
        else {
            alert("Enter valid weights and exercise");
        }
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
