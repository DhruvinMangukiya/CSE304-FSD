const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'public')));

// Serve calculator.html as homepage
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'calculator.html'));
});
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/calculate', (req, res) => {
  const { num1, num2, operation } = req.body;
  let n1 = parseFloat(num1);
  let n2 = parseFloat(num2);
  let result, error;

  if (isNaN(n1) || isNaN(n2)) {
    error = "Please enter valid numbers!";
  } else {
    switch (operation) {
      case 'add':
        result = n1 + n2;
        break;
      case 'subtract':
        result = n1 - n2;
        break;
      case 'multiply':
        result = n1 * n2;
        break;
      case 'divide':
        if (n2 === 0) {
          error = "Cannot divide by zero!";
        } else {
          result = n1 / n2;
        }
        break;
      default:
        error = "Invalid operation!";
    }
  }

  res.send(`
    <h1>Simple Calculator for Kids</h1>
    <form action="/calculate" method="POST">
      <input type="text" name="num1" value="${num1}" placeholder="First number" required />
      <select name="operation">
        <option value="add" ${operation === 'add' ? 'selected' : ''}>+</option>
        <option value="subtract" ${operation === 'subtract' ? 'selected' : ''}>-</option>
        <option value="multiply" ${operation === 'multiply' ? 'selected' : ''}>*</option>
        <option value="divide" ${operation === 'divide' ? 'selected' : ''}>/</option>
      </select>
      <input type="text" name="num2" value="${num2}" placeholder="Second number" required />
      <button type="submit">Calculate</button>
    </form>
    <div id="result">
      ${error ? `<h2 style=\"color:red;\">${error}</h2>` : `<h2>Result: ${result}</h2>`}
    </div>
  `);
});

app.listen(PORT, () => {
  console.log(`Calculator app listening at http://localhost:${PORT}`);
});
