import { useContext, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { WorkoutsContext } from "../contexts/WorkoutsContext";
import type { Exercise, WorkoutType } from "../contexts/WorkoutsContext";
import "./Pages.css";
 
const WORKOUT_TYPES: { label: WorkoutType; color: string }[] = [
    { label: "Strength",    color: "#4CAF50" },
    { label: "Cardio",      color: "#FF9800" },
    { label: "Flexibility", color: "#2196F3" },
];
 
const typeColor = (type: WorkoutType) =>
    WORKOUT_TYPES.find((t) => t.label === type)?.color ?? "#888";
 
// Human-readable summary for the exercise list
const exerciseSummary = (ex: Exercise): string => {
    if (ex.type === "Strength")    return `${ex.weight} lbs × ${ex.reps} reps`;
    if (ex.type === "Cardio")      return `${ex.distance} mi · ${ex.duration} min`;
    if (ex.type === "Flexibility") return `${ex.duration} min${ex.notes ? ` · ${ex.notes}` : ""}`;
    return "";
};
 
const LogWorkoutPage = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const context = useContext(WorkoutsContext);
 
    const dateParam = searchParams.get("date");
    const today = new Date().toISOString().split("T")[0];
    const date = dateParam || today;
 
    const [selectedType, setSelectedType] = useState<WorkoutType>("Strength");
    const [name, setName] = useState("");
 
    // Strength fields
    const [weight, setWeight] = useState("");
    const [reps, setReps]     = useState("");
 
    // Cardio fields
    const [distance, setDistance] = useState("");
    const [duration, setDuration] = useState("");
 
    // Flexibility fields
    const [flexDuration, setFlexDuration] = useState("");
    const [notes, setNotes]               = useState("");
 
    if (!context) throw new Error("LogWorkoutPage must be used within WorkoutsProvider");
 
    const { getWorkoutByDate, addExercise, deleteExercise } = context;
    const exercises: Exercise[] = getWorkoutByDate(date);
 
    const formatDate = (dateStr: string) => {
        const [year, month, day] = dateStr.split("-").map(Number);
        return new Date(year, month - 1, day).toLocaleDateString("en-US", {
            weekday: "long", month: "long", day: "numeric", year: "numeric",
        });
    };
 
    const resetFields = () => {
        setName("");
        setWeight(""); setReps("");
        setDistance(""); setDuration("");
        setFlexDuration(""); setNotes("");
    };
 
    const handleTypeChange = (t: WorkoutType) => {
        setSelectedType(t);
        resetFields();
    };
 
    const handleAdd = (e: React.FormEvent) => {
        e.preventDefault();
 
        if (!name.trim()) { alert("Please enter an exercise name."); return; }
 
        if (selectedType === "Strength") {
            const w = parseFloat(weight);
            const r = parseInt(reps);
            if (isNaN(w) || w <= 0) { alert("Enter a valid weight."); return; }
            if (isNaN(r) || r <= 0) { alert("Enter a valid rep count."); return; }
            addExercise(date, { type: "Strength", name: name.trim(), weight: w, reps: r });
        }
 
        if (selectedType === "Cardio") {
            const d = parseFloat(distance);
            const dur = parseFloat(duration);
            if (isNaN(d) || d <= 0)   { alert("Enter a valid distance."); return; }
            if (isNaN(dur) || dur <= 0) { alert("Enter a valid duration."); return; }
            addExercise(date, { type: "Cardio", name: name.trim(), distance: d, duration: dur });
        }
 
        if (selectedType === "Flexibility") {
            const dur = parseFloat(flexDuration);
            if (isNaN(dur) || dur <= 0) { alert("Enter a valid duration."); return; }
            addExercise(date, { type: "Flexibility", name: name.trim(), duration: dur, notes: notes.trim() });
        }
 
        resetFields();
    };
 
    return (
        <div className="page-container">
            <div className="log-workout-content">
 
                <button className="back-btn" onClick={() => navigate("/")}>← Back</button>
 
                <div className="log-workout-header">
                    <h2 className="log-workout-date">{formatDate(date)}</h2>
                    <p className="log-workout-subtitle">
                        {exercises.length === 0
                            ? "No exercises logged yet"
                            : `${exercises.length} exercise${exercises.length !== 1 ? "s" : ""} logged`}
                    </p>
                </div>
 
                <div className="card log-workout-form-card">
                    <h3>Add Exercise</h3>
                    <form className="log-workout-form" onSubmit={handleAdd}>
 
                        {/* Type selector */}
                        <div className="log-workout-field">
                            <label>Type</label>
                            <div className="log-workout-type-row">
                                {WORKOUT_TYPES.map(({ label, color }) => (
                                    <button
                                        key={label}
                                        type="button"
                                        className={[
                                            "log-workout-type-btn",
                                            selectedType === label ? "log-workout-type-btn--active" : "",
                                        ].filter(Boolean).join(" ")}
                                        style={{ "--type-color": color } as React.CSSProperties}
                                        onClick={() => handleTypeChange(label)}
                                    >
                                        <span className="log-workout-type-dot" style={{ backgroundColor: color }} />
                                        {label}
                                    </button>
                                ))}
                            </div>
                        </div>
 
                        {/* Exercise name — always shown */}
                        <div className="log-workout-field">
                            <label>Exercise</label>
                            <input
                                type="text"
                                placeholder={
                                    selectedType === "Strength"    ? "e.g. Bench Press" :
                                    selectedType === "Cardio"      ? "e.g. Running" :
                                                                     "e.g. Hamstring Stretch"
                                }
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
 
                        {/* Strength: weight + reps */}
                        {selectedType === "Strength" && (
                            <div className="log-workout-form-row">
                                <div className="log-workout-field">
                                    <label>Weight (lbs)</label>
                                    <input type="number" min="0" step="0.5" placeholder="135"
                                        value={weight} onChange={(e) => setWeight(e.target.value)} />
                                </div>
                                <div className="log-workout-field">
                                    <label>Reps</label>
                                    <input type="number" min="1" placeholder="8"
                                        value={reps} onChange={(e) => setReps(e.target.value)} />
                                </div>
                            </div>
                        )}
 
                        {/* Cardio: distance + duration */}
                        {selectedType === "Cardio" && (
                            <div className="log-workout-form-row">
                                <div className="log-workout-field">
                                    <label>Distance (mi)</label>
                                    <input type="number" min="0" step="0.01" placeholder="3.1"
                                        value={distance} onChange={(e) => setDistance(e.target.value)} />
                                </div>
                                <div className="log-workout-field">
                                    <label>Duration (min)</label>
                                    <input type="number" min="1" placeholder="30"
                                        value={duration} onChange={(e) => setDuration(e.target.value)} />
                                </div>
                            </div>
                        )}
 
                        {/* Flexibility: duration + notes */}
                        {selectedType === "Flexibility" && (
                            <>
                                <div className="log-workout-field">
                                    <label>Duration (min)</label>
                                    <input type="number" min="1" placeholder="15"
                                        value={flexDuration} onChange={(e) => setFlexDuration(e.target.value)} />
                                </div>
                                <div className="log-workout-field">
                                    <label>Notes (optional)</label>
                                    <input type="text" placeholder="e.g. Held 30s each side"
                                        value={notes} onChange={(e) => setNotes(e.target.value)} />
                                </div>
                            </>
                        )}
 
                        <button type="submit" className="log-workout-add-btn">+ Add Exercise</button>
                    </form>
                </div>
 
                {exercises.length > 0 ? (
                    <div className="log-workout-list">
                        {exercises.map((ex, index) => (
                            <div key={index} className="card log-workout-exercise-card">
                                <div className="log-workout-exercise-info">
                                    <span
                                        className="log-workout-exercise-type-dot"
                                        style={{ backgroundColor: typeColor(ex.type) }}
                                        title={ex.type}
                                    />
                                    <div>
                                        <p className="log-workout-exercise-name">{ex.name}</p>
                                        <p className="log-workout-exercise-detail">
                                            {ex.type} · {exerciseSummary(ex)}
                                        </p>
                                    </div>
                                </div>
                                <button className="log-workout-delete-btn" onClick={() => deleteExercise(date, index)}>✕</button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="log-workout-empty">
                        💪 Add your first exercise above to get started.
                    </div>
                )}
            </div>
        </div>
    );
};
 
export default LogWorkoutPage;