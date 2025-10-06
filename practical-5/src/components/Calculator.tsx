import React, { useState } from 'react';
import Button from './Button';
import './Calculator.css';

const Calculator: React.FC = () => {
    const [input, setInput] = useState<string>('');
    const [result, setResult] = useState<number | null>(null);

    const handleButtonClick = (value: string) => {
        setInput(prev => prev + value);
    };

    const calculateResult = () => {
        try {
            // Evaluate the expression
            // Note: Using eval is not recommended for production code
            // This is just for simplicity in this example
            const evalResult = eval(input);
            setResult(evalResult);
            setInput('');
        } catch (error) {
            setResult(null);
            alert('Invalid calculation');
        }
    };

    const clearInput = () => {
        setInput('');
        setResult(null);
    };

    return (
        <div className="calculator">
            <div className="display">
                <div>{input || '0'}</div>
                <div>{result !== null ? `= ${result}` : ''}</div>
            </div>
            <div className="buttons">
                <Button label="1" onClick={() => handleButtonClick('1')} />
                <Button label="2" onClick={() => handleButtonClick('2')} />
                <Button label="3" onClick={() => handleButtonClick('3')} />
                <Button label="+" onClick={() => handleButtonClick('+')} />
                <Button label="4" onClick={() => handleButtonClick('4')} />
                <Button label="5" onClick={() => handleButtonClick('5')} />
                <Button label="6" onClick={() => handleButtonClick('6')} />
                <Button label="-" onClick={() => handleButtonClick('-')} />
                <Button label="7" onClick={() => handleButtonClick('7')} />
                <Button label="8" onClick={() => handleButtonClick('8')} />
                <Button label="9" onClick={() => handleButtonClick('9')} />
                <Button label="*" onClick={() => handleButtonClick('*')} />
                <Button label="0" onClick={() => handleButtonClick('0')} />
                <Button label="C" onClick={clearInput} />
                <Button label="=" onClick={calculateResult} />
                <Button label="/" onClick={() => handleButtonClick('/')} />
            </div>
        </div>
    );
};

export default Calculator;