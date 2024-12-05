import { useEffect, useState } from "react";
import "./weatherWidget.css";
/**
 * TimeWidget Component
 *
 * Displays the current time.
 *
 * @component
 * @example
 * return (
 *   <TimeWidget />
 * )
 */
function TimeWidget() {
    const [time, setTime] = useState(null);


    useEffect(() => {
        // Update the current time every second
        const interval = setInterval(() => {
            const currentTime = new Date().toLocaleTimeString();
            setTime(currentTime);
        }, 1000);


        // Clean up the interval on component unmount
        return () => clearInterval(interval);
    }, []);


    return (
        <div>
            {time ? (
                <div className="time-widget">
                    <p>Current Time</p>
                    <p>{time}</p>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}


export default TimeWidget;