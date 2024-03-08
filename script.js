document.addEventListener('DOMContentLoaded', function() {
    const display = document.querySelector('.display input');
    const buttons = document.querySelectorAll('.calculator form input[type="button"]');
    let currentInput = '';

    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const value = this.value;
            
            if (value === 'AC') {
                currentInput = '';
            } else if (value === 'DE') {
                currentInput = currentInput.slice(0, -1);
            } else if (value === '=') {
                try {
                    currentInput = evaluateExpression(currentInput);
                } catch (error) {
                    currentInput = 'Error';
                }
            } else {
                currentInput += value;
            }

            display.value = currentInput;
        });
    });

    function evaluateExpression(expression) {
        const tokens = expression.match(/\d+|\+|\-|\*|\//g);
        if (!tokens) throw 'Invalid expression';

        let result = parseFloat(tokens[0]);

        for (let i = 1; i < tokens.length; i += 2) {
            const operator = tokens[i];
            const operand = parseFloat(tokens[i + 1]);

            if (isNaN(operand)) throw 'Invalid expression';

            switch (operator) {
                case '+':
                    result += operand;
                    break;
                case '-':
                    result -= operand;
                    break;
                case '*':
                    result *= operand;
                    break;
                case '/':
                    if (operand === 0) throw 'Division by zero';
                    result /= operand;
                    break;
                default:
                    throw 'Invalid operator';
            }
        }

        return result.toString();
    }
});
