import React, { useState, useEffect } from 'react';

const Count = () => {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
            <div className="text-center bg-white p-5 rounded shadow">
                <h1 className="mb-4">Welcome to CHARUSAT!!!</h1>
                <h2 className="mb-3">Current Date & Time</h2>
                <p className="mb-1">{currentTime.toLocaleDateString()}</p>
                <p>{currentTime.toLocaleTimeString()}</p>
            </div>
        </div>
    );
};

export default Count;
