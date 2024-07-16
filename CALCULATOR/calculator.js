let display = document.getElementById('display');
let equation = '';

function clearDisplay() {
    display.value = '';
    equation = '';
}

function displayNumber(num) {
    equation += num;
    display.value = equation;
}

function displayDot() {
    if (!equation.includes('.')) {
        equation += '.';
        display.value = equation;
    }
}

function appendOperator(op) {
    if (equation !== '') {
        equation += op;
        display.value = equation;
    }
}

function calculate() {
    try {
        let result = evaluateExpression(equation);
        display.value = equation + ' = ' + result;
        equation = result.toString();
    } catch (error) {
        display.value = 'Error';
        equation = '';
    }
}

function evaluateExpression(expression) {
    let parts = [];
    let num = '';
    let operator = '';

    for (let char of expression) {
        if ('+-*/'.includes(char)) {
            if (num !== '') {
                parts.push(parseFloat(num));
                num = '';
            }
            operator = char;
        } else {
            num += char;
        }
    }
    parts.push(parseFloat(num));

    let result = parts[0];
    for (let i = 1; i < parts.length; i++) {
        if (operator === '+') {
            result += parts[i];
        } else if (operator === '-') {
            result -= parts[i];
        } else if (operator === '*') {
            result *= parts[i];
        } else if (operator === '/') {
            if (parts[i] === 0) {
                throw new Error('Division by zero');
            }
            result /= parts[i];
        }
    }

    return result;
}

function backspace() {
    if (equation.length > 0) {
        equation = equation.slice(0, -1);
        display.value = equation;
    }
}
