// import { UserGoalsCard } from "../components/Dashboard/UserGoalsCard";
import { useState } from "react";
import { useNavigate } from "react-router-dom";



const UserGoalsPage = () => {
    const [workout, setWorkout] = useState("");
    const [currentWeight, setCurrentWeight] = useState(0);
    const [goalWeight, setGoalWeight] = useState(0);
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (workout && currentWeight && goalWeight) {
            setWorkout(workout);
            setCurrentWeight(currentWeight);
            setGoalWeight(goalWeight);
            navigate("/dashboard");
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
                    value={currentWeight}
                    onChange={(e) => setCurrentWeight(parseFloat(e.target.value) || 0)}
                />

                <h3>Goal Weight</h3>
                <input
                    type="number"
                    value={goalWeight}
                    onChange={(e) => setGoalWeight(parseFloat(e.target.value) || 0)}
                />
            </form>
        </div>

    );

};

export default UserGoalsPage;