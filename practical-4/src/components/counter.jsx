import React, { useState } from "react";

export default function CounterApp() {
    const [count, setCount] = useState(0);
    const [firstName, setFirstName] = useState("");
    const [surname, setSurname] = useState("");

    const increment = () => setCount(count + 1);
    const decrement = () => setCount(count - 1);
    const reset = () => setCount(0);
    const incrementFive = () => setCount(count + 5);

    return (
        <div style={{ padding: "20px", fontFamily: "Arial" }} className="align-items-center vh-100 bg-light">
            <h2>Welcome To CHARUSAT!!!</h2>

            <div style={{ marginBottom: "20px" }}>
                <h3>Counter: {count}</h3>
                <button onClick={increment}>Increment</button>{" "}
                <button onClick={decrement}>Decrement</button>{" "}
                <button onClick={incrementFive}>Increment Five</button>{" "}
                <button onClick={reset}>Reset</button>
            </div>

            <div>
                <h3>Enter Your Name</h3>
                <input
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />{" "}
                <input
                    type="text"
                    placeholder="Surname"
                    value={surname}
                    onChange={(e) => setSurname(e.target.value)}
                />
            </div>

            <div style={{ marginTop: "20px" }}>
                <h3>First Name:{firstName}</h3>
                {/* <p>{firstName}</p> */}
                <h3>Last Name:{surname}</h3>
                {/* <p>{surname}</p> */}
            </div>
        </div>
    );
}
