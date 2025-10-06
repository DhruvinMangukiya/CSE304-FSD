import React, { useState, useEffect } from 'react';
import './App.css';

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [isListening, setIsListening] = useState(false);
  const recognition = SpeechRecognition ? new SpeechRecognition() : null;

  const handleAddTask = () => {
    if (taskInput.trim() === '') return;

    if (editIndex !== null) {
      const updatedTasks = [...tasks];
      updatedTasks[editIndex] = taskInput;
      setTasks(updatedTasks);
      setEditIndex(null);
    } else {
      setTasks([...tasks, taskInput]);
    }
    setTaskInput('');
  };

  const handleEditTask = (index) => {
    setTaskInput(tasks[index]);
    setEditIndex(index);
  };

  const handleDeleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const handleVoiceInput = () => {
    if (!recognition) {
      alert("Speech Recognition not supported in this browser.");
      return;
    }

    recognition.lang = 'en-US';
    recognition.start();
    setIsListening(true);

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setTaskInput(transcript);
      setIsListening(false);
    };

    recognition.onerror = () => {
      alert("Voice input failed. Please try again.");
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };
  };

  return (
    <div className="container">
      <h1>Get Things Done !</h1>
      <div className="input-section">
        <input
          type="text"
          placeholder="What is the task today?"
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
        />
        <button onClick={handleAddTask}>
          {editIndex !== null ? "Update" : "Add Task"}
        </button>
        <button className="mic" onClick={handleVoiceInput}>
          🎤
        </button>
      </div>
      {tasks.map((task, index) => (
        <div className="task" key={index}>
          {task}
          <div className="buttons">
            <button onClick={() => handleEditTask(index)}>✏️</button>
            <button onClick={() => handleDeleteTask(index)}>🗑️</button>
          </div>
        </div>
      ))}
    </div>  
  );
}

export default App;
