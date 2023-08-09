const resultElement = document.getElementById('result');
const numberButtons = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.operator');
const clearButton = document.getElementById('clear');
const backspaceButton = document.getElementById('backspace');

let currentNumber = '0';
let operator = '';
let firstNumber = null;

numberButtons.forEach(button => {
    button.addEventListener('click', () => appendNumber(button.textContent));
});

operatorButtons.forEach(button => {
    button.addEventListener('click', () => setOperator(button.textContent));
});

document.querySelector('.operator').addEventListener('click', calculate);

function appendNumber(number) {
    if (currentNumber === '0') {
        currentNumber = number;
    } else {
        currentNumber += number;
    }
    updateDisplay();
}

function setOperator(op) {
    if (firstNumber === null) {
        firstNumber = currentNumber;
        currentNumber = '0';
        operator = op;
    } else {
        calculate();
        operator = op;
    }
}

function calculate() {
    if (operator && currentNumber !== '') {
        const result = performOperation(parseFloat(firstNumber), parseFloat(currentNumber), operator);
        currentNumber = result.toString();
        firstNumber = null;
        operator = '';
        updateDisplay();
    }
}

function performOperation(num1, num2, op) {
    switch (op) {
        case '+':
            return num1 + num2;
        case '-':
            return num1 - num2;
        case '×':
            return num1 * num2;
        case '÷':
            return num1 / num2;
        default:
            return num2;
    }
}

function updateDisplay() {
    resultElement.textContent = currentNumber;
}

clearButton.addEventListener('click', clear);
backspaceButton.addEventListener('click', backspace);

function clear() {
    currentNumber = '0';
    firstNumber = null;
    operator = '';
    updateDisplay();
}

function backspace() {
    if (currentNumber.length > 1) {
        currentNumber = currentNumber.slice(0, -1);
    } else {
        currentNumber = '0';
    }
    updateDisplay();
}