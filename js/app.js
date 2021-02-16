const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const currentOperandText = document.querySelector(".current-number");
const previousOperandText = document.querySelector(".previous-number");
const allclear = document.querySelector(".allclear");
const equal = document.querySelector(".equal");
const del = document.querySelector(".delete");



class Calculator {

    constructor(previousOperandText, currentOperandText) {
        this.previousOperandText = previousOperandText;
        this.currentOperandText = currentOperandText;
        this.clear();
    }

    clear() {
        this.currentOperand = '';
        this.previousOperand = '';
    }

    appendNumber(number) {

        if (number === "." && this.currentOperand.includes('.')) {
            return
        }
        this.currentOperand = String(this.currentOperand) + String(number);
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        let integerDisplay;

        if (isNaN(integerDigits)) {
            integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {
                maximumFractionDigits: 0
            })
        }

        if (decimalDigits != null) {
            return (`${integerDisplay}.${decimalDigits}`);
        } else {
            return integerDisplay
        }
        return number
    }

    updateScreen() {
        this.currentOperandText.textContent = this.getDisplayNumber(this.currentOperand);
        if (this.operation != null) {
            if (this.operation == '=') {
                this.currentOperandText.textContent = this.getDisplayNumber(this.previousOperand);
                this.previousOperandText.textContent = ''

            } else {
                this.previousOperandText.textContent = this.getDisplayNumber(this.previousOperand) + this.operation;
            }
        }
    }

    operations(operator) {

        if (this.operator === "") return;
        if (this.previousOperand !== '') {
            this.compute();
        }

        this.operation = operator;
        this.previousOperand = this.currentOperand;
        this.currentOperand = ''

    }

    compute() {

        let computation;
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)

        if (isNaN(prev) || isNaN(current)) {
            return;
        };

        switch (this.operation) {
            case '+':
                computation = prev + current;
                break;

            case '-':
                computation = prev - current;
                break;

            case '*':
                computation = prev * current;
                break;

            case '÷':
                computation = prev / current;
                break;

            default:
                return
        }

        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = ''

    }

    delete() {
        this.currentOperand = String(this.currentOperand).slice(0, -1);
    }
}

calculator = new Calculator(previousOperandText, currentOperandText);


for (let number of numbers) {
    number.addEventListener("click", () => {
        calculator.appendNumber(number.textContent)
        calculator.updateScreen();
    })
}

for (let operator of operators) {
    operator.addEventListener("click", () => {
        calculator.operations(operator.textContent);
        calculator.updateScreen()
    })
};

allclear.addEventListener("click", () => {
    calculator.clear();
    calculator.updateScreen();
});

equal.addEventListener("click", (button) => {

    calculator.compute();
    calculator.updateScreen();

});

del.addEventListener("click", () => {
    calculator.delete();
    calculator.updateScreen();
});