const display = document.getElementById('display');
const buttons = document.querySelectorAll('button');

let currentInput = '';
let previousInput = '';
let operator = '';

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.value;

        if (value === 'C') {
            currentInput = '';
            previousInput = '';
            operator = '';
            updateDisplay();
        } else if (value === 'CE') {
            currentInput = '';
            updateDisplay();
        } else if (value === '←') {
            currentInput = currentInput.slice(0, -1);
            updateDisplay();
        } else if (value === '=') {
            if (operator && previousInput) {
                calculate();
            }
        } else if (value === '+' || value === '-' || value === '*' || value === '/') {
            if (currentInput) {
                previousInput = currentInput;
                currentInput = '';
                operator = value;
            }
        } else {
            currentInput += value;
            updateDisplay();
        }
    });
});

function updateDisplay() {
    display.value = currentInput || previousInput;
}

function calculate() {
    let result;
    switch (operator) {
        case '+':
            result = parseFloat(previousInput) + parseFloat(currentInput);
            break;
        case '-':
            result = parseFloat(previousInput) - parseFloat(currentInput);
            break;
        case '*':
            result = parseFloat(previousInput) * parseFloat(currentInput);
            break;
        case '/':
            result = parseFloat(previousInput) / parseFloat(currentInput);
            break;
        default:
            break;
    }

    if (isNaN(result)) {
        result = 'Error';
    }

    currentInput = result.toString();
    previousInput = '';
    operator = '';
    updateDisplay();
}