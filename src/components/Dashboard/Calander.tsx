import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Card, CardHeader, CardBody } from "react-bootstrap";
import { useState } from "react";
import "./Dashboard.css";

const Calendar = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [currentDayOfMonth, setCurrentDayOfMonth] = useState(currentDate.getDay());

    const changeMonth = (offset: number) => {
        const newDate = new Date(currentDate);
        newDate.setMonth(newDate.getMonth() + offset);
        setCurrentDate(newDate);
    }

    const getDaysInMonth = (date: Date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const daysInMonth = new Date(year, month + 1, 0).getDate(); // last day of month
        return Array.from({ length: daysInMonth }, (_, i) => i + 1);
    }

    const days = getDaysInMonth(currentDate);

  return (
    <Card className="calander-card">
        <CardHeader className="card-header">
            <FaChevronLeft className="clickable" onClick={() => changeMonth(-1)}/>
            <p className="month-text no-select">{currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
            <FaChevronRight className="clickable" onClick={() => changeMonth(1)}/>
        </CardHeader>
        <CardBody>
            <div className="days-grid">
                {days.map((day) => (
                    <div
                        key={day}
                        className={`day-cell ${day === currentDayOfMonth ? "selected" : ""}`}
                        onClick={() => setCurrentDayOfMonth(day)}
                    >
                        {day}
                    </div>
                ))}
            </div>
        </CardBody>
    </Card>
  );
}

export default Calendar;